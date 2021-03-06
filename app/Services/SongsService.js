import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  _viewMySong(_id) {
    let song = ProxyState.myMusic.find(s => s._id == _id)
    ProxyState.currentSong = song
  }
  _viewSong(_id) {
    let song = ProxyState.songs.find(s => s._id == _id)
    ProxyState.currentSong = song
  }
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method

    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
        console.log(res)
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    let res = await sandBoxApi.get()
    //TODO What are you going to do with this result
    let results = res.data.data.map(rawData => new Song(rawData));
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(id) {
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
    let res = await sandBoxApi.post("", ProxyState.currentSong)
    console.log(res)
    ProxyState.currentSong = null
    ProxyState.myMusic = [...ProxyState.myMusic, new Song(res.data.data)]
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
    //TODO Send the id to be deleted from the server then update the store
    let res = await sandBoxApi.delete(id)
    ProxyState.currentSong = null
    let index = ProxyState.myMusic.findIndex(s => s._id == id)
    ProxyState.myMusic.splice(index,1)
    ProxyState.myMusic = ProxyState.myMusic
  }
}

const service = new SongsService();
export default service;
