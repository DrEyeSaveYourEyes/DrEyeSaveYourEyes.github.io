(async () => {
	try {
		const url = "https://teachablemachine.withgoogle.com/models/4HlANA7_f/";
		const model = await tmImage.load(`${url}model.json`, `${url}metadata.json`);
		const maxPredictions = model.getTotalClasses();

		const devices = (await navigator.mediaDevices.enumerateDevices()).filter(d => d.kind === "videoinput");
		if (devices.length === 0) {
			document.body.textContent = "No camera found";
		}
		else {
			const webcam = new tmImage.Webcam(1280, 720, true);
			await webcam.setup();
			webcam.play();
			window.requestAnimationFrame(predictLoop);
			document.getElementById("webcam-container").appendChild(webcam.canvas);
			const labelContainer = document.getElementById("label-container");
			for (let i = 0; i < maxPredictions; i++) {
				labelContainer.appendChild(document.createElement("div"));
			}
		
			async function predictLoop() {
				webcam.update();
				await predict();
				window.requestAnimationFrame(predictLoop);
			}
		
			async function predict() {
				const predictions = await model.predict(webcam.canvas);
				for (let i = 0; i < maxPredictions; i++) {
					labelContainer.childNodes[i].textContent = predictions[i].className + ": " + predictions[i].probability.toFixed(2);
				}
			}
		}
	}
	catch (e) {
		console.error(e);
	}
})();