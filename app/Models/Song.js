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
      return `   <li class="list-group-item" role= "button" onclick= "app.songsController._viewMySong('${this._id}')" ><img class = "searchRIMG" src="${this.albumArt}"> ${this.artist}, ${this.album}, ${this.title}, Price: $${this.price}</li>`
    }
    return `
    <li class="list-group-item" role= "button" onclick= "app.songsController._viewSong('${this._id}')" ><img class = "searchRIMG" src="${this.albumArt}"> ${this.artist}, ${this.album}, ${this.title}, Price: $${this.price}</li>
    `;
  }

  get playlistTemplate() {
    return `

        `;
  }

  get currentSongTemplate() {
    return `<div class="card">
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


// {resultCount: 50, results: Array(50)}
// resultCount: 50
// results: Array(50)
// 0:
// artistId: 2900850
// artistName: "J-Live"
// artistViewUrl: "https://music.apple.com/us/artist/j-live/2900850?uo=4"
// artworkUrl30: "https://is3-ssl.mzstatic.com/image/thumb/Music/v4/4e/f4/5b/4ef45b85-237c-6d0c-3560-16be10f5ce6a/source/30x30bb.jpg"
// artworkUrl60: "https://is3-ssl.mzstatic.com/image/thumb/Music/v4/4e/f4/5b/4ef45b85-237c-6d0c-3560-16be10f5ce6a/source/60x60bb.jpg"
// artworkUrl100: "https://is3-ssl.mzstatic.com/image/thumb/Music/v4/4e/f4/5b/4ef45b85-237c-6d0c-3560-16be10f5ce6a/source/100x100bb.jpg"
// collectionCensoredName: "The Hear After"
// collectionExplicitness: "explicit"
// collectionId: 164406129
// collectionName: "The Hear After"
// collectionPrice: 11.99
// collectionViewUrl: "https://music.apple.com/us/album/whoever/164406129?i=164406172&uo=4"
// contentAdvisoryRating: "Explicit"
// country: "USA"
// currency: "USD"
// discCount: 1
// discNumber: 1
// isStreamable: true
// kind: "song"
// previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/Music/17/aa/37/mzm.xnfzviin.aac.p.m4a"
// primaryGenreName: "Hip-Hop/Rap"
// releaseDate: "2005-08-30T12:00:00Z"
// trackCensoredName: "Whoever"
// trackCount: 13
// trackExplicitness: "explicit"
// trackId: 164406172
// trackName: "Whoever"
// trackNumber: 5
// trackPrice: 0.99
// trackTimeMillis: 276200
// trackViewUrl: "https://music.apple.com/us/album/whoever/164406129?i=164406172&uo=4"
// wrapperType: "track"
// __proto__: Object