const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')

const music = document.querySelector("audio")
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')

const currentTimeElement = document.getElementById('current-time')
const durationElement = document.getElementById('duration')

const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

const volumeContainer = document.getElementById('volume-container')
const currentVolume = document.getElementById('current-volume')


// SONGS array
const songs = [
    {
        fileName: 'jacinto-1.mp3',
        songName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
        songImg: 'jacinto-1.jpg'
    },
    {
        fileName: 'jacinto-2.mp3',
        songName: 'Super title second song',
        artist: 'Super Artist',
        songImg: 'jacinto-2.jpg'
    },
    {
        fileName: 'jacinto-3.mp3',
        songName: 'You will never know',
        artist: 'Anonymous',
        songImg: 'jacinto-3.jpg'
    },
    {
        fileName: 'metric-1.mp3',
        songName: 'Dont try to stop me',
        artist: 'Artist Programmer',
        songImg: 'metric-1.jpg'
    }
]

//check if playing
let isPlaying = false

// Play song function 
function playSong(){
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()
}

// Pause song function 
function pauseSong(){
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

playBtn.addEventListener('click', () => {
    if(isPlaying){
        pauseSong()
    } else {
        playSong()
    }
} )

// Loading Song on the DOM
function loadSong(song){
    title.textContent = song.songName
    artist.textContent = song.artist
    music.src = `music/${song.fileName}`
    image.src = `img/${song.songImg}`
}

//current SONG
let songIndex = 0

function nextSong(){
    if(songIndex < songs.length - 1){        
        songIndex++
        
    } else {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

function prevSong(){
    if(songIndex > 0){        
        songIndex--
    } else {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

// load first song when accessing DOM
loadSong(songs[songIndex])

// Update progress bar & time
function updateProgressBar(event){
    if(isPlaying){
        const { duration, currentTime } = event.srcElement
        // console.log(duration, currentTime)

        // here we'll update the progress bar width
        const progressPercentage = (currentTime/duration) * 100
        progress.style.width = `${progressPercentage}%`

        // Culculating display for duration 
        const durationMinutes = Math.floor(duration / 60) // extracting duration minutes int
        let durationSeconds = Math.floor(duration % 60) //extracting duration seconds int
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`
        }  
        
        // delay display durationElement to avoid NaN display
        if(durationSeconds){
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`
        }

        // Culculating display for duration 
        const currentMinutes = Math.floor(currentTime / 60) // extracting current minutes int
        let currentSeconds = Math.floor(currentTime % 60) //extracting current seconds int
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`
       
    }
}

function setProgressBar(event){
    const width = this.clientWidth  // total width of the element emitting the event
    const clickX = event.offsetX    // cursor position from the left border of the element emitting the event
    
    console.log(width, clickX)

    const { duration } = music  

    // music element has an attribute called currentTime which sets or returns the current playback position in the audio/video  (in seconds)
    music.currentTime = (clickX / width) * duration
}


// volume section
music.volume = 0.5

currentVolume.style.width = (music.volume * 100) + "%"

currentVolume.attributes.title.nodeValue = music.volume * 100


// set Volume functions
function setVolume(event){
    const width = this.clientWidth
    const clickX = event.offsetX

    const volumePercentage = Math.floor((clickX / width) * 100)

    // setting the style width and title attribute value to the computed volume percentage at the same time
    currentVolume.style.width = currentVolume.attributes.title.nodeValue = volumePercentage + '%'    

    music.volume = volumePercentage / 100

}

// All event listeners are here
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

music.addEventListener('timeupdate', updateProgressBar)

// whe clicking on progress bar we call a fn setProgressBar
progressContainer.addEventListener('click', setProgressBar)

// listening to the ended event on the current media to get to the next one
music.addEventListener('ended', nextSong)

// volume container event listener
volumeContainer.addEventListener('click', setVolume)

// console.log()