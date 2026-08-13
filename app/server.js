const express = require("express");
const pool = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));


// ============================================================
// DATABASE INITIALIZATION
// ============================================================
// This function checks whether the skills table exists.
//
// If the table does not exist, PostgreSQL creates it.
// If it already exists, nothing is changed.
//
// This is useful for AWS RDS because a newly created
// PostgreSQL database does not automatically contain the
// tables that existed in the local development database.
// ============================================================

async function initializeDatabase() {
    try {

        // Confirm that the application can communicate
        // with PostgreSQL.
        await pool.query("SELECT NOW()");

        console.log("Database connected successfully.");

        // Create the skills table if it does not exist.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS skills (
                id SERIAL PRIMARY KEY,

                name VARCHAR(100) NOT NULL,

                category VARCHAR(100) NOT NULL,

                skill_level VARCHAR(50) NOT NULL,

                offered_by VARCHAR(100) NOT NULL,

                availability VARCHAR(100) NOT NULL,

                description TEXT NOT NULL,

                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("Skills table is ready.");

    } catch (error) {

        console.error(
            "Database initialization failed:",
            error.message
        );
    }
}


// Run the database initialization when the application starts.
initializeDatabase();


// ============================================================
// CREATE SKILL
// ============================================================
// POST /api/skills
//
// Creates a new skill and saves it to PostgreSQL.
// ============================================================

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
            `
            INSERT INTO skills
            (
                name,
                category,
                skill_level,
                offered_by,
                availability,
                description
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            `,
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

        console.error(
            "Unable to publish skill:",
            error.message
        );

        res.status(500).json({
            message: "Unable to publish skill"
        });
    }
});


// ============================================================
// READ SKILLS
// ============================================================
// GET /api/skills
//
// Returns all skills from PostgreSQL.
// Newest skills appear first.
// ============================================================

app.get("/api/skills", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM skills ORDER BY created_at DESC"
        );

        res.json(result.rows);

    } catch (error) {

        console.error(
            "Unable to load skills:",
            error.message
        );

        res.status(500).json({
            message: "Unable to load skills"
        });
    }
});


// ============================================================
// UPDATE SKILL
// ============================================================
// PUT /api/skills/:id
//
// Updates an existing skill using its database ID.
// ============================================================

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
            `
            UPDATE skills

            SET
                name = $1,
                category = $2,
                skill_level = $3,
                offered_by = $4,
                availability = $5,
                description = $6

            WHERE id = $7

            RETURNING *
            `,
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

        console.error(
            "Unable to update skill:",
            error.message
        );

        res.status(500).json({
            message: "Unable to update skill"
        });
    }
});


// ============================================================
// DELETE SKILL
// ============================================================
// DELETE /api/skills/:id
//
// Deletes an existing skill using its database ID.
// ============================================================

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

        console.error(
            "Unable to delete skill:",
            error.message
        );

        res.status(500).json({
            message: "Unable to delete skill"
        });
    }
});


// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {

    console.log(
        `Skills Accelerator server is running on http://localhost:${PORT}`
    );
});