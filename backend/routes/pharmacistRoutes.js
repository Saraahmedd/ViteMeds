const express = require("express");
const router = express.Router();
const pharmacistController = require("../controllers/pharmacistController");
const authController = require("../controllers/authController");
const  enums = require("../constants/enums")

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("administrator"),
    pharmacistController.getPharmacist
  );

  router.get("/",authController.protect,
  authController.restrictTo("administrator"),pharmacistController.getAllPharmacists)
//WHY IS RESTRICT TO NOT WORKING
router.route('/acceptpharmacist/:id').patch(pharmacistController.acceptPharmacist);

router.get("/docs/:id", pharmacistController.getPharmacistsDoc)
module.exports = router;
