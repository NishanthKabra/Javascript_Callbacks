//Example2: Use of callbacks

var calculator = function(calcType, num1, num2){
    if(calcType == "add"){
        return num1 + num2;
    } else if(calcType == "sub"){
        return num1 - num2;
    } else if(calcType == "mult"){
        return num1 * num2;
    } else if(calcType == "div"){
        return num1 / num2;
    }
};

calculator("add",10,5);

//Bad things:
// 1. This calculator can be part of a third party library like underscore and we are only supposed to use the library so now the library has to design all the possible combinations of calctypes
// 2. Its not extendible, until unless the library updates you dont have a way to update your updated calculator.
