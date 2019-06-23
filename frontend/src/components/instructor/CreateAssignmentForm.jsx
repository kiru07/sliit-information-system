import React from "react";

class CreateAssignmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      assignmentFileUrl: "",
      dueDate: ""
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

    let { name, assignmentFileUrl, dueDate } = this.state;
    let courseId = this.props.courseId;
    let data = {
      name: name,
      assignmentFileUrl: assignmentFileUrl,
      dueDate: dueDate,
      course: courseId
    };

    //Submit file if present
    let file = this.fileInput.current.files[0];
    // console.log(file);
    if (file) {
      this.submitFile(file)
        .then(data => {
          console.log(data);
          let assignmentFileUrl = data.data;
          this.setState({
            assignmentFileUrl: assignmentFileUrl
          });
          let saveData = {
            name: name,
            assignmentFileUrl: assignmentFileUrl,
            dueDate: dueDate,
            course: courseId
          };
          //then save to mongodb
          this.props.handleAssignmentSubmission(saveData);
          // clear all fields
          this.clearFields();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      // If No file submitted just save assignment details
      this.props.handleAssignmentSubmission(data);
      // clear all fields
      this.clearFields();
    }
  }

  submitFile(file) {
    let assignmentName = this.state.name;
    let { courseCode } = this.props;
    // let url = '/api/assignments/file'; // actual
    let url = "http://localhost:4000/api/assignments/file"; // dev
    const formData = new FormData(); // takes key-value pairs
    formData.append("assignmentFile", file); // req.files
    formData.append("courseCode", courseCode); // req.body
    formData.append("assignmentName", assignmentName); //req.body

    return fetch(url, {
      method: "POST",
      body: formData
    }).then(response => response.json());
  }

  clearFields() {
    this.setState({
      name: "",
      assignmentFileUrl: "",
      dueDate: ""
    });
    if (this.fileInput.current.files[0]) {
      this.fileInput.current.files[0].value = null;
    }
  }

  render() {
    return (
      <div className="container">
        <h3>Create New Assignment</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label forname="assignmentName">Assignment Name</label>
            <input
              type="text"
              className="form-control"
              id="assignmentName"
              name="name"
              value={this.state.name}
              placeholder="Enter Assignment Name"
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
            <div className="form-group">
              <label forname="assignmentFile">Assignment File:</label>
              <input
                type="file"
                className="form-control-file"
                id="assignmentFile"
                name="assignmentFileUrl"
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

export default CreateAssignmentForm;
