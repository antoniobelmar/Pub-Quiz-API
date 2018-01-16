'use strict';

const express = require('express');
const Index = require('./wsActions/index');
const Ws = require('./wsActions/ws');

const router = express.Router();

router.get('/', Index);
router.ws('/:id', Ws);

module.exports = router;
