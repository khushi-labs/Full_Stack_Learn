console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('./audio.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myprogressBar');
let gif = document.getElementById('gif');
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('previous');

let songs = [
    {
        songName: "diet mountain dew",
        filePath: "./audio.mp3",
        coverPath: "https://a10.gaanacdn.com/gn_img/albums/MmqK5pEbwR/mqK5YYvKwR/size_m.webp"
    },
    {
        songName: "summertime sadness",
        filePath: "./audio2.mp3",
        coverPath: "https://a10.gaanacdn.com/gn_img/albums/MmqK5pEbwR/mqK5YYvKwR/size_m.webp"
    },
    {
        songName: "young and beautiful",
        filePath: "./audio3.mp3",
        coverPath: "https://a10.gaanacdn.com/gn_img/albums/MmqK5pEbwR/mqK5YYvKwR/size_m.webp"
    },
    {
        songName: "Brooklyn Baby",
        filePath: "./audio4.mp3",
        coverPath: "https://a10.gaanacdn.com/gn_img/albums/MmqK5pEbwR/mqK5YYvKwR/size_m.webp"
    },
];

// ▶️ Play the current song
function playSong() {
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    document.getElementById('currentSongName').innerText = songs[songIndex].songName;
}

// 🔁 Reset all list play buttons to 'play'
function makeAllPlays() {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((el) => {
        el.classList.remove('fa-circle-pause');
        el.classList.add('fa-circle-play');
    });
}

// ▶️/⏸️ Master Play Button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// 🔄 Progress bar updates
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// ⏩ Seek
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// ⏭️ Next
nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong();
    makeAllPlays();
    updateCurrentPlayIcon();
});

// ⏮️ Previous
prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong();
    makeAllPlays();
    updateCurrentPlayIcon();
});

// ✅ Helper: Update the currently playing icon in the list
function updateCurrentPlayIcon() {
    const playButtons = document.getElementsByClassName('songItemPlay');
    if (playButtons[songIndex]) {
        playButtons[songIndex].classList.remove('fa-circle-play');
        playButtons[songIndex].classList.add('fa-circle-pause');
    }
}

// 🎵 Song list play/pause buttons
let songItemPlayButtons = document.getElementsByClassName('songItemPlay');

Array.from(songItemPlayButtons).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);

        // 🔁 If same song is clicked again
        if (songIndex === clickedIndex) {
            if (audioElement.paused) {
                audioElement.play();
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                gif.style.opacity = 1;
            } else {
                audioElement.pause();
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
                gif.style.opacity = 0;
            }
        } else {
            // ▶️ New song clicked
            songIndex = clickedIndex;
            makeAllPlays();
            playSong();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
        }
    });
});
