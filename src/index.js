import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCBq_H7CxsDcYJ9SKuV9dxxGIametZ2BKY",
    authDomain: "cap1-sws-challenge.firebaseapp.com",
    databaseURL: "https://cap1-sws-challenge.firebaseio.com",
    projectId: "cap1-sws-challenge",
    storageBucket: "cap1-sws-challenge.appspot.com",
    messagingSenderId: "704360043995",
    appId: "1:704360043995:web:d9f43383f75c65badd43fe",
    measurementId: "G-6H8KBDJXS5"
  };

//firebase.intializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
