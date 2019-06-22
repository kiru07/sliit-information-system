import React from 'react'
import Assignment from './assignment'
import SubmissionForm from './submissionForm'
import './viewAssignments.css'


class ViewAssignemnts extends React.PureComponent{
    constructor(props){
        super(props);
        this.state={
            assignments:null
        }
    }

    componentDidMount(){

  /*       fetch("http://localhost:4000/api/assignments",{
            method: 'GET',
        }).then((response) => {
             response.json().then((body) => {
                body.confirmation==="Success"
                    ? this.setState({assignments:body.data})
                    : console.log("View Assignemnts",body);
            }); 
        }); */
    }
    
    render(){
        return(
            <div className="container">
             
                <div>
                    {this.props.assignments && this.props.assignments.length > 0 ? this.props.assignments.map( (ass) => {
                        return(
                            <div className="card cardStyles"
                                key={ass._id}
                                onClick={() => this.setState({ selectedAssignment:ass })}
                            >
                                <Assignment 
                                    name={ass.name} 
                                    phone={ass.phone} 
                                />
                {this.state.selectedAssignment && this.state.selectedAssignment._id === ass._id &&  <SubmissionForm assignment={this.state.selectedAssignment}/>}

                           </div>
                        )
                    }) 
                    : <div class="card">No assignments to display</div>
                }
                </div>
            </div>
        )
    }


}

export default ViewAssignemnts;