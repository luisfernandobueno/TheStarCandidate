
import express from "express";
import fs from "fs";
import cors from "cors";

// Creates the Express application.
const app = express();

const port = process.env.PORT || 3000;


// ============================================================
// MIDDLEWARE
// ============================================================

// Allows the React frontend to communicate with this backend.
app.use(cors());

// Automatically converts JSON request bodies into JavaScript objects.
app.use(express.json());


// ============================================================
// JSON DATABASE PATH
// ============================================================

const JSON_PATH = "./src/javascript/abcdefg.json";
//const JSON_PATH = "./src/javascript/api.json";

// ============================================================
// HELPER: READ JSON
// ============================================================

/*
    Reads the JSON file and returns the parsed object.

    This is used by GET, POST, PUT and DELETE.
*/

function readJSON(res, callback) {

    fs.readFile(
        JSON_PATH,
        "utf8",
        (err, jsonString) => {

            // If the file cannot be read...
            if (err) {

                console.error(err);

                return res.status(500).json({
                    error: "Couldn't read JSON file"
                });

            }


            try {

                // Convert the JSON text into a JavaScript object.
                const data = JSON.parse(jsonString);

                // Make sure questions is an array.
                if (!Array.isArray(data.questions)) {

                    return res.status(500).json({
                        error: "JSON file does not contain a questions array"
                    });

                }

                // Continue with the parsed data.
                callback(data);

            } catch (error) {

                console.error(error);

                return res.status(500).json({
                    error: "Invalid JSON"
                });

            }

        }
    );

}


// ============================================================
// HELPER: SAVE JSON
// ============================================================

/*
    Saves the JavaScript object back into the JSON file.
*/

function saveJSON(data, res, callback) {

    fs.writeFile(

        JSON_PATH,

        JSON.stringify(data, null, 2),

        (err) => {

            // If saving failed...
            if (err) {

                console.error(err);

                return res.status(500).json({
                    error: "Couldn't save JSON"
                });

            }

            // Saving succeeded.
            callback();

        }
    );

}


// ============================================================
// HELPER: SYNCHRONIZE IDS
// ============================================================

/*
    IMPORTANT:

    The ID of every question is its current position
    inside the questions array.

    Example:

    questions[0] -> id 0
    questions[1] -> id 1
    questions[2] -> id 2

    This keeps the IDs consistent between the backend
    and frontend.
*/

function synchronizeIds(data) {

    data.questions = data.questions.map(
        (question, index) => {

            return {
                ...question,
                id: index
            };

        }
    );

    return data;

}


// ============================================================
// GET
// ============================================================

/*
    GET /

    Returns all questions.

    The IDs are synchronized with the array indexes
    before the data is sent to the frontend.
*/

app.get("/", (req, res) => {

    readJSON(res, (data) => {

        // Make sure every question has the correct ID.
        synchronizeIds(data);

        // Send the data to the frontend.
        res.json(data);

    });

});


// ============================================================
// POST
// ============================================================

/*
    POST /

    Creates a new question.

    The frontend sends:

    {
        topic,
        favorite,
        question,
        explanation,
        answer,
        example
    }
*/

app.post("/", (req, res) => {

    readJSON(res, (data) => {

        /*
            The new question will be placed at the end
            of the array.

            Therefore its ID will be the current array length.
        */

        const newId = data.questions.length;


        const newQuestion = {

            id: newId,

            topic: req.body.topic ?? "",

            favorite: req.body.favorite ?? false,

            question: req.body.question ?? "",

            explanation: req.body.explanation ?? "",

            answer: req.body.answer ?? "",

            example: req.body.example ?? ""

        };


        // Add the new question.
        data.questions.push(newQuestion);


        /*
            Synchronize IDs once more.

            This makes sure the ID matches the actual
            array position.
        */

        synchronizeIds(data);


        // Get the final object after synchronization.
        const createdQuestion =
            data.questions[data.questions.length - 1];


        // Save the database.
        saveJSON(data, res, () => {

            res.status(201).json({

                success: true,

                question: createdQuestion

            });

        });

    });

});


// ============================================================
// PUT
// ============================================================

/*
    PUT /:id

    Edits an existing question.

    Example:

    PUT /5

    means:

    "Edit the question whose array index is 5."
*/

app.put("/:id", (req, res) => {

    /*
        req.params.id comes from the URL.

        Example:

        /5

        gives:

        req.params.id === "5"

        Number() converts it into:

        5
    */

    const id = Number(req.params.id);


    // Make sure the ID is actually a valid number.
    if (!Number.isInteger(id) || id < 0) {

        return res.status(400).json({
            error: "Invalid question id"
        });

    }


    readJSON(res, (data) => {

        /*
            Synchronize IDs before searching.

            This is important because the JSON file might
            contain old/inconsistent IDs.
        */

        synchronizeIds(data);


        /*
            Since IDs represent array positions,
            the ID is also the array index.

            Example:

            id 3 -> data.questions[3]
        */

        if (id >= data.questions.length) {

            return res.status(404).json({
                error: "Question not found"
            });

        }


        /*
            Keep the original question.

            We use it to preserve properties such as:

            topic
            favorite
            etc.
        */

        const oldQuestion =
            data.questions[id];


        /*
            Replace the editable information.

            The ID is ALWAYS forced to remain the same.

            This prevents the frontend from accidentally
            changing the ID.
        */

        data.questions[id] = {

            ...oldQuestion,

            ...req.body,

            id: id

        };


        /*
            Synchronize again just to guarantee that every
            question has the correct array-based ID.
        */

        synchronizeIds(data);


        const updatedQuestion =
            data.questions[id];


        // Save the updated database.
        saveJSON(data, res, () => {

            res.json({

                success: true,

                question: updatedQuestion

            });

        });

    });

});


// ============================================================
// DELETE
// ============================================================

/*
    DELETE /:id

    Deletes a question.

    Example:

    DELETE /3

    removes questions[3].
*/

app.delete("/:id", (req, res) => {

    const id = Number(req.params.id);


    // Validate the ID.
    if (!Number.isInteger(id) || id < 0) {

        return res.status(400).json({
            error: "Invalid question id"
        });

    }


    readJSON(res, (data) => {

        /*
            Synchronize IDs before searching.
        */

        synchronizeIds(data);


        /*
            Make sure the requested question exists.
        */

        if (id >= data.questions.length) {

            return res.status(404).json({
                error: "Question not found"
            });

        }


        /*
            Remove exactly one question from the array.
        */

        const deletedQuestion =
            data.questions.splice(id, 1)[0];


        /*
            IMPORTANT:

            After deleting something, all questions after it
            move one position to the left.

            Therefore their IDs must be regenerated.

            Example:

            Before:

            id 0
            id 1
            id 2
            id 3

            Delete id 1.

            Array becomes:

            id 0
            id 2
            id 3

            We synchronize it to:

            id 0
            id 1
            id 2
        */

        synchronizeIds(data);


        // Save the new array.
        saveJSON(data, res, () => {

            res.json({

                success: true,

                question: deletedQuestion,

                /*
                    Returning the complete updated data
                    is useful for the frontend if needed.
                */

                data: data

            });

        });

    });

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
