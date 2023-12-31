import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";

const useUserHook = () => {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState();

  useEffect(() => {
    axiosInstance
      .get("/users/all")
      .then((resp) => {
        const data = resp.data;
        console.log("Data ", data);
        setUsers(data);
      })
      .catch((error) => {
        console.log(error);
        setErrors(errors);
      });
  }, []);

  const handleSubmit = () => {
    console.log("Submitting from custom hook");
  };

  return { users, handleSubmit, errors };
};

export default useUserHook;
