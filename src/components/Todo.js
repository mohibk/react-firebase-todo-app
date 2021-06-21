export default function Todo({
  text,
  complete,
  docId,
  deleteHandler,
  setUpdating,
  setTodoToUpdate,
}) {
  return (
    <li className="todo">
      <div>
        <button className="todo-text">{text}</button>
        <button
          onClick={() => {
            setUpdating(true);
            setTodoToUpdate(docId);
          }}
        >
          Edit
        </button>
        <button onClick={() => deleteHandler(docId)}>Delete</button>
      </div>
    </li>
  );
}
