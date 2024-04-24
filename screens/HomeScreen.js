import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const navigateToConversationHistory = () => {
    navigation.navigate('ConversationHistory');
  };

  const navigateToIndex = () => {
    navigation.navigate('Index'); // Navigate to IndexScreen
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings'); // Navigate to SettingsScreen
  };

  const navigateToStore = () => {
    navigation.navigate('Store'); // Navigate to StoreScreen
  };

  const navigateToContacts = () => {
    navigation.navigate('Contacts'); // Navigate to ContactsScreen
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="See Conversation History" onPress={navigateToConversationHistory} />
      <Button title="Interact With AI" onPress={navigateToIndex} />
      <Button title="Go to Settings" onPress={navigateToSettings} />
      <Button title="Go to Ability Store" onPress={navigateToStore} />
      <Button title="Show Contacts" onPress={navigateToContacts} /> {/* New button */}
    </View>
  );
};

export default HomeScreen;
