import React, { Component } from 'react';
import { connect } from 'react-redux'
import Banner from '../components/Banner.jsx';
import RaisedButton from 'material-ui/RaisedButton';
import fileDownload from 'react-file-download';
import * as dynamicAttributeNames from '../constants/DynamicAttributes';
import { has } from '../utils/utilityFunctions';
import { unparse } from 'papaparse';

const style = {
  margin: 12, 
}

class Export extends Component {
  constructor(props){
    super(props);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleDownload() {
    const { csvString } = this.props;
    fileDownload(csvString, 'download.csv')
  }


  render() {  
    return (
      <div>
        <Banner />
        <div className='Button-body'>
          <RaisedButton 
            label="Download" 
            primary={true} 
            style={style} 
            onTouchTap={this.handleDownload}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { dynamicAttributes, flatAttributes, headers } = state;
  const data = dynamicAttributes[dynamicAttributeNames.creator].map((dummy, index) => {
    const dataRow = headers.map(header => {

      if (has.call(dynamicAttributes, header)) {
        return dynamicAttributes[header][index].adjusted.join('|');
      } else {
        return flatAttributes[header][index].join('|');
      }
    });
    return dataRow;
  });
  const csvString = unparse({
    fields: headers,
    data: data,
  }, {
    quotes: true,
  })
  return {
    csvString: csvString,
  }
}

const mapDispatchToProps = (dispatch) => ({
})




export default connect(mapStateToProps, mapDispatchToProps)(Export);