const express = require('express');
const router = express.Router();

/*************************
  EXPRESS-JWT-PERMISSIONS
 *************************

 This guard middleware library checks the user object for a "permissions" key and
 will reject requests that do not have those permissions set.

 Documentation and configuration info can be found here:

 https://www.npmjs.com/package/express-jwt-permissions

*/
const guard = require('express-jwt-permissions')({ permissionsProperty: 'permissions'});

// Example of a private GET route
router.get("/sampleprivateroute", (req, res) => {
  let sampleResponse = { success: true, message: "Sample Private Route" };
  res.status(200).send(sampleResponse);
});

// Example of a private GET route which requires 'read:data' permission
router.get("/sampleguardroute", guard.check(['read: data']), async (req, res) => {
  let sampleResponse = { success: true, message: "Sample Permissions Check Route" };
  res.status(200).send(sampleResponse);
});

// Example of a private POST route which requires 'read:data' and 'write:data' permissions
router.post('/samepostroute', guard.check([['read:data'],['write: data']]), async (req, res) => {
  const name = req.body.name;
  let sampleResponse = { success: true, message: "Sample Permissions POST, Name = " + name };
  res.status(200).send({ success: true });    
});

// Export this router to use in index.js
module.exports = router;
