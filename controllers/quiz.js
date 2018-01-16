'use strict';

const express = require('express');
const Get = require('./quizActions/get');
const Index = require('./quizActions/index');
const Post = require('./quizActions/post');
const Delete = require('./quizActions/delete');

const router = express.Router();

router.get('/', Index);
router.get('/:id', Get);
router.post('/', Post);
router.delete('/:id', Delete);

module.exports = router;
