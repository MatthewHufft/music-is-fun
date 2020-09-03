export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
    this.sandboxSong = false
    if (data.user) {
      this.sandboxSong = true
    }
  }

  get Template() {
    if (this.sandboxSong) {
      return `   <li class="list-group-item grow mb-2 shadow rounded" role= "button" onclick= "app.songsController._viewMySong('${this._id}')" ><img class = "searchRIMG" src="${this.albumArt}"> ${this.artist}, ${this.album}, ${this.title}, Price: $${this.price}</li>`
    }
    return `
    <li class="list-group-item grow mb-2 shadow rounded" role= "button" onclick= "app.songsController._viewSong('${this._id}')" ><img class = "searchRIMG" src="${this.albumArt}"> ${this.artist}, ${this.album}, ${this.title}, Price: $${this.price}</li>
    `;
  }

  get playlistTemplate() {
    return `

        `;
  }

  get currentSongTemplate() {
    return `<div class="card shadow" style="width: 30rem; ">
    <img src="${this.albumArt}" class="card-img-top" alt="...">
    <div class="card-body text-center">
      <h5 class="card-title">${this.artist}, ${this.title}</h5>
      <p class="card-text">Album: ${this.album} | Price: $${this.price}</p>
    </div>
    <div class="card-body d-flex justify-content-around">
    ${this.Button}
    <audio src="${this.preview}" controls></audio>
    </div>
  </div>`;
  }


  get Button() {
    if (this.sandboxSong) {
      return `
       <button class="btn btn-danger" onclick= "app.songsController.removeSong('${this._id}')">Remove Song</button> 
       `
    } else {
      return `<button class="btn btn-primary" onclick= "app.songsController.addSong('${this._id}')">Buy Song</button>`
    }
  }




}