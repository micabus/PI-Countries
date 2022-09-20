const { Router } = require("express");
const { getDbActivities, createActivity } = require("../controllers/activities");


const router = Router();

router.get("/", getDbActivities);
router.post('/create', createActivity)

module.exports = router;
