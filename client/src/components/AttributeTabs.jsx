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
      object_type,
      update,
      updateAll,
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
            object_type = {object_type}
            onApply = {(row, value) => update('creator', row, value)}
            onApplyAll = {(rows, value) => updateAll('creator', rows, value)}
            attribute = "Creator"
            category = {DialogCategories.FAST}
            showPages = {this.props.showPages}
          />
        </div>
        </Tab>

        <Tab label="contributor" >
        <div>
          <ValueGrid
            titles = {title}
            data = {contributor}
            object_type = {object_type}
            onApply = {(row, value) => update('contributor', row, value)}
            onApplyAll = {(rows, value) => updateAll('contributor', rows, value)} 
            attribute = "Contributor"
            category = {DialogCategories.FAST}
            showPages = {this.props.showPages}
          />
        </div>
        </Tab>

        <Tab label="subject">
        <div>
          <ValueGrid
            titles = {title}
            data = {subject}
            object_type = {object_type}
            onApply = {(row, value) => update('subject', row, value)}
            onApplyAll = {(rows, value) => updateAll('subject', rows, value)}
            attribute = "Subject"
            category = {DialogCategories.FAST}
            showPages = {this.props.showPages}
          />         
        </div>
        </Tab>

        <Tab label="geographic">
        <div>
          <ValueGrid
            titles = {title}
            data = {geographic_coverage}
            object_type = {object_type}
            onApply = {(row, value) => update('geographic_coverage', row, value)}
            onApplyAll = {(rows, value) => updateAll('geographic_coverage', rows, value)}
            attribute = "Geographic Coverage"
            category = {DialogCategories.FAST}
            showPages = {this.props.showPages}
          /> 
        </div>
        </Tab>

        <Tab label="date_created">
        <div>
          <ValueGrid
            titles = {title}
            data = {date_created}
            object_type = {object_type}
            onApply = {(row, value) => update('date_created', row, value)}
            onApplyAll = {(rows, value) => updateAll('date_created', rows, value)}
            attribute = "Date Created"
            category = {DialogCategories.EDTF}
            showPages = {this.props.showPages}
          /> 
        </div>
        </Tab>

        <Tab label="chronological">
        <div>
          <ValueGrid
            titles = {title}
            data = {chronological_coverage}
            object_type = {object_type}
            onApply = {(row, value) => update('chronological_coverage', row, value)}
            onApplyAll = {(rows, value) => updateAll('chronological_coverage', rows, value)}
            attribute = "Chronological Coverage"
            category = {DialogCategories.EDTF}
            showPages = {this.props.showPages}
          /> 
        </div>
        </Tab>

        <Tab label="date_digitized">
        <div>
          <ValueGrid
            titles = {title}
            data = {date_digitized}
            object_type = {object_type}
            onApply = {(row, value) => update('date_digitized', row, value)}
            onApplyAll = {(rows, value) => updateAll('date_digitized', rows, value)}
            attribute = "Date Digitized"
            category = {DialogCategories.EDTF}
            showPages = {this.props.showPages}
          /> 
        </div>
        </Tab>

        <Tab label="language">
        <div>
          <ValueGrid
            titles = {title}
            data = {language}
            object_type = {object_type}
            onApply = {(row, value) => update('language', row, value)}
            onApplyAll = {(rows, value) => updateAll('language', rows, value)}
            attribute = "Language"
            category = {DialogCategories.LANGUAGE}
            showPages = {this.props.showPages}
          /> 
        </div>
        </Tab>

        <Tab label="type">
        <div>
          <ValueGrid
            titles = {title}
            data = {resource_type}
            object_type = {object_type}
            onApply = {(row, value) => update('resource_type', row, value)}
            onApplyAll = {(rows, value) => update('resource_type', rows, value)}
            attribute = "Type"
            category = {DialogCategories.TYPE}
            showPages = {this.props.showPages}
          /> 
        </div>
        </Tab>
        
        <Tab label="genre">
        <div>
          <ValueGrid
            titles = {title}
            data = {genre}
            object_type = {object_type}
            onApply = {(row, value) => update('genre', row, value)}
            onApplyAll = {(rows, value) => updateAll('genre', rows, value)}
            attribute = "Genre"
            category = {DialogCategories.GENRE}
            showPages = {this.props.showPages}
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
