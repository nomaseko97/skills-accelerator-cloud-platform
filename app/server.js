const express = require("express");
const pool = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));


// Test database connection
pool.query("SELECT NOW()")
.then(() => {
console.log("Database connected successfully.");
})
.catch(error => {
console.error(
"Database connection failed:",
error.message
);
});


// CREATE
app.post("/api/skills", async (req, res) => {
try {
const {
name,
category,
skillLevel,
offeredBy,
availability,
description
} = req.body;

const result = await pool.query(
`INSERT INTO skills
(
name,
category,
skill_level,
offered_by,
availability,
description
)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *`,
[
name,
category,
skillLevel,
offeredBy,
availability,
description
]
);

res.status(201).json(result.rows[0]);

} catch (error) {
console.error(error.message);

res.status(500).json({
message: "Unable to publish skill"
});
}
});


// READ
app.get("/api/skills", async (req, res) => {
try {
const result = await pool.query(
"SELECT * FROM skills ORDER BY created_at DESC"
);

res.json(result.rows);

} catch (error) {
console.error(error.message);

res.status(500).json({
message: "Unable to load skills"
});
}
});


// UPDATE
app.put("/api/skills/:id", async (req, res) => {
try {
const { id } = req.params;

const {
name,
category,
skillLevel,
offeredBy,
availability,
description
} = req.body;

const result = await pool.query(
`UPDATE skills
SET name = $1,
category = $2,
skill_level = $3,
offered_by = $4,
availability = $5,
description = $6
WHERE id = $7
RETURNING *`,
[
name,
category,
skillLevel,
offeredBy,
availability,
description,
id
]
);

if (result.rows.length === 0) {
return res.status(404).json({
message: "Skill not found"
});
}

res.json(result.rows[0]);

} catch (error) {
console.error(error.message);

res.status(500).json({
message: "Unable to update skill"
});
}
});


// DELETE
app.delete("/api/skills/:id", async (req, res) => {
try {
const { id } = req.params;

const result = await pool.query(
"DELETE FROM skills WHERE id = $1 RETURNING *",
[id]
);

if (result.rows.length === 0) {
return res.status(404).json({
message: "Skill not found"
});
}

res.json({
message: "Skill deleted successfully"
});

} catch (error) {
console.error(error.message);

res.status(500).json({
message: "Unable to delete skill"
});
}
});


// START SERVER
app.listen(PORT, () => {
console.log(
`Skills Accelerator server is running on http://localhost:${PORT}`
);
});