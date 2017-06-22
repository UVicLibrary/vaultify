import React, { Component } from 'react';
//import { connect } from 'react-redux'
import Banner from '../components/Banner.jsx';
import AttributeTabsContainer from '../containers/AttributeTabsContainer.jsx';


class Translate extends Component {
  constructor(props){
      super(props);
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
    console.log(this.props)
    return (
      <div>
        <Banner
          onClick={() => this.props.history.push('export')}
        />
        <div className='Table'>
          <AttributeTabsContainer />
        </div>

      </div>
    );
  }
}




export default Translate;