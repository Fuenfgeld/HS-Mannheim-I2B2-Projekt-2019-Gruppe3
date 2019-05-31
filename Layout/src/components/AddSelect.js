import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddSelect extends Component {
  state = {
    title: ''
  }

  ADD = (e) => {
    e.preventDefault();
    this.props.addSelect(this.state.title);
    this.setState({ title: '' });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.ADD} style={{ display: 'flex' }}>
        <input
          type="text"
          name="title"
          style={{ flex: '10', padding: '5px' }}
          placeholder="Add"
          value={this.state.title}
          onChange={this.onChange}
        />
        <input
          type="ADD"
          value="ADD"
          className="btn"
          style={{flex: '1'}}
        />
      </form>
    )
  }
}

// PropTypes
AddSelect.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default AddSelect