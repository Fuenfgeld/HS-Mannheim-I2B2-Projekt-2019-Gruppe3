import React,{Component} from 'react';
import SelectItem from './SelectItem';
import PropTypes from 'prop-types';


function Selection(){

    function handleClick(e){
        e.preventDefault();
        console.log('The link was clicked.')
    }

        return (
            <SelectItem href="#" onClick={handleClick} />
    );
    }




//Proptypes
Selection.propTypes={
    selection: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delSelect: PropTypes.func.isRequired,
}



export default Selection;