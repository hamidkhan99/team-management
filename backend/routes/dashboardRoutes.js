const router = require("express").Router();
const Project = require("../models/Project");
const Task = require("../models/task");

router.get("/stats", async (req, res) => {
    try {
        const pendingTasks = await Task.countDocuments({ status: { $ne: "completed" } });
        const completedTasks = await Task.countDocuments({ status: "completed" });
        const activeProjects = await Project.countDocuments();
        
        res.json({
            pendingTasks,
            completedTasks,
            activeProjects
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
