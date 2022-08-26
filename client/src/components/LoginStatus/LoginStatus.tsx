import "./loginStatus.css";
import useUser from "../../hooks/useUser";

export default function LoginStatus() {
  const user = useUser();

  return (
    <div className="loginStatus">
      {user ? "Welcome back " + user.fullname + "!" : <></>}
    </div>
  );
}
