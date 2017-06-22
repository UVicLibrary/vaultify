import React, { Component } from 'react';
import { Tab, Tabs } from 'material-ui/Tabs';
import ValueGrid from './ValueGrid.jsx';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import * as DialogCategories from '../constants/DialogCategories';

const propTypes = {
    creator: PropTypes.array.isRequired,
    contributor: PropTypes.array.isRequired,
    subject: PropTypes.array.isRequired,
    geographic_coverage: PropTypes.array.isRequired,
    date_created: PropTypes.array.isRequired,
    chronological_coverage: PropTypes.array.isRequired,
    date_digitized: PropTypes.array.isRequired,
    language: PropTypes.array.isRequired,
    resource_type: PropTypes.array.isRequired,
    genre: PropTypes.array.isRequired,
    title: PropTypes.array.isRequired,
    update: PropTypes.func.isRequired,  
}

class AttributeTabs extends Component {
  componentWillReceiveProps(nextProps) {
      this.setState({
        state: nextProps.state
      })
  } 

  render() {
    const { 
      creator, 
      contributor, 
      subject, 
      geographic_coverage, 
      date_created, 
      chronological_coverage,
      date_digitized,
      language, 
      resource_type, 
      genre,
      title,
      update,
    } = this.props
    return (
      <Paper
        zDepth={1}
      >
      <Tabs>
        <Tab label="creator" >
        <div>
          <ValueGrid
            titles = {title}
            data = {creator}
            onApply = {(row, value) => update('creator', row, value)}
            //onApplyAll = {this.props.updateAllCreator}
            attribute = "Creator"
            category = {DialogCategories.FAST}
          />
        </div>
        </Tab>

        <Tab label="contributor" >
        <div>
          <ValueGrid
            titles = {title}
            data = {contributor}
            onApply = {(row, value) => update('contributor', row, value)}
            //onApplyAll = {this.updateAllCreator}
            attribute = "Contributor"
            category = {DialogCategories.FAST}
          />
        </div>
        </Tab>

        <Tab label="subject">
        <div>
          <ValueGrid
            titles = {title}
            data = {subject}
            onApply = {(row, value) => update('subject', row, value)}
            //onApplyAll = {this.updateAllSubject}
            attribute = "Subject"
            category = {DialogCategories.FAST}
          />         
        </div>
        </Tab>

        <Tab label="geographic">
        <div>
          <ValueGrid
            titles = {title}
            data = {geographic_coverage}
            onApply = {(row, value) => update('geographic_coverage', row, value)}
            //onApplyAll = {this.updateAllGeographicCoverage}
            attribute = "Geographic Coverage"
            category = {DialogCategories.FAST}
          /> 
        </div>
        </Tab>

        <Tab label="date_created">
        <div>
          <ValueGrid
            titles = {title}
            data = {date_created}
            onApply = {(row, value) => update('date_created', row, value)}
            //onApplyAll = {this.updateAllDateCreated}
            attribute = "Date Created"
            category = {DialogCategories.EDTF}
          /> 
        </div>
        </Tab>
        

        <Tab label="chronological">
        <div>
          <ValueGrid
            titles = {title}
            data = {chronological_coverage}
            onApply = {(row, value) => update('chronological_coverage', row, value)}
            //onApplyAll = {this.updateAllChronologicalCoverage}
            attribute = "Chronological Coverage"
            category = {DialogCategories.EDTF}
          /> 
        </div>
        </Tab>

        <Tab label="date_digitized">
        <div>
          <ValueGrid
            titles = {title}
            data = {date_digitized}
            onApply = {(row, value) => update('date_digitized', row, value)}
            //onApplyAll = {this.updateAllDateDigitized}
            attribute = "Date Digitized"
            category = {DialogCategories.EDTF}
          /> 
        </div>
        </Tab>

        <Tab label="language">
        <div>
          <ValueGrid
            titles = {title}
            data = {language}
            onApply = {(row, value) => update('language', row, value)}
            //onApplyAll = {this.updateAllLanguage}
            attribute = "Language"
            category = {DialogCategories.LANGUAGE}
          /> 
        </div>
        </Tab>

        <Tab label="type">
        <div>
          <ValueGrid
            titles = {title}
            data = {resource_type}
            onApply = {(row, value) => update('resource_type', row, value)}
            //onApplyAll = {this.updateAllType}
            attribute = "Type"
            category = {DialogCategories.TYPE}
          /> 
        </div>
        </Tab>
        
        <Tab label="genre">
        <div>
          <ValueGrid
            titles = {title}
            data = {genre}
            onApply = {(row, value) => update('genre', row, value)}
            //onApplyAll = {(row, value) => this.updateAllGenre}
            attribute = "Genre"
            category = {DialogCategories.EDTF}
          /> 
        </div>
        </Tab>       
      </Tabs>
      </Paper>
    );
  }
}

AttributeTabs.PropTypes = propTypes;

export default AttributeTabs;
