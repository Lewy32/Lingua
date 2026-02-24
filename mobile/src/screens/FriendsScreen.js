import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import FriendCard from '../components/FriendCard';
import RankBadge from '../components/RankBadge';
import AddFriendModal from '../components/AddFriendModal';
import { useSocial } from '../context/SocialContext';

const FriendsScreen = ({ navigation }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('friends');
  const [refreshing, setRefreshing] = useState(false);

  const {
    friends,
    friendRequests,
    friendsLoading,
    fetchFriends,
    fetchFriendRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    pendingRequestsCount,
  } = useSocial();

  useEffect(() => {
    fetchFriends();
    fetchFriendRequests();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchFriends(), fetchFriendRequests()]);
    setRefreshing(false);
  }, [fetchFriends, fetchFriendRequests]);

  const handleRemoveFriend = (friend) => {
    Alert.alert(
      'Remove Friend',
      `Are you sure you want to remove ${friend.name} from your friends?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeFriend(friend._id),
        },
      ]
    );
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      await acceptFriendRequest(requestId);
    } catch (error) {
      Alert.alert('Error', 'Failed to accept friend request');
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await rejectFriendRequest(requestId);
    } catch (error) {
      Alert.alert('Error', 'Failed to reject friend request');
    }
  };

  const renderRequestItem = ({ item }) => {
    const user = item.from;
    const initials = user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return (
      <View style={styles.requestCard}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
        
        <View style={styles.requestInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.requestName} numberOfLines={1}>{user.name}</Text>
            <RankBadge rank={user.rank} size="small" />
          </View>
          <Text style={styles.requestLevel}>Level {user.level}</Text>
        </View>

        <View style={styles.requestActions}>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => handleAcceptRequest(item._id)}
          >
            <Ionicons name="checkmark" size={20} color={colors.textWhite} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={() => handleRejectRequest(item._id)}
          >
            <Ionicons name="close" size={20} color={colors.textWhite} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmptyFriends = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="people-outline" size={64} color={colors.textSecondary} />
      <Text style={styles.emptyTitle}>No friends yet</Text>
      <Text style={styles.emptySubtitle}>
        Tap the + button to find and add friends
      </Text>
    </View>
  );

  const renderEmptyRequests = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="mail-outline" size={64} color={colors.textSecondary} />
      <Text style={styles.emptyTitle}>No pending requests</Text>
      <Text style={styles.emptySubtitle}>
        Friend requests will appear here
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Friends</Text>
        
        <TouchableOpacity
          onPress={() => setShowAddModal(true)}
          style={styles.addButton}
        >
          <Ionicons name="person-add" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
          onPress={() => setActiveTab('friends')}
        >
          <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>
            Friends ({friends.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'requests' && styles.activeTab]}
          onPress={() => setActiveTab('requests')}
        >
          <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>
            Requests
          </Text>
          {pendingRequestsCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{pendingRequestsCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'friends' ? (
        <FlatList
          data={friends}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <FriendCard
              friend={item}
              onPress={() => {}}
              onRemove={handleRemoveFriend}
              showRemove={true}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={renderEmptyFriends}
          contentContainerStyle={friends.length === 0 && styles.emptyList}
        />
      ) : (
        <FlatList
          data={friendRequests.received}
          keyExtractor={item => item._id}
          renderItem={renderRequestItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
          ListEmptyComponent={renderEmptyRequests}
          contentContainerStyle={
            friendRequests.received?.length === 0 && styles.emptyList
          }
          style={styles.requestsList}
        />
      )}

      {/* Add Friend Modal */}
      <AddFriendModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 4,
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.textWhite,
  },
  badge: {
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  badgeText: {
    color: colors.textWhite,
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 6,
  },
  requestsList: {
    paddingHorizontal: 16,
  },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: colors.textWhite,
    fontSize: 18,
    fontWeight: 'bold',
  },
  requestInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requestName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  requestLevel: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  requestActions: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: colors.success,
    borderRadius: 8,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  rejectButton: {
    backgroundColor: colors.error,
    borderRadius: 8,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default FriendsScreen;
