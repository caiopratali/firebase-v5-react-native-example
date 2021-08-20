# firebase-v5-remote-config-react-native-example

## File App.js:

```js
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
```
