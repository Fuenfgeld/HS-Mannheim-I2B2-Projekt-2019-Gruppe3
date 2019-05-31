import React, {Component} from "react";
import Merkmal from "./Merkmal"


function Selection(){
 var list = [ ];

 function handleClick(e) {
     e.preventDefault();

     list.push('<a> <Merkmal href="#" >Merkmal</Merkmal> </a>');

     var i;
     for (i = 0; i < list.length; i++) {
         var selectionList = list[i];
         var ausgabe = document.getElementById('ausgabe');
         ausgabe.innerHTML = selectionList;
     }

 }

function init() {
     var elem = document.getElementById('Add');
     elem.addEventListener('click', handleClick);
}

 return(

     <div class = "scrollMenu" >
         <script>document.addEventListener('DOMContentLoaded', init);</script>
     </div>
     );

}

export default Selection;