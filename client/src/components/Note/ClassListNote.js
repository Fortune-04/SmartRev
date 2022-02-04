//Temp2 for notes

import React, { useState, useEffect } from 'react';
import ClassFinder from '../../apis/ClassFinder';
import ProfileFinder from '../../apis/ProfileFinder';

//Material UI
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';

const ClassListNote = ({id, role}) => {

    //Data
    const [userclasses, setUserclasses] = useState([]);
    // const [codes, setCodes] = useState([]);
    // const [nameMath, setNameMath] = useState('');
    // const [namePhy, setNamePhy] = useState('');
    // const [nameChem, setNameChem] = useState('');
    // const [nameBio, setNameBio] = useState('');

    useEffect(() => {

        const getInfoSt = async () => {
            try {
                const response = await ProfileFinder.get(`/${id}`)
                // setCodes(response.data.data.profile[0].physics)
                // if(response.data.data.profile[0].math !== null){
                //     setCodes(codes => [...codes,response.data.data.profile[0].math]);
                // }
                // if(response.data.data.profile[0].physics !== null){
                //     setCodes(codes => [...codes,response.data.data.profile[0].physics]);
                // }
                // if(response.data.data.profile[0].chemistry !== null){
                //     setCodes(codes => [...codes,response.data.data.profile[0].chemistry]);
                // }
                // if(response.data.data.profile[0].biology !== null){
                //     setCodes(codes => [...codes,response.data.data.profile[0].biology]);
                // }

                // if(response.data.data.profile[0].math !== null){
                //     try {
                //         const res = await ClassFinder.get(`/find/${response.data.profile[0].math}`)
                //         console.log(res);
                //         setUserclasses(userclasses => [...userclasses,{classid: 1, name:"Mathematics", subject:"mathematics", name:res.data.data.class[0].code, code:response.data.data.profile[0].math}]);
                //     } catch (err) {
                //         console.error(err.message);
                //     }  
                // }
                // if(response.data.data.profile[0].physics !== null){
                //     try {
                //         const res = await ClassFinder.get(`/find/${response.data.profile[0].physics}`)
                //         console.log(res);
                //         setUserclasses(userclasses => [...userclasses,{classid: 2, name:"Physics", subject:"physics", name:res.data.data.class[0].code, code:response.data.data.profile[0].physics}]);
                //     } catch (err) {
                //         console.error(err.message);
                //     }
                //     // setUserclasses(userclasses => [...userclasses,{classid: 2, name:"Physics", subject:"physics", name:namePhy, code:response.data.profile[0].physics}]);
                // }
                // if(response.data.data.profile[0].chemistry !== null){
                //     try {
                //         const res = await ClassFinder.get(`/find/${response.data.profile[0].chemistry}`)
                //         console.log(res);
                //         setUserclasses(userclasses => [...userclasses,{classid: 3, name:"Chemistry", subject:"chemistry", name:res.data.data.class[0].code, code:response.data.data.profile[0].chemistry}]);
                //     } catch (err) {
                //         console.error(err.message);
                //     }
                //     // setUserclasses(userclasses => [...userclasses,{classid: 3, name:"Chemistry", subject:"chemistry", name:nameChem, code:response.data.profile[0].chemistry}]);
                // }
                // if(response.data.data.profile[0].biology !== null){
                //     try {
                //         const res = await ClassFinder.get(`/find/${response.data.profile[0].biology}`)
                //         console.log(res);
                //         setUserclasses(userclasses => [...userclasses,{classid: 4, name:"Biology", subject:"biology", name:res.data.data.class[0].code, code:response.data.data.profile[0].biology}]);
                //     } catch (err) {
                //         console.error(err.message);
                //     }
                //     // setUserclasses(userclasses => [...userclasses,{classid: 4, name:"Biology", subject:"biology", name:nameBio, code:response.data.profile[0].biology}]);
                // }

                if(response.data.data.profile[0].math !== null){
                    setUserclasses(userclasses => [...userclasses,{classid: 1, name:"Mathematics", subject:"mathematics", code:response.data.data.profile[0].math}]);
                }
                if(response.data.data.profile[0].physics !== null){
                    setUserclasses(userclasses => [...userclasses,{classid: 2, name:"Physics", subject:"physics", code:response.data.data.profile[0].physics}]);
                }
                if(response.data.data.profile[0].chemistry !== null){
                    setUserclasses(userclasses => [...userclasses,{classid: 3, name:"Chemistry", subject:"chemistry", code:response.data.data.profile[0].chemistry}]);
                }
                if(response.data.data.profile[0].biology !== null){
                    setUserclasses(userclasses => [...userclasses,{classid: 4, name:"Biology", subject:"biology",code:response.data.data.profile[0].biology}]);
                }

            } catch (err) {
                console.error(err.message);
            }
        };

        const getInfoTc = async () => {
            try {
                const response = await ClassFinder.get(`/find/code/${id}`)
                setUserclasses(response.data.data.class);
            } catch (err) {
                console.error(err.message);
            }
        };
    
        if(id && role === "student"){
            getInfoSt();
        }else if(id && role === "teacher"){
            getInfoTc();
        }
    
    }, [id]);

    console.log(userclasses)

    return (
        <Container size="sm">
            <Grid container spacing={3}>
                {/* {role === "student" && (
                    userclasses && userclasses.map(userclass => (
                    <Grid item xs={3}>
                    <Link href={`http://localhost:3000/note/classtc/${id}/${role}/${userclass.subject}/${userclass.name}/${userclass.code}`} underline="none">
                    <Card key={userclass.classid} sx={{ maxWidth: 345 }} >
                        <CardMedia
                            component="img"
                            height="200"
                            image="math-card-background.jpg"
                            alt="mathematics"
                        />
                        <CardContent>
                            <Typography variant="h5">
                                {userclass.name}
                            </Typography>
                        </CardContent>
                    </Card>
                    </Link>
                    </Grid>
                    ))
                )}

                {role === "teacher" && (
                    userclasses && userclasses.map(userclass => (
                    <Grid item xs={3}>
                    <Link href={`http://localhost:3000/note/classtc/${id}/${role}/${userclass.subject}/${userclass.name}/${userclass.code}`} underline="none">
                    <Card key={userclass.classid} sx={{ maxWidth: 345 }} >
                        <CardMedia
                            component="img"
                            height="200"
                            image="math-card-background.jpg"
                            alt="mathematics"
                        />
                        <CardContent>
                            <Typography variant="h5">
                                {userclass.name}
                            </Typography>
                        </CardContent>
                    </Card>
                    </Link>
                    </Grid>
                    ))
                )} */}

                {userclasses && userclasses.map(userclass => (
                    <Grid item xs={3} key={userclass.classid}>
                        <Link href={`http://localhost:3000/note/class/${id}/${role}/${userclass.subject}/${userclass.name}/${userclass.code}`} underline="none">
                        <Card sx={{ maxWidth: 345 }} >
                            <CardMedia
                                component="img"
                                height="200"
                                image="math-card-background.jpg"
                                alt="mathematics"
                            />
                            <CardContent>
                                <Typography variant="h5">
                                    {userclass.name}
                                </Typography>
                            </CardContent>
                        </Card>
                        </Link>
                    </Grid>
                ))}
                
            </Grid>
        </Container>
    );
}
 
export default ClassListNote;