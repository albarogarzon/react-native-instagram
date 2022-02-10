import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { USER_STATE_CHANGE } from '../constants';

export function fetchUser() {
  return ((dispach) => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log('Snap ', snapshot.data());
          dispach({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log('Does not exist');
        }
      });
  })
}
