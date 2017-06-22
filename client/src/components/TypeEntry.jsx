import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete'
import PropTypes from 'prop-types';
import { dcmi } from '../constants/data';


const propTypes = {
  onAdd: PropTypes.func.isRequired,
  startValue: PropTypes.string.isRequired,
}

const defaultProps = {
  startValue: '',
}
class TypeEntry extends Component {
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
    onAdd(currentValue);
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
        dataSource={dcmi}
        maxSearchResults={5}
        fullWidth={true}
      />
    );
  }
}

TypeEntry.propTypes = propTypes;
TypeEntry.defaultProps = defaultProps;
export default TypeEntry;