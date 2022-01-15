import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let arr = [];
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
          arr = data.users;
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
