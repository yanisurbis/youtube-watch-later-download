function scrollToTheBottom() {
	document.querySelector('#continuations')
  .scrollIntoView({
    behavior: 'smooth'
  });
}

function debounce(func, timeout = 5000){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

function getData() {
	const videoElms = document.querySelectorAll("#container.style-scope.ytd-playlist-video-renderer")
	let videos = []
	for (let elm of videoElms) {
		const channelElm = elm.querySelector(".ytd-channel-name a")
		const videoElm = elm.querySelector("a#video-title")
		const thumbnail = elm.querySelector("img")
		videos.push({
			channel: { link: channelElm.href, name: channelElm.innerText },
			title: videoElm.title,
			link: videoElm.href,
			thumbnailSrc: thumbnail.src
		})
	}
	console.log(`Saved ${videos.length} videos`)
	window.videos = videos
	return videos
}

const observer = new MutationObserver(debounce(function(mutationsList, observer) {
	getData()
	setTimeout(scrollToTheBottom, 5000)
}));

observer.observe(document.querySelector("#contents"), { attributes: true, childList: true, subtree: true });

function saveVideosToClipboard() {
	copy(window.videos)
}
