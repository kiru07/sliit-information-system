import React from "react";
import CreateAssignmentForm from "./CreateAssignmentForm";
import { Link } from "react-router-dom";

class Assignments extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      // assignments: props.location.state.assignments
      assignments: [],
      alertMessage: ""
    };

    this.getAssignments = this.getAssignments.bind(this);
    this.handleCreateNewAssignment = this.handleCreateNewAssignment.bind(this);
    this.addAssignment = this.addAssignment.bind(this);
    this.assignmentListRender = this.assignmentListRender.bind(this);
  }

  componentDidMount() {
    this.getAssignments();
  }

  // get all assignments of this course
  getAssignments() {
    let { courseId } = this.props.location.state;
    // let url = `/api/assignments/course/${courseId}`; //final
    let url = `http://localhost:4000/api/assignments/course/${courseId}`; //dev
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // update assignments array in state
        let assignments = data.data;
        this.setState({
          assignments: assignments
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // handle create assignment form submission
  handleCreateNewAssignment(data) {
    this.addAssignment(data)
      .then(data => {
        console.log(data);
        // Refetch all assignments for this course
        this.getAssignments();
        // Print alert message
        this.setState({
          alertMessage: "Assignment Created Successfully"
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // save assignment to db
  addAssignment(data) {
    // let url = `/api/assignments`; //final
    let url = `http://localhost:4000/api/assignments`; //dev
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .catch(err => {
        console.log(err);
      });
  }

  assignmentListRender() {
    let { assignments } = this.state;
    if (assignments.length !== 0) {
      let assignmentList = assignments.map(assignment => {
        return (
          <div className="card text-center my-2" key={assignment._id}>
            <div className="card-header bg-info text-white">
              {assignment.name}
            </div>
            <div className="card-body">
              <h5 className="card-title">
                Due On: {assignment.dueDate.substring(0, 10)}
              </h5>
              <p className="card-text">
                Click Below to access all Assignment related information and
                Student's submissions
              </p>
              <Link
                to={{
                  pathname: "/instructor/assignments/assignment/",
                  state: {
                    assignment: assignment,
                    assignmentId: assignment._id
                  }
                }}
              >
                <div className="btn btn-primary">View Assignment</div>
              </Link>
            </div>
            <div className="card-footer text-muted bg-info" />
          </div>
        );
      });

      return assignmentList;
    } else {
      return <div>No Assignments Found...</div>;
    }
  }

  render() {
    let { assignments } = this.state;
    // Create assignment form info
    let { courseId, courseCode } = this.props.location.state;
    let assignmentForm = (
      <div className="create-assignment-form">
        <small className="form-text text-success mx-3">
          {this.state.alertMessage}
        </small>
        <CreateAssignmentForm
          courseId={courseId}
          courseCode={courseCode}
          handleAssignmentSubmission={this.handleCreateNewAssignment}
        />
      </div>
    );
    if (assignments.length !== 0) {
      console.log(this.state);
      return (
        <div className="container">
          <h1 className="text-center">Assignments - {courseCode}</h1>
          {assignmentForm}
          <div className="assignment-list">
            <h2 className="text-center my-3">My Assignments</h2>
            {this.assignmentListRender()}
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>Assignments - {courseCode}</h1>
          {assignmentForm}
          <h2>No assignments available</h2>
        </div>
      );
    }
  }
}

export default Assignments;
