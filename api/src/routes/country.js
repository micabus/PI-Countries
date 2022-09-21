const { Router } = require("express");

const {
  getApiInfo,
  getById,
  getByName,
} = require("../controllers/countries.js");

const router = Router();



router.get("/all", getApiInfo);
router.get("/:idL", getById);
router.get("/", getByName);

module.exports = router;
