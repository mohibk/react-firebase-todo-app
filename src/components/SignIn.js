import { FcGoogle } from "react-icons/fc";

export default function SignIn({ signInWithGoogle }) {
  return (
    <div className="sign-in">
      <p>Welcome to To-Do App</p>
      <button onClick={signInWithGoogle}>
        <FcGoogle className="google-button" /> Sign in with Google
      </button>
    </div>
  );
}
