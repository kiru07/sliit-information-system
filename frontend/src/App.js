import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/Login'
import ViewCourses from './components/student/viewCourses'; 

function App() {
  return (
    <div className="App">
      {/*  <Login/>  */}
      <ViewCourses />
    </div>
  );
}

export default App;
