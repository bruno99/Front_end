function join(arg){
    document.getElementById('display').innerHTML+=arg;
    navigator.vibrate(100);
}
function clearL(){
    var C = document.getElementById('display').innerHTML;
    document.getElementById('display').innerHTML=y.substring(0,y.length-1);
    navigator.vibrate(100);
}
var j=0;
