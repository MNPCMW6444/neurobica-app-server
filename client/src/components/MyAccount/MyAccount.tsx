import useUser from "../../hooks/useUser";
import LoginPage from "../LoginPage/LoginPage";

export default function MyAccount() {
  const user = useUser();
  return user ? <div>Hi {user.fullname + "!!!"}</div> : <LoginPage />;
}
