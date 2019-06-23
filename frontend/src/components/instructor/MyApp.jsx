import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Courses from "./Components/instructor/Courses";
import Course from "./Components/instructor/Course";
import Assignments from "./Components/instructor/Assignments";
import Assignment from "./Components/instructor/Assignment";
import Exams from "./Components/instructor/Exams";
import Exam from "./Components/instructor/Exam";
import InstructorNav from "./Components/instructor/InstructorNav";
import Notifications from "./Components/instructor/Notifications";

const MyApp = props => {
  // return (
  //   <div>
  //     <Courses instructorId={"5d0c49c50a64fb473439e0da"} />
  //   </div>
  // );

  return (
    // <BrowserRouter>
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
    // </BrowserRouter>
  );
};

export default MyApp;
