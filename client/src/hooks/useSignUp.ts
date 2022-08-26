import Axios from "axios";
import domain from "../util/domain";

interface UseSignInProps {
  email: string;
  password: string;
}

const useSignUp = async (props: UseSignInProps): Promise<string> => {
  let res = "";
  try {
    res = (
      await Axios.post(domain + "siginin", {
        email: props.email,
        password: props.password,
      })
    ).data;
  } catch (err) {
    debugger;
  }
  return res;
};

export default useSignUp;
