const saveButton = document.getElementById("save") as HTMLButtonElement;
const cleanButton = document.getElementById("clean") as HTMLButtonElement;

saveButton.addEventListener("click", () => {
	const keywords = (
		document.getElementById("keywords") as HTMLTextAreaElement
	).value
		.split(",")
		.map((k) => k.trim());

	chrome.storage.local.set({ keywords }, () => {
		alert("Keywords saved!");
	});
});

cleanButton.addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs[0]?.id) {
			chrome.scripting.executeScript({
				target: { tabId: tabs[0].id },
				files: ["content.js"],
			});
		}
	});
});
