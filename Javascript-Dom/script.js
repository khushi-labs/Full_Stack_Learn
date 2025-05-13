function displayFormData() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  const output = `Name: ${name}\nEmail: ${email}\nAge: ${age}`;
  document.getElementById("formOutput").innerText = output;
}

function changeImage() {
  const image = document.getElementById("image");
  image.src =
    "https://picsum.photos/150?random=" + Math.floor(Math.random() * 1000);
}

let currentFontSize = 16;

function changeFontSize(action) {
  if (action === "increase") {
    currentFontSize += 2;
  } else if (action === "decrease" && currentFontSize > 8) {
    currentFontSize -= 2;
  }
  document.getElementById("textBox").style.fontSize = currentFontSize + "px";
}

function showDateTime() {
  const now = new Date();
  document.getElementById("dateTimeOutput").innerText = now.toString();
}
