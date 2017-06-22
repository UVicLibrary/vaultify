import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete'
import PropTypes from 'prop-types';
import { iso } from '../constants/data';
import { has } from '../utils/utilityFunctions';

const isoMap = {}
const isoDataSource = []
iso.forEach(element => {
    const label = element.English + ' (' + element['alpha3-b'] + ')';
    isoDataSource.push(label)
    isoMap[label] = element['alpha3-b'] 
})


const propTypes = {
  onAdd: PropTypes.func.isRequired,
  startValue: PropTypes.string.isRequired,
}

const defaultProps = {
  startValue: '',
}
class LanguageEntry extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentValue: props.startValue,
    }
   
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
  }

  handleUpdateInput(currentValue) {
    this.setState({
      currentValue: currentValue,
    })
  }

  handleNewRequest() {
    const { onAdd } = this.props;
    const { currentValue } = this.state;
    let newValue;
    if (has.call(isoMap, currentValue)) {
      newValue = isoMap[currentValue];
    } else {
      newValue = currentValue;
    }
    onAdd(newValue);
    this.setState({
        currentValue: '',
    })
  }
  

  render() {
    const { currentValue } = this.state;
    return (
      <AutoComplete
        id='autocomplete'
        searchText={currentValue}
        onUpdateInput={this.handleUpdateInput}
        onNewRequest={this.handleNewRequest}
        filter={AutoComplete.fuzzyFilter}
        dataSource={isoDataSource}
        maxSearchResults={5}
        fullWidth={true}
      />
    );
  }
}

LanguageEntry.propTypes = propTypes;
LanguageEntry.defaultProps = defaultProps;
export default LanguageEntry;