import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { NavigationProp, useRoute } from '@react-navigation/native';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite';
import ModalComponent from 'react-native-modal';

import { db } from '../firebase';

type Props = {
  navigation: NavigationProp<any>;
};

const RecipeCollection: React.FC<Props> = ({ navigation }) => {
  const [folders, setFolders] = useState<string[][]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [collectionName, setcollectionName] = useState('New Folder');
  const [selectedIcon, setSelectedIcon] = useState('star-o');
  const [editMode, setEditMode] = useState(false);
  const [selectedFolders, setSelectedFolders] = useState<number[]>([]);
  const [delVisible, setDelVisible] = useState(false);

  const route = useRoute();
  const { userId } = route.params as {
    userId: string;
  };

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const collectionsRef = collection(db, `allUsers/${userId}/collections`);
        const querySnapshot = await getDocs(collectionsRef);

        const updatedFolders: string[][] = [];

        querySnapshot.forEach((doc) => {
          if (doc.id !== 'History' && doc.id !== 'Favorites') {
            updatedFolders.push([doc.id, doc.data().IconName]);
          }
        });

        setFolders(updatedFolders);
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchFolders();
  }, []);

  const goToGenerator = () => {
    navigation.navigate('Generator', { userId });
  };

  const goToPlanner = () => {
    navigation.navigate('Planner', { userId });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedFolders([]);
  };

  const deleteSelectedFolders = async () => {
    toggleModal();
    const filteredFolders = folders.filter(
      (_, index) => !selectedFolders.includes(index),
    );

    const foldersToDelete = folders.filter((_, index) =>
      selectedFolders.includes(index),
    );

    const collectionsRef = collection(db, `allUsers/${userId}/collections`);

    for (let infoArr of foldersToDelete) {
      let id = infoArr[0];
      const docRef = doc(collectionsRef, id);
      await deleteDoc(docRef); // Make sure to await here
    }

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

  const addNewFolder = async () => {
    const newFolder = [`${collectionName}`, `${selectedIcon}`];
    const collectionsRef = collection(db, `allUsers/${userId}/collections`);
    const newDocRef = doc(collectionsRef, collectionName);

    try {
      await setDoc(newDocRef, {
        IconName: selectedIcon,
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }

    setFolders([...folders, newFolder]);
    setModalVisible(false);
    setcollectionName('New Folder');
    setSelectedIcon('star-o');
  };

  const goIntoCollection = (collectionId: String) => {
    navigation.navigate('DynamicCollection', {
      collectionName: collectionId,
      userId,
    });
  };

  const toggleModal = () => {
    setDelVisible(!delVisible);
  };

  const toggleModalAndEdit = () => {
    toggleModal();
    toggleEditMode();
  };

  const toggleVisible = () => {
    if (selectedFolders.length > 0) {
      setDelVisible(true);
    } else {
      toggleEditMode();
    }
  };

  const DeletePopup = () => {
    return (
      <ModalComponent isVisible={delVisible} onBackdropPress={toggleModal}>
        <View style={styles.popupContainer}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Delete collection</Text>
            <Text style={styles.popupText}>
              You sure you want to delete all selected collections?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={toggleModalAndEdit}
                style={styles.popupButton}
              >
                <Text style={styles.popupButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={deleteSelectedFolders}
                style={styles.popupButton}
              >
                <Text style={styles.popupButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalComponent>
    );
  };

  return (
    <View style={styles.container}>
      <DeletePopup />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.topButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={editMode ? toggleVisible : toggleEditMode}
          >
            <Text style={styles.editButtonText}>
              {editMode ? 'Delete' : 'Edit'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.plus}
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome5 name="plus" size={36} color="#365E32" />
          </TouchableOpacity>
        </View>
        <View style={styles.foldersWrapper}>
          <View style={styles.folders}>
            <TouchableOpacity
              style={styles.folder}
              onPress={() => !editMode && goIntoCollection('History')}
            >
              <FontAwesome5
                name="history"
                size={40}
                color="#365E32"
              ></FontAwesome5>
              <Text style={styles.folderText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.folder}
              onPress={() => !editMode && goIntoCollection('Favorites')}
            >
              <FontAwesome5
                name="heart"
                size={40}
                color="#365E32"
              ></FontAwesome5>
              <Text style={styles.folderText}>Favorites</Text>
            </TouchableOpacity>
            {folders.map((folder, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.folder,
                  selectedFolders.includes(index) && styles.selectedFolder,
                ]}
                onPress={() =>
                  editMode
                    ? toggleFolderSelection(index)
                    : goIntoCollection(`${folder[0]}`)
                }
              >
                <FontAwesome5 name={folder[1]} size={40} color="#365E32" />
                <Text style={styles.folderText}>{folder[0]}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
            value={collectionName}
            onChangeText={(text) => setcollectionName(text)}
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
        <TouchableOpacity style={styles.button} onPress={goToPlanner}>
          <Ionicons name="calendar-outline" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goToGenerator}>
          <Ionicons name="create-outline" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="basket" size={40} color={'#FFF5CD'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const folderSize = (width - 110) / 2;
const neededPadding = height / 5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7D37F',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: neededPadding,
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
    paddingBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderWidth: 0,
  },
  foldersWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  folders: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  folder: {
    backgroundColor: '#FFF5CD',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: folderSize,
    height: folderSize,
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
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#365E32',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: 350,
    height: 215,
  },
  popupTitle: {
    marginTop: 35,
    fontSize: 23,
    color: '#E7D37F',
    fontFamily: 'Arvo-Bold',
  },
  popupText: {
    color: '#FFF5CD',
    fontSize: 18,
    marginVertical: 15,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupButton: {
    backgroundColor: '#365E32',
    justifyContent: 'center',
    fontSize: 20,
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 35,
    borderRadius: 5,
    width: 150,
    height: 50,
  },
  popupButtonText: {
    color: '#FFF5CD',
    fontSize: 18,
    fontFamily: 'Arvo-Regular',
    textAlign: 'center',
  },
});

export default RecipeCollection;
