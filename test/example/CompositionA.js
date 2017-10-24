module.exports = class Composition {
    constructor(genre) {
        this.attributes = genre.getAttributes();
    }

    getGenre() {
        return this.attributes.genre
    }
    
    getInstrument() {
        return this.attributes.instrument
    }
}