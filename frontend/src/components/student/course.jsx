import React from 'react'

const Course = ({code, name, selectedCourse}) =>{
        return(
            <div>
                <div className="card-header">{code} - {name}</div>
                <div 
                    className="card-body">View Assignmts</div>
                <div className="card-footer">Footer</div>
               
            </div>
        )
}

export default Course;