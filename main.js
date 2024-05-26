let audios = {
	iwitw: {
		title: 'Backstreet Boys - I Want It That Way',
		music: new Audio('./media/audios/iwantitthatway.mp3'),
		isInteractive: false,
		cover: {
			isVideo   : true,
			source    : './media/covers/bday_video_1-1.mp4'
		}
	},
	UA: {
		title: 'Ще не вмерла України',
		music: new Audio('./media/audios/ua.mp3'),
		isInteractive: false,
		cover: {
			isVideo   : false,
			source    : './media/covers/coat_ua.jpg'
		}
	},
	hello_darling: {
		title: 'Hello, Darling. Don\'t be shy',
		music: new Audio('./media/audios/hello_darling.mp3'),
		isInteractive: true,
		cover: {
			isVideo   : false,
			source    : './media/covers/astarion.jpg'
		}
	},
	brazil: {
		title: 'BRAZIL MENTIONED!!!',
		music: new Audio('./media/audios/mentioned.mp3'),
		isInteractive: true,
		cover: {
			isVideo   : false,
			source    : './media/covers/mentioned.jpg'
		}
	},
	wakeup: {
		title: 'IT\'S TIME',
		music: new Audio('./media/audios/itstime.mp3'),
		isInteractive: true,
		cover: {
			isVideo   : false,
			source    : './media/covers/itstime.jpg'
		}
	},
	zaza: {
		title: 'ZAAZAAAAAAAAAAA',
		music: new Audio('./media/audios/zaza.mp3'),
		isInteractive: true,
		cover: {
			isVideo   : true,
			source    : './media/covers/zaza.mp4'
		}
	},
	solong: {
		title: 'It\'s been 84 years',
		music: new Audio('./media/audios/solong.mp3'),
		isInteractive: true,
		cover: {
			isVideo   : true,
			source    : './media/covers/solong.mp4'
		}
	},
	wine: {
		title: '🍷',
		music: new Audio('./media/audios/wine.mp3'),
		isInteractive: true,
		cover: {
			isVideo   : true,
			source    : './media/covers/wine.mp4'
		}
	},
	happy: {
		title: 'HAAAAAAAAAAAAAPPY DAY',
		music: new Audio('./media/audios/happy.mp3'),
		isInteractive: true,
		cover: {
			isVideo   : true,
			source    : './media/covers/happy.mp4'
		}
	},
	fish: {
		title: 'OMG TERRARIA FISH',
		music: new Audio('./media/audios/fish.mp3'),
		isInteractive: true,
		cover: {
			isVideo   : true,
			source    : './media/covers/fish.mp4'
		}
	},
	finesse: {
		title: 'Very fancy, sweet friend',
		music: new Audio('./media/audios/finesse.mp3'),
		isInteractive: true,
		cover: {
			isVideo   : true,
			source    : './media/covers/finesse.mp4'
		}
	},
	drip: {
		title: 'But also very cool 😎',
		music: new Audio('./media/audios/drip.mp3'),
		isInteractive: true,
		cover: {
			isVideo   : true,
			source    : './media/covers/drip.mp4'
		}
	},
	karlach: {
		title: 'Your favorite demon lady',
		music: new Audio('./media/audios/Karlach.mp3'),
		isInteractive: true,
		cover: {
			isVideo   : true,
			source    : './media/covers/Karlach.mp4'
		}
	},
};

let currentlyPlaying = null;
let previouslyPlaying = null;
let isPlaying = false;
let pausedSong = false;
let coverElement = document.querySelector('div.cover');

let playButonn = document.querySelector('button#play i');
function play(audio, pausedSong) {
	if(!pausedSong && !audio.isInteractive) {
		if(!currentlyPlaying || currentlyPlaying) {
			audio.music.play();

			if(currentlyPlaying && !currentlyPlaying.isInteractive) {
				previouslyPlaying = currentlyPlaying;
			}

			if(!currentlyPlaying && !audio.isInteractive) {
				currentlyPlaying = audio;
			}
		}

		if(audio !== currentlyPlaying && !audio.isInteractive) {
			pause();
			audio.music.play();

			if(!currentlyPlaying.isInteractive)  {
				previouslyPlaying = currentlyPlaying;
			}
			currentlyPlaying = audio;
		}
	}

	if(audio.isInteractive) {
		pause();
		audio.music.play();
		
		if(!currentlyPlaying.isInteractive) {
			previouslyPlaying = currentlyPlaying;
		}

		currentlyPlaying = audio;
	}

	isPlaying = !currentlyPlaying.music.paused
	
	updateInfo(audio);
	changeCover(audio.cover);
}

