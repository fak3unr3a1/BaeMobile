import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import Contacts from 'react-native-contacts';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Check and request permission when the component mounts
    checkPermissionAndFetchContacts();
  }, []);

  const checkPermissionAndFetchContacts = async () => {
    try {
      // Check permission
      const { status } = await Permissions.askAsync(Permissions.CONTACTS);
      if (status === 'granted') {
        fetchContacts();
      } else {
        console.log('Contacts permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchContacts = async () => {
    try {
      // Fetch contacts
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      setContacts(data);
    } catch (err) {
      console.log('Error fetching contactttts: ', err);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>Name: {item.name}</Text>
      <Text>Phone number: {item.phoneNumbers ? item.phoneNumbers[0]?.number : ''}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* You may remove the button if you prefer */}
      {/* <Button title="Fetch Contacts" onPress={fetchContacts} /> */}
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ContactsList;
