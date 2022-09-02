var audio = new Audio("audios/Kesariya.mp3");
var isPlaying = false;
var playPauseBtn = document.querySelector(".play-pause");
var playPauseBtnMobile = document.querySelector(".play-pause-mobile");
var seekSlider = document.querySelector("#seek-slider");
var updateTimer;
var currentTime = document.querySelector(".current-time");
var duration = document.querySelector(".duration");
var volumeSlider = document.querySelector("#volume");
var isMute = false;
var previousVolume;
var muteUnmuteBtn = document.querySelector(".mute-unmute");
var seekSliderMobile = document.querySelector("#seek-slider-mobile");

function time(t){
    t = Math.round(t);
    if( t%60 < 10){
        return (Math.floor(t/60) + ":0" + t%60);
    }
    else{
        return (Math.floor(t/60) + ":" + t%60);
    }
}

audio.load();

audio.onloadeddata = function(){
    duration.textContent = time(audio.duration);
    volumeSlider.value = audio.volume*100;
}

function muteUnmute(){
    if(isMute){
        audio.volume = previousVolume;
        volumeSlider.value = previousVolume*100;
        isMute = false;
        muteUnmuteBtn.setAttribute("src", "images/unmute.png");
    }
    else{
        previousVolume = audio.volume;
        audio.volume = 0;
        volumeSlider.value = 0;
        isMute = true;
        muteUnmuteBtn.setAttribute("src", "images/mute.png");
    }
}

function setVolume(){
    audio.volume = volumeSlider.value/100;
}

function playPauseAudio(){
    if(isPlaying == false){
        playPauseBtn.setAttribute("src","images/pause.png");
        playPauseBtnMobile.setAttribute("src", "images/pause-mobile.png");
        audio.play();
        isPlaying = true;
        updateTimer = setInterval(seekUpdate, 1000);
    }
    else if(isPlaying == true){
        playPauseBtn.setAttribute("src","images/play.png");
        playPauseBtnMobile.setAttribute("src", "images/play-mobile.png");
        audio.pause();
        isPlaying = false;
        clearInterval(updateTimer);
    }
    else{
        console.log("Error : value of control is neither play nor pause\nValue of control = "+control);
    }
}

function seekTo(){
    audio.currentTime = seekSlider.value*audio.duration/100;
}

function seekUpdate(){
    seekSlider.value = (audio.currentTime/audio.duration)*100;
    seekSliderMobile.style.width = (audio.currentTime/audio.duration)*100 +"%";
    currentTime.textContent = time(audio.currentTime);
    if(audio.currentTime == audio.duration){
        audio.currentTime = 0;
        seekSlider.value = 0;
        seekSliderMobile.style.width = 0;
        currentTime.textContent = time(0);
        playPauseAudio();
    }
}
