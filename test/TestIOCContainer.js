const assert = require('assert');

const CompositionA = require('../test/example/CompositionA');
const CompositionB = require('../test/example/CompositionB');
const BluesGenre = require('../test/example/BluesGenre');
const JimiHendrix = require('../test/example/JimiHendrix');

const errorMessages = require('../source/errorMessages');
const IOCContainer = require('../source/IOCContainer');

describe("TestIOCContainer", function() {
    it("can handle a single dependency", function(done) {
        let container = new IOCContainer();
        
        container.registerComponentInstance({name: "Composition", definition: CompositionA}, ["Genre"]);
        container.registerComponentInstance({name: "Genre", definition: BluesGenre});
        
        instance = container.getComponentInstance("Composition");

        assert.deepEqual("Blues", instance.getGenre());
        assert.deepEqual("Electric Guitar", instance.getInstrument());
        done();
    });

    it("can handle multiple dependencies", function(done) {
        let container = new IOCContainer();
        
        container.registerComponentInstance({name: "Composition", definition: CompositionB}, ["Genre", "Artist"]);
        container.registerComponentInstance({name: "Genre", definition: BluesGenre});
        container.registerComponentInstance({name: "Artist", definition: JimiHendrix});
        
        instance = container.getComponentInstance("Composition");

        assert.deepEqual("Blues", instance.getGenre());
        assert.deepEqual("Electric Guitar", instance.getInstrument());
        assert.deepEqual("Jimi Hendrix", instance.getArtist());
        done();
    });

    it("can deregister component instances", function(done) {
        let container = new IOCContainer();
        
        container.registerComponentInstance({name: "Composition", definition: CompositionA}, ["Genre"]);
        container.registerComponentInstance({name: "Genre", definition: BluesGenre});
        
        container.deregisterComponentInstance("Genre")
        
        try {
            instance = container.getComponentInstance("Composition");
        } catch(error){
            assert.deepEqual(errorMessages.DEPENDENCY_NOT_REGISTERED, error.message);
        }

        done();
    });

    it("can handle multiple get calls", function(done) {
        let container = new IOCContainer();
        
        container.registerComponentInstance({name: "Composition", definition: CompositionB}, ["Genre", "Artist"]);
        container.registerComponentInstance({name: "Genre", definition: BluesGenre});
        container.registerComponentInstance({name: "Artist", definition: JimiHendrix});
        
        instance = container.getComponentInstance("Composition");
        secondInstance = container.getComponentInstance("Composition");

        assert.deepEqual("Blues", secondInstance.getGenre());
        assert.deepEqual("Electric Guitar", secondInstance.getInstrument());
        assert.deepEqual("Jimi Hendrix", secondInstance.getArtist());
        done();
    });

    it("can determine there are no circular dependencies", function(done) {
        let container = new IOCContainer();
        
        container.registerComponentInstance({name: "Composition", definition: CompositionB}, ["Genre", "Artist"]);
        container.registerComponentInstance({name: "Genre", definition: BluesGenre});
        container.registerComponentInstance({name: "Artist", definition: JimiHendrix});
        
        assert.equal(false, container.isCircular("Composition", {}));
        done();
    });

    it("can determine there are circular dependencies in a single branch of the tree", function(done) {
        let container = new IOCContainer();
        
        container.registerComponentInstance({name: "Composition", definition: CompositionB}, ["Genre", "Artist"]);
        container.registerComponentInstance({name: "Genre", definition: BluesGenre}, ["Composition"]);
        
        assert.equal(true, container.isCircular("Composition", {}));
        done();
    });

    it("can determine there are circular dependencies in a all branches of the tree", function(done) {
        let container = new IOCContainer();
        
        container.registerComponentInstance({name: "Composition", definition: CompositionB}, ["Genre", "Artist"]);
        container.registerComponentInstance({name: "Genre", definition: BluesGenre});
        container.registerComponentInstance({name: "Artist", definition: JimiHendrix}, ["James"]);
        container.registerComponentInstance({name: "James", definition: JimiHendrix}, ["Pelligrino"]);
        container.registerComponentInstance({name: "Pelligrino", definition: JimiHendrix}, ["Composition"]);
        
        assert.equal(container.isCircular("Composition", {}), true);
        done();
    });
});