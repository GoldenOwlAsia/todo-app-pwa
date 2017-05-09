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
}

const currentUser = new User();

auth.onAuthStateChanged((user) => {
  if (user !== null && !user.isAnonymous) {
    currentUser.info = fields.reduce((obj, item) => ({ ...obj, [item]: user[item] }));
  }
  currentUser.isLoaded = true;
})

export default currentUser;
