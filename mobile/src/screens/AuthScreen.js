import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import colors from '../constants/colors';
import { Mascot, Button } from '../components';

const AuthScreen = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isLogin && !name) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    setIsLoading(true);
    try {
      let result;
      if (isLogin) {
        result = await login(email, password);
      } else {
        result = await register(name, email, password);
      }

      if (!result.success) {
        Alert.alert('Error', result.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      // Try to login with demo account or create one
      const result = await login('demo@farsi.app', 'demo123');
      if (!result.success) {
        // Create demo account
        await register('Demo User', 'demo@farsi.app', 'demo123');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not create demo account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <Mascot size={120} expression="happy" animated />
            <Text style={styles.title}>Farsi Learning</Text>
            <Text style={styles.subtitle}>یادگیری فارسی</Text>
            <Text style={styles.tagline}>
              Master Persian with interactive lessons
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.formTitle}>
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </Text>

            {!isLogin && (
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={colors.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder="Your name"
                  placeholderTextColor={colors.textLight}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor={colors.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={colors.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                  size={20} 
                  color={colors.textSecondary} 
                />
              </TouchableOpacity>
            </View>

            <Button
              title={isLogin ? 'Login' : 'Sign Up'}
              onPress={handleSubmit}
              loading={isLoading}
              style={styles.submitButton}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              title="Try Demo"
              onPress={handleDemoLogin}
              variant="secondary"
              loading={isLoading}
              style={styles.demoButton}
            />

            <TouchableOpacity 
              style={styles.switchMode}
              onPress={() => setIsLogin(!isLogin)}
            >
              <Text style={styles.switchText}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Text style={styles.switchLink}>
                  {isLogin ? 'Sign Up' : 'Login'}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Features Preview */}
          <View style={styles.features}>
            <View style={styles.feature}>
              <Ionicons name="flash" size={24} color={colors.primary} />
              <Text style={styles.featureText}>SRS Learning</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="mic" size={24} color={colors.secondary} />
              <Text style={styles.featureText}>Speaking</Text>
            </View>
            <View style={styles.feature}>
              <Ionicons name="book" size={24} color={colors.warning} />
              <Text style={styles.featureText}>Culture</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 24,
    color: colors.primary,
    marginTop: 4,
  },
  tagline: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
  formSection: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.text,
  },
  submitButton: {
    marginTop: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.textSecondary,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  demoButton: {
    marginBottom: 16,
  },
  switchMode: {
    alignItems: 'center',
    marginTop: 8,
  },
  switchText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  switchLink: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  feature: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  featureText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 8,
  },
});

export default AuthScreen;
