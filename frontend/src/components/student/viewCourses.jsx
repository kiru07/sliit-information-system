import React from 'react'
import Course from './course'
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
                body.confirmation==="Success"
                    ? this.setState({courses:body.data})
                    : console.log("View Assignemnts",body);
            }); 
        });
    }
    
    render(){
        return(
            <div class="container">
                <h2>View Courses page</h2>
                <div>
                    {this.state.courses && this.state.courses.length > 0 && this.state.courses.map( (course) => {
                        return(
                            <div 
                                class="card"
                                key={course._id}
                                onClick={ () => {
                                        this.setState({ selectedCourse:course })
                                }}
                            >
                                <Course 
                                    code={course.code} 
                                    name={course.name} 
                                    
                                />
                            </div>
                        )
                    })}
                </div>
                {this.state.selectedCourse && <ViewAssignemnts selectedCourse={this.state.selectedCourse}/> }
            </div>
        )
    }


}

export default ViewCourses;