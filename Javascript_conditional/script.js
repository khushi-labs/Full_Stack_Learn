function filterNegatives() {
  const input = document.getElementById("negInput").value;
  const numbers = input.split(",").map(Number);
  const filtered = numbers.filter((num) => num >= 0);
  document.getElementById("output1").innerText = `Filtered: ${filtered.join(
    ", "
  )}`;
}

function differenceWith13() {
  const num = parseFloat(document.getElementById("diffInput").value);
  let result = num > 13 ? 2 * Math.abs(num - 13) : Math.abs(num - 13);
  document.getElementById("output2").innerText = `Result: ${result}`;
}

function generateFibonacci() {
  const n = parseInt(document.getElementById("fibInput").value);
  if (isNaN(n) || n <= 0) {
    document.getElementById("output3").innerText =
      "Please enter a positive integer.";
    return;
  }
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  document.getElementById("output3").innerText = `Fibonacci (${n} terms): ${fib
    .slice(0, n)
    .join(", ")}`;
}

function sumMultiples() {
  let sum = 0;
  for (let i = 0; i < 1000; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }
  document.getElementById("output4").innerText = `Sum: ${sum}`;
}

function cubeUsingFunctionObject() {
  const num = parseFloat(document.getElementById("cubeInput").value);
  const cube = new Function("n", "return n * n * n;");
  document.getElementById("output5").innerText = `Cube of ${num}: ${cube(num)}`;
}
