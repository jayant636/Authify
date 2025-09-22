import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify/unstyled";

const Login = () => {
  const [iscreateaccount, setiscreateaccount] = useState(true);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { backend_url, setloggedIn, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  async function onSubmitHandler(e) {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);
    try {
      if (iscreateaccount) {
        //register api call
        const response = await axios.post(`${backend_url}/register`, {
          name,
          email,
          password,
        });
        if (response.status === 200) {
          navigate("/");

          console.log("Account created successfully");
        } else {
          console.log("email already exists");
        }
      } else {
        // login api
        const response = await axios.post(`${backend_url}/login`, {
          email,
          password,
        });
        if (response.status === 200) {
          setloggedIn(true);
          getUserData();
          navigate("/");
          console.log("Login successfully");
        } else {
          console.log("Login Unsuccessful");
        }
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="position-relative min-vh-100 d-flex justify-content-center align-items-center">
      <div>
        <Link
          to="/"
          style={{
            display: "flex",
            gap: "5",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "24px",
            textDecoration: "none",
          }}
        >
          <span className="fw-bold fs-4 text-light"></span>
        </Link>
      </div>
      <div>
        <h2>{iscreateaccount ? "Create account" : "Login"}</h2>
        <form onSubmit={onSubmitHandler}>
          {iscreateaccount && (
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="name"
                id="name"
                className="form-control"
                placeholder="Enter name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Id:
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Email Id:
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button
            className="btn btn-primary w-100 "
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : iscreateaccount ? "sign Up" : "Login"}
          </button>
        </form>
        <div>
          {iscreateaccount ? (
            <>
              Already have an account?
              <button
                className="text-decoration-underline"
                onClick={() => setiscreateaccount(false)}
              >
                Login here
              </button>
            </>
          ) : (
            <>
              Don't have an account?
              <button
                className="text-decoration-underline"
                onClick={() => setiscreateaccount(true)}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
