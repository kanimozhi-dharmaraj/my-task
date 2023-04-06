import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Data from "../Data.json";
import { stateContext } from "../context/StateContext";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showErrMsg, setShowErrMsg] = useState(false);
  //const [users, setUsers] = useState([]);
  const {state,dispatch} = useContext(stateContext);  //state reducer
  console.log("state", state,dispatch);
  const inputChange = (e) => {
    console.log(e.target.value);
    if (e.target.name === "username") {
      setName(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, password);
    if (name === "" && password === "") {
      setShowErrMsg(true);
    }

    const user = Data.find(
      (user) => user.username === name && user.password === password
    );

    if (user) {
      console.log("Login successful");

      navigate("/Home");
      // Perform login here
    } else {
      console.log("Login failed");
      setShowErrMsg(true);
      // Display error message here
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "150px" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>UserName : </label>
          <input
            placeholder="username"
            name="username"
            value={name}
            onChange={inputChange}></input>
          <br></br>
          {showErrMsg && name === "" && (
            <p style={{ color: "blue" }}>User Name is Required</p>
          )}
          <label>Password : </label>
          <input
            placeholder="password"
            name="password"
            value={password}
            type="password"
            onChange={inputChange}></input>
          <br></br>
          {showErrMsg && password === "" && (
            <p style={{ color: "blue" }}>Password is Required</p>
          )}
          <input type="Submit"></input>
          {showErrMsg &&
            Data.username !== name &&
            Data.password !== password && (
              <p style={{ color: "red" }}>
                Username and password are Incorrect
              </p>
            )}
        </div>
      </form>
      {state.color}
      <button onClick={()=>dispatch({type : 'UPDATE_COLOR', payload : "Red"})}>Update Color</button>
    </div>
  );
};

export default Login;
