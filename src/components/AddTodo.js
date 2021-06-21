import firebase from "../lib/firebase";

export default function AddTodo({
  text,
  setText,
  updating,
  setUpdating,
  todoId,
  userId,
}) {
  const createTodo = () => {
    try {
      firebase.firestore().collection("todos").add({
        text,
        complete: false,
        userId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setText("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateTodo = () => {
    try {
      firebase.firestore().collection("todos").doc(todoId).update({
        text,
        complete: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setText("");
      setUpdating(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (updating && text) {
      updateTodo();
    } else if (text) {
      createTodo();
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="add-todo">
      <input
        type="text"
        placeholder="What's next on your mind?"
        value={text}
        onChange={({ target }) => setText(target.value)}
      />
      <button type="submit">{updating ? "Update Todo" : "Add Todo"}</button>
    </form>
  );
}
