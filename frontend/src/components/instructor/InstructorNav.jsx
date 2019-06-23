import React from "react";
import { Link } from "react-router-dom";

class InstructorNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // instructorId / studentId should come from Login component
    let instructorId = "5d0f25f84ed0f17ce0f67405";
    return (
      <nav className="nav flex-column">
        <Link
          to={{
            pathname: "/instructor/courses/",
            state: { instructorId: instructorId }
          }}
          className="nav-link border-bottom border-primary"
        >
          My Courses
        </Link>
        <Link
          to={{
            pathname: "/instructor/notifications/",
            state: { instructorId: instructorId }
          }}
          className="nav-link border-bottom border-primary"
        >
          My Notifications
        </Link>
        {/* For Student View
         <Link
          to={{path:"/student/notifications/", state: {studentId: studentId}}}
          className="nav-link border-bottom border-primary"
        >
          My Notifications
        </Link> */}
      </nav>
    );
  }
}

export default InstructorNav;
