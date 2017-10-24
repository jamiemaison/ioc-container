module.exports = class Composition {
    constructor(genre, artist) {
        this.attributes = genre.getAttributes();
        this.artist = artist.getAttributes();
    }

    getGenre() {
        return this.attributes.genre
    }
    
    getInstrument() {
        return this.attributes.instrument
    }

    getArtist() {
        return this.artist.name
    }
}