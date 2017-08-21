import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


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
                <Link to='/' style={{ textDecoration: 'none' }}>
                  <MenuItem primaryText="Home" />
                </Link>
                <Divider />
                <Link to='/upload' style={{ textDecoration: 'none' }}>
                  <MenuItem primaryText="Upload" />
                </Link>
                <Link to='/translate' style={{ textDecoration: 'none' }}>
                  <MenuItem primaryText="Translate" />
                </Link>
                <Link to='/export' style={{ textDecoration: 'none' }}>
                  <MenuItem primaryText="Export" />
                </Link>     
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