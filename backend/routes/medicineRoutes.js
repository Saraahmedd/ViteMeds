const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const medicineController = require("../controllers/medicineController");

const { protect } = require("../controllers/authController");

router.use(protect);

router
  .route("/getmedicines/pharmacist")
  .get(
    authController.restrictTo("pharmacist"),
    medicineController.getAllMedicinesForPharmacist
  );

router
  .route("/getmedicines/admin")
  .get(
    authController.restrictTo("administrator"),
    medicineController.getAllMedicinesForUserAndAdmin
  );

router
  .route("/getmedicines")
  .get(medicineController.getAllMedicinesForUserAndAdmin);

router
  .route("/getarchivedmedicines/pharmacist")
  .get(
    authController.restrictTo("pharmacist"),
    medicineController.getAllArchivedMedicinesForPharmacist
  );

router
  .route("/new-medicine")
  .post(
    authController.restrictTo("pharmacist"),
    medicineController.upload.single("image"),
    medicineController.createNewMedicine
  );

router
  .route("/update/:id")
  .patch(
    authController.restrictTo("pharmacist"),
    medicineController.upload.single("image"),
    medicineController.updateMedicine
  );

router
  .route("/delete/:id")
  .delete(
    authController.restrictTo("pharmacist"),
    medicineController.deleteMedicine
  );

router.get("/medUses", medicineController.allMedicinalUses);

router.get("/:id", medicineController.getMedicineById);

router
  .route("/archive/:id")
  .patch(
    authController.restrictTo("pharmacist"),
    medicineController.archiveMedicine
  );

router
  .route("/alternative/:id")
  .get(
    authController.restrictTo("patient"),
    medicineController.viewAlternative
  );

module.exports = router;
