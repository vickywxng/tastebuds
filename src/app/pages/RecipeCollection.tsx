import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};

const RecipeCollection: React.FC<Props> = ({ navigation }) => {
  const [folders, setFolders] = useState<string[][]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonName, setButtonName] = useState('New Folder');
  const [selectedIcon, setSelectedIcon] = useState('star-o');
  const [editMode, setEditMode] = useState(false);
  const [selectedFolders, setSelectedFolders] = useState<number[]>([]);

  const goToGenerator = () => {
    navigation.navigate('Generator');
  };

  const goToPlanner = () => {
    navigation.navigate('Planner');
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedFolders([]);
  };

  const deleteSelectedFolders = () => {
    const filteredFolders = folders.filter(
      (_, index) => !selectedFolders.includes(index),
    );
    setFolders(filteredFolders);
    setSelectedFolders([]);
    setEditMode(false);
  };

  const toggleFolderSelection = (index: number) => {
    if (selectedFolders.includes(index)) {
      setSelectedFolders(selectedFolders.filter((i) => i !== index));
    } else {
      setSelectedFolders([...selectedFolders, index]);
    }
  };

  const addNewFolder = () => {
    const newFolder = [`${buttonName}`, `${selectedIcon}`];
    setFolders([...folders, newFolder]);
    setModalVisible(false);
    setButtonName('New Folder');
    setSelectedIcon('star-o');
  };

  // const addNewFolder = () => {
  //   const newFolder = (
  //     <TouchableOpacity key={folders.length} style={styles.folder}>
  //       <FontAwesome5 name={selectedIcon} size={40} color="#365E32" />
  //       <Text style={styles.folderText}>{buttonName}</Text>
  //     </TouchableOpacity>
  //   );
  //   setFolders([...folders, newFolder]);
  //   setModalVisible(false);
  //   setButtonName('New Folder');
  //   setSelectedIcon('star-o');
  // };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.topButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={editMode ? deleteSelectedFolders : toggleEditMode}
          >
            <Text style={styles.editButtonText}>
              {editMode ? 'Done' : 'Edit'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.plus}
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome5 name="plus" size={40} color="#365E32" />
          </TouchableOpacity>
        </View>
        <View style={styles.folders}>
          <TouchableOpacity style={styles.folder}>
            <FontAwesome5
              name="history"
              size={40}
              color="#365E32"
            ></FontAwesome5>
            <Text style={styles.folderText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.folder}>
            <FontAwesome5 name="heart" size={40} color="#365E32"></FontAwesome5>
            <Text style={styles.folderText}>Favorites</Text>
          </TouchableOpacity>
          {folders.map((folder, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.folder,
                selectedFolders.includes(index) && styles.selectedFolder,
              ]}
              onPress={() => editMode && toggleFolderSelection(index)}
            >
              <FontAwesome5 name={folder[1]} size={40} color="#365E32" />
              <Text style={styles.folderText}>{folder[0]}</Text>
            </TouchableOpacity>
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
          {/* Additional code for icon selection */}
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => setSelectedIcon('hamburger')}
              style={
                selectedIcon === 'hamburger' ? styles.iconSelected : styles.icon
              }
            >
              <FontAwesome5 name="hamburger" size={30} color="#E7D37F" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedIcon('apple-alt')}
              style={
                selectedIcon === 'apple-alt' ? styles.iconSelected : styles.icon
              }
            >
              <FontAwesome5 name="apple-alt" size={30} color="#E7D37F" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedIcon('carrot')}
              style={
                selectedIcon === 'carrot' ? styles.iconSelected : styles.icon
              }
            >
              <FontAwesome5 name="carrot" size={30} color="#E7D37F" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedIcon('ice-cream')}
              style={
                selectedIcon === 'ice-cream' ? styles.iconSelected : styles.icon
              }
            >
              <FontAwesome5 name="ice-cream" size={30} color="#E7D37F" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedIcon('pepper-hot')}
              style={
                selectedIcon === 'pepper-hot'
                  ? styles.iconSelected
                  : styles.icon
              }
            >
              <FontAwesome5 name="pepper-hot" size={30} color="#E7D37F" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedIcon('coffee')}
              style={
                selectedIcon === 'coffee' ? styles.iconSelected : styles.icon
              }
            >
              <FontAwesome5 name="coffee" size={30} color="#E7D37F" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedIcon('utensils')}
              style={
                selectedIcon === 'utensils' ? styles.iconSelected : styles.icon
              }
            >
              <FontAwesome5 name="utensils" size={30} color="#E7D37F" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedIcon('pizza-slice')}
              style={
                selectedIcon === 'pizza-slice'
                  ? styles.iconSelected
                  : styles.icon
              }
            >
              <FontAwesome5 name="pizza-slice" size={30} color="#E7D37F" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedIcon('fish')}
              style={
                selectedIcon === 'fish' ? styles.iconSelected : styles.icon
              }
            >
              <FontAwesome5 name="fish" size={30} color="#E7D37F" />
            </TouchableOpacity>
            {/* Add more icons as needed */}
          </View>
          <TouchableOpacity style={styles.addButton} onPress={addNewFolder}>
            <Text style={styles.buttonText}>Add Button</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Bottom tab navigator */}
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={goToGenerator}>
          <Ionicons name="create-outline" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToPlanner}>
          <Ionicons name="calendar-outline" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="basket" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7D37F',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 120,
  },
  editButton: {
    backgroundColor: '#E7D37F',
    borderWidth: 0,
    padding: 10,
  },
  editButtonText: {
    color: '#365E32',
    fontFamily: 'Arvo-Bold',
    fontSize: 32,
  },
  plus: {
    backgroundColor: '#E7D37F',
    marginLeft: 200,
    padding: 10,
  },
  buttons: {
    backgroundColor: '#82A263',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 100,
    paddingBottom: 30,
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
    borderWidth: 2,
    borderColor: 'transparent',
  },
  folderText: {
    fontFamily: 'Arvo-Bold',
    fontSize: 16,
    color: '#365E32',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#365E32',
    padding: 40,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Arvo-Bold',
    marginBottom: 20,
    color: '#E7D37F',
  },
  input: {
    width: '75%',
    backgroundColor: '#FFF5CD',
    color: '#AFA26B',
    padding: 10,
    height: 40,
    fontSize: 18,
    marginBottom: 20,
    borderRadius: 10,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
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
    backgroundColor: '#FFF5CD',
    padding: 10,
    borderRadius: 5,
    width: 200,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#E7D37F',
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontFamily: 'Arvo-Bold',
    fontSize: 20,
    color: '#365E32',
    textAlign: 'center',
  },
  selectedFolder: {
    borderColor: 'red',
    borderWidth: 2,
  },
});

export default RecipeCollection;
