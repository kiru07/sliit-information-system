import React from 'react';
import './fileUpload.css'
class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', this.fileName.value);
    data.append('regNumber', "IT0001234567");//Hardcoded for now
    //data.append('assignmentId', "Ass_123");//Hardcoded for now
    data.append('fileUrl', 'public/'+this.fileName.value+'.pdf');//Hardcoded for now
    data.append('dateSubmitted', new Date());//Hardcoded for now
    fetch('http://localhost:4000/api/submissions', {
      method: 'POST',
      body: data,
    }).then((response) => {
/*       response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:4000/${body.file}` });
      }); */
    });
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input 
            className="fileInput"
            ref={(ref) => { this.uploadInput = ref; }} 
            type="file"
            accept="image/png, image/jpg, .doc,.docx, .pdf, " 
          />
        </div>
        <div>
          <input 
            className="assignmentId" 
            ref={(ref) => { this.fileName = ref; }} 
            type="text" 
            placeholder="Enter the assigment/exam id" 
          />
        </div>
        <br />
        <div>
          <button className="button">Upload</button>
        </div>
        {/* <img src={this.state.imageURL} alt="img" /> */}
      </form>
    );
  }
}

export default FileUpload;
