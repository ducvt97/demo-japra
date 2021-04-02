const mongoose = require('mongoose');

const kanjiSchema = new mongoose.Schema({
    kanji: { type: String, require: true, unique: true },
    sinoVReading: { type: String, require: true },
    meaning: { type: String, require: true },
    level: { type: String, require: true },
    // vocalbulary: [
    //     { word: String, hiragana: String, meaning: String }
    // ]
});

exports.Kanji = mongoose.model('Kanji', kanjiSchema);