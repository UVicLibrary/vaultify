import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import PropTypes from 'prop-types';

class Banner extends Component {
  render() {
    return (
      <div>
          <AppBar
            title='Vaultify'
            iconElementRight={
              <RaisedButton
                label="Next" 
                secondary={true} 
                onTouchTap={this.props.onClick}
              />
            }
            iconElementLeft= {
              <IconMenu
                iconButtonElement={<IconButton><MenuIcon /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Home" />
                <MenuItem primaryText="About" />
                <Divider />
                <MenuItem primaryText="Upload" />
                <MenuItem primaryText="Translate" />
                <MenuItem primaryText="Export" />       
              </IconMenu>
            }
          />
      </div>
    );
  }
}

Banner.PropTypes = {
  onClick: PropTypes.func.isRequired
}

export default Banner;