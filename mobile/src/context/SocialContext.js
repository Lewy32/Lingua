import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { socialAPI, leaderboardAPI } from '../services/api';
import { useAuth } from './AuthContext';

const SocialContext = createContext();

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};

export const SocialProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // Friends state
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState({ received: [], sent: [] });
  const [friendsLoading, setFriendsLoading] = useState(false);
  
  // Leaderboard state
  const [friendsLeaderboard, setFriendsLeaderboard] = useState([]);
  const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [userPosition, setUserPosition] = useState(null);
  const [nextWeeklyReset, setNextWeeklyReset] = useState(null);

  // Fetch friends list
  const fetchFriends = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setFriendsLoading(true);
    try {
      const response = await socialAPI.getFriends();
      setFriends(response.data.data || []);
    } catch (error) {
      console.error('Error fetching friends:', error);
    } finally {
      setFriendsLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch friend requests
  const fetchFriendRequests = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      const response = await socialAPI.getFriendRequests();
      setFriendRequests(response.data.data || { received: [], sent: [] });
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  }, [isAuthenticated]);

  // Search users
  const searchUsers = useCallback(async (query) => {
    const response = await socialAPI.searchUsers(query);
    return response.data.data || [];
  }, []);

  // Send friend request
  const sendFriendRequest = useCallback(async (userId) => {
    const response = await socialAPI.sendFriendRequest(userId);
    await fetchFriendRequests();
    return response.data;
  }, [fetchFriendRequests]);

  // Accept friend request
  const acceptFriendRequest = useCallback(async (requestId) => {
    const response = await socialAPI.acceptFriendRequest(requestId);
    await Promise.all([fetchFriends(), fetchFriendRequests()]);
    return response.data;
  }, [fetchFriends, fetchFriendRequests]);

  // Reject friend request
  const rejectFriendRequest = useCallback(async (requestId) => {
    const response = await socialAPI.rejectFriendRequest(requestId);
    await fetchFriendRequests();
    return response.data;
  }, [fetchFriendRequests]);

  // Remove friend
  const removeFriend = useCallback(async (friendId) => {
    const response = await socialAPI.removeFriend(friendId);
    await fetchFriends();
    return response.data;
  }, [fetchFriends]);

  // Fetch friends leaderboard
  const fetchFriendsLeaderboard = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setLeaderboardLoading(true);
    try {
      const response = await leaderboardAPI.getFriends();
      const data = response.data.data;
      setFriendsLeaderboard(data.leaderboard || []);
      setUserPosition(data.userPosition);
    } catch (error) {
      console.error('Error fetching friends leaderboard:', error);
    } finally {
      setLeaderboardLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch global leaderboard
  const fetchGlobalLeaderboard = useCallback(async (page = 1) => {
    if (!isAuthenticated) return;
    
    setLeaderboardLoading(true);
    try {
      const response = await leaderboardAPI.getGlobal(page);
      const data = response.data.data;
      setGlobalLeaderboard(data.leaderboard || []);
      setUserPosition(data.userPosition);
    } catch (error) {
      console.error('Error fetching global leaderboard:', error);
    } finally {
      setLeaderboardLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch weekly leaderboard
  const fetchWeeklyLeaderboard = useCallback(async (page = 1) => {
    if (!isAuthenticated) return;
    
    setLeaderboardLoading(true);
    try {
      const response = await leaderboardAPI.getWeekly(page);
      const data = response.data.data;
      setWeeklyLeaderboard(data.leaderboard || []);
      setUserPosition(data.userPosition);
      setNextWeeklyReset(data.nextReset);
    } catch (error) {
      console.error('Error fetching weekly leaderboard:', error);
    } finally {
      setLeaderboardLoading(false);
    }
  }, [isAuthenticated]);

  // Calculate pending requests count
  const pendingRequestsCount = friendRequests.received?.length || 0;

  // Refresh friends list periodically for online status
  useEffect(() => {
    if (!isAuthenticated) return;

    fetchFriends();
    fetchFriendRequests();

    // Refresh every 60 seconds for online status
    const interval = setInterval(() => {
      fetchFriends();
    }, 60000);

    return () => clearInterval(interval);
  }, [isAuthenticated, fetchFriends, fetchFriendRequests]);

  const value = {
    // Friends
    friends,
    friendRequests,
    friendsLoading,
    fetchFriends,
    fetchFriendRequests,
    searchUsers,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    pendingRequestsCount,
    
    // Leaderboard
    friendsLeaderboard,
    globalLeaderboard,
    weeklyLeaderboard,
    leaderboardLoading,
    userPosition,
    nextWeeklyReset,
    fetchFriendsLeaderboard,
    fetchGlobalLeaderboard,
    fetchWeeklyLeaderboard,
  };

  return (
    <SocialContext.Provider value={value}>
      {children}
    </SocialContext.Provider>
  );
};

export default SocialContext;
