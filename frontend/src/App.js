// import React, { useEffect,useState,createContext} from 'react'
// import Home from './pages/Home/Home'
// import {Route,Routes, useNavigate } from 'react-router-dom';
// import SignUp from './pages/SignUp/SignUp';
// import Login from './pages/Login/Login';
// import axios from './axiosConfig';
// import ProtectedRoute from './routes/ProtectedRoute';
// import About from './components/About/About';
// import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';
// export const AppState=createContext()
// function App() {
//   const [user,setUser]=useState({})
//   const token=localStorage.getItem("token");
//   const navigate= useNavigate();
//   async function checkUser() {
//     try{
// const {data} =await axios.get('/users/check',{
//   headers:{
//    Authorization:`Bearer ${token}`,
//   },
// })
// setUser(data); 
// // console.log(data)
//     }catch(error){
// console.log(error.response);
// navigate('/Login')
//     }
//   }useEffect(()=>{
//     checkUser();
//   },[])
//   return (
//     <div className='App'>
//     <AppState.Provider value={{user,setUser}}>
//       <Header/>
//        <Routes>
//         <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
//         <Route path="/about" element={<About />} />
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/register' element={<SignUp/>}/>
//      </Routes>
//      <Footer/>
//     </AppState.Provider>
//     </div>
//   )
// }
// export default App
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AboutPage from "./components/About/About";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import AnswerPage from "./pages/Answers/Answers";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      {/* Header appears on all pages */}
      <Header />

      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<AboutPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ask"
            element={
              <ProtectedRoute>
                <AskQuestion />
              </ProtectedRoute>
            }
          />

          <Route
            path="/questions/:id"
            element={
              <ProtectedRoute>
                <AnswerPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer visible on all pages */}
      <Footer />
    </>
  );
}

export default App;



