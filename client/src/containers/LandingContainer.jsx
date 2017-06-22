import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';


const style = {
  margin: 12, 
}

class LandingContainer extends Component {
  render() {
    return (
      <div className='App'>
        <div className='Home-header'>
          <h1>Vaultify</h1>
        </div>
        <div className='Button-body'>
          <RaisedButton 
            label="Start" 
            secondary={true} 
            onTouchTap={() => this.props.history.push('upload')}
            style={style} 
          />
        </div>
      </div>
    );
  }
}
export default LandingContainer;
