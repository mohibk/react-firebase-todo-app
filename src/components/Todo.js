import { GiCrossMark } from "react-icons/gi";
import { FiEdit3 } from "react-icons/fi";

export default function Todo({
  text,
  complete,
  docId,
  deleteHandler,
  setUpdating,
  setTodoToUpdate,
  completeTodoToggler,
}) {
  return (
    <li className="todo">
      <button
        onClick={() => completeTodoToggler(docId, complete)}
        className={complete ? "todo-text complete" : "todo-text"}
      >
        {text}
      </button>

      <span>
        <FiEdit3
          onClick={() => {
            setUpdating(true);
            setTodoToUpdate(docId);
          }}
        />
        <GiCrossMark onClick={() => deleteHandler(docId)} />
      </span>
    </li>
  );
}
