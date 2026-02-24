import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar, View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { AuthProvider } from './src/context/AuthContext';
import { ProgressProvider } from './src/context/ProgressContext';
import { LessonProvider } from './src/context/LessonContext';
import AppNavigator from './src/navigation/AppNavigator';
import colors from './src/constants/colors';
import { Mascot } from './src/components';

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts if needed
        // await Font.loadAsync({
        //   'Vazir': require('./assets/fonts/Vazir.ttf'),
        // });

        // Artificial delay for splash screen (optional)
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashEmoji}>🌍</Text>
        <Text style={styles.splashTitle}>Lingua</Text>
        <Text style={styles.splashSubtitle}>Learn. Cook. Connect.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <AuthProvider>
          <ProgressProvider>
            <LessonProvider>
              <StatusBar 
                barStyle="light-content" 
                backgroundColor={colors.background}
              />
              <AppNavigator />
            </LessonProvider>
          </ProgressProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  splashContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  splashTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
  },
  splashSubtitle: {
    fontSize: 18,
    color: colors.primary,
    marginTop: 12,
    fontStyle: 'italic',
  },
});
