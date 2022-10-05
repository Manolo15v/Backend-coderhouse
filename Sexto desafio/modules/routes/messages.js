const express = require('express');

const { Router } = express;

const router = Router();

router.get('', (req, res) => {
    res.render('pages/messages');
});


module.exports = router;