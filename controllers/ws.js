'use strict';

const express = require('express');
const Index = require('./wsActions/index');

const router = express.Router();

router.get('/:id', function(req, res, next) {
  console.log('got request');
  res.end()
});

router.ws('/:id', Index);

module.exports = router;
