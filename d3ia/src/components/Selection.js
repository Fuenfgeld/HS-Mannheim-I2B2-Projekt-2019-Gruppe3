import React,{Component} from 'react';
import PropTypes from 'prop-types';
import SelectItem from 'prop-types';
import './App.css';

class Selection extends Component{
    render() {
        return this.props.selection.map((select) => (
            <SelectItem key={select} select={select}/>
        ));
    }

}

//Proptypes
Selection.propTypes={
    selection: PropTypes.array.isRequired
}


export default Selection;