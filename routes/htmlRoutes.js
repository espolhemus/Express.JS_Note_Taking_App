const path = require('path');
const router = require('express').Router();

// GET /notes should return the notes.html file.
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/assets/notes.html'));
    });

//GET * should return the index.html file.
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/assets/index.html'));
    });

module.exports = router;