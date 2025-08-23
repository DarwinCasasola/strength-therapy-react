const express = require("express");
const router = express.Router();

const { create, list, get, update, remove } = require("../controllers/client.controller");

// NOTE: no curly braces in paths — use :id params
router.post("/", create);
router.get("/", list);
router.get("/:id", get);
router.put("/:id", update);
router.delete("/:id", remove);

module.exports = router;
