import React, { Component } from 'react';
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types';

const propTypes = {
  onAdd: PropTypes.func.isRequired,
  startValue: PropTypes.string.isRequired,
}

const defaultProps = {
  startValue: '',
}

class EdtfEntry extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentValue: props.startValue,
    }
   
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleUpdateInput(event, currentValue) {
    this.setState({
      currentValue: currentValue,
    })
  }
  
  handleKeyPress(event) {
    if (event.charCode === 13) {
      this.handleNewRequest()
    }
  }

  handleNewRequest() {
    const { onAdd } = this.props;
    const { currentValue } = this.state;
    onAdd(currentValue);
    this.handleUpdateInput(null, "");
  }

  render() {
    const { currentValue } = this.state;
    return (
      <TextField
        id='autocomplete'
        value={currentValue}
        onChange={this.handleUpdateInput}
        onKeyPress={this.handleKeyPress}
        fullWidth={true}
      />
    );
  }
}

EdtfEntry.propTypes = propTypes;
EdtfEntry.defaultProps = defaultProps;
export default EdtfEntry;