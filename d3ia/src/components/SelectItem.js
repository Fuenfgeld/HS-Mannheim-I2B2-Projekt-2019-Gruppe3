import React,{Component} from 'react';
import PropTypes from "prop-types";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';



function SelectItem (){


function toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }


        return(
            <Dropdown id="Dropdown"  toggle={toggle}>
                <DropdownToggle caret>
                  AND
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem> AND </DropdownItem>
                  <DropdownItem> OR </DropdownItem>
                </DropdownMenu>
            </Dropdown>

        )
    }




//Proptypes
SelectItem.propTypes={
    selection: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delSelect: PropTypes.func.isRequired,
}


export default SelectItem