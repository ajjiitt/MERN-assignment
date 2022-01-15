import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const createUser = async () => {
    await fetch("http://localhost:8181/createuser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({ username, mobile, address, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate("/");
          //toast popup
        } else if (data.auth) {
          navigate("/login");
        } else {
          setEmail("");
          setMobile("");
          setAddress("");
          setUsername("");
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
      <div className="col col-md-3">
      </div>
        {/* <div
          className="card d-flex flex-column col-md-6"
          style={{ width: "400px", maxWidth: "400px" }}
        > */}
          <div
          className="col-md-6 my-4"
            style={{
            border:"1px solid black",borderRadius:"3px"
            //   maxWidth: "300px",
            //   width: "300px",
            //   justifyContent: "center",
            //   alignItems: "center",
            }}
          >
            <div className="mb-3">
              <label className="form-label my-2">Email address</label>
              <input
                type="email"
                className="form-control my-2"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control my-2"
                id="exampleInputPassword1"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="form-label">Mobile Number</label>
              <input
                type="text"
                className="form-control my-2"
                id="exampleInputPassword1"
                placeholder="Enter Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control my-2"
                id="exampleInputPassword1"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary my-2"
                onClick={createUser}
                style={{width:"100%"}}
              >
                Submit
              </button>
            </div>
          </div>
        {/* </div> */}
        <div className="col col-md-3">
      </div>
      </div>
    </div>
  );
};

export default Form;
