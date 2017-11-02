//Definition of callback

//Functions are first class citizens in JS world like objects, So you can do pass them in and out of functions just as you do the same with js objects
//Idea comes from "FUNCTIONAL PROGRAMMING"

//Example1: Functions as input
var function1 = function(){
  console.log("Am function1");
};

var function2 = function(callback){
  console.log("Am function2");
  callback();
};

function2(function1);

//Example1: Functions as output
var display = function(displayType){
      if(displayType == "console"){
          return console.log;
      } else {
          return alert;
      }
  };

var alertDisplay = display("alert");
alertDisplay("Hello World!");

var consoleDisplay = display("console");
consoleDisplay("Hello World!");