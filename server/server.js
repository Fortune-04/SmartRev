require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require('./db');

const morgan = require("morgan");
const app = express();

//Registeration and Login//
const bcrypt = require("bcrypt");
const jwtGenerator = require("../server/utils/jwtGenerator");
const validInfo = require("../server/middleware/validInfo");
const authorization = require("../server/middleware/authorize");

//Middleware//
app.use(cors());
app.use(express.json());

//////////////////////////////////////////////Profile\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Get all profile
app.get("/api/v1/profile", async (req, res)=>{

    try{
    const results = await db.query("select * from student")
    console.log(results);
    res.status(200).json({
        status: "success",
        data: {
            profile: results.rows,
        },
    });
    }catch(err){
        console.log(err);
    }

});

// Get a profile
app.get("/api/v1/profile/:id", async (req, res) =>{
    console.log(req.params.id);

    try{
        const results = await db.query("select * from student where studentid = $1", [req.params.id]);
        //select * from student where id = req.params.id
        
        res.status(200).json({
            status: "success",
            data: {
                profile: results.rows,
            },
        });

    }catch (err){
        console.log(err);
    }

});

app.get("/profile", authorization, async (req, res) =>{
    console.log(req.user);

    try{
        const results = await db.query("SELECT * FROM users WHERE userid = $1", [req.user]);
        res.status(200).json({
            status: "success",
            data: {
                profile: results.rows,
            },
        });

    }catch (err){
        console.log(err);
    }

});

//Get a profile by id
app.get("/profile/:id", async (req, res) =>{

    try{
        const results = await db.query("SELECT * FROM users WHERE userid = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                profile: results.rows,
            },
        });

    }catch (err){
        console.log(err);
    }

});

//Get a profile base on code and subject
app.get("/profile/:code/:subject", async (req, res) =>{
    console.log(req.params.code);
    console.log(req.params.subject);

    if(req.params.subject === "math"){
        try{
            const results = await db.query(`SELECT * FROM users WHERE math = $1`, [req.params.code]);
            res.status(200).json({
                status: "success",
                data: {
                    profile: results.rows,
                },
            });
    
        }catch (err){
            console.log(err);
        }
    }
    else if(req.params.subject === "physics"){
        try{
            const results = await db.query(`SELECT * FROM users WHERE physics = $1`, [req.params.code]);
            res.status(200).json({
                status: "success",
                data: {
                    profile: results.rows,
                },
            });
    
        }catch (err){
            console.log(err);
        }
    }
    else if(req.params.subject === "chemistry"){
        try{
            const results = await db.query(`SELECT * FROM users WHERE chemistry = $1`, [req.params.code]);
            res.status(200).json({
                status: "success",
                data: {
                    profile: results.rows,
                },
            });
    
        }catch (err){
            console.log(err);
        }
    }
    else if(req.params.subject === "biology"){
        try{
            const results = await db.query(`SELECT * FROM users WHERE biology = $1`, [req.params.code]);
            res.status(200).json({
                status: "success",
                data: {
                    profile: results.rows,
                },
            });
    
        }catch (err){
            console.log(err);
        }
    }else{
        console.log("No Student");
    }
    

});


// Create a profile
app.post("/api/v1/profile", async(req, res)=>{
    console.log(req.body);

    try{
        const results = await db.query("INSERT INTO student (studentid, username, password, name, age) values ($1,$2,$3,$4,$5) returning *", 
        [req.body.studentid, req.body.username, req.body.password, req.body.name, req.body.age])
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                profile: results.rows[0],
            },
        });

    }catch(err){
        console.log(err);
    }

});

// Update Profile
app.put("/profile/update", async (req, res) => {
    console.log(req.body)

    try{
        const results = await db.query("UPDATE users SET fullname = $1, email = $2, phonenumber = $3, school = $4 where userid = $5 returning *", 
        [req.body.fullname, req.body.email, req.body.phonenumber, req.body.school, req.body.id]);

        res.status(200).json({
            status: "success",
            data: {
                profile: results.rows[0],
            },
        });

    }catch(err){
        console.log(err);
    }
    
});

