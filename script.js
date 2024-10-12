// Define an IMAGES and TIME variable outside of functions
// so they have a globa scope.
let images;
let timer;

// Define button sizes
let button_width = 1280 / 8;
let button_height = 720 / 4;

// Load images list from json file
fetch("images.json")
  .then((response) => response.json())
  .then((data) => (images = data))
  .catch((error) => console.log(error));

// Create a reference to the screen DIV.
let screen = document.getElementById("screen");
let credit_tracking = document.getElementById("credit_tracking");
let credit_link = document.getElementById("credit_link");

for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 8; j++) {
    let new_div = document.createElement("div");
    new_div.style.width = button_width + "px";
    new_div.style.left = button_width * j + "px";

    new_div.style.height = button_height + "px";
    new_div.style.top = button_height * i + "px";

    screen.appendChild(new_div);
  }
}

// Add an event listener for mouse move
screen.addEventListener("mousemove", (e) => {
  console.log("moved");

  // Remove background image
  screen.style.background = "none";

  credit_link.href = "javascript: return false;";
  credit_link.textContent = "";

  credit_tracking.style.display = "inline";

  // If stopped for half a second, run the MOUSE_STOPPED
  // function.
  clearTimeout(timer);
  timer = setTimeout(mouse_stopped, 1000, e);
});

// Define the MOUSE_STOP function.
function mouse_stopped(e) {
  console.log("stopped");

  // Calculate relative X and Y position.
  let rect = screen.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  if (x >= 0 && x <= 1280 && y >= 0 && y <= 720) {
    // Round it in groups of 80
    x = Math.floor(x / button_width);
    y = Math.floor(y / button_height);
    console.log(x + " " + y);

    // Assign the corresponding image, randomly if there are
    // more than one.
    let random = Math.floor(Math.random() * images[y][x].length);
    screen.style.background = "url(images/" + images[y][x][random].image + ")";

    credit_link.href =
      "https://www.pexels.com/photo/" + images[y][x][random].id + "/";
    credit_link.textContent = "Photo Credit: " + images[y][x][random].credit;
  }

  credit_tracking.style.display = "none";
}
