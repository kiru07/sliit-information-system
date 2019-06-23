import React from "react";
import { Link } from "react-router-dom";

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: null
    };

    this.getCourse = this.getCourse.bind(this);
  }

  componentDidMount() {
    // get course url
    let courseId = this.props.location.state.courseId;
    // let url = `/api/courses/${courseId}`  //final url
    let url = `http://localhost:4000/api/courses/${courseId}`; // dev url
    this.getCourse(url);
  }

  getCourse(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let course = data.data;
        this.setState({
          course: course
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let { course } = this.state;
    // After Fetching Data
    if (course) {
      // list of instructors
      let instructors = (
        <ul className="list-group">
          {course.instructors.map(instructor => {
            return (
              <li
                key={instructor._id}
                className="list-group-item list-group-item-info"
              >
                {instructor.name} -- {instructor.email} -- {instructor.phone}
              </li>
            );
          })}
        </ul>
      );

      return (
        <div className="container">
          <div className="course-details">
            <h1 className="text-center">Course: {course.name}</h1>
            <h3 className="text-center">Code: {course.code}</h3>
            <h3>Instructors</h3>
            {instructors}
          </div>
          <div className="view-assignments" />
          <div className="card text-center my-2">
            <div className="card-header  bg-success text-white">
              Assignments
            </div>
            <div className="card-body">
              <h5 className="card-title">
                Create new Assignments / View Assignments
              </h5>
              <p className="card-text">
                Click Below to access all Assignment related information for
                this course
              </p>
              <Link
                to={{
                  pathname: "/instructor/assignments/",
                  state: {
                    assignments: course.assignments,
                    courseId: course._id,
                    courseName: course.name,
                    courseCode: course.code
                  }
                }}
              >
                <div className="btn btn-primary">Assignments</div>
              </Link>
            </div>
            <div className="card-footer text-muted  bg-success" />
          </div>
          <div className="view-exams">
            <div className="card text-center my-2">
              <div className="card-header bg-info text-white">Exams</div>
              <div className="card-body">
                <h5 className="card-title">Create new Exams / View Exams</h5>
                <p className="card-text">
                  Click Below to access all Exam related information for this
                  course
                </p>
                <Link
                  to={{
                    pathname: "/instructor/exams/",
                    state: {
                      assignments: course.assignments,
                      courseId: course._id,
                      courseName: course.name,
                      courseCode: course.code
                    }
                  }}
                >
                  <div className="btn btn-primary">Exams</div>
                </Link>
              </div>
              <div className="card-footer text-muted bg-info" />
            </div>
          </div>
        </div>
      );
    } else {
      // If Data not fetched
      return (
        <div className="container">
          <h3>No Course Info available</h3>
        </div>
      );
    }
  }
}

export default Course;