// Update score in Profile
app.put("/profile/update/score", async (req, res) => {
    console.log(req.body)

    try{
        const results = await db.query("UPDATE users SET score = $1 WHERE userid = $2 returning *", 
        [req.body.displayScore, req.body.id]);

        res.status(200).json({
            status: "success",
            data: {
                profile: results.rows[0],
            },
        });

    }catch(err){
        console.log(err);
    }
    
});

// Update contribution score in Profile
app.put("/profile/update/contribution", async (req, res) => {
    console.log(req.body)

    try{
        const results = await db.query("UPDATE users SET contribution = $1 WHERE userid = $2 returning *", 
        [req.body.contScore2, req.body.id]);

        res.status(200).json({
            status: "success",
            data: {
                profile: results.rows[0],
            },
        });

    }catch(err){
        console.log(err);
    }
    
});

// Update involvement score in Profile
app.put("/profile/update/involvement", async (req, res) => {
    console.log(req.body)

    try{
        const results = await db.query("UPDATE users SET involvement = $1 WHERE userid = $2 returning *", 
        [req.body.involveScore2, req.body.id]);

        res.status(200).json({
            status: "success",
            data: {
                profile: results.rows[0],
            },
        });

    }catch(err){
        console.log(err);
    }
    
});

// Update Profile to kick in mark
app.put("/profile/update/:id", async (req, res) => {

    if(req.body.subject === "mathematics"){
        try{
            const results = await db.query("UPDATE users SET mathscore = $1 WHERE userid = $2 returning *", 
            [req.body.mark, req.params.id]);
    
            res.status(200).json({
                status: "success",
                data: {
                    profile: results.rows[0],
                },
            });
    
        }catch(err){
            console.log(err);
        }
    }
    else if(req.body.subject === "physics"){

        try{
            const results = await db.query("UPDATE users SET physicsscore = $1 WHERE userid = $2 returning *", 
            [req.body.mark, req.params.id]);
    
            res.status(200).json({
                status: "success",
                data: {
                    profile: results.rows[0],
                },
            });
    
        }catch(err){
            console.log(err);
        }
    }
    else if(req.body.subject === "chemistry"){

        try{
            const results = await db.query("UPDATE users SET chemistryscore = $1 WHERE userid = $2 returning *", 
            [req.body.mark, req.params.id]);
    
            res.status(200).json({
                status: "success",
                data: {
                    profile: results.rows[0],
                },
            });
    
        }catch(err){
            console.log(err);
        }
    }
    else if(req.body.subject === "biology"){

        try{
            const results = await db.query("UPDATE users SET biologyscore = $1 WHERE userid = $2 returning *", 
            [req.body.mark, req.params.id]);
    
            res.status(200).json({
                status: "success",
                data: {
                    profile: results.rows[0],
                },
            });
    
        }catch(err){
            console.log(err);
        }
    }else{
        console.log("No Student");
    }

});

// app.put("/profile/update", async (req, res) => {
//     console.log(req.body)
//     // console.log(req.user)

//     try{
//         const results = await db.query("UPDATE users SET fullname = $1, email = $2, phonenumber = $3, school = $4 WHERE userid = $5 returning *", 
//         [req.body.fullname, req.body.email, req.body.phonenumber, req.body.school, req.body.id]);

//         res.status(200).json({
//             status: "success",
//             data: {
//                 profile: results.rows[0],
//             },
//         });

//     }catch(err){
//         console.log(err);
//     }
    
// });

// Delete profile
app.delete("/api/v1/profile/:id", async (req, res) => {

    try{
        const results = db.query("DELETE FROM student where studentid = $1", [req.params.id])
        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err);
    }
    
});

//////////////////////////////////////Quiz\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Create a quiz
app.post("/quiz/create", async(req, res)=> {

    console.log(req.body);

    try{
        const results = await db.query("INSERT INTO quiz (userid, title, class, subject, nameclass) values ($1, $2, $3, $4, $5) RETURNING *", 
        [req.body.id, req.body.title, req.body.code, req.body.subject, req.body.nameclass]);
        
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                quiz: results.rows[0],
            },
        });

    }catch(err){
        console.log(err)
    }

});


