import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useUserById = (id) => {
  const [user, setUsers] = useSelector((state) => state.users.users);
  console.log(user);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const { data } = await axios.get(`http://localhost:8000/users/${id}`);
    setUsers(data);
  };
  return { user, getUser };
};
