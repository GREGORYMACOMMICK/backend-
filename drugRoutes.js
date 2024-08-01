const express = require("express");
const router = express.Router();
const drugController = require("../controllers/drugController");

router.post("/add", drugController.addDrug);
router.get("/", drugController.getDrugs);
router.put("/update", drugController.updateDrug);
router.delete("/delete/:id", drugController.deleteDrug);

module.exports = router;