// Get certain quiz
app.get("/quiz/display/:id", async(req, res) => {

    console.log(req.params.id)
    try {
        const results = await db.query("SELECT * FROM quiz WHERE userid = $1",[req.params.id]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                quiz: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

//Get certain quiz with class code
app.get("/quiz/class/:code", async(req, res) => {

    try {
        const results = await db.query("SELECT * FROM quiz WHERE class = $1",[req.params.code]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                quiz: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a quiz with quizid
app.get("/quiz/edit/:qid", async(req, res) => {

    console.log(req.params.qid)
    try {
        const results = await db.query("SELECT * FROM quiz WHERE quizid = $1",[req.params.qid]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                quiz: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a quiz with quizid and subject
app.get("/quiz/display/:id/:sub", async(req, res) => {

    try {
        const results = await db.query("SELECT * FROM quiz WHERE userid = $1 AND subject = $2",[req.params.id, req.params.sub]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                quiz: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

//Update quiz
app.put("/quiz/update", async (req, res) => {

    try{
        const results = await db.query("UPDATE quiz SET title=$1, class=$2, subject=$3, nameclass=$4 WHERE quizid=$5", 
        [req.body.title, req.body.class, req.body.subject, req.body.nameclass, req.body.id]);
        console.log(results);

        res.status(200).json({
            status: "success",
            data: {
                quiz: results.rows[0],
            },
        });

    }catch(err){
        console.log(err);
    }
    
});

// Delete a quiz
app.delete("/quiz/delete/:id", async (req, res) => {

    try{
        const results = db.query("DELETE FROM quiz WHERE quizid = $1", [req.params.id])
        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err);
    }
    
});

// Create a question
app.post("/quiz/create/question", async(req, res)=> {

    console.log(req.body);
    // const quizid = 5;

    try{
        const results = await db.query("INSERT INTO question (quizid, quest, option1, option2, option3, option4, answer) values ($1, $2, $3, $4, $5, $6, $7)", 
        [req.body.quizid, req.body.quest.quest, req.body.quest.option1, req.body.quest.option2, req.body.quest.option3, req.body.quest.option4, req.body.quest.answer]);

        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                question: results.rows[0],
            },
        });

    }catch(err){
        console.log(err)
    }

});

// Get quiz question with quiz id
app.get("/quiz/question/:qid", async(req, res) => {

    console.log(req.params.qid)
    try {
        const results = await db.query("SELECT * FROM question WHERE quizid = $1",[req.params.qid]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                question: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

//Update question
app.put("/quiz/question/update", async (req, res) => {

    try{
        const results = await db.query("UPDATE question SET quest=$1, option1=$2, option2=$3, option3=$4, option4=$5, answer=$6 WHERE quizid=$7", 
        [req.body.quest.quest, req.body.quest.option1, req.body.quest.option2, req.body.quest.option3, req.body.quest.option4, req.body.quest.answer, req.body.id]);
        console.log(results);

        res.status(200).json({
            status: "success",
            data: {
                quiz: results.rows[0],
            },
        });

    }catch(err){
        console.log(err);
    }
    
});

// Delete question by quizid
app.delete("/quiz/delete/quest/:id", async (req, res) => {

    try{
        const results = db.query("DELETE FROM question WHERE quizid = $1", [req.params.id])
        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err);
    }
    
});

//////////////////////////////////////Video\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Get all video
app.get("/video", async (req, res)=>{

    try{
    const results = await db.query("SELECT * FROM video")
    console.log(results);
    res.status(200).json({
        status: "success",
        data: {
            video: results.rows,
        },
    });
    }catch(err){
        console.log(err);
    }

});

// Get certain video
app.get("/video/:info", async (req, res)=>{

    console.log(req.params.info)

    try{
        const results = await db.query("SELECT * FROM video WHERE class=$1", [req.params.info])
        // console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                video: results.rows,
            },
        });
    }catch(err){
        console.log(err);
    }

});

// Create a video
app.post("/video", async(req, res)=>{
    console.log(req.body);
    // subject="physics"

    try{
        const results = await db.query("INSERT INTO video (title, link, subject, class, nameclass) values ($1,$2,$3,$4,$5) returning *", [req.body.title, req.body.link, req.body.subject, req.body.code, req.body.nameclass])
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                video: results.rows[0],
            },
        });

    }catch(err){
        console.log(err)
    }

});

// Delete a video
app.delete("/video/:id", async (req, res) => {

    try{
        const results = db.query("DELETE FROM video where videoid = $1", [req.params.id])
        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err)
    }
    
});

// Get mathematics video
app.get("/video/display/mathematics", async(req, res) => {

    const subject = "mathematics"
    try {
        const results = await db.query("SELECT * FROM video where subject = $1", [subject]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                video: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get physics video
app.get("/video/display/physics", async(req, res) => {

    const subject = "physics"
    try {
        const results = await db.query("SELECT * FROM video where subject = $1", [subject]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                video: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get chemistry video
app.get("/video/display/chemistry", async(req, res) => {

    const subject = "chemistry"
    try {
        const results = await db.query("SELECT * FROM video where subject = $1", [subject]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                video: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get biology video
app.get("/video/display/biology", async(req, res) => {

    const subject = "biology"
    try {
        const results = await db.query("SELECT * FROM video where subject = $1", [subject]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                video: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});



////////////////////////////////////////FLASHCARD\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Create a Flashcard
app.post("/flashcard", async(req, res) => {

    try {
        const {userid, subject, content} = req.body;
        const results = await db.query("INSERT INTO flashcard (userid, subject, content) values ($1,$2,$3) returning *", [userid,subject,content]);
        console.log(results);
        
    } catch (err) {
        console.log(err);
    }

});

// Get all Flashcard
app.get("/flashcard/display/all", async(req, res) => {

    try {
        const results = await db.query("SELECT * FROM flashcard");
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                flashcard: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get subject flashcards
app.get("/flashcard/display/:subject/:id", async(req, res) => {

    try {
        const results = await db.query("SELECT * FROM flashcard WHERE userid = $1 AND subject = $2", [req.params.id, req.params.subject]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                flashcard: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Delete a Flashcard
app.delete("/flashcard/:id", async (req, res) => {

    try{
        const results = db.query("DELETE FROM flashcard where flashcardid = $1", [req.params.id])
        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err);
    }
    
});

////////////////////////////////////////Forum\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Create a Forum
app.post("/forum/create", async(req, res) => {

    try {
        const results = await db.query("INSERT INTO forum (title, details, author, date, class, nameclass, subject) values ($1,$2,$3,$4,$5,$6,$7)", [req.body.title, req.body.details, req.body.author, req.body.todayDate, req.body.code, req.body.nameclass, req.body.subject])
        console.log(results);
        
    } catch (err) {
        console.log(err);
    }

});

// Get all forum
app.get("/forum/display", async(req, res) => {

    try {
        const results = await db.query("SELECT * FROM forum");
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                forum: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get certain forum
app.get("/forum/display/:info", async(req, res) => {

    console.log(req.params.info)

    try {
        const results = await db.query("SELECT * FROM forum WHERE class = $1",[req.params.info]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                forum: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a forum
app.get("/forum/description/:id", async(req, res) => {
    console.log(req.params.id);

    try {
        const results = await db.query("SELECT * FROM forum where forumid = $1",[req.params.id]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                forum: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Update a forum
app.put("/forum/update/:id", async (req, res) => {
    console.log(req.params.id);
    console.log(req.body.replies)

    try{
        const results = await db.query("UPDATE test SET reply = $1 WHERE forumid = $2", 
        [req.body.replies, req.body.id]);
        console.log(results);

        res.status(200).json({
            status: "success",
            data: {
                forum: results.rows[0],
            },
        });

    }catch(err){
        console.log(err);
    }
    
});

// Create a reply
app.post("/forum/reply", async(req, res) => {

    try {
        const results = await db.query("INSERT INTO replyforum (userid, forumid, name, reply, date, time) values ($1,$2,$3,$4,$5,$6)", [req.body.userid, req.body.id, req.body.myreply.author, req.body.myreply.reply, req.body.myreply.date, req.body.myreply.time])
        console.log(results);
        
    } catch (err) {
        console.log(err);
    }

});

// Get all from reply
app.get("/forum/reply/all", async(req, res) => {

    try {
        const results = await db.query("SELECT * FROM replyforum");
        res.status(200).json({
            status: "success",
            data: {
                reply: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get certain reply by forumid
app.get("/forum/reply/:id", async(req, res) => {
    console.log(req.params.id);

    try {
        const results = await db.query("SELECT * FROM replyforum where forumid = $1",[req.params.id]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                reply: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a reply by replyid
app.get("/forum/replyforum/:id", async(req, res) => {
    console.log(req.params.id);

    try {
        const results = await db.query("SELECT * FROM replyforum WHERE replyid = $1",[req.params.id]);
        // console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                reply: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a reply by replyid
app.get("/forum/replyforum/counter/:id", async(req, res) => {

    try {
        const results = await db.query("SELECT * FROM replyforum WHERE userid = $1",[req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                reply: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Update a reply
app.put("/forum/replyforum", async (req, res) => {

    try{
        const results = await db.query("UPDATE replyforum SET counter = $1 WHERE replyid = $2", 
        [req.body.counter, req.body.repId]);
        console.log(results);

        res.status(200).json({
            status: "success",
            data: {
                reply: results.rows[0],
            },
        });

    }catch(err){
        console.log(err);
    }
    
});

/////////////////////////////////////////////Note\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Create a note
app.post("/note/create", async(req, res) => {

    // const name = "file"
    try {
        const results = await db.query("INSERT INTO note (userid, note, filename) values ($1, $2, $3)", [req.body.id,req.body.link, req.body.name])
        // console.log(req.body.url);
        
    } catch (err) {
        console.log(err);
    }

});

// Create a note by saving
app.post("/note/create/save", async(req, res) => {

    try {
        const results = await db.query("INSERT INTO note (userid, note, filename) values ($1, $2, $3)", [req.body.id, req.body.link, req.body.filename])
        console.log(req.body.url);
        
    } catch (err) {
        console.log(err);
    }

});

// Create a note for class by teacher
app.post("/note/class/teacher/create", async(req, res) => {

    //const name = "file"
    try {
        const results = await db.query("INSERT INTO note (userid, note, filename, class, subject, nameclass) values ($1, $2, $3, $4, $5, $6)", 
        [req.body.id, req.body.link, req.body.name, req.body.code, req.body.subject, req.body.classname])
        
    } catch (err) {
        console.log(err);
    }

});

// Create a note for class by student
app.post("/note/class/student/create", async(req, res) => {

    // const name = "file"
    try {
        const results = await db.query("INSERT INTO note (userid, note, filename, class, subject) values ($1, $2, $3, $4, $5)", 
        [req.body.id, req.body.link, req.body.name, req.body.code, req.body.subject])
        
    } catch (err) {
        console.log(err);
    }

});

// Get all note
app.get("/note/display", async(req, res) => {

    try {
        const results = await db.query("SELECT * FROM note");
        // console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                note: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a note by noteid
app.get("/note/display/save/:id", async(req, res) => {

    try {
        const results = await db.query("SELECT * FROM note WHERE noteid=$1 ",[req.params.id]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                note: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get notes by userid
app.get("/note/counter/:id", async(req, res) => {

    try {
        const results = await db.query("SELECT * FROM note WHERE userid=$1 ",[req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                note: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get certain note
app.get("/note/display/:id", async(req, res) => {
    console.log(req.params.id)

    try {
        const results = await db.query("SELECT * FROM note WHERE userid=$1 AND class IS NULL ",[req.params.id]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                note: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get certain note with code
app.get("/note/class/display/:code", async(req, res) => {

    try {
        const results = await db.query("SELECT * FROM note WHERE class=$1",[req.params.code]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                note: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Delete a note
app.delete("/note/:id", async (req, res) => {

    try{
        const results = db.query("DELETE FROM note WHERE noteid = $1", [req.params.id])
        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err);
    }
    
});

// Update note
app.put("/note/update", async (req, res) => {

    try{
        const results = await db.query("UPDATE note SET counter = $1 WHERE noteid = $2", 
        [req.body.counter, req.body.notId]);
        console.log(results);

        res.status(200).json({
            status: "success",
            data: {
                note: results.rows[0],
            },
        });

    }catch(err){
        console.log(err);
    }
    
});

/////////////////////////////////////////////Submission\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Create a submission
app.post("/submission/create", async(req, res) => {

    try {
        const results = await db.query("INSERT INTO submission (userid, title, subject, class, nameclass, duedate) values ($1,$2,$3,$4,$5,$6)", [req.body.id, req.body.title, req.body.subject, req.body.code, req.body.nameclass, req.body.date]);
        console.log(results);
        
    } catch (err) {
        console.log(err);
    }

});

// Get all submission
app.get("/submission/display", async(req, res) => {

    try {
        const results = await db.query("SELECT * FROM submission");
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                sub: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get certain submissions
app.get("/submission/:info", async(req, res) => {

    try {
        const results = await db.query("SELECT *, to_char(duedate, 'DD-MM-YYYY') as date, to_char(duedate, 'HH24:MI') as time FROM submission WHERE class=$1", [req.params.info]);
        // console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                sub: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a submission
app.get("/submission/dis/:sid", async(req, res) => {

    try {
        const results = await db.query("SELECT *, to_char(duedate, 'DD-MM-YYYY') as date, to_char(duedate, 'HH24:MI') as time FROM submission WHERE subid = $1", [req.params.sid]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                sub: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a math submission
app.get("/submission/display/mathematics", async(req, res) => {

    const subject = "mathematics"
    try {
        const results = await db.query("SELECT *, to_char(duedate, 'DD-MM-YYYY') as date, to_char(duedate, 'HH24:MI') as time FROM submission where subject = $1", [subject]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                sub: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a physics submission
app.get("/submission/display/physics", async(req, res) => {

    const subject = "physics"
    try {
        const results = await db.query("SELECT *,to_char(duedate, 'DD-MM-YYYY') as date, to_char(duedate, 'HH24:MI') as time FROM submission where subject = $1", [subject]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                sub: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a chemistry submission
app.get("/submission/display/chemistry", async(req, res) => {

    const subject = "chemistry"
    try {
        const results = await db.query("SELECT *, to_char(duedate, 'DD-MM-YYYY') as date, to_char(duedate, 'HH24:MI') as time FROM submission where subject = $1", [subject]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                sub: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a biology submission
app.get("/submission/display/biology", async(req, res) => {

    const subject = "biology"
    try {
        const results = await db.query("SELECT *, to_char(duedate, 'DD-MM-YYYY') as date, to_char(duedate, 'HH24:MI') as time FROM submission where subject = $1", [subject]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                sub: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

//Update Submission
app.put("/submission/update", async (req, res) => {

    try{
        const results = await db.query("UPDATE submission SET title = $1, duedate = $2  WHERE subid = $3 returning *", 
        [req.body.title, req.body.date, req.body.sbid]);

        res.status(200).json({
            status: "success",
            data: {
                sub: results.rows[0],
            },
        });

    }catch(err){
        console.log(err);
    }
    
});


//Create submission in submission list
app.post("/submission/submissionlist", async(req, res) => {

    try {
        const results = await db.query("INSERT INTO submissionlist (subid, userid, fullname, file, filename) values ($1,$2,$3,$4,$5)", [req.body.sid, req.body.id, req.body.fullname, req.body.url, req.body.filename]);
        console.log(results);
        
    } catch (err) {
        console.log(err);
    }

});

// Get certain submission from submission list
app.get("/submission/submissionlist/:subid", async(req, res) => {

    try {
        const results = await db.query("SELECT * FROM submissionlist WHERE subid = $1", [req.params.subid]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                sub: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a submission from submission list
app.get("/submission/submissionlist/:sid/:id", async(req, res) => {

    console.log(req.params.sid)
    console.log(req.params.id)

    try {
        const results = await db.query("SELECT * FROM submissionlist WHERE subid = $1 AND userid = $2", [req.params.sid, req.params.id]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                sub: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get all submission from submission list by userid
app.get("/submission/sublist/:id", async(req, res) => {

    try {
        const results = await db.query("SELECT * FROM submissionlist WHERE userid = $1", [req.params.id]);
        // console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                sub: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

/////////////////////////////////////////////Submission\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Create a class
app.post("/class/create", async(req, res) => {

    try {
        const results = await db.query("INSERT INTO class (userid, name, code, subject) values ($1,$2,$3,$4)", [req.body.id, req.body.name, req.body.code, req.body.subject]);
        console.log(results);
        
    } catch (err) {
        console.log(err);
    }

});

// Get a class by code
app.get("/class/find/:code", async(req, res) => {
    console.log(req.params.code);

    try {
        const results = await db.query("SELECT * FROM class WHERE code = $1", [req.params.code]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                class: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Get a class by id
app.get("/class/find/code/:id", async(req, res) => {
    console.log(req.params.id);

    try {
        const results = await db.query("SELECT * FROM class WHERE userid = $1", [req.params.id]);
        console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                class: results.rows,
            },
        });
    } catch (err) {
        console.log(err);
    }

});

// Update math code at user profile
app.put("/profile/code/mathematics/:id", async (req, res) => {
    console.log(req.params.id);
    console.log(req.body)

    try{
        const results = await db.query("UPDATE users SET math = $1 WHERE userid = $2 returning *", 
        [req.body.code, req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                profile: results.rows[0],
            },
        });

    }catch(err){
        console.log(err);
    }
    
});

// Update physics code at user profile
app.put("/profile/code/physics/:id", async (req, res) => {
    console.log(req.params.id);
    console.log(req.body)

    try{
        const results = await db.query("UPDATE users SET physics = $1 WHERE userid = $2 returning *", 
        [req.body.code, req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                profile: results.rows[0],
            },
        });

    }catch(err){
        console.log(err);
    }
    
});

// Update chemistry code at user profile
app.put("/profile/code/chemistry/:id", async (req, res) => {
    console.log(req.params.id);
    console.log(req.body)

    try{
        const results = await db.query("UPDATE users SET chemistry = $1 WHERE userid = $2 returning *", 
        [req.body.code, req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                profile: results.rows[0],
            },
        });

    }catch(err){
        console.log(err);
    }
    
});

// Update biology code at user profile
app.put("/profile/code/biology/:id", async (req, res) => {
    console.log(req.params.id);
    console.log(req.body)

    try{
        const results = await db.query("UPDATE users SET biology = $1 WHERE userid = $2 returning *", 
        [req.body.code, req.params.id]);

        res.status(200).json({
            status: "success",
            data: {
                profile: results.rows[0],
            },
        });

    }catch(err){
        console.log(err);
    }
    
});

/////////////////////////////////////////////Authentication\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// app.use("/auth", require("./routes/jwtAuth"));

app.post("/register",validInfo, async (req, res) => {

    try {
        
        //Destructure the req.body (username, fullname, email, password, phonenumber, school)
        const { username, fullname, email, password, phonenumber, school, type} = req.body;

        //Check if user exist (if user exist then throw error)
        const user = await db.query("SELECT * FROM student WHERE email = $1", [email]);
        
        if(user.rows.length !==0){
            return res.status(401).send("User already exist")
        }

        //Bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt (saltRound);
        const bcryptPassword = await bcrypt.hash (password, salt);

        //Enter a new user inside the database
        const newUser = await db.query("INSERT INTO users (username,fullname,email,password,phonenumber,school, usertype) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",[username, fullname, email, bcryptPassword, phonenumber, school, type]);

        //Generating jwt token
        const token = jwtGenerator(newUser.rows[0].userid);

        res.json({ token });

        // res.status(403).send("success");


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});

app.post("/login", validInfo, async(req, res) => {

    try {

        //Destructure the req.body
        const {email, password} = req.body;

        //Check if user doesnt exist(if not then we throw error)
        const user = await db.query("SELECT * FROM users WHERE email = $1",[email]);

        if(user.rows.length === 0){
            return res.status(401).json("Password or Email is incorrect");
        }

        //Check if incoming password is the same the database password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword){
            return res.status(401).json("Password or Email is incorrect")
        }

        //Give them the jwt token
        const token = jwtGenerator(user.rows[0].userid);
        
        res.json({token});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});

app.get("/verify", authorization, async (req, res) => {

    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});

app.get("/mainmenu", authorization, async(req, res) => {

    try {
        res.json(req.user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

});


//Routes//
const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`server is up and listening on port ${port}`);
});