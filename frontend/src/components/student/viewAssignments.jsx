import React from 'react'
import Assignment from './assignment'
import SubmissionForm from './submissionForm'

class ViewAssignemnts extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            assignments:null
        }
    }

    componentDidMount(){
        fetch("http://localhost:4000/api/assignments",{
            method: 'GET',
        }).then((response) => {
             response.json().then((body) => {
                body.confirmation==="Success"
                    ? this.setState({assignments:body.data})
                    : console.log("View Assignemnts",body);
            }); 
        });
    }
    
    render(){
        return(
            <div class="container">
                <h2>View Assigments page</h2>
                <div>
                    {this.state.assignments && this.state.assignments.length > 0 && this.state.assignments.map( (ass) => {
                        return(
                            <div class="card"
                                key={ass._id}
                                onClick={() => this.setState({ selectedAssignment:ass })}
                            >
                                <Assignment 
                                    name={ass.name} 
                                    phone={ass.phone} 
                                />
                           </div>
                        )
                    })}
                </div>
                {this.state.selectedAssignment && <SubmissionForm assignment={this.state.selectedAssignment}/>}
            </div>
        )
    }


}

export default ViewAssignemnts;