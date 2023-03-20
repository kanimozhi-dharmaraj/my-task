import React from 'react';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import Home from './Home/Home';
import Form from './Form/Form'
import Login from './Login/Login';

const Routing = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/Home" element={<Home />}></Route>
            <Route path="/Form" element={<Form />}></Route>
           { /*<Route path="*" element={<h1>Not Found!!!</h1>}></Route> */}
           *<Route path="*" element={<Navigate to="/Home"></Navigate>}></Route>
          
        </Routes>
    </BrowserRouter>
   
  );
};

export default Routing;