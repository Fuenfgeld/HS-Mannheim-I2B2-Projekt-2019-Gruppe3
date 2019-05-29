import React,{Component} from 'react';
import PropTypes from "prop-types";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';




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
        return(

            <Dropdown id="Dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                  AND
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem > AND </DropdownItem>
                  <DropdownItem> OR </DropdownItem>
                </DropdownMenu>
            </Dropdown>

        )
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