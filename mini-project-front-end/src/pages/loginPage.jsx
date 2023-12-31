import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    setIsLoading(true);
    axiosInstance
      .post("/users/login", data)
      .then((resp) => {
        console.log("Login Response", resp);
        localStorage.setItem("token", resp.data.Authorization);
        localStorage.setItem("role", resp.data.role);
        localStorage.setItem("userId", resp.data.userId);
        navigate("/"); // Redirect to the dashboard after successful login.
      })
      .catch((error) => {
        console.log("Login Error", error);
        setError("Invalid email or password. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Login</h1>
      {isLoading && <h1>Loading.....</h1>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <h4>Email</h4>
          <input
            value={email}
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div>
          <h4>Password</h4>
          <input
            value={password}
            placeholder="Enter Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
