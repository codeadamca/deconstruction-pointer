// Define an IMAGES and TIME variable outside of functions
// so they have a globa scope.
let images;
let timer;

// Load images list from json file
fetch("images.json")
  .then((response) => response.json())
  .then((data) => (images = data))
  .catch((error) => console.log(error));

// Create a reference to the screen DIV.
let screen = document.getElementById("screen");

// Add an event listener for mouse move
screen.addEventListener("mousemove", (e) => {
  console.log("moved");

  // If stopped for halkf a second, run the MOUSE_STOPPED
  // function.
  clearTimeout(timer);
  timer = setTimeout(mouse_stopped, 500, e);
});

// Define the MOUSE_STOP function.
function mouse_stopped(e) {
  console.log("stopped");

  // Calculate relative X and Y position.
  let rect = screen.getBoundingClientRect();
  let x = e.clientX - rect.left;
  x = Math.floor(x / 80);
  let y = e.clientY - rect.top;

  // Round it in groups of 80
  y = Math.floor(y / 80);

  // Assign the corresponding image, randomly if there are
  // more than one.
  let random = Math.floor(Math.random() * images[x][y].length);
  screen.style.background = "url(images/" + images[x][y][random].image + ")";
}
