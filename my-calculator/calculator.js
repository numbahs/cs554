const add = (x, y) => {
  if(typeof x !== "number") throw TypeError(`${x} is not a number!`)
  if(typeof y !== "number") throw TypeError(`${y} is not a number!`)
  return x + y;
};

const asyncAdd = async (x, y) => {
  if(typeof x !== "number") throw TypeError(`${x} is not a number!`)
  if(typeof y !== "number") throw TypeError(`${y} is not a number!`)
  return x + y;
};

const subtract = (x, y) => {
  if(typeof x !== "number") throw TypeError(`${x} is not a number!`)
  if(typeof y !== "number") throw TypeError(`${y} is not a number!`)
  return x - y;
};

const multiply = (x, y) => {
  if(typeof x !== "number") throw TypeError(`${x} is not a number!`)
  if(typeof y !== "number") throw TypeError(`${y} is not a number!`)
  return x * y;
};

const divide = (x, y) => {
  if(typeof x !== "number") throw TypeError(`${x} is not a number!`)
  if(typeof y !== "number") throw TypeError(`${y} is not a number!`)
  return x / y;
};

module.exports = {
  add,
  asyncAdd,
  subtract,
  multiply,
  divide
};
