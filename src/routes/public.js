const express = require('express');
const router = express.Router();

// Example of a public GET route
router.get("/samplepublicroute", (req, res) => {
  let sampleResponse = { success: true, message: "Sample Public Route" };
  res.status(200).send(sampleResponse);
});

// Export this router to use in index.js
module.exports = router;
