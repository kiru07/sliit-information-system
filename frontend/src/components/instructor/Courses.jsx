import React from "react";
import { Link, Redirect } from "react-router-dom";

class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructor: null,
      courses: []
    };

    this.getCourses = this.getCourses.bind(this);
    this.checkIfCourseAccepted = this.checkIfCourseAccepted.bind(this);
    this.acceptCourse = this.acceptCourse.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // Get list of instructor's courses
    console.log(this.props);
    let { instructorId } = this.props.location.state; // from Login/Nav's Links (redirect)
    // let instructorId = "5d0f25f84ed0f17ce0f67405";
    // let instructorId = "5d0f26484ed0f17ce0f67406";
    // let url = `http://localhost:4000/instructor/get/${instructorId}`;
    let url = `http://localhost:4000/api/instructor/get/${instructorId}`;
    this.getCourses(url);
  }

  getCourses(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let instructor = data.data;
        let courses = instructor.courses;
        this.setState({
          instructor: instructor,
          courses: courses
        });
      })
      .catch(err => {
        console.log("Error :" + err);
      });
  }

  acceptCourse(courseId) {
    // Update acceptedInstructors list of courses, and set available to true
    let instructorId = this.state.instructor._id;
    let url = `http://localhost:4000/api/courses/${courseId}/acceptedInstructors/${instructorId}`;
    // Make put request to url, no request body required.
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        if (data.confirmation === "Success") {
          this.getCourses(
            `http://localhost:4000/api/instructor/get/${instructorId}`
          );
          console.log("success");
        } else {
          console.log(data.message);
        }
      })
      .catch(err => {
        console.log("Error: " + err);
      });
  }

  // Check if instructor has already accepted a course
  checkIfCourseAccepted(course) {
    let instructorId = this.state.instructor._id;
    let acceptedInstructorList = course.acceptedInstructors;

    return acceptedInstructorList.includes(instructorId);
  }

  handleClick(event) {
    let btnName = event.target.name;
    let courseId = event.target.value; // value of button's 'value' attribute

    if (btnName === "Accept") {
      this.acceptCourse(courseId);
    } else {
      // redirect to course component
      // console.log("here");
      // commented out onclick handler for 'View' btn, not needed since <Link> will take over
    }
  }

  render() {
    // render list of courses
    let courses = this.state.courses;
    let courseList =
      courses.length !== 0 ? (
        this.state.courses.map(course => {
          let btn = null;
          let btnText = "";
          let btnStyle = "";
          if (this.checkIfCourseAccepted(course)) {
            btnText = "View";
            btnStyle = "btn btn-primary";
            btn = (
              <Link
                to={{
                  pathname: "/instructor/courses/course/",
                  state: { courseId: course._id }
                }}
              >
                <button
                  onClick={this.handleClick}
                  className={btnStyle}
                  name={btnText}
                  value={course._id}
                >
                  {btnText}
                </button>
              </Link>
            );
          } else {
            btnText = "Accept";
            btnStyle = "btn btn-success";
            btn = (
              <button
                onClick={this.handleClick}
                className={btnStyle}
                name={btnText}
                value={course._id}
              >
                {btnText}
              </button>
            );
          }

          return (
            <div key={course._id} className="card w-75 my-2">
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{course.code}</p>
                {btn}
              </div>
            </div>
          );
        })
      ) : (
        <div>No Courses Found</div>
      );

    return (
      <div className="container">
        <h1 className="text-center">Courses</h1>
        {courseList}
      </div>
    );
  }
}

export default Courses;
