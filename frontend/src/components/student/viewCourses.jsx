import React from 'react'
import Course from './course'
import './viewCourses.css'
import ViewAssignemnts from './viewAssignments'

class ViewCourses extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            selectedCourse:null
        }
    }

    componentDidMount(){
        fetch("http://localhost:4000/api/courses",{
            method: 'GET',
        }).then((response) => {
             response.json().then((body) => {
                if(body.confirmation==="Success"){
                     let availableCourses = body.data.filter(course => {
                        return course.available
                    });
                    this.setState({availableCourses})
                }
            }); 
        });
    }
    
    render(){
        return(
            <div className="container">
                <h2>Courses</h2>
                <div>
                    {this.state.availableCourses && this.state.availableCourses.length > 0 && this.state.availableCourses.map( (course) => {
                        return(
                            <div 
                                className="card cardStyles"
                                key={course._id}
                                 onClick={ () => {
                                        this.setState({ selectedCourse:course })
                                }} 
                            >
                                <Course 
                                    code={course.code} 
                                    name={course.name} 
                                    selectedCourse={course}
                                />
                                {this.state.selectedCourse && this.state.selectedCourse._id === course._id && <ViewAssignemnts  assignments={this.state.selectedCourse.assignments} /> }
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }


}

export default ViewCourses;