import React from "react";

class CourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      error: ""
    };

    this.url = `http://localhost:4000/api/instructor/get/${
      this.props.location.state
    }`;
    this.getCourseList = this.getCourseList.bind(this);
  }

  componentDidMount() {
    this.getCourseList(this.url)
      .then(data => {
        console.log(data);
        this.setState({
          courses: data.data
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: err
        });
      });
  }

  getCourseList(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(err => {
        console.log(err);
        this.setState({
          error: err
        });
      });
  }

  render() {
    console.log(this.props);
    return (
      <div className="container">
        <h1>Hello CourseList</h1>
      </div>
    );
  }
}

export default CourseList;
