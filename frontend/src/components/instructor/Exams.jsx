import React from "react";
import CreateExamForm from "./CreateExamForm";
import { Link } from "react-router-dom";

class Exams extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      exams: [],
      alertMessage: ""
    };

    this.getExams = this.getExams.bind(this);
    this.handleCreateNewExam = this.handleCreateNewExam.bind(this);
    this.addExam = this.addExam.bind(this);
    this.examListRender = this.examListRender.bind(this);
  }

  componentDidMount() {
    this.getExams();
  }

  // get all exams of this course
  getExams() {
    let { courseId } = this.props.location.state;
    // let url = `/api/exams/course/${courseId}`; //final
    let url = `http://localhost:4000/api/exams/course/${courseId}`; //dev
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // update exams array in state
        let exams = data.data;
        this.setState({
          exams: exams
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // handle create exam form submission
  handleCreateNewExam(data) {
    this.addExam(data)
      .then(data => {
        console.log(data);
        // Refetch all exams for this course
        this.getExams();
        // Print alert message
        this.setState({
          alertMessage: "Exam Created Successfully"
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // save exam to db
  addExam(data) {
    // let url = `/api/exams`; //final
    let url = `http://localhost:4000/api/exams`; //dev
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

  examListRender() {
    let { exams } = this.state;
    if (exams.length !== 0) {
      let examList = exams.map(exam => {
        return (
          <div className="card text-center my-2" key={exam._id}>
            <div className="card-header bg-info text-white">{exam.name}</div>
            <div className="card-body">
              <h5 className="card-title">
                Due On: {exam.dueDate.substring(0, 10)}
              </h5>
              <p className="card-text">
                Click Below to access all Exam related information and Student's
                submissions
              </p>
              <Link
                to={{
                  pathname: "/instructor/exams/exam/",
                  state: {
                    exam: exam,
                    examId: exam._id
                  }
                }}
              >
                <div className="btn btn-primary">View Exam</div>
              </Link>
            </div>
            <div className="card-footer text-muted bg-info" />
          </div>
        );
      });

      return examList;
    } else {
      return <div>No Exams Found...</div>;
    }
  }

  render() {
    let { exams } = this.state;
    // Create exam form info
    let { courseId, courseCode } = this.props.location.state;
    let examForm = (
      <div className="create-exam-form">
        <small className="form-text text-success mx-3">
          {this.state.alertMessage}
        </small>
        <CreateExamForm
          courseId={courseId}
          courseCode={courseCode}
          handleExamSubmission={this.handleCreateNewExam}
        />
      </div>
    );
    if (exams.length !== 0) {
      console.log(this.state);
      return (
        <div className="container">
          <h1 className="text-center">Exams - {courseCode}</h1>
          {examForm}
          <div className="exam-list">
            <h2 className="text-center my-3">My Exams</h2>
            {this.examListRender()}
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>Exams - {courseCode}</h1>
          {examForm}
          <h2>No exams available</h2>
        </div>
      );
    }
  }
}

export default Exams;
