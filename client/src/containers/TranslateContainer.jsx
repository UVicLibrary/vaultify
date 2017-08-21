import React, { Component } from 'react';
//import { connect } from 'react-redux'
import Banner from '../components/Banner.jsx';
import AttributeTabsContainer from '../containers/AttributeTabsContainer.jsx';
import Toggle from 'material-ui/Toggle';

class Translate extends Component {
  constructor(props){
      super(props);
      this.state = {
        showPages: false,
      }
      this.texts = []
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e, results) => {
    results.forEach(result => {
      this.linkTo('transpile');
      this.props.history.push('translate')
    })

  } 

  render() {
    console.log(this.state)
    return (
      <div>
        <Banner
          onClick={() => this.props.history.push('export')}
        />
        <div style={{margin: '20px', width: '150px'}}>
          <Toggle
              label="Show Pages"
              toggled={this.state.showPages}
              onToggle={() => {this.setState({showPages: !this.state.showPages})}}
          />
        </div>
        <div className='Table'>
          <AttributeTabsContainer 
            showPages={this.state.showPages}
          />
        </div>

      </div>
    );
  }
}




export default Translate;