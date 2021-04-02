const express = require('express');
const router = express.Router();
const kanjiControlller = require('../controllers/kanji.controller');

router.get("/get-all", kanjiControlller.getAll);

module.exports = router;