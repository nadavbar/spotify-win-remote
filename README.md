spotifi-win-remote
======================

Remote control your Spotify client on windows using node.js.

Code is based on the awesome work of the <a href="https://toastify.codeplex.com/">Toastify</a> project.

API:

Currently, for simplicity, all API is synchronous:

 - **togglePausePlay** -  pause if Spotify is currently playing, or play if it's paused.
 - **next** - play next song
 - **prev** - play previous song
 - **stop** - stop playing
 - **volumeDown** - toggle volume down
 - **volumeUp** - toggle volume up
 - **toggleMute** - mute if volume is currently not muted, unumute if volume is muted.

 Example:
 
 ```javascript
 var spotify = require('spotify-win-remote');
 // start playing and then play next song
 spotify.togglePlayPause();
 spotify.next();
 ```