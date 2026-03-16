const text = document.getElementById("text");
const remain = document.getElementById("remain");
const count = document.getElementById("count");
const words = document.getElementById("words");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const progressFill = document.getElementById("progressFill");
const maxChar = 200;

text.addEventListener("input", function () {
  if (text.value.length > maxChar) {
    text.value = text.value.slice(0, maxChar);
  }

  let remaining = maxChar - text.value.length;
  let charCount = text.value.length;
  let wordCount = text.value.trim() === "" ? 0 : text.value.trim().split(/\s+/).length;

  remain.textContent = remaining;
  count.textContent = charCount;
  words.textContent = wordCount;

  let percentage = (charCount / maxChar) * 100;
  progressFill.style.width = percentage + "%";

  if (remaining <= 10) {
    remain.style.color = "red";
    progressFill.style.backgroundColor = "red";
  } else if (remaining <= 50) {
    remain.style.color = "orange";
    progressFill.style.backgroundColor = "orange";
  } else {
    remain.style.color = "green";
    progressFill.style.backgroundColor = "green";
  }
});

clearBtn.addEventListener("click", function () {
  text.value = "";
  remain.textContent = maxChar;
  count.textContent = 0;
  words.textContent = 0;
  progressFill.style.width = "0%";
  remain.style.color = "green";
});

copyBtn.addEventListener("click", function () {
  if (text.value.length > 0) {
    navigator.clipboard.writeText(text.value);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy Text";
    }, 2000);
  }
});