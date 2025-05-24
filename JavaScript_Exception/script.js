function handleUndeclared() {
  try {
    console.log(nonExistentVar); 
  } catch (error) {
    document.getElementById("ex1").innerText = `Error is: ${error}`;
  }
}

function divideNumbers() {
  const numerator = parseFloat(document.getElementById("num1").value);
  const denominator = parseFloat(document.getElementById("num2").value);
  try {
    if (denominator === 0) {
      throw new Error("Divide by Zero Error");
    }
    const result = numerator / denominator;
    document.getElementById("ex2").innerText = `Result: ${result}`;
  } catch (error) {
    document.getElementById("ex2").innerText = ` Error is: ${error.message}`;
  }
}

const arr = [10, 20, 30, 40, 50];

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById(
    "arrayDisplay"
  ).innerText = `[${arr.join(", ")}]`;
});

function checkArrayBounds() {
  const index = parseInt(document.getElementById("arrIndex").value);
  let message = "";

  try {
    if (index < 0 || index >= arr.length || isNaN(index)) {
      throw new Error("Out of Bound Error");
    }
    message = `Value at index ${index}: ${arr[index]}`;
  } catch (error) {
    message = ` Error is : ${error.message}`;
  }

  document.getElementById("ex3").innerText = message;
}


function exceptionWithFinally() {
  let message = "";
  try {
    throw new Error("causing Error in Try Block");
  } catch (error) {
    message = `Error is: ${error.message}`;
  } finally {
    message += `\nFinally block executes because i have made error in Try block.`;
    document.getElementById("ex4").innerText = message;
  }
}
