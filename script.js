const image = document.querySelector('img');
const music = document.querySelector('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const previousBtn = document.getElementById('previous');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const currentTimeElem = document.getElementById('current-time');
const durationElem = document.getElementById('duration');

const songs = [
  {
    imgName: 'Artcell-1',
    trackName: 'Aniket Prantor',
    artist: 'Artcell',
  },
  {
    imgName: 'Artcell-2',
    trackName: 'Chile Kothar Shepai',
    artist: 'Artcell',
  },
  {
    imgName: 'Artcell-1',
    trackName: 'Dukkho Bilash',
    artist: 'Artcell',
  },
  {
    imgName: 'Artcell-2',
    trackName: 'Kandari Hushiar',
    artist: 'Artcell',
  },
  {
    imgName: 'Artcell-2',
    trackName: 'Kara Oi Louho Kopat',
    artist: 'Artcell',
  },
];

// Check if playing
let isPlaying = false;

function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or pause event listener

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM

function loadSong(song) {
  title.textContent = song.trackName;
  artist.textContent = song.artist;
  music.src = `music/Artcell - ${song.trackName}.mp3`;
  image.src = `img/${song.imgName}.png`;
}

let currentSongIndex = 0;

function nextSong() {
  currentSongIndex++;
  if (currentSongIndex > songs.length - 1) {
    currentSongIndex = 0;
  }

  console.log(currentSongIndex);
  loadSong(songs[currentSongIndex]);
  playSong();
}

function previousSong() {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  console.log(currentSongIndex);
  loadSong(songs[currentSongIndex]);
  playSong();
}

loadSong(songs[currentSongIndex]);

// Update progress bar and time

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    //console.log(duration, currentTime);

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calaculate the duration of the current song
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      durationElem.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    if (currentSeconds) {
      currentTimeElem.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
}

// Set Progress Bar
function setProgressBar(e) {
  //  console.log(e);
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

previousBtn.addEventListener('click', previousSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);
