import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE } from '../constants';

export function fetchUser() {
  return (dispach) => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispach({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
        }
      });
  };
}

export function fetchUserPosts() {
  return (dispach) => {
    firebase
      .firestore()
      .collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection('userPosts')
      .orderBy('creation', 'asc')
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispach({ type: USER_POSTS_STATE_CHANGE, posts });
      });
  };
}
