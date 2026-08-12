
import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();

const port = process.env.PORT || 3000;


// ============================================================
// GETPANTRY URL & // JSON FILE

//const JSON_PATH = "./src/javascript/abcdefg.json";
const JSON_PATH = "./src/javascript/api.json";

// Change this whenever you want to use another Pantry URL.
const getPantryUrl = "https://getpantry.cloud/apiv1/pantry/2a537c44-2c08-4a2a-8699-db932d92f65c/basket/API";

// ============================================================
// ============================================================

// ============================================================
// MIDDLEWARE
// ============================================================

// Allow the frontend to communicate with the backend.
app.use(cors());

// Automatically parse JSON sent by the frontend.
app.use(express.json());



// ============================================================
// STARTUP: GET FROM PANTRY
// ============================================================

/*
    When the server starts:

    1. Get the data from Pantry.
    2. Save that data into the local JSON file.
    3. Start the server.

    This makes Pantry the source used to initialize
    the local JSON file.
*/

async function initializeData() {

    // If no Pantry URL has been provided, skip this step.
    if (!getPantryUrl) {

        console.log("No Pantry URL configured.");

        return;

    }

    try {

        // Get the latest data from Pantry.
        const response = await fetch(getPantryUrl);

        if (!response.ok) {

            throw new Error(
                `Pantry GET failed: ${response.status}`
            );

        }

        // Convert the response into JSON.
        const data = await response.json();


        // Overwrite the local JSON file.
        fs.writeFileSync(
            JSON_PATH,
            JSON.stringify(data, null, 2),
            "utf8"
        );


        console.log("Local JSON file updated from Pantry.");

    } catch (error) {

        console.error(
            "Could not initialize data from Pantry:",
            error
        );

    }

}


// ============================================================
// GET
// ============================================================

/*
    GET /

    Reads the local JSON file and sends it to the frontend.
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

    The server then:

    1. Saves it to the local JSON file.
    2. Sends the same data to Pantry.

    The frontend therefore only needs to communicate
    with this server.
*/

app.post("/", async (req, res) => {

    // Get the complete updated data from the frontend.
    const data = req.body;


    // Make sure valid data was received.
    if (!data || typeof data !== "object") {

        return res.status(400).json({
            error: "Invalid JSON data"
        });

    }


    try {

        // ====================================================
        // SAVE TO LOCAL JSON FILE
        // ====================================================

        fs.writeFileSync(
            JSON_PATH,
            JSON.stringify(data, null, 2),
            "utf8"
        );


        // ====================================================
        // SAVE TO PANTRY
        // ====================================================

        /*
            Only send to Pantry if a URL has been configured.
        */

        if (getPantryUrl) {

            const response = await fetch(
                getPantryUrl,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)
                }
            );


            if (!response.ok) {

                throw new Error(
                    `Pantry POST failed: ${response.status}`
                );

            }

        }


        // ====================================================
        // RESPONSE
        // ====================================================

        res.json({

            success: true,

            data: data

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Couldn't save data",

            details: error.message

        });

    }

});


// ============================================================
// START SERVER
// ============================================================

/*
    Initialize the local JSON file from Pantry FIRST.

    Only after that finishes do we start the server.
*/

initializeData()
    .then(() => {

        app.listen(
            port,
            () => {

                console.log(
                    `Server running on port ${port}`
                );

            }
        );

    });
