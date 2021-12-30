var s = 'abc12345';
var num = parseInt(s);
console.log(num);//NAN
console.log(typeof NaN);//number
console.log(typeof num);//number
if (num == NaN) {
  console.log("NaN");
} else if (typeof num == 'number') {
  console.log("number");//number
} else if (num == "abc") {
  console.log("abc");
} else {
  console.log("str");
}