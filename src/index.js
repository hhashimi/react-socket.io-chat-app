import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbX83mWf1L5Rr8_1yUcjTafoVKgf4EVDU",
  authDomain: "socketio-chat-app-764ce.firebaseapp.com",
  projectId: "socketio-chat-app-764ce",
  storageBucket: "socketio-chat-app-764ce.appspot.com",
  messagingSenderId: "905348086676",
  appId: "1:905348086676:web:44c6da222c67658a9eed81",
  measurementId: "G-SYK96J8922",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
