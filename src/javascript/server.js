
import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();

const port = process.env.PORT || 3000;


// ============================================================
// MIDDLEWARE
// ============================================================

// Allow the frontend to communicate with the backend.
app.use(cors());

// Automatically parse JSON sent by the frontend.
app.use(express.json());


// ============================================================
// JSON FILE
// ============================================================

const JSON_PATH = "./src/javascript/abcdefg.json";
//const JSON_PATH = "./src/javascript/api.json";


// ============================================================
// GET
// ============================================================

/*
    GET /

    Reads the JSON file and sends it to the frontend.
*/

app.get("/", (req, res) => {

    fs.readFile(
        JSON_PATH,
        "utf8",
        (err, jsonString) => {

            // Could not read the file.
            if (err) {

                console.error(err);

                return res.status(500).json({
                    error: "Couldn't read JSON file"
                });

            }

            try {

                // Convert JSON text into a JavaScript object.
                const data = JSON.parse(jsonString);

                // Send the data to the frontend.
                res.json(data);

            } catch (error) {

                console.error(error);

                return res.status(500).json({
                    error: "Invalid JSON"
                });

            }

        }
    );

});


// ============================================================
// POST
// ============================================================

/*
    POST /

    The frontend sends the ENTIRE updated JSON object.

    The backend simply overwrites the existing JSON file.

    Example request body:

    {
        "questions": [
            {
                "id": 0,
                "topic": "...",
                "favorite": false,
                "question": "...",
                "explanation": "...",
                "answer": "...",
                "example": "..."
            }
        ]
    }

    The backend does not modify the data.

    Whatever the frontend sends becomes the new contents
    of the JSON file.
*/

app.post("/", (req, res) => {

    // Get the complete updated data from the frontend.
    const data = req.body;


    // Make sure something valid was received.
    if (!data || typeof data !== "object") {

        return res.status(400).json({
            error: "Invalid JSON data"
        });

    }


    // Overwrite the JSON file.
    fs.writeFile(
        JSON_PATH,
        JSON.stringify(data, null, 2),
        "utf8",
        (err) => {

            // Could not save the file.
            if (err) {

                console.error(err);

                return res.status(500).json({
                    error: "Couldn't save JSON file"
                });

            }


            // Everything was saved successfully.
            res.json({

                success: true,

                data: data

            });

        }
    );

});


// ============================================================
// SERVER
// ============================================================

app.listen(
    port,
    () => {

        console.log(
            `Server running on port ${port}`
        );

    }
);

