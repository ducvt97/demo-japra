const kanjiModel = require('../models/kanji.model');

exports.getAll = (req, res, next) => {
    kanjiModel.Kanji.find({}, (err, kanji) => {
        err ? res.send({status: 404, message: err}) : res.json({status: 200, data: kanji, message: "OK"});
    });
}

exports.getByLevel = (req, res, next) => {
    kanjiModel.Kanji.find({ level: req.body.level }, (err, kanji) => {
        err ? res.send({status: 404, message: err}) : res.json({status: 200, data: kanji, message: "OK"});
    });
}

exports.getByKanji = (req, res, next) => {
    kanjiModel.Kanji.findOne({ kanji: req.query.kanji }, (err, kanji) => {
        err ? res.send({status: 404, message: err}) : res.json({status: 200, data: kanji, message: "OK"});
    });
}