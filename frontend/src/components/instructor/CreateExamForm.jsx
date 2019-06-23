import React from "react";

class CreateExamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      examFileUrl: "",
      dueDate: "",
      examLink: ""
    };

    // file
    this.fileInput = React.createRef();

    //courseId is from props

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitFile = this.submitFile.bind(this);
    this.clearFields = this.clearFields.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let { name, examFileUrl, dueDate, examLink } = this.state;
    let courseId = this.props.courseId;
    let data = {
      name: name,
      examFileUrl: examFileUrl,
      dueDate: dueDate,
      course: courseId,
      examLink: examLink
    };

    //Submit file if present
    let file = this.fileInput.current.files[0];
    // console.log(file);
    if (file) {
      this.submitFile(file)
        .then(data => {
          console.log(data);
          let examFileUrl = data.data;
          this.setState({
            examFileUrl: examFileUrl
          });
          let saveData = {
            name: name,
            examFileUrl: examFileUrl,
            dueDate: dueDate,
            course: courseId,
            examLink: examLink
          };
          //then save to mongodb
          this.props.handleExamSubmission(saveData);
          // clear all fields
          this.clearFields();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // If No file submitted just save assignment details
      this.props.handleExamSubmission(data);
      // clear all fields
      this.clearFields();
    }
  }

  submitFile(file) {
    let examName = this.state.name;
    let { courseCode } = this.props;
    // let url = '/api/exams/file'; // actual
    let url = "http://localhost:4000/api/exams/file"; // dev
    const formData = new FormData(); // takes key-value pairs
    formData.append("examFile", file); // req.files
    formData.append("courseCode", courseCode); // req.body
    formData.append("examName", examName); //req.body

    return fetch(url, {
      method: "POST",
      body: formData
    }).then(response => response.json());
  }

  clearFields() {
    this.setState({
      name: "",
      examFileUrl: "",
      dueDate: "",
      examLink: ""
    });
    if (this.fileInput.current.files[0]) {
      this.fileInput.current.files[0].value = null;
    }
  }

  render() {
    return (
      <div className="container">
        <h3>Create New Exam</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label forname="examName">Exam Name</label>
            <input
              type="text"
              className="form-control"
              id="examName"
              name="name"
              value={this.state.name}
              placeholder="Enter Exam Name"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label forname="dueDate">Due Date</label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              placeholder="Due Date"
              name="dueDate"
              value={this.state.dueDate}
              min={new Date().toISOString().substring(0, 10)}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label forname="examLink">Exam Link</label>
            <input
              type="text"
              className="form-control"
              id="examLink"
              name="examLink"
              value={this.state.examLink}
              placeholder="Enter Exam Link"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <div className="form-group">
              <label forname="examFile">Exam File:</label>
              <input
                type="file"
                className="form-control-file"
                id="examFile"
                name="examFileUrl"
                accept=".pdf,.doc,.docx,.ppt,.zip,.rar"
                ref={this.fileInput}
              />
            </div>
            <small id="emailHelp" className="form-text text-muted">
              Leave Empty if no file is necessary.
            </small>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreateExamForm;
