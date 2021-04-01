const express = require('express');
const path = require('path');
const router = express.Router();

/* Serve dummy data */
router.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, '../../dummyData.geojson'));
});

module.exports = router;
