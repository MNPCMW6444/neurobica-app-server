import Axios from "axios";
import { useEffect } from "react";
import { Store } from "react-notifications-component";
import domain from "../../util/domain";

interface SignupReqProps {
  setLabel: Function;
  setIsAdvanced: Function;
  email: string;
}

export default function SignupReq(props: SignupReqProps) {
  const { setLabel, setIsAdvanced, email } = props;
  useEffect(() => {
    const signupReq = async () => {
      try {
        await Axios.post(domain + "user/signupreq", {
          email,
        });
        setLabel("Sign Up");
        setIsAdvanced(true);
      } catch (err: any) {
        Store.removeAllNotifications();
        Store.addNotification({
          title: "Error",
          message: err.response.data.clientError,
          type: "danger",
          container: "bottom-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
          insert: "top",
        });
        setLabel("Error!");
        setTimeout(() => setLabel("Continiue"), 1500);
      }
    };
    signupReq();
  }, [email, setLabel]);
  return null;
}
