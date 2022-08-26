import Axios from "axios";
import { useState, useEffect } from "react";
import domain from "../util/domain";
import { User } from "../interfaces";

const useUser = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const getUser = async () => {
      try {
        setUser((await Axios.get(domain + "user/sigedin")).data);
      } catch (err: any) {}
    };
    getUser();
  }, []);
  return user;
};

export default useUser;
