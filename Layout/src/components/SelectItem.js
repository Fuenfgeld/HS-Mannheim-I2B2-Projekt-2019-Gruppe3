import React,{Component} from 'react';
import PropTypes from "prop-types";



export class SelectItem extends Component{

    getStyle = () =>{
        if(this.props.todo.completed){
            return{
                textDocoration:'line-through'
            }
        }else{
            return{
                textDecoration:'none'
            }
        }
    }

toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

    render(){
        const { id, title } = this.props.selection;
        return

    }
}



//Proptypes
SelectItem.propTypes={
    selection: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delSelect: PropTypes.func.isRequired,
}

const itemStyle ={
    backgroundColor: '#f4f4f4'
}

export default SelectItem