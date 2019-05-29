import React,{Component} from 'react';
import SelectItem from 'prop-types';
import PropTypes from 'prop-types';



class Selection extends Component{
    state={
            contacts:[],
            selection:[
                {
                id: 1,
                title:'Take out the train'
                }
                ]
    }

    render() {
        return this.props.selection.map((select) => (
            <SelectItem key={select.id} select={select} markComplete={this.props.markComplete} delSelect={this.props.delSelect}/>
            )
         );
    }
}

//Proptypes
Selection.propTypes={
    selection: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delSelect: PropTypes.func.isRequired,
}


export default Selection;