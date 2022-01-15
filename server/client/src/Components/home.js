import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Home = () => {
  const [users, setUsers] = useState([]);
  const [check, setCheck] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const unauth = () => toast("Session expired");
  const sww = () => toast("Something went wrong, reload page.");
  const errdu = () => toast("Error while deleting user.");
  const usrdu = () => toast("User deleted successfully.");
  const CheckToken = () => {
    if (!token) {
      unauth();
      navigate("/login");
    }
  };
  let i = 0;
  const GetAllUser = async () => {
    await fetch("/alluser", {
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
          // users = data.users;
          setUsers(data.users);
        } else if (data.auth) {
          unauth();
          navigate("/login");
        } else {
          sww();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //http://localhost:6000/deleteuser/ajit
  const deleteUser = async (username) => {
    await fetch(`/deleteuser/${username}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          usrdu();
          setCheck(!check);
          navigate("/");
        } else {
          errdu();
        }
      })
      .catch((err) => {
        console.log(err);
        errdu();
      });
  };
  useEffect(() => {
    CheckToken();
    GetAllUser();
  }, [check]);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Address</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <p>No users in database</p>
          ) : (
            users.map((u) => {
              // console.log(u);
              i++;
              return (
                <tr key={i}>
                  <th scope="row">{i}</th>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.mobile}</td>
                  <td>{u.address}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        deleteUser(u.username);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
