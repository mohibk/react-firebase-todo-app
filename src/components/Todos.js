import Todo from "./Todo";
import firebase from "../lib/firebase";
import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";

export default function Todos({ user, setUser }) {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [updating, setUpdating] = useState(false);
  const [todoId, setTodoId] = useState("");

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("todos")
      .where("userId", "==", user.uid)
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
        );
      });

    return () => unsubscribe();
  }, [user.uid]);

  const todoDeleteHandler = (docId) => {
    try {
      firebase.firestore().collection("todos").doc(docId).delete();
    } catch (error) {
      console.log(error.message);
    }
  };

  const setTodoToUpdate = (id) => {
    const todo = todos.find((todo) => todo.docId === id);
    setTodoId(todo.docId);
    setText(todo.text);
  };

  const completeTodoToggler = (docId, complete) => {
    try {
      firebase.firestore().collection("todos").doc(docId).update({
        complete: !complete,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => setUser(""))
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="container">
      <header>
        <button onClick={handleSignOut} type="button" className="sign-out-btn">
          Sign Out
        </button>
        {console.log(user)}
        <span>
          <img src={user.photoURL} alt="" />
          <p>hi, {user.displayName}</p>
        </span>
      </header>
      <AddTodo
        text={text}
        setText={setText}
        updating={updating}
        setUpdating={setUpdating}
        todoId={todoId}
        userId={user.uid}
      />
      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo.docId}
            {...todo}
            deleteHandler={todoDeleteHandler}
            setUpdating={setUpdating}
            setTodoToUpdate={setTodoToUpdate}
            completeTodoToggler={completeTodoToggler}
          />
        ))}
      </ul>
    </div>
  );
}
