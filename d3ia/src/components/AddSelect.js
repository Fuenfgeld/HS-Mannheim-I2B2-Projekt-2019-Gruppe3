import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button} from 'reactstrap'


export class AddSelect extends Component {
 state = {
    title: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addSelect(this.state.title);
    this.setState({ title: '' });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });


  render() {
    return (
       <Button
           onSubmit={this.onSubmit}
           style={{ display: 'flex' }}
           onChange={this.onChange}
           >
           ADD
       </Button>
    )
  }
}


// PropTypes
AddSelect.propTypes = {
  addSelect: PropTypes.func.isRequired
}

export default AddSelect