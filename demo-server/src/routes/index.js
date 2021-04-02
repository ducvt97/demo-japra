const kanjiRouter = require('./kanji');

exports.routes = (app) => {
    app.use("/kanji", kanjiRouter);
}