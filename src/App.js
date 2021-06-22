import { useState } from "react";
import "./App.css";
import SignIn from "./components/SignIn";
import Todos from "./components/Todos";
import firebase from "./lib/firebase";

function App() {
  const initialState = "";
  const [user, setUser] = useState(() => initialState);
  let provider = new firebase.auth.GoogleAuthProvider();

  const signInWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="app">
      {user ? (
        <Todos user={user} setUser={setUser} />
      ) : (
        <SignIn signInWithGoogle={signInWithGoogle} />
      )}
    </div>
  );
}

export default App;
