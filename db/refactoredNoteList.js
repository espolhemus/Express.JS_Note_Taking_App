const util = require('util');
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// create a new Class called NoteList
class NoteList {

    // Create a method to read the notes from the db.json file
    async read() {
        try {
            const notes = await readFileAsync('db/db.json', 'utf8');
            return JSON.parse(notes);
        } catch (err) {
            return [];
        }
    }

    // Create a method to write the notes to the db.json file
    async write(note) {
        await writeFileAsync('db/db.json', JSON.stringify(note));
    }

    // Create a method to get the notes from the db.json file
    async getNotes() {
        const notes = await this.read();
        return notes;
    }

    // Create a method to add a note to the db.json file, and give it a unique id, and return the new note and the existing notes   
    async addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Both Note 'title' and 'text' are required");
        }

        const newNote = { title, text, id: uuidv1() };

        const notes = await this.getNotes();
        notes.push(newNote);

        await this.write(notes);

        return newNote;
    }
}

module.exports = new NoteList();