
import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';

GoogleSignin.configure({
  //scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  webClientId: '66829264659-t8u0qjfh9n5igbsviu8hokmhjv8d8mck.apps.googleusercontent.com',
  offlineAccess: true,
  //forceConsentPrompt: true,
})


class App extends Component {
  constructor(props){
    super(props)
    this.state={
      userGoogleInfo : {},
      loaded: false
    }

  }
  signIn = async () => {
    try {

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("asdsad: ", userInfo);
      this.setState({
        userGoogleInfo : userInfo,
        loaded : true
      })
      console.log(this.state.userGoogleInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("e 1");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("e 2");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("e 3");
      } else {
        console.log(error.message);
      }
    }
  };
  render() {
    return (
      <View>

      <GoogleSigninButton
          style={{ width: 222, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.signIn}
          />
         {this.state.loaded ?
          <View>
            <Text>{this.state.userGoogleInfo.user.name}</Text>
            <Text>{this.state.userGoogleInfo.user.email}</Text>
            <Image 
          style={{ width: 100, height: 100 }}
          source={{uri: this.state.userGoogleInfo.user.photo}}
        />

          </View>
        
        : <Text>Not SignedIn</Text> }
         
        
          </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

