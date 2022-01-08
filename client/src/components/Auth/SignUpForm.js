import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

const SignUpForm = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        username: "",
        fullname: "",
        email: "",
        password: "",
        password2: "",
        phonenumber:"",
        school: "",
    });

    const [type, setType] = useState('');
    const [phonenumber, setPhonenumber] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false);

    const { username, fullname, email, password, password2, school } = inputs;

    const onChange = e => setInputs({ ...inputs, [e.target.name]: e.target.value });

    const validate = (values) => {
      const errors = {};
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!username) {
        errors.username = "Username is required!";
      }
      if (!fullname) {
        errors.fullname = "Fullname is required!";
      }
      if (!email) {
        errors.email = "Email is required!";
      }else if (!regex.test(email)){
        errors.email = "Email is invalid!"
      }
      if (!password) {
        errors.password = "Password is required!";
      }
      if (!password2) {
        errors.password2 = "Confirm password is required!";
      }else if(password != password2){
        errors.password2 = "Password does not match";
      }
      if (!phonenumber) {
        errors.phonenumber = "Phone number is required!";
      }
      if (!school) {
        errors.school = "School name is required!";
      }
      if (!type) {
        errors.type = "Type of user is required!";
      }

      return errors;
    };

    const handleSubmit = async e => {
        e.preventDefault()
        setFormErrors(validate());
        setIsSubmit(true);

        if(isSubmit == true){
          try {
            const body = { username, fullname, email, password, phonenumber, school, type };
            const response = await fetch(
              "http://localhost:4400/register",
              {
                method: "POST",
                headers: {
                  "Content-type": "application/json"
                },
                body: JSON.stringify(body)
              }
            );
            const parseRes = await response.json();

            if (parseRes.token) {
              localStorage.setItem("token", parseRes.token);
              setAuth(true);
            } else {
              setAuth(false);
            }

          } catch (err) {
              console.error(err.message);
          }
        } 
    };

    // useEffect(() => {
    //   console.log(formErrors)
    //   if(Object.keys(formErrors).length === 0 && isSubmit) {
    //     console.log(inputs)
    //   }
    // }, [formErrors])

    return(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" autoComplete="off" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  // autoComplete="given-name"
                  // autoComplete="off"
                  name="username"
                  required
                  fullWidth
                  id="firstName"
                  label="Username"
                  value={username}
                  onChange={e => onChange(e)}
                  autoFocus
                />
                <Typography variant="caption">{formErrors.username}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  // autoComplete="off"
                  required
                  fullWidth
                  id="lastName"
                  label="Full Name"
                  name="fullname"
                  // autoComplete="family-name"
                  value={fullname}
                  onChange={e => onChange(e)}
                />
                <Typography variant="caption">{formErrors.fullname}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  // autoComplete="email"
                  value={email}
                  onChange={e => onChange(e)}
                />
                <Typography variant="caption">{formErrors.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  // autoComplete="new-password"
                  value={password}
                  onChange={e => onChange(e)}
                />
                <Typography variant="caption">{formErrors.password}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  // autoComplete="new-password"
                  value={password2}
                  onChange={e => onChange(e)}
                />
                <Typography variant="caption">{formErrors.password2}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phonenumber"
                  label="Phone Number"
                  name="phonenumber"
                  // autoComplete="phonenumber"
                  value={phonenumber}
                  // onChange={e => onChange(e)}
                  onChange={e => setPhonenumber(e.target.value.replace(/[^0-9]/g, ''))}
                />
                <Typography variant="caption">{formErrors.phonenumber}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="school"
                  label="School"
                  name="school"
                  // autoComplete="school"
                  value={school}
                  onChange={e => onChange(e)}
                />
                <Typography variant="caption">{formErrors.school}</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                <InputLabel id="type-user">Type</InputLabel>
                    <Select
                      labelId="type-user"
                      id="type"
                      value={type}
                      label="Type"
                      onChange={(e) => setType(e.target.value)}
                    >
                      <MenuItem value={"student"}>Student</MenuItem>
                      <MenuItem value={"teacher"}>Teacher</MenuItem>
                    </Select>
                </FormControl>
                <Typography variant="caption">{formErrors.type}</Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/loginform" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    )
}

export default SignUpForm