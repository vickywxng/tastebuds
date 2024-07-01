import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { Button, Image, Paragraph, YStack } from 'tamagui';

const TestScreen = () => {
  return (
    <YStack>
      <View id="start-screen" style={{ backgroundColor: '#ffdd6' }}>
        <View id="title">
          <Image
            source={{
              uri: 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg',
            }}
            style={styles.image}
          />
          <Text
            id="sc1"
            style={{ textAlign: 'center', marginTop: 350, fontSize: 25 }}
          >
            Test Screen
          </Text>
        </View>
      </View>
    </YStack>
  );
};

const styles = {
  button1: {
    margin: 75,
    marginTop: 65,
    blockSize: 55,
  },

  button2: {
    margin: 75,
    marginTop: -50,
    marginBottom: 1000,
    blockSize: 55,
  },

  font: {
    fontSize: 30,
  },

  image: { marginTop: 10, width: 50 },
};

export default TestScreen;
