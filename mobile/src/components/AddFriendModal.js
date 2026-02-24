import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import RankBadge from './RankBadge';
import { useSocial } from '../context/SocialContext';

/**
 * AddFriendModal - Modal for searching and adding friends
 * @param {boolean} visible - Whether modal is visible
 * @param {function} onClose - Called when modal is closed
 */
const AddFriendModal = ({ visible, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { searchUsers, sendFriendRequest } = useSocial();

  const handleSearch = useCallback(async () => {
    if (searchQuery.length < 2) {
      setError('Enter at least 2 characters');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await searchUsers(searchQuery);
      setSearchResults(results);
      if (results.length === 0) {
        setError('No users found');
      }
    } catch (err) {
      setError(err.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, searchUsers]);

  const handleSendRequest = async (userId) => {
    try {
      await sendFriendRequest(userId);
      // Update local state to show pending
      setSearchResults(prev =>
        prev.map(user =>
          user._id === userId
            ? { ...user, friendshipStatus: 'pending', isRequester: true }
            : user
        )
      );
    } catch (err) {
      setError(err.message || 'Failed to send request');
    }
  };

  const handleClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    setError(null);
    onClose();
  };

  const getButtonState = (user) => {
    if (user.friendshipStatus === 'accepted') {
      return { text: 'Friends', disabled: true, color: colors.success };
    }
    if (user.friendshipStatus === 'pending') {
      return {
        text: user.isRequester ? 'Pending' : 'Accept',
        disabled: user.isRequester,
        color: colors.warning,
      };
    }
    return { text: 'Add', disabled: false, color: colors.primary };
  };

  const renderUserItem = ({ item }) => {
    const initials = item.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const buttonState = getButtonState(item);

    return (
      <View style={styles.userItem}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{initials}</Text>
        </View>

        <View style={styles.userInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.userName} numberOfLines={1}>
              {item.name}
            </Text>
            <RankBadge rank={item.rank} size="small" />
          </View>
          <Text style={styles.userLevel}>Level {item.level}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.addButton,
            { backgroundColor: buttonState.color },
            buttonState.disabled && styles.disabledButton,
          ]}
          onPress={() => handleSendRequest(item._id)}
          disabled={buttonState.disabled}
        >
          <Text style={styles.addButtonText}>{buttonState.text}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Add Friend</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Search input */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name or email..."
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.textWhite} />
              ) : (
                <Ionicons name="search" size={20} color={colors.textWhite} />
              )}
            </TouchableOpacity>
          </View>

          {/* Error message */}
          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          {/* Results */}
          <FlatList
            data={searchResults}
            keyExtractor={item => item._id}
            renderItem={renderUserItem}
            style={styles.resultsList}
            contentContainerStyle={styles.resultsContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              !loading && !error && searchQuery.length >= 2 ? (
                <Text style={styles.emptyText}>No results</Text>
              ) : null
            }
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.overlay,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: 32,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 16,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginBottom: 12,
    marginHorizontal: 16,
  },
  resultsList: {
    flexGrow: 0,
  },
  resultsContent: {
    paddingHorizontal: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  userLevel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  addButtonText: {
    color: colors.textWhite,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AddFriendModal;
