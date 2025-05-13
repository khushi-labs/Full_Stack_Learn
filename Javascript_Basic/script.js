function printNameAddress() {
  const name = "Khushi Singh";
  const address = "Patna Bihar India";
  document.getElementById(
    "output1"
  ).innerText = `Name: ${name}\nAddress: ${address}`;
}

function checkEquality() {
  const val1 = document.getElementById("val1").value;
  const val2 = document.getElementById("val2").value;
  const sameValue = val1 == val2;
  const sameType = typeof val1 === typeof val2;
  document.getElementById("output2").innerText =
    `Value Equality (==): ${sameValue}\n` +
    `Type Equality: ${sameType}`;
}

function concatUppercase() {
  const str1 = document.getElementById("str1").value;
  const str2 = document.getElementById("str2").value;
  const result = (str1 + str2).toUpperCase();
  document.getElementById("khushi").innerText = `Result: ${result}`;
}


function stringToBytes() {
  const str = document.getElementById("byteStr").value;
  const encoder = new TextEncoder();
  const byteLength = encoder.encode(str).length;
  document.getElementById("output4").innerText = `Byte Length: ${byteLength}`;
}

function roundNumber() {
  const num = parseFloat(document.getElementById("number").value);
  const digits = parseInt(document.getElementById("digits").value);
  if (!isNaN(num) && !isNaN(digits)) {
    const rounded = num.toFixed(digits);
    document.getElementById("output5").innerText = `Rounded Number: ${rounded}`;
  } else {
    document.getElementById("output5").innerText =
      "Please enter valid number and digits.";
  }
}
