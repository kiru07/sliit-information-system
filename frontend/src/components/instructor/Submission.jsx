import React from "react";

class Submission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marks: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let { submission } = this.props;
    if (submission.marks) {
      console.log(submission.marks);
      this.setState({
        marks: submission.marks
      });
    }
  }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let submissionId = this.props.submission._id;
    this.props.onSubmit(submissionId, this.state.marks);
  }
  render() {
    let { submission } = this.props;
    return (
      <tr key={submission._id}>
        <th scope="row">{submission.studentId.regNumber}</th>
        <td>
          <a href={submission.fileUrl}>Download Submission File</a>
        </td>
        <td>
          {new Date(submission.dateSubmitted).toISOString().substring(0, 10)}
        </td>
        <td colSpan="2">
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <label className="sr-only" forname="marks">
              Marks
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={this.state.marks}
              className="form-control mb-2 mr-sm-2"
              id="marks"
              name="marks"
              placeholder="Marks"
              onChange={this.handleChange}
            />
            <button type="submit" className="btn btn-primary mb-2">
              Save Marks
            </button>
          </form>
        </td>
      </tr>
    );
  }
}

export default Submission;
