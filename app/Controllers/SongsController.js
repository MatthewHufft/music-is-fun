import songService from "../Services/SongsService.js";
import { ProxyState } from "../AppState.js";

//Private
/**Draws the Search results to the page */
function _drawResults() { 
  let song = ProxyState.songs
  let template = ''
  song.forEach(s => template += `
    
  `)
  document.getElementById('songs').innerHTML = template
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() { }

//Public
export default class SongsController {
  constructor() {
    _drawResults()
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

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(id) { }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) { }
}
