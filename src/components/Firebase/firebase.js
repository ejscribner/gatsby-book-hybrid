import firebaseConfig from "./config";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

app.initializeApp(firebaseConfig);

class Firebase {
    constructor() {
        if (!firebaseInstance) {
            // app.auth is firebase auth service
            this.auth = app.auth();
            this.db = app.firestore();
            this.functions = app.functions();
            this.storage = app.storage();
        }
    }

    async login({ email, password }) {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    async logout() {
        await this.auth.signOut();
    }

    async register({email, password, username}) {
        // built into the firebase auth lib we've installed
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
        return this.db.collection('publicProfiles').doc(username).set({
            userId: newUser.user.uid
        });
    }

    async getUserProfile({userId}) {
        return this.db.collection('publicProfiles').where('userId', '==', userId).get(); // the .get makes it not subscribe to all data changes
    }

    subscribeToBookComments({bookId, onSnapshot}) {
        const bookRef = this.db.collection('books').doc(bookId); // returns ref to that particular book
        return this.db.collection('comments')
          .where('book', '==', bookRef)  // need ref to compare from comments collection
          .orderBy('dateCreated', 'desc')
          .onSnapshot(onSnapshot);
    }

    async postComment({text, bookId}) {
        // only need to pass text and bookId bc rest happens serverside
        // need to tap into firebase functions package (this.functions)
        const postCommentCallable = this.functions.httpsCallable('postComment'); // refers to firebase cloud func name
        return postCommentCallable({text, bookId});
    }
}

let firebaseInstance;

function getFirebaseInstance() {
    if (!firebaseInstance) {
        firebaseInstance = new Firebase();
        return firebaseInstance;
    } else if (firebaseInstance) {
        return firebaseInstance;
    } else {
        return null;
    }
}

export default getFirebaseInstance;
