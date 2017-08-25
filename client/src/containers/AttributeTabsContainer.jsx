import React, { Component } from 'react';
import { connect } from 'react-redux';
import AttributeTabs from '../components/AttributeTabs'

import {
  updateAdjusted
} from '../actions/actions'

class AttributeTabsContainer extends Component {
  render() {
    return <AttributeTabs {...this.props} />
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  const { dynamicAttributes, flatAttributes } = state;
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
    genre 
  } = dynamicAttributes;
  const { title, object_type } = flatAttributes;
 
  return {
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update: (attribute, row, value) => {dispatch(updateAdjusted(attribute, row, value))},
    updateAll: (attribute, rows, value) => {
      rows.forEach(row => {
        dispatch(updateAdjusted(attribute, row, value))
      });
    }    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttributeTabsContainer);
