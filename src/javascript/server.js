import express from "express"; // Imports the Express framework to create the backend server.
import fs from "fs"; // Imports Node's File System module to read and write the JSON file.
import cors from "cors"; // Allows requests from other origins (your React frontend).

// Creates the Express application.
const app = express();

// Enables Cross-Origin Resource Sharing.
app.use(cors());

// Automatically converts incoming JSON request bodies into JavaScript objects.
app.use(express.json());

// Path to the JSON file that works as our database.
const JSON_PATH = "./src/javascript/abcdefg.json";

/* ============================================================
   Helper
============================================================ */

/*
    Instead of repeating fs.writeFile() in POST, PUT and DELETE,
    this helper function saves the updated data into the JSON file
    and then executes whatever callback function is passed to it.
*/
function saveJSON(data, res, callback) {

    // Writes the updated object back into the JSON file.
    fs.writeFile(

        JSON_PATH,

        // Converts the JavaScript object into nicely formatted JSON.
        JSON.stringify(data, null, 2),

        // Runs after the write operation finishes.
        (err) => {

            // If something went wrong while saving...
            if (err) {

                console.error(err);

                // Send HTTP 500 (Internal Server Error).
                return res.status(500).json({
                    error: "Couldn't save JSON",
                });

            }

            // If saving succeeded, execute the callback.
            callback();

        }
    );

}

/* ============================================================
   GET
============================================================ */

/*
    GET is used to retrieve data.

    When the frontend requests:
        GET /

    this endpoint reads the JSON file and sends every question back.
*/
app.get("/", (req, res) => {

    // Reads the JSON file.
    fs.readFile(JSON_PATH, "utf8", (err, jsonString) => {

        // If the file couldn't be read...
        if (err) {

            return res.status(500).json({
                error:"Couldn't read JSON file"
            });

        }

        try {

            // Converts the JSON text into a JavaScript object.
            const data = JSON.parse(jsonString);

            // Sends the whole object back to the frontend.
            res.json(data);

        } catch(error) {

            // Happens if the JSON file is malformed.
            res.status(500).json({
                error:"Invalid JSON"
            });

        }

    });

});


/* ============================================================
   POST
============================================================ */

/*
    POST is used to CREATE a new question.

    The frontend sends the new question inside req.body.
*/
app.post("/", (req,res)=>{

    // Read the existing database first.
    fs.readFile(JSON_PATH,"utf8",(err,jsonString)=>{

        if(err){

            return res.status(500).json({
                error:"Couldn't read JSON file"
            });

        }

        try {

            // Convert JSON into a JavaScript object.
            const data = JSON.parse(jsonString);

            /*
                Build a brand new question object.

                Date.now() creates a unique numeric id using
                the current timestamp.

                The ?? operator means:
                "use the value from req.body unless it is null or undefined,
                otherwise use the default value."
            */
            const newQuestion = {

                id: Date.now(),

                topic: req.body.topic ?? "",

                favorite: req.body.favorite ?? false,

                question: req.body.question ?? "",

                explanation: req.body.explanation ?? "",

                answer: req.body.answer ?? "",

                example: req.body.example ?? ""

            };

            // Add the new object to the questions array.
            data.questions.push(newQuestion);

            // Save the updated array into the JSON file.
            saveJSON(data,res,()=>{

                // Tell the frontend the operation succeeded.
                res.json({

                    success:true,

                    // Return the object that was created.
                    question:newQuestion

                });

            });

        } catch(error){

            res.status(500).json({
                error:"Invalid JSON"
            });

        }

    });

});


/* ============================================================
   PUT
============================================================ */

/*
    PUT is used to EDIT an existing question.

    Example:
        PUT /12345

    Here "12345" is the id contained inside the URL.
*/
app.put("/:id",(req,res)=>{

    // Convert the id from a string into a number.
    const id = Number(req.params.id);

    // Read the JSON file.
    fs.readFile(JSON_PATH,"utf8",(err,jsonString)=>{

        if(err){

            return res.status(500).json({
                error:"Couldn't read JSON file"
            });

        }

        try {

            const data = JSON.parse(jsonString);

            /*
                Search for the question whose id matches
                the id received from the URL.

                findIndex() returns:
                - the position if found
                - -1 if not found
            */
            const index = data.questions.findIndex(
                q => q.id === id
            );

            // If the question doesn't exist...
            if(index === -1){

                return res.status(404).json({
                    error:"Question not found"
                });

            }

            /*
                Replace the old object.

                Spread operator (...) copies all existing properties.

                Then req.body overwrites only the edited fields.

                Finally, id is forced to remain unchanged.
            */
            data.questions[index] = {

                ...data.questions[index],

                ...req.body,

                id

            };

            // Save the edited object.
            saveJSON(data,res,()=>{

                res.json({

                    success:true,

                    // Return the updated object.
                    question:data.questions[index]

                });

            });

        }catch(error){

            res.status(500).json({
                error:"Invalid JSON"
            });

        }

    });

});


/* ============================================================
   DELETE
============================================================ */

/*
    DELETE removes a question permanently.

    Example:
        DELETE /12345
*/
app.delete("/:id",(req,res)=>{

    // Get the id from the URL.
    const id = Number(req.params.id);

    // Read the JSON database.
    fs.readFile(JSON_PATH,"utf8",(err,jsonString)=>{

        if(err){

            return res.status(500).json({
                error:"Couldn't read JSON file"
            });

        }

        try {

            const data = JSON.parse(jsonString);

            /*
                Find where the question is located inside the array.
            */
            const index = data.questions.findIndex(
                q => q.id === id
            );

            // If it doesn't exist...
            if(index === -1){

                return res.status(404).json({
                    error:"Question not found"
                });

            }

            /*
                splice(index,1)

                Removes one element starting at "index".

                splice() returns an array containing the removed items,
                therefore [0] gets the deleted object itself.
            */
            const deletedQuestion =
                data.questions.splice(index,1)[0];

            /*
                Notice that we DO NOT regenerate ids.

                Every question keeps its original id forever,
                even if another question gets deleted.
            */

            // Save the updated database.
            saveJSON(data,res,()=>{

                res.json({

                    success:true,

                    // Return the deleted object.
                    question:deletedQuestion

                });

            });

        }catch(error){

            res.status(500).json({
                error:"Invalid JSON"
            });

        }

    });

});


/* ============================================================
   SERVER
============================================================ */

/*
    Starts the Express server.

    Port 3000 is the address your frontend communicates with.

    0.0.0.0 allows devices on your local network
    to connect to this server.
*/
app.listen(3000,"0.0.0.0",()=>{

    console.log(
        "Server running on http://0.0.0.0:3000"
    );

});