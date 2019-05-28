import React,{Component} from 'react';
import PropTypes from "prop-types";
import Selection from "./Selection";



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


    render(){
        return(
            <div sytle="{this.getSytle()}">
                <p>{ this.props.todo.title }</p>
            </div>
        )
    }
}



//Proptypes
SelectItem.propTypes={
    selection: PropTypes.array.isRequired
}

const itemStyle ={
    backgroundColor: '#f4f4f4'
}

export default SelectItem