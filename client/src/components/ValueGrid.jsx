import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table';
import ModifyDialog from './ModifyDialog';

const style = {whiteSpace:'pre-line', wordWrap:'break-word'}

const propTypes = {
  titles: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onApply: PropTypes.func.isRequired,
  onApplyAll: PropTypes.func.isRequired,
  attribute: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
}

class ValueGrid extends Component {
  constructor(props){
      super(props);
      this.state = {
          dialogOpen: false,
          selectedRow: 0,
          showPages: true
      }
      this.dataLength = this.props.data.length;
      this.rowMap = {}
      
      this.onRowSelection = this.onRowSelection.bind(this);
      this.handleDialogCancel = this.handleDialogCancel.bind(this);
      this.handleApply = this.handleApply.bind(this);
      this.handleApplyAll = this.handleApplyAll.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data,
      showPages: nextProps.showPages
    })
  }

  handleApply(value) {
    this.handleDialogCancel()
    this.props.onApply(this.rowMap[this.state.selectedRow], value)
    //this.selectNextRow()   
  }

  handleApplyAll(value) {
    this.handleDialogCancel()
    let rows = [];
    let original_value = this.props.data[this.rowMap[this.state.selectedRow]].original
    this.props.data.forEach((row, index) => {
      let equal = true
      row.original.forEach((element, ind) => {
        if (element !== original_value[ind]) {
          equal = false;
        }
      })
      if (equal) {
        rows.push(index);
      }
    })
    this.props.onApplyAll(rows, value)
  }
  
  selectNextRow() {
    let nextRow = this.state.selectedRow + 1
    if (nextRow === this.dataLength) {
      nextRow = 0;
    }
    this.setState({
      selectedRow: nextRow,
    })
  }

  onRowSelection(rows) {
    if (!rows) {
      this.setState({
        dialogOpen: false,
      })
    } else {
      this.setState({
        dialogOpen: true,
        selectedRow: rows[0],
      })
    }
  }

  handleDialogCancel() {
    this.setState({dialogOpen: false});
  }
  
  renderRows() {
    let count = 0
    return this.props.data.map((row, index) => {
      if (this.props.showPages || this.props['object_type'][index] == "GenericWork") {
        this.rowMap[count] = index;
        count++; 
        return (
            <TableRow 
              key={index} 
              style={style}
            >
              <TableRowColumn style={style}>{this.props.titles[index]}</TableRowColumn>
              <TableRowColumn style={style}>{row.original.join('\n')}</TableRowColumn>
              <TableRowColumn style={style}>{row.adjusted.join('\n')}</TableRowColumn>
            </TableRow>
          ) 
      } else {
        return null;
      }                   
    })
  }

  render() {
    const rows = this.renderRows()
    return (
      <div>
        <Table
          onRowSelection={this.onRowSelection}
        >
          <TableHeader
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn>TITLE</TableHeaderColumn>
              <TableHeaderColumn>ORIGINAL</TableHeaderColumn>
              <TableHeaderColumn>ADJUSTED</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={true}
          >
           {rows}
          </TableBody>
        </Table>
        <ModifyDialog
          open={this.state.dialogOpen}
          onCancel={this.handleDialogCancel}
          onApply={this.handleApply}
          onApplyAll={this.handleApplyAll}
          title={this.props.titles[this.rowMap[this.state.selectedRow]]}
          original={this.props.data[this.rowMap[this.state.selectedRow]].original}
          adjusted={this.props.data[this.rowMap[this.state.selectedRow]].adjusted}
          attribute={this.props.attribute}
          category={this.props.category}
        />
      </div>
    )
  }
}

ValueGrid.PropTypes = propTypes;

export default ValueGrid;