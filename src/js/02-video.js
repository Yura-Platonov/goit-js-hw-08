import Player from '@vimeo/player';
import storage from './storage';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

//Перевірка та встановлення часу відтворення відео
const setCurrentTime = storage.load(STORAGE_KEY);
if (setCurrentTime) {
    player.setCurrentTime(setCurrentTime || 0);
}

//Збереження часу відтворення
const throttledFunction = throttle((data) => {
    storage.save(STORAGE_KEY, data.seconds);
}, 1000);

player.on('timeupdate', function(data) {
  throttledFunction(data);
});
