const video = document.querySelector('#player__video');
const playback = $('.player__playback');
const player = $('.player');
const play = document.querySelector('#play');
const splash = document.querySelector('#splash');
const start = $('.player__start');

play.addEventListener('click', e => {
  player.toggleClass('active');
  start.toggleClass('act');
  if (video.paused) {
    video.play();
  }
  else {
    video.pause();
  }
});

splash.addEventListener('click', e => {
  player.toggleClass('active');
  start.toggleClass('act');
  if (video.paused) {
    video.play();
  }
  else {
    video.pause();
  }
});


//звук
const sound = document.querySelector('#volume');
const max_sound = 100;
sound.min = 0;
sound.max = max_sound;

sound.addEventListener('mouseup', e => {
  video.volume = sound.value / max_sound;
});


//беззвуч
const mute = document.querySelector('#mute');
let numOfClicks = 0;
mute.addEventListener('click', e => {
  ++numOfClicks;
  if (numOfClicks % 2 !== 0) {
    video.muted = true
  } else {
    video.muted = false
  };
});


//продолжительность

const durationControl = document.querySelector('#durationLevel');
const interval = setInterval(updateDuration);

durationControl.min = 0;
durationControl.value = 0;

durationControl.addEventListener('mousedown', e => {
  video.pause();
  clearInterval(interval);
});

durationControl.addEventListener('mouseup', e => {
  video.currentTime = durationControl.value;
  interval = setInterval(updateDuration);
});

function updateDuration() {
  durationControl.value = video.currentTime;
};

//вариант player youtube

// let player;
// const playerContainer = $(".player");


// let eventsInit = () => {
//   $(".player__start").click(e => {
//     e.preventDefault();

//     if (playerContainer.hasClass("paused")) {
//       player.pauseVideo();
//     } else {
//       player.playVideo();
//     }
//   });

//   $(".player__playback").click(e => {
//     const bar = $(e.currentTarget);
//     const clickedPosition = e.originalEvent.layerX;

//     const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
//     const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

//     $(".player__playback-button").css({
//       left: `${newButtonPositionPercent}%`
//     });

//     player.seekTo(newPlaybackPositionSec);
//   });

//   $(".player__splash").click(e => {
//     player.playVideo();
//   })
// };


// const formatTime = timeSec => {
//   const roundTime = Math.round(timeSec);

//   const minutes = addZero(Math.floor(roundTime / 60));
//   const seconds = addZero(roundTime - minutes * 60);

//   function addZero(num) {
//     return num < 10 ? `0${num}` : num;
//   }

//   return `${minutes} : ${seconds}`;
// };


// const onPlayerReady = () => {
//   let interval;
//   const durationSec = player.getDuration();

//   $(".player__duration-estimate").text(formatTime(durationSec));

//   if (typeof interval !== "undefined") {
//     clearInterval(interval);
//   }

//   interval = setInterval(() => {
//     const completedSec = player.getCurrentTime();
//     const completedPercent = (completedSec / durationSec) * 100;

//     $(".player__playback-button").css({
//       left: `${completedPercent}%`
//     });

//     $(".player__duration-completed").text(formatTime(completedSec));
//   }, 1000);
// };

// const onPlayerStateChange = event => {
//   switch (event.data) {
//     case 1: //pause
//       playerContainer.addClass("active");
//       playerContainer.addClass("paused");
//       break;

//     case 2: //play
//       playerContainer.removeClass("active");
//       playerContainer.removeClass("paused");
//       break;
//   }
// };

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("yt-player", {
//     height: '390',
//     width: '660',
//     videoId: 'gvYNxcZQ3B4',
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     },
//     playerVars: {
//       controls: 0,
//       disablekb: 1,
//       showinfo: 0,
//       rel: 0,
//       autoplay: 0,
//       modestbranding: 1
//     }
//   });
// }

// eventsInit();
