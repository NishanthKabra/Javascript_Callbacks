// Example3: Better calculator 
var betterCalculator = function(calcTypeCallback, num1, num2){
    if(typeof calcTypeCallback == "function"){ //Fallback code
      return calcTypeCallback(num1, num2); 
    }
    else {
        alert("Callback passed is not a function, please recheck");
    }
};

var add = function(a,b){
    return a + b;
};

var sub = function(a,b){
    return a - b;
};

var mult = function(a,b){
    return a * b;
};

var div = function(a,b){
    return a / b;
};

//Extended Functionality
var mod = function (a,b){
    return a % b;
};

var myCustomAdd = function(a,b){
    return (a > b) ? (a + b) : 0;
};

betterCalculator(add,10,5);
betterCalculator(mod,10,5); //Open for extension closed for modification - SOLID (O)
betterCalculator(myCustomAdd,5,10);

//Good things:
// 1. Calculator is now open for extension and take user defined calculation types
// 2.1 Caculator npow can be easily tested as it is decoupled -> Test independent calculation type without testing the whole calculator function
// 2.2 Any code which can be tested easily is very often better code
