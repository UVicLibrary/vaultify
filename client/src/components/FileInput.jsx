import React from 'react';
import ReactDOM from 'react-dom';

class FileInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.triggerInput = this.triggerInput.bind(this);
  }

  handleChange(e) {
    const files = [];
    for (let i = 0; i < e.target.files.length; i++) {
      files.push(e.target.files[i]);
    }

    Promise.all(files.map(file => new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = result => {
        resolve([result, file]);
      };
      reader.readAsText(file);
    })))
    .then(zippedResults => {
      this.props.onChange(e, zippedResults);
    });
  }

  triggerInput(e) {
    ReactDOM.findDOMNode(this.reactFileReaderInput).click();
  }

  render() {
    const hiddenInputStyle = this.props.children ? {
      position: 'absolute',
      top: '-9999px'
    } : {};
    
    return (
      <div onClick={this.triggerInput}>
        <input 
          {...this.props} 
          children={undefined} 
          type="file"
          onChange={this.handleChange} 
          ref={c => this.reactFileReaderInput = c}
          style={hiddenInputStyle} />
        {this.props.children}
      </div>
    )
  }
}

export default FileInput