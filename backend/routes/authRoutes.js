const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/signup", async (req, res) => {
    try {
        console.log("Signup Request Received:", req.body);
        const { name, email, password, role } = req.body;
        
        // Basic validation
        if (!name || !email || !password) {
            console.log("Missing fields");
            return res.status(400).json({ error: "Missing required fields" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        
        console.log("User created successfully:", user.email);
        res.status(201).json({ message: "User created successfully", user: { id: user._id, name, email, role } });
    } catch (err) {
        console.error("Signup Error:", err.message);
        res.status(400).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;