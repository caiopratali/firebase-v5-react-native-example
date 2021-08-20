import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import firebase from 'react-native-firebase';

const App = () => {

  const [value, setValue] = useState(false);

  const firebaseRemoteConfigFetch = async () => {
    try {

      if (__DEV__) {
        firebase.config().enableDeveloperMode();
      }

      firebase.config().setDefaults({
        hasExperimentalFeature: value,
      });

      await firebase.config().fetch();

      await firebase.config().activateFetched();

      const response = await firebase.config().getValue('hasExperimentalFeature');;

      const hasExperimentalFeature = response.val();

      setValue(hasExperimentalFeature)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styled.container}>
      <TouchableOpacity onPress={() => firebaseRemoteConfigFetch()}>
        <Text style={styled.title}>{JSON.stringify(value)}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styled = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30
  }
})

export default App;
