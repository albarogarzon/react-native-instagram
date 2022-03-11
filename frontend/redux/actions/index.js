import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {
  USER_POSTS_STATE_CHANGE,
  USER_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  CLEAR_DATA,
} from '../constants';

export function clearData() {
  return (dispatch) => {
    dispatch({ type: CLEAR_DATA });
  };
}

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

export function fetchUserFollowing() {
  return (dispach) => {
    firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .onSnapshot((snapshot) => {
        let following = snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        dispach({ type: USER_FOLLOWING_STATE_CHANGE, following });
        for (let i = 0; i < following.length; i++) {
          dispach(fetchUsersData(following[i],true));
        }
      });
  };
}

export function fetchUsersData(uid, getPosts) {
  return (dispach, getState) => {
    const found = getState().usersState.users.some((el) => el.uid === uid);
    if (!found) {
      firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let user = snapshot.data();
            user.uid = snapshot.id;
            dispach({ type: USERS_DATA_STATE_CHANGE, user });
          } else {
          }
        });
      if (getPosts) {
        dispach(fetchUsersFollowingPosts(uid));
      }
    }
  };
}

export function fetchUsersFollowingPosts(uid) {
  return (dispach, getState) => {
    firebase
      .firestore()
      .collection('posts')
      .doc(uid)
      .collection('userPosts')
      .orderBy('creation', 'asc')
      .get()
      .then((snapshot) => {
        //const uid = snapshot.docs[0].ref.path.split('/')[1];

        console.log({ snapshot, uid });
        const user = getState().usersState.users.find((el) => el.uid === uid);

        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data, user };
        });
        console.log(posts);
        dispach({ type: USERS_POSTS_STATE_CHANGE, posts, uid });
        console.log(getState());
      });
  };
}
