function move(id){
  debugger;
  document.getElementById(id).style.position = "absolute";
  if(document.getElementById(id).style.top ==="") document.getElementById(id).style.top= "0px";
  var position = document.getElementById(id).style.top;
  var pos = parseInt(position.replace("px", ""));
  document.getElementById(id).style.top = pos+20 + "px";
  }
