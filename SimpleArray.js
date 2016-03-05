/*
  SIMPLE ARRAY

  A simple mockup of an array that helps demonstrate how array functions work, using loops and an actual JavaScript array at the center of it.

  There are a few functions that go over our usual length limit; I've left these that way so that the code is presented in a single block.

  It implements push(), pop(), splice(), and forEach(), the four array functions we have learned about so far in class. This is purely for your informational purposes; it may help you conceptualize how array functions work.

  It is also not likely even close to the way these functions are implemented in JavaScript. This implementation will be slow; arrays in JavaScript are real fast, and probably use all kinds of computer science fu that, if ever I have had it, I have definitely forgotten ALL of it.
*/
var SimpleArray = function (array) {

  if (array) this.array = array; // test if an array is passed in
  else this.array = []; // if not, create an empty array

};

SimpleArray.prototype = {

  // push adds the element to the end of the array
  push: function (element) {
    this.array[this.array.length] = element;
  },

  // pop deletes the last element in the array and returns it
  pop: function () {
    var lastElement = this.array[this.array.length - 1]; // this will give us the last element

    // we can "delete" the last element by copying the existing array, excepting the last element
    var newArray = [];
    for (var index = 0; index < this.array.length - 1; ++index) {
      newArray[index] = this.array[index];
    }

    // copy our new array, one element lighter than our old one, into the object's array
    this.array = newArray;

    // the return statement goes at the end of the function (in fact, anything below a return statement won't ever run)
    return lastElement;
  },

  // splice() deletes the specified number of elements starting at the specified index
  // it returns these as an array
  // the algorithm is only slightly more difficult than pop();
  splice: function (indexToDelete, numberOfElements) {
    // first we need to collect the elements to return
    var elementsToReturn = [];
    for (var i = 0; i < numberOfElements; ++i) {
      if (i + indexToDelete < this.array.length) { // only add elements that are in the original array
        elementsToReturn[i] = this.array[i + indexToDelete]; // add element to the return array
      }
    }

    // then, we need to copy the array, excepting the elements we don't want
    // for this, it's *much* easier to use push(); we've already written that ourselves, so let's not worry about using it on the internal array
    var newArray = [];
    for (var i = 0; i < this.array.length; ++i) {
      // if our counter is BELOW the index where we start deleting, add the element to the new array
      if (i < indexToDelete) newArray.push(this.array[i]);

      // if our counter is ABOVE (or at) the index where we start deleting, plus the number of elements to delete, also add the element to the new array
      if (i >= indexToDelete + numberOfElements) newArray.push(this.array[i]);
    }

    // copy our new array into the object's array
    this.array = newArray;

    // and return the elements we want to delete
    return elementsToReturn;
  },

  // forEach() takes a function as an argument, and calls that function, passing into that function three arguments:
  // the element, the index of that element, and the array that contains the element at that index
  // it also takes a second object, a "this context"
  // if the function in question uses the "this" keyword, we will need to know which object it specifies
  forEach: function (_function, _this) { // use underscores since function and this are keywords

    // loop through the array
    for (var index = 0; index < this.array.length; ++index) {
      // and for each element, call the function, passing in the element, the index, and the array
      // function.call calls the function; its first argument is the "this context," and then subsequent arguments are the passed in as is
      _function.call(_this, this.array[index], index, this.array);
    }
  }

};
