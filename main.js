const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

let buffer;

let req = new XMLHttpRequest();
req.onload = function () {
  let source = context.createBufferSource();
  context.decodeAudioData(req.response, decoded => {
    buffer = decoded;
    source.buffer = decoded;
    source.start();
    console.log(buffer);
  });
}
req.open('GET', 'warble.mp3', true);
req.responseType = 'arraybuffer';
req.send();

