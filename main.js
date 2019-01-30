const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

let buffer;

function play() {
  let toggle = false;
  let req = new XMLHttpRequest();

  req.onload = function () {
    function square() {
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
      }, 50);
    };
    function sine() {
      setTimeout(() => {
        console.log(Math.sin(2 * Math.PI * context.currentTime));
        source.playbackRate.value = 1 + Math.sin(2 * Math.PI * 15 * context.currentTime) * 0.03;
        sine();
      }, 5);
    };

    let source = context.createBufferSource();
    context.decodeAudioData(req.response, decoded => {
      buffer = decoded;
      source.buffer = decoded;
      source.connect(context.destination);
      source.playbackRate.value = 0.9;
      source.start();
      sine();
    });
  }
  req.open('GET', 'warble.mp3', true);
  req.responseType = 'arraybuffer';
  req.send();
};

function one() {
  navigator.mediaDevices.enumerateDevices()
  .then (function(muzak) {
    console.log(muzak);
  });
}

function mic(device) {
  navigator.mediaDevices
    .getUserMedia({audio: {
      deviceId: device,
      echoCancellation: false
    }})
    .then(muzak => {
      console.log(muzak);
      let source = context.createMediaStreamSource(muzak);
      source.connect(context.destination);
    });
};