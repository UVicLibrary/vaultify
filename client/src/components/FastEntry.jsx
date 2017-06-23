import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete'
import PropTypes from 'prop-types';

const propTypes = {
  onAdd: PropTypes.func.isRequired,
  startValue: PropTypes.string.isRequired,
}

const defaultProps = {
  startValue: '',
}
class FastEntry extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentValue: props.startValue,
      dataSource: [],
    }
   
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.updateDataSource = this.updateDataSource.bind(this);
  }

  handleUpdateInput(currentValue) {
    this.setState({
      currentValue: currentValue,
    })
    this.updateDataSource(currentValue)
  }

  handleNewRequest() {
    const { onAdd } = this.props;
    const { currentValue } = this.state;
    onAdd(currentValue);
    this.handleUpdateInput('');
  }

  updateDataSource(searchText) {
    if (searchText === "") {
      return
    }
    const route = '/fast/suggestall/' + searchText;
    fetch(route)
      .then(res => res.json())
      .then(json => {
        this.setState({
          dataSource: json.names
        })
      })
      .catch(err => {
        console.error(err.stack)
      })
  } 

  render() {
    const { currentValue, dataSource } = this.state;
    return (
      <AutoComplete
        id='autocomplete'
        searchText={currentValue}
        onUpdateInput={this.handleUpdateInput}
        onNewRequest={this.handleNewRequest}
        filter={AutoComplete.noFilter}
        dataSource={dataSource}
        maxSearchResults={5}
        fullWidth={true}
      />
    );
  }
}

FastEntry.propTypes = propTypes;
FastEntry.defaultProps = defaultProps;
export default FastEntry;