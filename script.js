(function scrollToTheVeryBottomOfThePlaylistAndSave() {
	const DEFAULT_TIMEOUT = 5000

	function retrieveVideosFromThePage() {
		const videoElms = document.querySelectorAll("#container.style-scope.ytd-playlist-video-renderer")
		let videos = []
		for (let elm of videoElms) {
			const channel = elm.querySelector(".ytd-channel-name a")
			const video = elm.querySelector("a#video-title")
			const thumbnail = elm.querySelector("img")
			const duration = elm.querySelector("#text.ytd-thumbnail-overlay-time-status-renderer")
			videos.push({
				channel: { link: channel?.href, name: channel?.innerText },
				title: video?.title,
				link: video?.href,
				thumbnailSrc: thumbnail?.src,
				duration: duration?.innerText
			})
		}
		return videos
	}

	function saveVideos(videos) {
		copy(videos)
		console.log(`We put ${videos.length} videos to your clipboard`)
		window.videos = videos
		console.log(`We put ${videos.length} videos into window.videos variable`)
		try {
			const playlistTitle = document.querySelector("#title-form")?.innerText ?? `title-${Math.floor(Math.random() * 1000)}`
			const key = `${playlistTitle}-videos`
			localStorage.setItem(key, JSON.stringify(videos));
			console.log(`We put ${videos.length} videos into the local storage under the ${key} key`)
		} catch (e) {
			console.log("Failed to put videos to the local storage")
		}
	}

	function scrollToTheBottom() {
		document.querySelector('#continuations')
			  .scrollIntoView({
			    behavior: 'smooth'
			  });
	}

	function debounceWithFallback(func, funcFallback, timeout = DEFAULT_TIMEOUT){
	  let timer = setTimeout(() => { funcFallback(); }, timeout);
	  return (...args) => {
	    clearTimeout(timer);
	    timer = setTimeout(() => { func(args); }, timeout);
	  };
	}

	const observer = new MutationObserver(debounceWithFallback(scrollToTheBottom, () => {
		saveVideos(retrieveVideosFromThePage())
	}));

	observer.observe(document.querySelector("#contents"), { attributes: true, childList: true, subtree: true });

	scrollToTheBottom()
	console.log(`Please wait for ${DEFAULT_TIMEOUT / 1000} seconds...`)
})()
