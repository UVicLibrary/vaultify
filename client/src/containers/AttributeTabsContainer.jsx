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
  const { title } = flatAttributes;
 
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
  }
}

const mapDispatchToProps = (dispatch) => ({
  update: (attribute, row, value) => {dispatch(updateAdjusted(attribute, row, value))},    
})

export default connect(mapStateToProps, mapDispatchToProps)(AttributeTabsContainer);
