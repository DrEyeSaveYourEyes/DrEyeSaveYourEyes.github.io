(async () => {
	const url = "https://teachablemachine.withgoogle.com/models/4HlANA7_f/";
	const model = await tmImage.load(`${url}model.json`, `${url}metadata.json`);
	
	document.getElementById("test-container").classList.remove("loading");

	const cameraSelect = document.getElementById("camera-select");
	const cameraFlipSwitch = document.getElementById("camera-flip-switch")
	const cameraVideo = document.getElementById("camera-video");
	const cameraControlTabClassList = document.querySelector(".camera-tab").classList;
	const cameraMessage = document.getElementById("camera-message");

	function clearChildNodes(element) {
		for (let c = element.firstChild; c !== null; c = element.firstChild) {
			element.removeChild(c);
		}
	}

	function stopCamera() {
		if (cameraVideo.srcObject !== null) {
			for (const track of cameraVideo.srcObject.getTracks()) {
				track.stop();
			}
		}
	}

	async function streamCamera(deviceId) {
		if (deviceId === "") {
			return;
		}
		const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: deviceId } } });
		stopCamera();
		cameraVideo.srcObject = mediaStream;
		cameraVideo.dataset.deviceId = deviceId;
		await cameraVideo.play();
	}

	cameraSelect.addEventListener("change", async () => {
		await streamCamera(cameraSelect.options[cameraSelect.selectedIndex].value);
	});

	cameraFlipSwitch.addEventListener("change", () => {
		cameraVideo.classList.toggle("flipped");
	});

	async function updateDeviceList() {
		try {
			await navigator.mediaDevices.getUserMedia({ video: true });
			clearChildNodes(cameraSelect);
			const devices = (await navigator.mediaDevices.enumerateDevices()).filter(d => d.kind === "videoinput");
			if (devices.length === 0) {
				delete cameraVideo.dataset.deviceId;
				cameraControlTabClassList.add("no-camera");
				cameraMessage.textContent = "找不到攝影機";
			}
			else {
				let isVideoDevicePresent = false;
				for (const device of devices) {
					const option = document.createElement("option");
					option.setAttribute("value", device.deviceId);
					if (device.deviceId === cameraVideo.dataset.deviceId) {
						isVideoDevicePresent = true;
						option.setAttribute("selected", "");
					}
					option.textContent = device.label;
					cameraSelect.appendChild(option);
				}
				if (isVideoDevicePresent === false) {
					await streamCamera(devices[0].deviceId);
				}
				cameraControlTabClassList.remove("no-camera");
			}
		}
		catch (e) {
			cameraMessage.textContent = e.name === "NotAllowedError" ? "請允許本網站存取攝影機" : e.message;
		}
	}

	document.querySelector(".upload-tab-link").addEventListener("click", () => {
		stopCamera();
		cameraVideo.srcObject = null;
		delete cameraVideo.dataset.deviceId;
	});
	document.querySelector(".camera-tab-link").addEventListener("click", updateDeviceList);
	navigator.mediaDevices.addEventListener("devicechange", () => {
		if (cameraControlTabClassList.contains("active")) {
			updateDeviceList();
		}
	});
})();