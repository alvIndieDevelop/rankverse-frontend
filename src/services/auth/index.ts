import axios from "axios";
import config from "@/utils/config";

type Tregister = {
  username: string;
  email: string;
  name: string;
  lastName: string;
  password: string;
};

const register = async (payload: Tregister) => {
  const { data } = await axios.post(
    `${config.BACKEND.API.BASE_URL}/auth/register`,
    payload
  );
  return data;
};

const login = async (email: string, password: string) => {
  const { data } = await axios.post(
    `${config.BACKEND.API.BASE_URL}/auth/login`,
    {
      email,
      password,
    }
  );
  return data;
};

const auth = {
  register,
  login,
};

export default auth;
