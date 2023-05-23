import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const { token } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {};
    data.username = username;
    data.password = password;
      const fetchOptions = {
        method: 'post',
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const url = "http://localhost:8000/token"
      const response = await fetch(url, fetchOptions);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
      }
      else {
        console.log("fail")
      }

    };


      return (
        <div className="card text-bg-light mb-3">
          <h5 className="card-header">Login</h5>
          <div className="card-body">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-3">
                <label className="form-label">Username:</label>
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <input className="btn btn-primary" type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
      );
};

export default LoginForm;
