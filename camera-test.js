(async () => {
  const webcam = new Webcam(document.getElementById("camera"), "user", document.getElementById("camera-canvas"));
  const photoContainer = document.getElementById("photo-container");
  document.getElementById("flip-camera-button").addEventListener("click", async () => {
    webcam.flip();
    await webcam.start();
  });
  document.getElementById("take-photo-button").addEventListener("click", () => {
    const photo = webcam.snap();
    const img = document.createElement("img");
    img.setAttribute("src", photo);
    photoContainer.appendChild(img);
  });
  await webcam.start();
})();
