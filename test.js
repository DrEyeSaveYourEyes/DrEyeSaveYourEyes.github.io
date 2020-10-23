(async () => {
	const url = "https://teachablemachine.withgoogle.com/models/4HlANA7_f/";
    const model = await tmImage.load(`${url}model.json`, `${url}metadata.json`);
    
    const testContainerClassList = document.getElementById("test-container").classList;
    testContainerClassList.remove("loading");
    testContainerClassList.add("loaded");
})();