import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
import Clear from 'material-ui/svg-icons/content/clear'
import { List, ListItem } from 'material-ui/List'
import AutoComplete from 'material-ui/AutoComplete'


const actions = [
  <FlatButton
    label="Cancel"
    onTouchTap={this.props.handleClose}
  />,
  <FlatButton
    label="ApplyAll"
    secondary={true}
    onTouchTap={this.props.handleApplyAll}
  />,
  <FlatButton
    label="Apply"
    primary={true}
    keyboardFocused={true}
    onTouchTap={this.props.handleApply}
  />,        
]

const DialogElement = ({ entryElement }) => (
        <Dialog
          title={this.props.attribute}
          actions={actions}
          open={this.props.open}
          modal={true}
        >
           <List>
             <ListItem
                primaryText="Title"
                disabled = {true} 
             />
             <ListItem
                secondaryText={this.state.title}
                insetChildren={true}
                disabled = {true} 
             />
          </List>           
           <List>
             <ListItem
                primaryText="Original"
                disabled = {true} 
             />
             {this.state.original.map((element, index) => {
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
            {this.state.adjusted.map((element, index) => {
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
          {entryElement}
          <AutoComplete
            id='autocomplete'
            searchText={this.state.searchText}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleNewRequest}
            filter={AutoComplete.fuzzyFilter}
            dataSource={this.state.dataSource}
            maxSearchResults={5}
            fullWidth={true}
          />
        </Dialog>  
)

class AchDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      value: '',
      original: this.props.original,
      adjusted: this.props.adjusted,
    } 

    this.handleInputChange = this.handleInputChange.bind(this); 
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
      original: nextProps.original,
      adjusted: nextProps.adjusted
    })
  }
  handleInputChange(value) {
    this.setState({
      value: value,
    })
  }
  handleAdd(multiple=true) {
    
  }
  handleDelete(deleteIndex) {
    const newAdjusted = this.state.adjusted.filter((element, index) => {
      return index !== deleteIndex;
    })  
    this.setState({
        adjusted: newAdjusted,
    })
  }
}
class LanguageDialog extends AchDialog {

  handleNewRequest() {
    let newValue;
    if (Object.prototype.hasOwnProperty.call(this.props.map, this.state.searchText)) {
      newValue = this.props.map[this.state.searchText]
    } else {
      newValue = this.state.searchText
    }
    const newAdjusted = [...this.state.adjusted, newValue]
    this.setState({
        searchText: '',
        adjusted: newAdjusted,
    })
  }

  render() {
    const entry = <AutoComplete
              id='autocomplete'
              searchText={this.state.searchText}
              onUpdateInput={this.handleUpdateInput}
              onNewRequest={this.handleNewRequest}
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.state.dataSource}
              maxSearchResults={5}
              fullWidth={true}
            />
    return (
      <DialogElement entryElement={entry} />
    );
  }
}
export default LanguageDialog;