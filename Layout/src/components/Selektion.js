import React from "react";
import Merkmal from './Merkmal';
import AddSlect from './AddSelect';



function Selection(){
 var list = [ ];


 function handleClick() {
     var mark ='<a><Merkmal>Merkmal</Merkmal></a>';
     list.push(mark);
     print();
 }


 function print(){
       var i=0;
         var selectionList = list[i];
         var ausgeben = document.getElementById('ausgabe');
         ausgeben.innerHTML += selectionList;
         i=i+1;
 }


 return(

     <div class = "scrollMenu" >

         <div id="ausgabe"><script>
             var elem = document.getElementById(Add);
             if(elem.addEventListener){
             document.addEventListener("click", handleClick, false)
         }
         </script></div>
     </div>
     );

}

export default Selection;