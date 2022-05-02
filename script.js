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
		const channel = elm.querySelector(".ytd-channel-name a")
		const video = elm.querySelector("a#video-title")
		const thumbnail = elm.querySelector("img")
		const duration = elm.querySelector("ytd-thumbnail-overlay-time-status-renderer")
		videos.push({
			channel: { link: channel.href, name: channel.innerText },
			title: video.title,
			link: video.href,
			thumbnailSrc: thumbnail.src,
			duration: duration.innerText
		})
	}
	copy(videos)
	console.log(`We copied ${videos.length} videos to your clipboard`)
	window.videos = videos
	return videos
}

const observer = new MutationObserver(debounce(function(mutationsList, observer) {
	getData()
	setTimeout(scrollToTheBottom, 5000)
}));

observer.observe(document.querySelector("#contents"), { attributes: true, childList: true, subtree: true });
