import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [data, setData] = useState(null);
  const navigate = useNavigate(); // Get the navigate function from useNavigate

  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios("/api/users/login", {
        method: "POST",
        data: credentials,
      });

      //store it locally
      localStorage.setItem("token", data.token);
      console.log(data.message, data.token);
      setData(data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setData(null);
    useNavigate("/login");
  };

  const requestData = async () => {
    try {
      const { data } = await axios("/api/users/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setData(data.message);
      console.log(data.message);
      navigate("/"); // Redirect to home or another route after successful login
    } catch (error) {
      console.log(error);
      setData(error.message);
    }
  };

  return (
    <div>
      <div className="ms-5">
        <label className="form-label">Username:</label>
        <input
          style={{ width: "30%" }}
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
        />
        <label className="form-label">Password:</label>
        <input
          style={{ width: "30%" }}
          value={password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <div className="d-flex gap-2 m-3">
          <button className="btn " onClick={login}>
            Log in
          </button>
          <button className="btn" onClick={logout}>
            Log out
          </button>
        </div>
      </div>

      {data && (
        <div className="text-center p-4">
          <div className="alert">{data}</div>
        </div>
      )}
    </div>
  );
}

export default Login;
