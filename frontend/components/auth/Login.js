import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

//import firebase from 'firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithCredential,signInWithEmailAndPassword } from 'firebase/auth';
export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const { email, password } = this.state;

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(userCredential);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button onPress={() => this.onSignUp()} title="Sign In" />
      </View>
    );
  }
}

export default Login;
