import Todo from "./Todo";
import firebase from "../lib/firebase";
import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [updating, setUpdating] = useState(false);
  const [todoId, setTodoId] = useState("");

  useEffect(() => {
    firebase
      .firestore()
      .collection("todos")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
        );
      });

    return () => {};
  }, []);

  const todoDeleteHandler = (docId) => {
    try {
      firebase.firestore().collection("todos").doc(docId).delete();
    } catch (error) {
      console.log(error.message);
    }
  };

  const setTodoToUpdate = (id) => {
    const todo = todos.find((todo) => todo.docId === id);
    console.log(todo);
    setTodoId(todo.docId);
    setText(todo.text);
  };

  return (
    <div className="container">
      <AddTodo
        text={text}
        setText={setText}
        updating={updating}
        setUpdating={setUpdating}
        todoId={todoId}
      />
      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo.docId}
            {...todo}
            deleteHandler={todoDeleteHandler}
            setUpdating={setUpdating}
            setTodoToUpdate={setTodoToUpdate}
          />
        ))}
      </ul>
    </div>
  );
}
