import React, { useReducer } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import Form from "./Form/Form";
import Login from "./Login/Login";
import { stateContext } from "./context/StateContext";
import { initialState, stateReducer } from "./StateReducer";

const Routing = () => {
  const [state,dispatch] = useReducer(stateReducer,initialState);
  console.log('state',state);
  return (
    <stateContext.Provider value={{state,dispatch}}> 
    {/* <stateContext.Provider value={{name:"context",color:"black"}}></stateContext.Provider>  //for static update*/ }
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Form" element={<Form />}></Route>
          {/*<Route path="*" element={<h1>Not Found!!!</h1>}></Route> */}*
          <Route path="*" element={<Navigate to="/Home"></Navigate>}></Route>
        </Routes>
      </BrowserRouter>
    </stateContext.Provider>
  );
};

export default Routing;
