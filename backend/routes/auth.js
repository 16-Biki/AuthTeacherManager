const express = require("express");
const router = express.Router();
const pool = require("../db");

// ✅ Register
router.post("/register", async (req, res) => {
  const {
    email,
    first_name,
    last_name,
    password,
    university_name,
    gender,
    year_joined,
  } = req.body;

  if (
    !email ||
    !first_name ||
    !last_name ||
    !password ||
    !university_name ||
    !gender ||
    !year_joined
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (isNaN(year_joined)) {
    return res.status(400).json({ error: "Year joined must be a number" });
  }

  try {
    // check duplicate email
    const check = await pool.query("SELECT id FROM auth_user WHERE email=$1", [
      email,
    ]);
    if (check.rows.length > 0)
      return res.status(400).json({ error: "Email already registered" });

    // insert into auth_user
    const userResult = await pool.query(
      `INSERT INTO auth_user (email, first_name, last_name, password)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, first_name, last_name`,
      [email, first_name, last_name, password]
    );

    const userId = userResult.rows[0].id;

    // insert into teachers
    await pool.query(
      `INSERT INTO teachers (user_id, university_name, gender, year_joined)
       VALUES ($1, $2, $3, $4)`,
      [userId, university_name, gender, parseInt(year_joined, 10)]
    );

    res.json({ message: "User and Teacher registered successfully!" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Error registering user" });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM auth_user WHERE email=$1", [
      email,
    ]);

    if (result.rows.length === 0)
      return res.status(400).json({ error: "User not found" });

    const user = result.rows[0];

    if (user.password !== password)
      return res.status(400).json({ error: "Invalid password" });

    const safeUser = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    res.json({ message: "Login successful", user: safeUser });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login error" });
  }
});

// ✅ Get all users
router.get("/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, email, first_name, last_name FROM auth_user"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// ✅ Get all teachers
router.get("/teachers", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.id, t.university_name, t.gender, t.year_joined, 
              u.email, u.first_name, u.last_name
       FROM teachers t
       JOIN auth_user u ON t.user_id = u.id`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching teachers:", err);
    res.status(500).json({ error: "Error fetching teachers" });
  }
});

module.exports = router;
