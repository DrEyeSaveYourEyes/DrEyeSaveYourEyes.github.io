(async () => {
	const url = "https://teachablemachine.withgoogle.com/models/4HlANA7_f/";
	const model = await tmImage.load(`${url}model.json`, `${url}metadata.json`);
	
	document.getElementById("test-container").classList.remove("loading");
})();