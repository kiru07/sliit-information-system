import React from "react";
import Notification from "./Notification";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    };

    this.getAllNotifications = this.getAllNotifications.bind(this);
  }

  componentDidMount() {
    this.getAllNotifications();
  }

  getAllNotifications() {
    let { instructorId, studentId } = this.props.location.state;
    let url = "";
    url = instructorId
      ? `http://localhost:4000/api/notifications/instructor/${instructorId}`
      : `http://localhost:4000/api/notifications/instructor/${studentId}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        let notifications = data.data;
        this.setState({
          notifications: notifications
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let { notifications } = this.state;
    if (notifications.length !== 0) {
      return (
        <div className="container">
          <h1 className="text-center">Notifications</h1>
          <div>
            {notifications.map(notification => {
              return (
                <Notification
                  key={notification._id}
                  notification={notification}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>You have no notifications</h2>
        </div>
      );
    }
  }
}

export default Notifications;
