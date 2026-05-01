const router = require("express").Router();
const Task = require("../models/task");

// Create Task
router.post("/", async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Tasks (can filter by project)
router.get("/", async (req, res) => {
    try {
        const { project } = req.query;
        const query = project ? { project } : {};
        const tasks = await Task.find(query).populate("assignedTo", "name");
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;