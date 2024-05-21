// import React, { useState, useEffect } from 'react';
// import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import SQLite from 'react-native-sqlite-storage';

// // Open or create the SQLite database
// const db = SQLite.openDatabase({ name: 'calendar.db', location: 'default' });

// export default function CalendarScreen() {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [eventText, setEventText] = useState('');
//   const [eventTime, setEventTime] = useState('');
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     // Create events table if not exists
//     db.transaction((tx) => {
//       tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, time TEXT, event TEXT)',
//         []
//       );
//     });

//     // Load events from database
//     loadEvents();
//   }, []);

//   const loadEvents = () => {
//     db.transaction((tx) => {
//       tx.executeSql('SELECT * FROM events', [], (_, { rows }) => {
//         const eventsArray = rows._array;
//         setEvents(eventsArray);
//       });
//     });
//   };

//   const handleDateSelect = (day) => {
//     setSelectedDate(day.dateString);
//     setModalVisible(true);
//   };

//   const saveEvent = () => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'INSERT INTO events (date, time, event) VALUES (?, ?, ?)',
//         [selectedDate, eventTime, eventText],
//         () => {
//           setModalVisible(false);
//           loadEvents(); // Refresh events after saving
//         },
//         (error) => {
//           console.error('Error saving event:', error);
//         }
//       );
//     });
//   };

//   return (
//     <View style={styles.container}>
//       {/* Calendar Component */}
//       <Calendar
//         current={'2024-04-29'}
//         style={styles.calendar}
//         onDayPress={handleDateSelect}
//         markedDates={{
//           // Mark dates with events
//           ...events.reduce((markedDates, event) => {
//             const { date } = event;
//             markedDates[date] = { selected: true, marked: true, dotColor: 'blue' };
//             return markedDates;
//           }, {}),
//         }}
//       />

//       {/* Modal for adding event */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Add Event for {selectedDate}</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Type your event here"
//               onChangeText={(text) => setEventText(text)}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter time (e.g., 10:00 AM)"
//               onChangeText={(time) => setEventTime(time)}
//             />
//             <TouchableOpacity onPress={saveEvent} style={styles.saveButton}>
//               <Text style={styles.saveButtonText}>Save</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   calendar: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     height: 350,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'black',
//     padding: 20,
//     borderRadius: 10,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 18,
//     marginBottom: 10,
//     color: '#0000FF',
//   },
//   input: {
//     borderColor: 'gray',
//     borderWidth: 1,
//     padding: 10,
//     marginBottom: 10,
//     color: 'white',
//   },
//   saveButton: {
//     backgroundColor: '#0000FF',
//     padding: 10,
//     borderRadius: 5,
//   },
//   saveButtonText: {
//     color: 'white',
//     textAlign: 'center',
//   },
// });






import React from 'react';
import { View, Text } from 'react-native';

export default function HelloWorldScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello, World!</Text>
    </View>
  );
}





