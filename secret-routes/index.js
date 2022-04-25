const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {

    res.sendFile(path.dirname(__dirname) + "/public/profile.html")
})


module.exports = router;