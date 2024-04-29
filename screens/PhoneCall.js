import React from 'react';
import { View, Button, Linking } from 'react-native';

const MakePhoneCall = () => {
  const phoneNumber = '0794174751'; // Replace with the phone number you want to call

  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Make Phone Call" onPress={handleCallPress} />
    </View>
  );
};

export default MakePhoneCall;
