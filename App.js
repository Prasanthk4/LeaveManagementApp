import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';
import LeaveApplicationScreen from './screens/LeaveApplicationScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar 
            backgroundColor="#2196F3" 
            barStyle="light-content" 
          />
          <Appbar.Header style={styles.header}>
            <Appbar.Content title="Leave Management" titleStyle={styles.headerTitle} />
          </Appbar.Header>
          
          <View style={styles.content}>
            <LeaveApplicationScreen />
          </View>
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
