import React, { Component } from 'react';
import { connect } from 'react-redux'
import Banner from '../components/Banner.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import FileInput from '../components/FileInput.jsx';
import { parse } from 'papaparse';
import {
  updateOriginal,
  updateFlat,
  updateHeaders,
} from '../actions/actions'

const style = {
  margin: 12, 
}

class Upload extends Component {
  constructor(props){
      super(props);
      this.texts = []
  }


  render() {
    return (
      <div>
        <Banner 
          onClick={() => this.props.history.push('translate')}
        />
        <div className='Button-body'>
          <form >
            <FileInput as='text' onChange={this.props.onChange} >
              <RaisedButton 
                label="Select File" 
                primary={true} 
                style={style} 
              />
            </FileInput>
          </form>  
        </div>     
      </div>
    );
  }
}

function onChange(proxy, results, dispatch) {
  const fileData = results[0][0].target.result
  //const { data, errors, meta } = parse(fileData);
  const { data } = parse(fileData);
  const headers = data[0]
  dispatch(updateHeaders(headers));
  data.shift()
  const attributes = [
    'creator',
    'contributor',
    'subject',
    'geographic_coverage',
    'date_created',
    'chronological_coverage',
    'date_digitized',
    'language',
    'resource_type',
    'genre',
  ]
  const flatAttributes = headers.filter((header) => {
    return attributes.indexOf(header) < 0;
  })
  let attributeColumns = {};
  headers.forEach((attribute) => {
    attributeColumns[attribute] = headers.indexOf(attribute)
  });
  
  data.forEach((fileLineArray, row) => {
    if (fileLineArray.length !== headers.length){
      return
    }
    attributes.forEach((attribute) => {
      const cellValues = fileLineArray[attributeColumns[attribute]].split(';');
      dispatch(updateOriginal(attribute, row, cellValues))
    })
    flatAttributes.forEach((attribute) => {
      const cellValue = fileLineArray[attributeColumns[attribute]].split(';');
      dispatch(updateFlat(attribute, row, cellValue))
    })
  });

} 

const mapStateToProps = (state) => {
  return {}
}


const mapDispatchToProps = (dispatch) => ({
  onChange: (proxy, results) => onChange(proxy, results, dispatch) 
})


export default connect(mapStateToProps, mapDispatchToProps)(Upload);