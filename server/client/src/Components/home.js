import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([
    {
      address: "IN",
      email: "c@c.com",
      mobile: "1231231231",
      username: "c",
      __v: 0,
      _id: "61e2fd2785a42878c2c4b85e",
    },
  ]);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const CheckToken = () => {
    if (!token) {
      navigate("/login");
    }
  };
  const GetAllUser = async () => {
    await fetch("http://localhost:8181/alluser", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          //toast popup
          setUsers(data.users);
          console.log(users);
        } else if (data.auth) {
          navigate("/login");
        } else {
          //toast popup
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    CheckToken();
    GetAllUser();
  }, []);
  return <div>Home</div>;
};

export default Home;
