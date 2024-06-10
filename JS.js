// Variables / Selectors

let songIndex = 0;
let audio = new Audio('Songs/0.mp3');   // Default song
let menuplay = document.getElementById('menuplay');     // Targeting 'play' btn in Progress bar
let progressbar = document.getElementById('progressbar');   // Targeting ' input : range '
let songitems = Array.from(document.getElementsByClassName('songitems'));   // An error is occurring 'songitems.forEach is not a function'. Html collection 'element.getElementsByTagName('img')' , so for-each cannot be used. Array.from() coverts HTML collection into Array.
let beatImg = document.getElementById('gif');
let menuSongname = document.getElementById('menuSongname');
let volumebar = document.getElementById('volume');
let ON = "beat 0.25s ease-out infinite";

// Data (2d array)
let songs = [
    { songname: 'Best of Me', filepath: 'Songs/0.mp3', coverpath: 'Images/best of me.jpg' },
    { songname: 'Careless', filepath: 'Songs/1.mp3', coverpath: 'Images/careless.jpg' },
    { songname: 'Cold', filepath: 'Songs/2.mp3', coverpath: 'Images/cold.jpg' },
    { songname: 'Convinction', filepath: 'Songs/3.mp3', coverpath: 'Images/convinction.jpg' },
    { songname: 'Destiny', filepath: 'Songs/4.mp3', coverpath: 'Images/destiny.jpg' },
    { songname: 'Failure', filepath: 'Songs/5.mp3', coverpath: 'Images/failure.jpg' },
    { songname: 'Fight back', filepath: 'Songs/6.mp3', coverpath: 'Images/fight back.jpg' },
    { songname: 'Grateful', filepath: 'Songs/7.mp3', coverpath: 'Images/grateful.jpeg' },
    { songname: 'Rumours', filepath: 'Songs/8.mp3', coverpath: 'Images/rumours.jpg' },
    { songname: 'Soldier', filepath: 'Songs/9.mp3', coverpath: 'Images/soldier.webp' },
    { songname: 'Unstoppable', filepath: 'Songs/10.mp3', coverpath: 'Images/unstoppable.jpg' },
];

const url = 'https://spotify23.p.rapidapi.com/search/?q=motivation&type=multi&offset=0&limit=1&numberOfTopResults=1';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '082da7cf96msh6228039cc642b9ap12c9fejsn1ee36acd2ca5',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
};

// Advance level of API
// async function apimusic() {
//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         console.log(result.tracks.items[0].data.artists.items[0].profile.name);
//         console.log(result.tracks);
//     } catch (error) {
//         console.error(error);
//     }
// }
// apimusic();


// Insert songName and coverPhoto using forEach loop
songitems.forEach((element, i) => {    // element: each <div> present in .songitems is converted into an array element.
    // console.log(i,element);

    // element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('posters')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songnames')[0].innerText = songs[i].songname;

    // Printing all <img> sources
    // let x = element.getElementsByTagName('img')[0].src;     
    // console.log(x);
});

// Playing Audio 

// 1. Using Progressbar
menuplay.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();
        menuplay.classList.remove('fa-play'); // icon change
        menuplay.classList.add('fa-pause');
        beatImg.style.animation = ON; // add beat animation to img
        audio.volume = volumebar.value;
    } else {
        audio.pause();
        menuplay.classList.remove('fa-pause');
        menuplay.classList.add('fa-play');
        beatImg.style.animation = "";
    }
});

// 2. Using individual icons
const resetIcons = () => {
    Array.from(document.getElementsByClassName('playmusic')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-circle-play'); // change play icon to play 
    })
};
Array.from(document.getElementsByClassName('playmusic')).forEach((element) => {
    // console.log(element);
    // console.log(element.id);

    element.addEventListener('click', (e) => {
        // console.log(e);  // Pointer event
        // console.log(e.target);

        resetIcons();

        let songIndex = e.target.id;    //  parseInt(e.target.id)
        console.log(songIndex);
        audio.src = `Songs/${songIndex}.mp3`;
        audio.currentTime = 0;
        audio.play();

        e.target.classList.remove('fa-circle-play'); // change play icon to pause
        e.target.classList.add('fa-pause');

        menuplay.classList.remove('fa-play'); // main menu icons
        menuplay.classList.add('fa-pause');

        beatImg.style.animation = ON;
        menuSongname.innerText = songs[songIndex].songname;   // update songName in main menu
    })
});

// 3. Backward and Forward Button
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {   // base case if it is the first song
        songIndex = 0;  // songIndex --> index of current Song
    } else {
        songIndex -= 1; // decrease by one
    }
    audio.src = `Songs/${songIndex}.mp3`;
    audio.currentTime = 0;
    audio.play();
    menuplay.classList.remove('fa-play');
    menuplay.classList.add('fa-pause');
    menuSongname.innerText = songs[songIndex].songname;
});
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 10) { // base case for last song
        songIndex = 0;
    } else {
        songIndex += 1; // increase by one
    }
    audio.src = `Songs/${songIndex}.mp3`;
    audio.currentTime = 0;
    audio.play();
    menuplay.classList.remove('fa-play');
    menuplay.classList.add('fa-pause');
    menuSongname.innerText = songs[songIndex].songname;
});

// Progress bar
audio.addEventListener('timeupdate', () => {
    // console.log('timeupdate');

    // Update progressBar
    let songPercent = ((audio.currentTime / audio.duration) * 100); // calculate % of song completed
    let progress = songPercent.toFixed(1);

    // var progress = parseInt((audio.currentTime / audio.duration) * 100);
    progressbar.value = progress;   // here 'progress' is in percentage
    // console.log(progress);
}); //   % = current / total * 100

// Interaction with progress bar
progressbar.addEventListener('change', () => {
    let songDuration = progressbar.value * audio.duration / 100; // calculate song duration completed in seconds
    audio.currentTime = songDuration;
    // console.log(time);
})

// Keyboard shortcuts

// Forward / backward
document.addEventListener('keyup', (event) => {
    if (event.key == "ArrowLeft") {
        audio.currentTime = (progressbar.value * audio.duration / 100) - 10; // 10 seconds backward
        console.log(audio.currentTime);
    }
    if (event.key == "ArrowRight") {
        audio.currentTime = (progressbar.value * audio.duration / 100) + 10;
        console.log(audio.currentTime);
    }
})

// Spacebar
document.addEventListener('keyup', (event) => {
    if (event.key == " ") {
        if (audio.paused || audio.currentTime <= 0) {
            audio.play();
            menuplay.classList.remove('fa-play');
            menuplay.classList.add('fa-pause');
            beatImg.style.animation = ON;
        } else {
            audio.pause();
            menuplay.classList.remove('fa-pause');
            menuplay.classList.add('fa-play');
            beatImg.style.animation = "";
        }
    }
    // console.log(event);
})

// Volume up and down
document.addEventListener('keyup', (event) => {
    if (event.key == "ArrowUp") {
        if (audio.volume < 1) {
            audio.volume = audio.volume + 0.25;
            volumebar.value = audio.volume * 100;
            // console.log(volumebar)
        } else {
            audio.volume = 1;
        }
        // console.log(audio.volume)

    }
    if (event.key == "ArrowDown") {
        if (audio.volume > 0) {
            audio.volume = audio.volume - 0.25;
            volumebar.value = audio.volume * 100;
        } else {
            audio.volume = 0;
            // volumebar.value = 0;
        }
        // console.log(audio.volume)
    }
})