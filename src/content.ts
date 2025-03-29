// Set to track already hidden tweets
const hiddenTweets = new Set<string>();

// Debounce function to prevent excessive DOM checks
const debounce = (func: Function, delay: number) => {
	let timer: number;
	return (...args: any[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => func(...args), delay);
	};
};

// Function to extract tweet text
const getTweetText = (tweet: HTMLElement): string => {
	const textElement = tweet.querySelector("div[lang] span") as HTMLElement;
	return textElement?.textContent?.trim() || "";
};

// Function to hide matching tweets
const hideMatchingTweets = (keywords: (string | RegExp)[]) => {
	const tweets = document.querySelectorAll("article");

	tweets.forEach((tweet) => {
		const tweetText = getTweetText(tweet as HTMLElement);

		if (tweetText && !hiddenTweets.has(tweetText)) {
			const isMatch = keywords.some((kw) => {
				if (typeof kw === "string") {
					return tweetText.toLowerCase().includes(kw.toLowerCase());
				} else {
					return kw.test(tweetText);
				}
			});

			if (isMatch) {
				// Hide the tweet
				(tweet as HTMLElement).style.display = "none";
				console.log(`🚫 Tweet hidden: "${tweetText}"`);

				// Add the tweet text to the set to prevent duplicate hiding
				hiddenTweets.add(tweetText);
			}
		}
	});
};

// Function to observe DOM changes
const observeTweets = (keywords: (string | RegExp)[]) => {
	const observer = new MutationObserver(
		debounce(() => {
			hideMatchingTweets(keywords);
		}, 500) // Debounce to optimize performance
	);

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});

	console.log("🚀 Real-time tweet filtering activated!");
};

// Function to convert keywords into regex patterns
const getRegexKeywords = (keywords: string[]): (string | RegExp)[] => {
	return keywords.map((kw) => {
		try {
			if (kw.startsWith("/") && kw.endsWith("/")) {
				return new RegExp(kw.slice(1, -1), "i"); // Case-insensitive regex
			}
			return kw; // Plain string
		} catch (error) {
			console.warn(`Invalid regex: ${kw}`);
			return kw;
		}
	});
};

// Load keywords and start filtering
chrome.storage.local.get("keywords", (data) => {
	const keywords: string[] = data.keywords || [];

	if (keywords.length) {
		const regexKeywords = getRegexKeywords(keywords);
		observeTweets(regexKeywords);
	} else {
		console.log("⚠️ No keywords found.");
	}
});
