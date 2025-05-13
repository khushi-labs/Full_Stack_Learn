function sortArray() {
  const input = document.getElementById("sortInput").value;
  const arr = input.split(",").map(Number);
  const sorted = arr.sort((a, b) => a - b);
  document.getElementById("output1").innerText = `Sorted Array: ${sorted.join(
    ", "
  )}`;
}

function concatArrays() {
  const input1 = document.getElementById("concatInput1").value;
  const input2 = document.getElementById("concatInput2").value;
  const arr1 = input1.split(",").map(Number);
  const arr2 = input2.split(",").map(Number);
  const result = arr1.concat(arr2);
  document.getElementById(
    "output2"
  ).innerText = `Concatenated Array: ${result.join(", ")}`;
}

function removeFirstElement() {
  const input = document.getElementById("removeInput").value;
  const arr = input.split(",").map(Number);
  arr.shift(); // remove first element
  document.getElementById(
    "output3"
  ).innerText = `Array after removal: ${arr.join(", ")}`;
}
