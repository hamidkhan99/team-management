const router = require("express").Router();
const Project = require("../models/Project");

// Create Project
router.post("/", async (req, res) => {
    try {
        const { name, description, admin } = req.body;
        const project = await Project.create({ name, description, admin, members: [admin] });
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Projects
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find().populate("admin", "name").populate("members", "name email");
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add member to project
router.post("/:projectId/members", async (req, res) => {
    try {
        const { userId } = req.body;
        const project = await Project.findById(req.params.projectId);
        if (!project.members.includes(userId)) {
            project.members.push(userId);
            await project.save();
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
