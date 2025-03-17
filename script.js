let exp = "";
let post = [];
let digitExpression = /^[-+]?\d{1,7}(\.\d{0,1})?$/;

function display(ex) {
  document.getElementById("value").innerHTML = ex;
  exp = "";
}

function val(value) {
  if (post.length < 50) {
    if (value === "AC") {
      exp = "";
      post = [];
      display(exp);
    } else if (value === "+/-") {
      if (digitExpression.test(post[post.length - 1])) {
        let digit = post.pop();
        if (digit.startsWith("-")) {
          digit = digit.substring(1);
        } else {
          digit = "-" + digit;
        }
        post.push(digit);
        exp = post.join("");
        display(exp);
      }
    } else if (value === "=") {
      if (post.length === 0) {
        exp = "Please enter the value";
      } else if (
        ["+", "-", "/", "%", ".", "x"].includes(post[post.length - 1])
      ) {
        post = [];
        exp = "Invalid Expression";
      } else {
        exp = calculation(post);
        post = [];
      }
      display(exp);
    } else {
      if (
        ["+", "/", "%", "x"].includes(post[post.length - 1]) &&
        ["+", "-", "/", "%", "x"].includes(value)
      ) {
        post.pop();
      } else if (value === "-") {
        if (
          post.length === 0 ||
          ["+", "-", "/", "%", "x"].includes(post[post.length - 1])
        ) {
          post.push(value);
        } else {
          post.push(value);
        }
      } else if (!isNaN(value) || value === ".") {
        if (
          !isNaN(post[post.length - 1]) ||
          post[post.length - 1]?.includes(".")
        ) {
          post[post.length - 1] += value;
        } else if (post[post.length - 1] === "-") {
          post[post.length - 1] += value;
        } else {
          post.push(value);
        }
      } else {
        post.push(value);
      }
      exp = post.join("");
      display(exp);
    }
  } else {
    exp = "Maximum Limit Reached";
    display(exp);
    if (value === "AC") {
      exp = "";
      post = [];
      display(exp);
    }
  }
  console.log(post);
}

function calculation(pos) {
  expression = pos.join("");
  expression = expression.replace(/x/g, "*");
  expression = expression.replace(/(\d+)%(\d+)/g, "($1 * ($2 / 100))");
  result = eval(expression);
  return result;
}
