import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import CourseList from "./CourseList";
import NotificationList from "./NotificationList";

class Instructor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.instructorId = this.props.match.params.id;
  }

  render() {
    console.log(this.props);
    console.log(this.instructorId);
    // Only use match.url, match.path for nested routes(eg: localhost:3000/instructors <- main route, /instructors/courses etc. <-nested routes ). Won't work for other cases.
    let { match } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col col-md-3 bg-light border-right">
            <nav className="nav flex-column">
              <Link
                className="nav-link"
                to={{
                  pathname: `${match.url}/courses`,
                  state: this.instructorId
                }}
              >
                My Courses
              </Link>
              <Link className="nav-link" to={`${match.url}/notifications`}>
                Notifications
              </Link>
            </nav>
          </div>
          <div className="col col-md-9 bg-primary">
            <h1>hello</h1>
            <Switch>
              <Route path={`${match.path}/courses`} component={CourseList} />
              <Route
                path={`${match.path}/notifications`}
                component={NotificationList}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Instructor;
