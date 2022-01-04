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
        const results = await db.query("SELECT * FROM student WHERE studentid = $1", [req.user]);
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
app.put("/api/v1/profile/:id", async (req, res) => {
    console.log(req.params.id);
    console.log(req.body)

    try{
        const results = await db.query("UPDATE student SET username = $1, fullname = $2, email = $3, phonenumber = $4, school = $5 where studentid = $6 returning *", 
        [req.body.username, req.body.fullname, req.body.email, req.body.phonenumber, req.body.school, req.params.id]);

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

app.put("/profile", authorization, async (req, res) => {
    console.log(req.body)
    console.log(req.user)

    try{
        const results = await db.query("UPDATE student SET username = $1, fullname = $2, email = $3, phonenumber = $4, school = $5 where studentid = $6 returning *", 
        [req.body.username, req.body.fullname, req.body.email, req.body.phonenumber, req.body.school, req.user]);

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
app.post("/quiz/create", async(req, res)=>{
    console.log(req.body);
    subject="physics"

    try{
        const results = await db.query("INSERT INTO quiz(question) values ($1)", [req.body])
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

//////////////////////////////////////Video\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Get all video
app.get("/api/v1/video", async (req, res)=>{

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

// Create a video
app.post("/api/v1/video", async(req, res)=>{
    console.log(req.body);
    subject="physics"

    try{
        const results = await db.query("INSERT INTO video (link, title, subject) values ($1,$2,$3) returning *", [req.body.link, req.body.title, subject])
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
app.delete("/api/v1/video/:id", async (req, res) => {

    try{
        const results = db.query("DELETE FROM video where videoid = $1", [req.params.id])
        res.status(204).json({
            status: "success",
        });
    }catch(err){
        console.log(err)
    }
    
});

////////////////////////////////////////FLASHCARD\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Create a flashcard
app.post("/flashcard", async(req, res) => {

    try {
        const {studentid, subject, content} = req.body;
        const results = await db.query("INSERT INTO flashcard (studentid, subject, content) values ($1,$2,$3) returning *", [studentid,subject,content]);
        console.log(results);
        
    } catch (err) {
        console.log(err);
    }

});

// Get all Flashcard
app.get("/flashcard/display", async(req, res) => {

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
////////////////////////////////////////FLASHCARD\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Create a Forum
app.post("/forum/create", async(req, res) => {

    try {
        const results = await db.query("INSERT INTO forum (title, details, subject, author) values ($1,$2,$3,$4)", [req.body.title, req.body.details, req.body.subject, req.body.author])
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

/////////////////////////////////////////////Note\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Create a note
app.post("/note/create", async(req, res) => {

    try {
        const results = await db.query("INSERT INTO note (note) values ($1)", [req.body.url])
        console.log(req.body.url);
        
    } catch (err) {
        console.log(err);
    }

});

// Get all note
app.get("/note/display", async(req, res) => {

    try {
        const results = await db.query("SELECT * FROM note");
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

/////////////////////////////////////////////Note\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Create a submission
app.post("/submission/create", async(req, res) => {

    try {
        const results = await db.query("INSERT INTO submission (title, date, subject) values ($1,$2,$3)", [req.body.title, req.body.date, req.body.subject]);
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

// Get a math submission
app.get("/submission/display/mathematics", async(req, res) => {

    const subject = "mathematics"
    try {
        const results = await db.query("SELECT * FROM submission where subject = $1", [subject]);
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
        const results = await db.query("SELECT * FROM submission where subject = $1", [subject]);
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
        const results = await db.query("SELECT * FROM submission where subject = $1", [subject]);
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

    const subject = "physics"
    try {
        const results = await db.query("SELECT * FROM submission where subject = $1", [subject]);
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


/////////////////////////////////////////////Authentication\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// app.use("/auth", require("./routes/jwtAuth"));

app.post("/register",validInfo, async (req, res) => {

    try {
        
        //Destructure the req.body (username, fullname, email, password, phonenumber, school)
        const { username, fullname, email, password, phonenumber, school} = req.body;

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
        const newUser = await db.query("INSERT INTO student (username,fullname,email,password,phonenumber,school) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",[username, fullname, email, bcryptPassword, phonenumber, school]);

        //Generating jwt token
        const token = jwtGenerator(newUser.rows[0].studentid);

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
        const user = await db.query("SELECT * FROM student WHERE email = $1",[email]);

        if(user.rows.length === 0){
            return res.status(401).json("Password or Email is incorrect");
        }

        //Check if incoming password is the same the database password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if(!validPassword){
            return res.status(401).json("Password or Email is incorrect")
        }

        //Give them the jwt token
        const token = jwtGenerator(user.rows[0].studentid);
        
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