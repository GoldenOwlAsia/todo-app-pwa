import { auth } from '../db/firebase';
import { observable } from 'mobx';

const fields = ['uid', 'email', 'photoURL', 'displayName', 'refreshToken', 'emailVerified'];

class User {
  @observable isLoaded = false;
  @observable info = {
    uid: null,
    email: null,
    photoURL: null,
    displayName: null,
    refreshToken: null,
    emailVerified: false,
  };

  onLogin({ email, password }, callback) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => callback(null))
      .catch(callback)
  }

  onLogout() {
    auth.signOut();
  }

  onRegister({email, password, displayName}, callback) {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.updateProfile({ displayName });
        callback(null);
      })
      .catch((error) => {
        const errors = {};
        switch (error.code) {
          case 'auth/weak-password':
            errors.password = error.message;
            break;
          case 'auth/invalid-email':
          case 'auth/email-already-in-use':
            errors.email = error.message;
            break;
          default:
            errors.errorText = error.message
        }
        callback(Object.keys(errors).length > 0, errors);
      })
  }
}

const currentUser = new User();

auth.onAuthStateChanged((user) => {
  if (user !== null && !user.isAnonymous) {
    const info = fields.reduce((obj, item) => ({ ...obj, [item]: user[item] }), {});
    currentUser.info = {...info};
  }
  currentUser.isLoaded = true;
})

export default currentUser;
