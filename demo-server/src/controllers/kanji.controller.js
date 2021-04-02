const kanjiModel = require('../models/kanji.model');

exports.getAll = (req, res, next) => {
    kanjiModel.Kanji.find({}, (err, kanji) => {
        err ? res.send(err) : res.json(kanji);
    });
}