const webcam = new Webcam(document.getElementById("camera"), "user", document.getElementById("camera-canvas"));
const photoContainer = document.getElementById("photo-container");
document.getElementById("take-photo-button").addEventListener("click", () => {
  const photo = webcam.snap();
  const img = document.createElement("img");
  img.setAttribute("src", photo);
  photoContainer.appendChild(img);
});
