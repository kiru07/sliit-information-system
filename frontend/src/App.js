import React from 'react';
import './App.css';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/Login'
import Signup from './components/Signup'
import Homepage from './components/Homepage'
import AdminAdd from './components/admin/AdminAdd'
import AdminView from './components/admin/AdminView'
import AdminEdit from './components/admin/AdminEdit'
import InstructorAdd from './components/admin/InstructorAdd'
import InstructorView from './components/admin/InstructorView'
import InstructorEdit from './components/admin/InstructorEdit'
import Header from './components/admin/Header'
import CourseAdd from './components/admin/CourseAdd';
import CourseView from './components/admin/CourseView';
import StudentView from './components/admin/StudentView';

import Courses from "./components/instructor/Courses";
import Course from "./components/instructor/Course";
import Assignments from "./components/instructor/Assignments";
import Assignment from "./components/instructor/Assignment";
import Exams from "./components/instructor/Exams";
import Exam from "./components/instructor/Exam";
import InstructorNav from './components/instructor/InstructorNav';
import Notifications from "./components/instructor/Notifications";

function App() {
  return (

    <BrowserRouter>
      <div>
        {/* <Header /> */}
        <Route exact path="/" component={Homepage
        } />
        <Switch>
          <Route path="/admin/" component={Header} />
          <Route path="/admin/addAdmin" component={AdminAdd} />
          <Route path="/admin/viewAdmin" component={AdminView} />
          <Route path="/admin/editAdmin/:id" component={AdminEdit} />
          <Route path="/admin/addInstructor" component={InstructorAdd} />
          <Route path="/admin/viewInstructor" component={InstructorView} />
          <Route path="/admin/editInstructor/:id" component={InstructorEdit} />
          <Route path="/admin/addCourse" component={CourseAdd} />
          <Route path="/admin/viewCourse" component={CourseView} />
          <Route path="/admin/viewStudent" component={StudentView} />
        </Switch>
        <div className="container h-auto min-vh-100">
          <div className="row  h-auto min-vh-100">
            <div className="col col-md-2 border-right">
              <Route path="/instructor" component={InstructorNav} />
            </div>
            <div className="col col-md-10">
              <Switch>
                <Route
                  exact
                  path="/instructor/notifications/"
                  component={Notifications}
                />
                <Route exact path="/instructor/courses/" component={Courses} />
                <Route
                  exact
                  path="/instructor/courses/course/"
                  component={Course}
                />
                <Route
                  exact
                  path="/instructor/assignments/"
                  component={Assignments}
                />
                <Route
                  exact
                  path="/instructor/assignments/assignment/"
                  component={Assignment}
                />
                <Route exact path="/instructor/exams/" component={Exams} />
                <Route exact path="/instructor/exams/exam/" component={Exam} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
