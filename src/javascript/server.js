import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const JSON_PATH = "./src/javascript/abcdefg.json";


/* ============================================================
   Helper
============================================================ */

function saveJSON(data, res, callback) {

    fs.writeFile(
        JSON_PATH,
        JSON.stringify(data, null, 2),
        (err) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    error: "Couldn't save JSON",
                });

            }

            callback();

        }
    );

}


/* ============================================================
   GET
============================================================ */

app.get("/", (req, res) => {

    fs.readFile(JSON_PATH, "utf8", (err, jsonString) => {

        if (err) {

            return res.status(500).json({
                error:"Couldn't read JSON file"
            });

        }


        try {

            const data = JSON.parse(jsonString);


            res.json(data);


        } catch(error) {

            res.status(500).json({
                error:"Invalid JSON"
            });

        }

    });

});



/* ============================================================
   POST
============================================================ */

app.post("/", (req,res)=>{


    fs.readFile(JSON_PATH,"utf8",(err,jsonString)=>{


        if(err){

            return res.status(500).json({
                error:"Couldn't read JSON file"
            });

        }


        try {


            const data = JSON.parse(jsonString);



            const newQuestion = {

                id: Date.now(),

                topic: req.body.topic ?? "",

                favorite: req.body.favorite ?? false,

                question: req.body.question ?? "",

                explanation: req.body.explanation ?? "",

                answer: req.body.answer ?? "",

                example: req.body.example ?? ""

            };



            data.questions.push(newQuestion);



            saveJSON(data,res,()=>{


                res.json({

                    success:true,

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

app.put("/:id",(req,res)=>{


    const id = Number(req.params.id);



    fs.readFile(JSON_PATH,"utf8",(err,jsonString)=>{


        if(err){

            return res.status(500).json({
                error:"Couldn't read JSON file"
            });

        }


        try {


            const data = JSON.parse(jsonString);



            const index = data.questions.findIndex(
                q => q.id === id
            );



            if(index === -1){

                return res.status(404).json({
                    error:"Question not found"
                });

            }



            data.questions[index] = {

                ...data.questions[index],

                ...req.body,

                id

            };



            saveJSON(data,res,()=>{


                res.json({

                    success:true,

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

app.delete("/:id",(req,res)=>{


    const id = Number(req.params.id);



    fs.readFile(JSON_PATH,"utf8",(err,jsonString)=>{


        if(err){

            return res.status(500).json({
                error:"Couldn't read JSON file"
            });

        }


        try {


            const data = JSON.parse(jsonString);



            const index = data.questions.findIndex(
                q => q.id === id
            );



            if(index === -1){

                return res.status(404).json({
                    error:"Question not found"
                });

            }



            const deletedQuestion =
                data.questions.splice(index,1)[0];



            // DO NOT TOUCH IDS HERE



            saveJSON(data,res,()=>{


                res.json({

                    success:true,

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

app.listen(3000,"0.0.0.0",()=>{

    console.log(
        "Server running on http://0.0.0.0:3000"
    );

});