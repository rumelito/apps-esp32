import React, { useState } from 'react';
import {
  ImageBackground,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Linking,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AboutUsScreen = () => {
  const navigation = useNavigation();
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const members = [
    {
      name: 'MONTALBO',
      description: 'BACKEND DEVELOPER',
      image: require('../assets/images/rommel.jpg'),
    },
    {
      name: 'PALA',
      description: 'FRONTEND',
      email: 'pantaleon@example.com',
      image: require('../assets/images/pala.jpg'),
    },
    {
      name: 'PANDEAGUA',
      description: 'DATABASE ADMINISTRATOR',
      image: require('../assets/images/pande.jpg'),
    },
    {
      name: 'PANTALEON',
      description: 'USER INSIGHT SPECIALIST',
      image: require('../assets/images/lovely.jpg'),
    },
    {
      name: 'QUILBIO',
      description: 'ASSURANCE SPECIALIST',
      image: require('../assets/images/julie.jpg'),
    },
    {
      name: 'QUINDOZA',
      description: 'PROJECT MANAGER',
      image: require('../assets/images/ef.jpg'),
    },
    {
      name: 'SECUYA',
      description: 'UI/UX DESIGN',
      image: require('../assets/images/lori.jpg'),
    },
    {
      name: 'VALIENTE',
      description: 'RELEASE MANAGER',
      image: require('../assets/images/glen.jpg'),
    },
  ];

  const handleLinking = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL", err));
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logged out");
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginScreen" }],
    });
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require('../assets/images/Background.jpg')}
    >
      <SafeAreaView style={styles.innerContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.MeetContainer}>
            <Text style={styles.title}>Meet Our Team</Text>
          </View>
          <View style={styles.cardsContainer}>
            {members.map((member, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.card,
                  selectedMemberIndex === index && styles.cardExpanded,
                ]}
                onPress={() => {
                  setSelectedMemberIndex(selectedMemberIndex === index ? null : index);
                }}
              >
                <Image source={member.image} style={styles.cardImage} />
                <Text style={styles.cardName}>{member.name}</Text>
                {selectedMemberIndex === index && (
                  <View style={styles.cardDetails}>
                    <Text style={styles.cardDescription}>{member.description}</Text>

                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={styles.navContainer}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={toggleModal}
          >
            <Ionicons name="person-circle-outline" size={30} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
             
              <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate("HomeScreen")}>
                <Text style={styles.buttonText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate("AboutScreen")}>
                <Text style={styles.buttonText}>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  MeetContainer: {
    backgroundColor:  'rgba(255, 255, 255, 0.3)',
    padding: 5,
    margin: 30,
    borderRadius: 10,
    textAlign: 'center',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 3,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor:  'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
    height: 200,
    borderWidth: 2,
    borderColor: '#ffff'
  },
  cardExpanded: {
    height: 'auto',
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  cardName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffff',
    textAlign: 'center',
    fontFamily: 'hanumanBlack'
  },
  cardDescription: {
    marginTop: 5,
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  cardInfo: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  // navContainer: {
  //   flexDirection: "row",
  //   justifyContent: "flex-end",
  //   position: "absolute",
  //   bottom: 10,
  //   right: 150,
  //   padding: 10,
  //   backgroundColor: "rgba(65, 61, 61, 0.5)", // Semi-transparent background
  //   borderRadius: 10,
  //   borderWidth: 2,
  //   borderColor: 'white',
  //   alignItems: "center",
  // },
  navContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 10,
    right: 150,
    padding: 10,
    backgroundColor: "rgba(44, 120, 108, 0.8)",
    borderRadius: 10,
  },
  // profileButton: {
  //   padding: 10,
  // },
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "rgba(0, 0, 0, 0.5)",
  // },
  // modalContent: {
  //   width: '80%',
  //   backgroundColor: "rgba(65, 61, 61, 0.5)",
  //   borderWidth: 1,
  //   borderColor: 'white',
  //   borderRadius: 10,
  //   padding: 20,
  //   alignItems: 'center',
  // },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  // modalButton: {
  //   backgroundColor: "#33cccc",
  //   padding: 10,
  //   borderRadius: 5,
  //   marginVertical: 5,
  //   width: '100%',
  //   alignItems: 'center',
  // },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: "#33cccc",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
});