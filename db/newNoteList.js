const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const { v4: uuidv4 } = require('uuid');
// const uuid = require('uuid');

// const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writeFile);

// create a new Class called NoteList

// filePath = 'db/db.json';

class NewNoteList {
    constructor(filePath) {
        this.filePath = filePath;
    }

    read() {
        try {
            const data = fs.readFileSync('db/db.json', 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading file:', error);
            return [];
        }
        
    }

    write(data) {
        try {
            fs.writeFileSync('db/db.json', JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error writing file:', error);
        }
    }

    // getAllNotes() {
    //     return this.read();
    // }

    async getAllNotes() {
        try {
            const notes = await this.read();
            let parsedNotes = [].concat(JSON.parse(notes));
            return parsedNotes;
        } catch (err) {
            return [];
        }
    }

    add(note) {
        const allNotes = this.getAllNotes();
        const newNote = { ...note, id: uuidv4() };
        allNotes.push(newNote);
        this.write(allNotes);
        return newNote;
    }
}
// Create a method to read the notes from the db.json file

module.exports = new NewNoteList();