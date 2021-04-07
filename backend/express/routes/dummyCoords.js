const express = require('express');
const path = require('path');
const dummyJson = require('../../mongo_schema/dummyJson');
const router = express.Router();

/* Serve dummy data */
router.get("", (req, res) => {
   res.sendFile(path.join(__dirname, '../../dummyData.geojson'));
});



module.exports = router;

router.post("",(req,res) => {

   let featureArr = [];
   let i;
   for(i= 0; i<req.body.features.length; i++) {
      let feature = {
         type: req.body.features[i].type,
         properties: {
            id: req.body.features[i].properties.id,
            moodRating: req.body.features[i].properties.moodRating,
            time: req.body.features[i].properties.time,
            felt: req.body.features[i].properties.felt,
            tsunami: req.body.features[i].properties.tsunami
         },
         geometry: {
            type: req.body.features[i].geometry.type,
            coordinates: [req.body.features[i].geometry.coordinates[0],req.body.features[i].geometry.coordinates[1],req.body.features[i].geometry.coordinates[2]]
      }

   }
   featureArr.push(feature);
}
console.log(featureArr);
   const dumPost = new dummyJson({
      type: req.body.type,
      features: featureArr,
   })
   dumPost.save()
   .then((dbResponse) => {
      return res.status(200).json({
        message: "geoPost saved in database",
        id: dbResponse,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "unable to save this data",
        error: error,
      });
    });
})