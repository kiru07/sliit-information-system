import React from "react";
import Submissions from "./Submissions";

class Assignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignment: this.props.location.state.assignment,
      dueDate: new Date(this.props.location.state.assignment.dueDate)
        .toISOString()
        .substring(0, 10),
      alert: ""
    };

    this.getAssignment = this.getAssignment.bind(this);
    this.updateAssignmentDueDate = this.updateAssignmentDueDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getAssignment();
  }

  // Update Date Btn Clicked
  handleSubmit(e) {
    e.preventDefault();
    let data = {
      dueDate: this.state.dueDate
    };

    this.updateAssignmentDueDate(data);
  }
  // Date Change Input
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  // Get Assignment using id from api
  getAssignment() {
    let assignmentId = this.props.location.state.assignmentId;
    // let url = `/api/assignments/${assignmentId}`;// final
    let url = `http://localhost:4000/api/assignments/${assignmentId}`; // dev
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        let assignment = data.data;
        this.setState({
          assignment: assignment,
          dueDate: new Date(assignment.dueDate).toISOString().substring(0, 10)
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Update assignment's due data. Data is dueDate wrapped in object
  updateAssignmentDueDate(data) {
    let assignmentId = this.props.location.state.assignmentId;
    // let url = `/api/assignments/${assignmentId}`;// final
    let url = `http://localhost:4000/api/assignments/${assignmentId}`; // dev
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({
          alert: "Updated Assignment Due Date"
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.props);
    let { assignment } = this.props.location.state;
    // Render assignment file url if it exists
    let assignmentUrl = assignment.assignmentFileUrl ? (
      <a href={assignment.assignmentFileUrl} className="text-primary">
        Download assignment file
      </a>
    ) : null;

    // Alert message
    let alertMsg = this.state.alert ? (
      <small className="form-text text-success mx-3">{this.state.alert}</small>
    ) : null;

    return (
      <div className="container">
        <h1>{assignment.name}</h1>
        <h3 className="text-muted">{assignment.course.name}</h3>
        {assignmentUrl}
        {alertMsg}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label forname="dueDate">Due Date</label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              placeholder="Due Date"
              name="dueDate"
              value={this.state.dueDate}
              min={new Date(assignment.dueDate).toISOString().substring(0, 10)}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Due Date
          </button>
        </form>
        <div className="submissions my-4">
          <h2>Submissions</h2>
          <Submissions assignmentId={this.state.assignment._id} />
        </div>
      </div>
    );
  }
}

export default Assignment;
