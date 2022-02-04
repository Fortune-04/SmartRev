import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import ForumFinder from "../../apis/ForumFinder";

//Material UI
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Forum = () => {

    //Data
    const [author, setAuthor] = useState();
    const [userid, setUserid] = useState();

    //Output
    const [contents, setContents] = useState();
    const [replies, setReplies] = useState([]);

    //Input
    const {id} = useParams();
    const [text, setText] = useState("");
    const [myreply,setMyreply] = useState();

    //Other data
    const date = new Date();
    const todayDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    const time = date.getHours() + ":" + date.getMinutes();

    //LikeButton
    const [counter, setCounter] = useState(0);
    const [repId, setRepId] = useState();

    //Error handling
    const [button, setButton] = useState(true);
    const [toUpdate, setToUpdate] = useState(false);

    const handleSubmit = (e) => {
        // e.preventDefault();
        // setReplies(replies => [...replies, {author: author, date: todayDate, time: time, reply: text}])
        setMyreply({author: author, date: todayDate, time: time, reply: text});
        setToUpdate(true)
        // setButton(true);
    };

    const handleReply = () => {
        setMyreply({author: "", date: "", time: "", reply: ""});
        setButton(false);
    };

    const clickLike = async (replyid) => {
        try {
            const response = await ForumFinder.get(`/replyforum/${replyid}`)
            console.log(response)
            if(response.data.data.reply[0].counter === 0){
                setCounter(1)
            }else{
                setCounter(response.data.data.reply[0].counter + 1)
            }
            setRepId(replyid);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        const updateCounter = async () => {
            try {
                const response = await ForumFinder.put(`/replyforum`, {counter,repId})
            } catch (error) {
                console.log(error)
            }
        }

        if(counter && repId){
            updateCounter();
        }
    }, [counter, repId]);
    

    useEffect(() =>{

        if(myreply !== null && toUpdate === true){

            const addReply = async () => {
                try {
                    const body = {userid, id, myreply};
                    const response = await fetch(
                        "http://localhost:4400/forum/reply",
                        {
                          method: "POST",
                          headers: {
                            "Content-type": "application/json"
                          },
                          body: JSON.stringify(body)
                        }
                    );
                    console.log(response);
                    
                } catch (err) {
                    console.error(err.message);
                }
            }
    
            addReply();
            setToUpdate(false)
        }
        
    }, [myreply, toUpdate]);

    useEffect(() =>{

        const getProfile = async () => {
            try {
              const res = await fetch("http://localhost:4400/profile", {
                method: "GET",
                headers: { token: localStorage.token }
              });
        
              const parseData = await res.json();
              setAuthor(parseData.data.profile[0].fullname);
              setUserid(parseData.data.profile[0].userid);

            } catch (err) {
              console.error(err.message);
            }
        };

        getProfile();

    }, []);

    useEffect(() => {

        const fetchForum = async () => {
            try {
                const response = await ForumFinder.get(`/description/${id}`)
                setContents(response.data.data.forum)
                console.log(response)
              } catch (err) {
                console.log(err)
            }
        }

        const fetchReplies = async () => {
            try {
                const response = await ForumFinder.get(`/reply/${id}`)
                setReplies(response.data.data.reply)
                console.log(response)
              } catch (err) {
                console.log(err)
            }
        }
        

        fetchForum();
        fetchReplies();

    }, [])

    return (
        <>
        <Container size="sm">
            {contents && contents.map(content => ( 
                <Card sx={{ mb: 2, p: 2 }} key={content.forumid}>
                    <CardHeader
                        action={content.date}
                        title={content.title}
                    />
                    <CardContent>
                        <Typography>
                        {content.details}
                        </Typography>
                    </CardContent>
                    
                </Card>
            ))}

            {replies && replies.map(reply => ( 
                <Card sx={{ mb: 2, p: 2 }} key={reply.replyid}>
                    <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                            {reply.name[0].toUpperCase()}
                        </Avatar>
                        }
                        action={
                        <IconButton onClick={() => {clickLike(reply.replyid)}} aria-label="settings">
                            <ThumbUpOutlinedIcon />
                        </IconButton>
                        }
                        title={reply.name}
                        subheader={reply.time +"  "+ reply.date}
                    />
                    <CardContent>
                        <Typography>
                            {reply.reply}
                        </Typography>
                    </CardContent>
                    
                </Card>
            ))}

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>

                {myreply && 
                    (<Card sx={{ mb: 2, p: 2 }}>
                        <TextField 
                            id="standard-basic" 
                            variant="standard"
                            fullWidth
                            required 
                            name="reply"
                            value = {text}
                            onChange={(e) => setText(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                            
                        <Button
                            type="submit" 
                            color="secondary" 
                            variant="contained"
                            >
                            Submit
                        </Button>
                    </Card>)
                }

            </form>

            {button === true && <Button
                color="secondary" 
                variant="contained"
                onClick={handleReply}
                >
                Reply       
            </Button>}

        </Container>
        </>
    )
}

export default Forum;