function pause() {
	currentlyPlaying.music.pause();
	isPlaying = false;
	playButonn.className = 'fi fi-br-play';
}

function updateInfo(info) {
	let title = document.querySelector('p.music-title');
	title.innerHTML = info.title + '<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target=_blank><i class="fi fi-br-info" id="info"></i></a>';

	if(isPlaying) {
		playButonn.className = 'fi fi-br-pause';
	}
}

function changeCover(cover) {
	if(cover.isVideo) {
		let coverVideo = coverElement.querySelector('video');
		let video = document.createElement('video');

		if(coverVideo) {
			if(cover.source === coverVideo.getAttribute('src')) {
				return true;
			}
		}

		video.src      = cover.source;
		video.autoplay = true;
		video.loop     = false;
		video.muted    = true;
		coverElement.innerHTML = null;
		coverElement.appendChild(video);
		coverElement.style.background = null;
		
		return true;
	}


	coverElement.innerHTML = '';
	coverElement.style.background = `url(${cover.source}) no-repeat center center/cover`;
	coverElement.style.opacity = 1;
}

let lastRewindTime = 0;
function rewind() {
	if (currentlyPlaying) {
		currentlyPlaying.music.currentTime -= 5;
		if(currentlyPlaying.music.currentTime == 0) {
			let currentTime = Date.now();

			if((currentTime - lastRewindTime) <= 2000) {
				previouslyPlaying.music.currentTime = 0;

				if(previouslyPlaying) {
					play(previouslyPlaying);
				}
			}

			lastRewindTime = currentTime;
		}
	}
}

function forward() {
	if (currentlyPlaying) {
		currentlyPlaying.music.currentTime += 5;
	}
}

document.querySelector('button#play').addEventListener('click', () => {
	if (currentlyPlaying) {
		isPlaying ? pause(false) : play(currentlyPlaying);
		pausedSong = currentlyPlaying.music.paused;

		if(coverElement.querySelector('video')) {
			if(currentlyPlaying.cover.isVideo && currentlyPlaying.music.paused) {
				coverElement.querySelector('video').pause();
			} else {
				coverElement.querySelector('video').play();
			}
		}
	}
});

document.querySelector('button#rewind').addEventListener('click', rewind);
document.querySelector('button#forward').addEventListener('click', forward);

document.querySelector('button.button2').addEventListener('click', () => {
	document.querySelector('.initial-screen').style.display = 'none';
	document.querySelector('.letter').style.opacity         = 1;
	document.querySelector('.media-control').style.opacity  = 1;
	audios.iwitw.music.volume = 0.13;
	audios.iwitw.music.currentTime = 41.50;
	play(audios.iwitw);
});

document.querySelector('.ua-flag').addEventListener('click', () => {
	play(audios.UA);
});

let interactive_words = document.querySelectorAll('.interactive-word');
interactive_words.forEach(word => {
	word.addEventListener('click', () => {
		if(currentlyPlaying && isPlaying) {
			pause(currentlyPlaying);
			
			if(currentlyPlaying.isInteractive) {
				currentlyPlaying.music.currentTime = 0;
			}
		}
		play(audios[word.dataset.audio]);
	});
});

Object.values(audios).forEach(audio => {
	audio.music.addEventListener('timeupdate', () => {
		if(audio.music.currentTime === audio.music.duration) {
			isPlaying = false;
			audio.music.currentTime = 0;
			playButonn.className = 'fi fi-br-play';
			
			currentlyPlaying = previouslyPlaying;

			play(previouslyPlaying, pausedSong);
		}
	})
});

