import React from "react";

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      read: this.props.notification.read
    };

    this.updateNotification = this.updateNotification.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.updateNotification();
  }

  updateNotification() {
    let { notification } = this.props;
    let data = {
      read: true
    };
    let url = `http://localhost:4000/api/notifications/${notification._id}`;
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          read: true
        });
      })
      .catch(err => {
        console.log(data);
      });
  }
  render() {
    let { notification } = this.props;
    let notificationStyle = this.state.read
      ? "card-header"
      : "card-header bg-success";
    let btnStyle = this.state.read ? "btn btn-secondary" : "btn btn-primary";
    return (
      <div className="card my-2">
        <h5 className={notificationStyle}>{notification.title}</h5>
        <div className="card-body">
          <h5 className="card-title">{notification.message}</h5>
          <p className="card-text">
            Posted On:
            {new Date(notification.date).toISOString().substring(0, 10)}
          </p>
          <button onClick={this.handleClick} href="#" className={btnStyle}>
            Mark As Read
          </button>
        </div>
      </div>
    );
  }
}

export default Notification;
