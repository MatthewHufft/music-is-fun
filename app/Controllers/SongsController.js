import songService from "../Services/SongsService.js";
import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let song = ProxyState.songs
  let template = ''
  song.forEach(s => template += s.Template)
  document.getElementById('songs').innerHTML = template
}

/**Draws the Users saved songs to the page */
function _drawMyMusic() {
  let template = ''
  let songs = ProxyState.myMusic
  songs.forEach(s => template += s.Template)
  document.getElementById('myMusic').innerHTML = template
}


function _drawActive() {
  if (ProxyState.currentSong) {
    document.getElementById('currentSong').innerHTML = ProxyState.currentSong.currentSongTemplate
  } else document.getElementById('currentSong').innerHTML = ''
}
//Public
export default class SongsController {
  constructor() {
    ProxyState.on("songs", _drawResults)
    ProxyState.on("currentSong", _drawActive)
    ProxyState.on("myMusic", _drawMyMusic)
    //TODO Don't forget to register your listeners and get your data
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }
  _viewSong(_id) {
    try {
      songService._viewSong(_id)
    } catch (error) {
      console.error(error);
    }
  }

  _viewMySong(_id) {
    try {
      songService._viewMySong(_id)
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(id) {
    try {
      songService.addSong(id)
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) {
    try{
      songService.removeSong(id)
    } catch (error) {
      console.error(error);
    }
   }
}
