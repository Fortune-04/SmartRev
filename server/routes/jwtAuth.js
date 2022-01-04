const router = require("express").Router;
const pool = require('./db');
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator")

//Registering
router.post("/register",async (req, res) => {
    try {
        
        //Destructure the req.body (username, fullname, email, password, phonenumber, school)
        const { username, fullname, email, password, phonenumber, school} = req.body;

        //Check if user exist (if user exist then throw error)
        const user = await pool.query("SELECT * FROM student WHERE email = $1", [email]);
        
        if(user.rows.length !==0){
            return res.status(401).send("User already exist")
        }

        //Bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt (saltRound);
        const bcryptPassword = await bcrypt.hash (password, salt);

        //Enter a new user inside the database
        const newUser = await pool.query("INSERT INTO student (username,fullname,email,password,phonenumber,school) VALUES ($1, $2, $3, $4, $5, $6)",[username, fullname, email, bcryptPassword, phonenumber, school]);

        //Generating jwt token
        const token = jwtGenerator(newUser.rows[0].studentid)


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// const port = process.env.PORT;
// router.listen(port, ()=>{
//     console.log(`server is up and listening on port ${port}`);
// });

module.exports=router;