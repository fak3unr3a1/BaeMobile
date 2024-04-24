import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import Contacts from 'react-native-contacts';

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    Contacts.getAll((err, fetchedContacts) => {
      if (err) {
        console.log("Error fetching contacts: ", err);
        return;
      }
      setContacts(fetchedContacts);
    });
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>Name: {item.displayName}</Text>
      <Text>Phone number: {item.phoneNumbers[0]?.number}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Fetch Contacts" onPress={fetchContacts} />
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.recordID}
      />
    </View>
  );
};

export default ContactsList;
