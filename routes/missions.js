const express = require("express");
const router = express.Router();

const Mission = require("../model/Mission");

router.post("/mission/add", async (req, res) => {
  try {
    const { name, description, boss, company, executor } = req.body;
    const newMission = new Mission({
      name: name,
      description: description,
      boss: boss,
      company: company,
      executor: executor,
    });
    await newMission.save();
    res.status(201).json(newMission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/mission/inventory", async (req, res) => {
  try {
    /*
    const listMissions = await Mission.find();
    res.json(listMissions);
    */
    const oneMission = await Mission.findById(req.query.id);
    if (!req.query.id) {
      res.json({ message: "missing id" });
    } else {
      res.json(oneMission);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/mission/delete", async (req, res) => {
  try {
    await Mission.findByIdAndDelete(req.body.id);
    if (req.body.id) {
      res.json({ message: " mission deleted" });
    } else {
      res.json({ message: "bad request" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/mission/update", async (req, res) => {
  try {
    const updateMission = await Mission.findByIdAndUpdate(req.body.id, {
      executor: req.body.executor,
    });
    if (!req.body.id || !req.body.executor) {
      return res.json({ message: "missing details" });
    }
    await updateMission.save();
    res.json({ message: "mission updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
