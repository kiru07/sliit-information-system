import React from "react";
import Submission from "./Submission";

class Submissions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
      alert: ""
    };

    this.getAllSubmissions = this.getAllSubmissions.bind(this);
    this.updateSubmissionMarks = this.updateSubmissionMarks.bind(this);
    this.submissionsTableRender = this.submissionsTableRender.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getAllSubmissions();
  }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(submissionId, marks) {
    console.log(marks);
    let data = {
      marks: marks
    };
    // Update Submission marks
    this.updateSubmissionMarks(submissionId, data);
  }

  getAllSubmissions() {
    let { assignmentId } = this.props;
    let { examId } = this.props;
    // let url = `/api/submissions/assignment/${assignmentId}`; // final
    // let url = `/api/submissions/exam/${examID}`; // final
    let url = "";
    if (assignmentId) {
      url = `http://localhost:4000/api/submissions/assignment/${assignmentId}`; // dev
    } else if (examId) {
      url = `http://localhost:4000/api/submissions/exam/${examId}`; // dev
    } else {
      console.log("Provide examId OR assignmentId");
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let submissions = data.data;
        this.setState({
          submissions: submissions
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateSubmissionMarks(submissionId, data) {
    // let url = `/api/submissions/${submissionId}`// final
    let url = `http://localhost:4000/api/submissions/${submissionId}`; // final

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          alert: "Marks Saved Successfully"
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  submissionsTableRender() {
    let { submissions } = this.state;
    if (submissions.length !== 0) {
      return submissions.map(submission => {
        return (
          <Submission
            key={submission._id}
            submission={submission}
            onSubmit={this.handleSubmit}
          />
        );
      });
    } else {
      return (
        <tr>
          <td colSpan="4">No Submissions Available</td>
        </tr>
      );
    }
  }

  render() {
    // Alert message
    let alertMsg = this.state.alert ? (
      <small className="form-text text-success mx-3 my-2">
        {this.state.alert}
      </small>
    ) : null;
    // Submissions table
    return (
      <div>
        {alertMsg}
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Student ID</th>
              <th scope="col">Submission File</th>
              <th scope="col">Date Submitted</th>
              <th scope="col">Marks</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{this.submissionsTableRender()}</tbody>
        </table>
      </div>
    );
  }
}

export default Submissions;
