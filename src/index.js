var Validation;
(function (Validation) {
    var isLetterReg = /^[A-Za-z]+$/;
    Validation.isNumberReg = /^[0-9]+$/;
    Validation.checkLetter = function (text) {
        return isLetterReg.test(text);
    };
})(Validation || (Validation = {}));
// import name = require('./b')
// console.log(name)
///<reference path="./spaces.ts"/>
var isLetter = Validation.checkLetter('hahha');
console.log(isLetter);
