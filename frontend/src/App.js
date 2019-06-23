import React from 'react';
import './App.css';
import {BrowserRouter,Route,NavLink} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/Login'
import Signup from './components/Signup'
import Homepage from './components/Homepage'
import Admin from './components/admin/AdminView'
import Instructor from './components/admin/InstructorView'
import Student from './components/admin/StudentView'
import Course from './components/admin/CourseView'
import AppRouter from './routers/AdminRouter'

function App() {
  return (
    <BrowserRouter><Homepage/></BrowserRouter>
    
  );
}

export default App;
