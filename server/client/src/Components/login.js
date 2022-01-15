import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginerr = () => toast("Email or password doesn't match");
  const loginSuccess = () => toast("Admin logged in successfully");
  const loginAdmin = async () => {
    await fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("jwt", data.token);
          loginSuccess();
          navigate("/");
          //toast popup
        } else {
          loginerr();
          setEmail("");
          setPassword("");
          //toast popup
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col col-md-3"></div>
        <div
          className="col-md-6 my-4"
          style={{
            border: "1px solid black",
            borderRadius: "3px",
          }}
        >
          <h2 className="form-label my-1" style={{ textAlign: "center" }}>
            LOGIN
          </h2>
          <div className="mb-3">
            <label className="form-label my-2">Email address</label>
            <input
              type="email"
              className="form-control my-1"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label my-2">Password</label>
            <input
              type="password"
              className="form-control my-1"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              style={{ width: "100%" }}
              className="btn btn-primary my-2"
              onClick={loginAdmin}
            >
              Submit
            </button>
          </div>
        </div>
        {/* </div> */}
        <div className="col col-md-3"></div>
      </div>
    </div>
  );
};

export default Login;
