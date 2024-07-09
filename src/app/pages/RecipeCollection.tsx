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
  const [buttonName, setButtonName] = useState('New Folder');
  const [selectedIcon, setSelectedIcon] = useState('star-o');

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
    setModalVisible(false);
    setButtonName('New Folder');
    setSelectedIcon('star-o');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Button style={styles.plus} onPress={() => setModalVisible(true)}>
          <FontAwesome5 name="plus" size={40} color="#365E32" />
        </Button>
        <View style={styles.folders}>
          <Button style={styles.folder}>
            <FontAwesome5
              name="history"
              size={40}
              color="#365E32"
            ></FontAwesome5>
            <Text style={styles.folderText}>History</Text>
          </Button>
          <Button style={styles.folder}>
            <FontAwesome5 name="heart" size={40} color="#365E32"></FontAwesome5>
            <Text style={styles.folderText}>Favorites</Text>
          </Button>
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
          <Text style={styles.modalTitle}>Add New Folder</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Button Name"
            value={buttonName}
            onChangeText={(text) => setButtonName(text)}
          />
          <View style={styles.iconContainer}>
            <TouchableHighlight
              onPress={() => setSelectedIcon('hamburger')}
              style={
                selectedIcon === 'hamburger' ? styles.iconSelected : styles.icon
              }
            >
              <FontAwesome5 name="hamburger" size={30} color="#365E32" />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => setSelectedIcon('apple-alt')}
              style={
                selectedIcon === 'apple-alt' ? styles.iconSelected : styles.icon
              }
            >
              <FontAwesome5 name="apple-alt" size={30} color="#365E32" />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => setSelectedIcon('carrot')}
              style={
                selectedIcon === 'carrot' ? styles.iconSelected : styles.icon
              }
            >
              <FontAwesome5 name="carrot" size={30} color="#365E32" />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => setSelectedIcon('ice-cream')}
              style={
                selectedIcon === 'ice-cream' ? styles.iconSelected : styles.icon
              }
            >
              <FontAwesome5 name="ice-cream" size={30} color="#365E32" />
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => setSelectedIcon('pepper-hot')}
              style={
                selectedIcon === 'pepper-hot'
                  ? styles.iconSelected
                  : styles.icon
              }
            >
              <FontAwesome5 name="pepper-hot" size={30} color="#365E32" />
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
      </Modal>

      {/*Bottom tab navigator*/}
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
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Arvo-Bold',
    marginBottom: 20,
    color: '#365E32',
  },
  input: {
    width: '75%',
    backgroundColor: '#F0F0F0',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    marginHorizontal: 50,
    marginBottom: 20,
    flexWrap: 'wrap',
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
    backgroundColor: '#365E32',
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontFamily: 'Arvo-Bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default RecipeCollection;
