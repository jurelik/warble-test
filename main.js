const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

let buffer;

function play() {
  let toggle = false;
  let req = new XMLHttpRequest();

  req.onload = function () {
    function warble() {
      setTimeout(() => {
        if (toggle === false) {
            source.playbackRate.value = 0.98;
          toggle = true;
          warble();
        }
        else {
          source.playbackRate.value = 1;
          toggle = false;
          warble();
        }
      }, 10);
    };
    let source = context.createBufferSource();
    context.decodeAudioData(req.response, decoded => {
      buffer = decoded;
      source.buffer = decoded;
      source.connect(context.destination);
      source.playbackRate.value = 0.9;
      source.start();
      warble();
    });
  }
  req.open('GET', 'warble.mp3', true);
  req.responseType = 'arraybuffer';
  req.send();
}

