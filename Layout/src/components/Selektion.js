import React, {Component} from "react";
import Merkmal from "./Merkmal";


function Selection(){
 var list = [ ];

 function handleClick() {
     var mark =  '<a><Merkmal></Merkmal></a>'
     list.push(mark);
     print();
 }

 function print() {
     var i = 0;
     var selectionLst = list[i];
     var ausgeben = document.getElementById("ausgabe");
     ausgeben.innerHTML += list[i]
     i = i+1;
 }


 return(

     <div class = "scrollMenu" >
         <div id="ausgabe"><script>
         var elem = document.getElmentById(Add);
         if(elem.addEventListenen){
             document.addEventListener("click", handleClick, false)
             }</script></div>

     </div>
     );

}

export default Selection;

