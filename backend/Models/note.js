const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const noteSchema = new Schema({
    email: String,
    title: String,
    text: String,
    date: Date
});

const Note = model('Note', noteSchema, 'noteCollection');
module.exports = Note;