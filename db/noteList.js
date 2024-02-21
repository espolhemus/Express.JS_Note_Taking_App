const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
// const uuid = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// create a new Class called NoteList
class NoteList {

    // Create a method to read the notes from the db.json file
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }

    // Create a method to write the notes to the db.json file
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    // Create a method to get the notes from the db.json file
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            // If notes isn't an array or can't be turned into one, send back a new empty array
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }

    // Create a method to add a note to the db.json file, and give it a unique id, and return the new note and the existing notes
    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Note 'title' and 'text' cannot be blank");
        }

        // Add a unique id to the note using uuid package
        const newNote = { title, text, id: uuidv1() };

        // Get all notes, add the new note, write all the updated notes, return the newNote
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
    }
} 

// export the NoteList class
module.exports = new NoteList();