import React from "react";
import Submissions from "./Submissions";

class Exam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: this.props.location.state.exam,
      dueDate: new Date(this.props.location.state.exam.dueDate)
        .toISOString()
        .substring(0, 10),
      alert: ""
    };

    this.getExam = this.getExam.bind(this);
    this.updateExamDueDate = this.updateExamDueDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getExam();
  }

  // Update Date Btn Clicked
  handleSubmit(e) {
    e.preventDefault();
    let data = {
      dueDate: this.state.dueDate
    };

    this.updateExamDueDate(data);
  }
  // Date Change Input
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  // Get Exam using id from api
  getExam() {
    let examId = this.props.location.state.examId;
    // let url = `/api/exams/${examId}`;// final
    let url = `http://localhost:4000/api/exams/${examId}`; // dev
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        let exam = data.data;
        this.setState({
          exam: exam,
          dueDate: new Date(exam.dueDate).toISOString().substring(0, 10)
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Update exam's due data. Data is dueDate wrapped in object
  updateExamDueDate(data) {
    let examId = this.props.location.state.examId;
    // let url = `/api/exams/${examId}`;// final
    let url = `http://localhost:4000/api/exams/${examId}`; // dev
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({
          alert: "Updated Exam Due Date"
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.props);
    let { exam } = this.props.location.state;
    // Render exam file url if it exists
    let examUrl = exam.examFileUrl ? (
      <a href={exam.examFileUrl} className="text-primary">
        Download exam file
      </a>
    ) : null;

    // Alert message
    let alertMsg = this.state.alert ? (
      <small className="form-text text-success mx-3">{this.state.alert}</small>
    ) : null;

    return (
      <div className="container">
        <h1>{exam.name}</h1>
        <h3 className="text-muted">{exam.course.name}</h3>
        {examUrl}
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
              min={new Date(exam.dueDate).toISOString().substring(0, 10)}
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
          <Submissions examId={this.state.exam._id} />
        </div>
      </div>
    );
  }
}

export default Exam;
