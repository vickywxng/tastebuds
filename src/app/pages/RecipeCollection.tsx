import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { Button, YStack } from 'tamagui';

type Props = {
  navigation: NavigationProp<any>;
};

const RecipeCollection: React.FC<Props> = ({ navigation }) => {
  const [folders, setFolders] = useState<React.ReactElement[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonName, setButtonName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('history'); // Default icon

  const goToGenerator = () => {
    navigation.navigate('Generator');
  };

  const goToPlanner = () => {
    navigation.navigate('Planner');
  };

  const addNewFolder = () => {
    const newFolder = (
      <Button key={folders.length} style={styles.folder}>
        <FontAwesome5 name={selectedIcon} size={40} color="#365E32" />
        <Text style={styles.folderText}>{buttonName}</Text>
      </Button>
    );
    setFolders([...folders, newFolder]);
    setModalVisible(false); // Close modal after adding new folder
    setButtonName(''); // Clear input values
    setSelectedIcon('history'); // Reset selected icon to default
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Button style={styles.plus} onPress={() => setModalVisible(true)}>
          <FontAwesome5 name="plus" size={40} color="#365E32" />
        </Button>
        <View style={styles.folders}>
          {folders.map((folder, index) => (
            <View key={index} style={styles.folder}>
              {folder}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal for adding new folder */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Folder</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Button Name"
              value={buttonName}
              onChangeText={(text) => setButtonName(text)}
            />
            <View style={styles.iconContainer}>
              <TouchableHighlight
                onPress={() => setSelectedIcon('history')}
                style={
                  selectedIcon === 'history' ? styles.iconSelected : styles.icon
                }
              >
                <FontAwesome5 name="history" size={30} color="#365E32" />
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => setSelectedIcon('heart')}
                style={
                  selectedIcon === 'heart' ? styles.iconSelected : styles.icon
                }
              >
                <FontAwesome5 name="heart" size={30} color="#365E32" />
              </TouchableHighlight>
              {/* Add more icons as needed */}
            </View>
            <Button style={styles.addButton} onPress={addNewFolder}>
              <Text style={styles.buttonText}>Add Button</Text>
            </Button>
            <Button
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Button>
          </View>
        </View>
      </Modal>

      {/* Bottom navigation buttons */}
      <View style={styles.buttons}>
        <Button style={styles.button} onPress={goToGenerator}>
          <Ionicons name="create-outline" size={40} color={'#FFF5CD'} />
        </Button>
        <Button style={styles.button} onPress={goToPlanner}>
          <Ionicons name="calendar-outline" size={40} color={'#FFF5CD'} />
        </Button>
        <Button style={styles.button}>
          <Ionicons name="basket" size={40} color={'#FFF5CD'} />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7D37F',
  },
  plus: {
    backgroundColor: '#E7D37F',
    marginTop: 100,
    marginLeft: 300,
  },
  buttons: {
    backgroundColor: '#82A263',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    height: 100,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
    marginTop: 15,
  },
  folders: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginLeft: 25,
    marginTop: 50,
    marginBottom: 200,
  },
  folder: {
    backgroundColor: '#FFF5CD',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: 155,
    height: 155,
    borderRadius: 17.5,
    margin: 17.5,
  },
  folderText: {
    fontFamily: 'Arvo-Bold',
    fontSize: 16,
    color: '#365E32',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7D37F',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFF5CD',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: '#365E32',
  },
  input: {
    width: '100%',
    backgroundColor: '#F0F0F0',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  icon: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  iconSelected: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: '#82A263',
  },
  addButton: {
    backgroundColor: '#82A263',
    padding: 10,
    borderRadius: 5,
    width: 200,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#E74C3C',
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default RecipeCollection;
