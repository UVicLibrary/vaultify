import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Clear from 'material-ui/svg-icons/content/clear';
import { List, ListItem } from 'material-ui/List';
import PropTypes from 'prop-types';
import TypeEntry from '../components/TypeEntry'
import LanguageEntry from '../components/LanguageEntry'
import EdtfEntry from '../components/EdtfEntry';
import FastEntry from '../components/FastEntry';

import { DialogCategoriesArray } from '../constants/DialogCategoriesArray';
import * as DialogCategories from '../constants/DialogCategories';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  onApplyAll: PropTypes.func.isRequired,
  title: PropTypes.array,
  original: PropTypes.array,
  adjusted: PropTypes.array,
  attribute: PropTypes.string.isRequired,
  category: PropTypes.oneOf(DialogCategoriesArray).isRequired,
  startValue: PropTypes.string.isRequired,
}

const defaultProps = {
  startValue: ''
}


class ModifyDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      original: props.original,
      newAdjusted: props.adjusted,
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      this.setState({
        title: nextProps.title,
        original: nextProps.original,
        newAdjusted: nextProps.adjusted
      })
  }

  handleDelete(deleteIndex) {
    console.log(deleteIndex)
    const newAdjusted = this.state.newAdjusted.filter((element, index) => {
      return index !== deleteIndex;
    })  
    this.setState({
        newAdjusted: newAdjusted,
    })
  }

  handleAdd(value) {
    const newAdjusted = [...this.state.newAdjusted, value]
    this.setState({
      newAdjusted: newAdjusted,
    })
  }


  renderAdjustedSelector() {
    const { category } = this.props;

    switch(category) {
      case DialogCategories.EDTF:
        return <EdtfEntry
                 onAdd={this.handleAdd}
               />
      case DialogCategories.FAST:
        return <FastEntry
                 onAdd={this.handleAdd}
               />
      case DialogCategories.LANGUAGE:
        return <LanguageEntry
                 onAdd={this.handleAdd}
               />
      case DialogCategories.TYPE:
        return <TypeEntry
                 onAdd={this.handleAdd}
               />
      default:
        return 
    }
  }

  render() {
    const { onCancel, onApply, onApplyAll, open, attribute } = this.props;
    const { title, original, newAdjusted } = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        onTouchTap={onCancel}
      />,
      <FlatButton
        label="ApplyAll"
        secondary={true}
        onTouchTap={onApplyAll}
      />,
      <FlatButton
        label="Apply"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => {onApply(this.state.newAdjusted)}}
      />,        
    ]
    return (
      <div>
        <Dialog
          title={attribute}
          actions={actions}
          open={open}
          modal={true}
        >
           <List>
             <ListItem
                primaryText="Title"
                disabled = {true} 
             />
             <ListItem
                secondaryText={title}
                insetChildren={true}
                disabled = {true} 
             />
          </List>           
           <List>
             <ListItem
                primaryText="Original"
                disabled = {true} 
             />
             {original.map((element, index) => {
               return (
                  <ListItem 
                    key={index}
                    secondaryText={element} 
                    insetChildren={true}
                    disabled = {true} 
                  />
               )
             })}
          </List>         
          <List>
             <ListItem
                primaryText="Adjusted"
                disabled = {true} 
             />           
            {newAdjusted.map((element, index) => {
              return (
                  <ListItem 
                    key={index}
                    secondaryText={element} 
                    rightIcon={<Clear />} 
                    onTouchTap={() => this.handleDelete(index)}
                    insetChildren={true}
                  />
              )
            })}
          </List>
          {this.renderAdjustedSelector()}

        </Dialog>
      </div>
    )
  }
}

ModifyDialog.propTypes = propTypes;
ModifyDialog.defaultProps = defaultProps;
export default ModifyDialog;