var ffi = require('ffi');

// Code below is based on the awesome work that was done in Toastify: https://toastify.codeplex.com/

// for simplicity we use the specific types that match our use case: ascii strings and 32-bit pointer
var user32 = ffi.Library('user32', {
  'FindWindowA': [
    'int32', ['string', 'string']
  ],
  'SendMessageA': [
    'int32', ['int32', 'int32', 'int32', 'int32']
  ]
});

var findWindow = function (className, windowName) {
  return user32.FindWindowA(className, windowName);
}

var sendMessage = function (hWnd, msg, wParam, lParam) {
  return user32.SendMessageA(hWnd, msg, wParam, lParam);
}

// constants
var SPOTIFY_WINDOW_CLASS_NAME = 'SpotifyMainWindow';
var SPOTIFY_CMD_NEXT = 720896;
var SPOTIFY_CMD_PREV = 786432;
var SPOTIFY_CMD_PAUSE_PLAY = 917504;
var SPOTIFY_CMD_VOLUME_DOWN = 589824;
var SPOTIFY_CMD_VOLUME_UP = 655360;
var SPOTIFY_CMD_STOP = 851968;
var SPOTIFY_CMD_MUTE = 524288;

function sendSpotifyCmd(commandCode) {
  var window = findWindow(SPOTIFY_WINDOW_CLASS_NAME, null);

  if (window <= 0) {
    throw new Error('unable to find spotify window, FindWindow return value is:', window);
  }

  var result = sendMessage(window, 0x0319, 0, commandCode);
}

exports.togglePausePlay = sendSpotifyCmd.bind(null, SPOTIFY_CMD_PAUSE_PLAY);
exports.next = sendSpotifyCmd.bind(null, SPOTIFY_CMD_NEXT);
exports.prev = sendSpotifyCmd.bind(null, SPOTIFY_CMD_PREV);
exports.volumeUp = sendSpotifyCmd.bind(null, SPOTIFY_CMD_VOLUME_UP);
exports.volumeDown = sendSpotifyCmd.bind(null, SPOTIFY_CMD_VOLUME_DOWN);
exports.stop = sendSpotifyCmd.bind(null, SPOTIFY_CMD_STOP);
exports.toggleMute = sendSpotifyCmd.bind(null, SPOTIFY_CMD_MUTE);
