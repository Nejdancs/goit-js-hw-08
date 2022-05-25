import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import '../css/common.css';

const CURRENT_TIME_KEY = 'videoplayer-current-time';

const options = {
  id: 236203659,
  width: 640,
};

const player = new Player('vimeo-player', options);

player.on('timeupdate', throttle(onPlay, 1000));

setCurrentTime();

function onPlay(data) {
  localStorage.setItem(CURRENT_TIME_KEY, data.seconds);
}

function setCurrentTime() {
  const currentTime = localStorage.getItem(CURRENT_TIME_KEY);

  if (currentTime) {
    player.setCurrentTime(currentTime);
  }
}
