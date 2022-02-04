import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import ForumFinder from '../../apis/ForumFinder';
import NoteFinder from '../../apis/NoteFinder';
import ProfileFinder from '../../apis/ProfileFinder';
import SubmissionFinder from '../../apis/SubmissionFinder';
import Profile from './Profile';
// import Chart from 'chart.js/auto';

const BarChartPerform = ({id}) => {

    //Output for score
    const [score, setScore] = useState([]);
    const [displayScore, setDisplayScore] = useState(0);

    //Output for contribution
    const [likeCount, setLikeCount] = useState(0);
    const [allLikeCount, setAllLikeCount] = useState(0);
    const [downloadCount, setDownloadCount] = useState(0);
    const [allDownloadCount, setAllDownloadCount] = useState(0);
    const [contScore, setContScore] = useState();
    const [contScore2, setContScore2] = useState();

    //Output for Involvement
    const [submitCount, setSubmitCount] = useState(0);
    const [allSubmitCount, setAllSubmitCount] = useState(0);
    const [uploadCount, setUploadCount] = useState(0);
    const [allUploadCount, setAllUploadCount] = useState(0);
    const [involveScore, setInvolveScore] = useState();
    const [involveScore2, setInvolveScore2] = useState();

    //Error handling
    const [toUpdate, setToUpdate] = useState(false);


    ///SCORE
    useEffect(() => {

        //Score
        const getData = async () => {
            try {
                const response = await ProfileFinder.get(`/${id}`);

                if(response.data.data.profile[0].mathscore !== 0){
                    setScore(score => [...score, response.data.data.profile[0].mathscore]);
                }
                if(response.data.data.profile[0].physicsscore !== 0){
                    setScore(score => [...score, response.data.data.profile[0].physicsscore] );
                }
                if(response.data.data.profile[0].chemistryscore !== 0){
                    setScore(score => [...score, response.data.data.profile[0].chemistryscore]);
                }
                if(response.data.data.profile[0].biologyscore !== 0){
                    setScore(score => [...score, response.data.data.profile[0].biologyscore]);
                }
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }

        //Contribution
        const getCounterLikeAndDownload = async () => {
            try {
                let x = 0;
                const response = await ForumFinder.get(`/replyforum/counter/${id}`)
                for(let i=0; i<response.data.data.reply.length; i++){
                    if((i+1) === response.data.data.reply.length){
                        x=x+response.data.data.reply[i].counter
                        setLikeCount(x)
                    }else{
                        x = x+response.data.data.reply[i].counter
                    }
                    
                }
            } catch (error) {
                console.log(error)
            }

            try {
                let x = 0;
                const response = await NoteFinder.get(`/counter/${id}`)
                for(let i=0; i<response.data.data.note.length; i++){
                    if((i+1) === response.data.data.note.length){
                        x=x+response.data.data.note[i].counter
                        setDownloadCount(x)
                    }else{
                        x = x+response.data.data.note[i].counter
                    }
                    
                }
            } catch (error) {
                console.log(error)
            }
        }

        const getAllCountLikeDownload = async () => {
            try {
                let x = 0;
                const response = await ForumFinder.get(`/reply/all`)
                for(let i=0; i<response.data.data.reply.length; i++){
                    if((i+1) === response.data.data.reply.length){
                        x=x+response.data.data.reply[i].counter
                        setAllLikeCount(x)
                    }else{
                        x = x+response.data.data.reply[i].counter
                    }
                    
                }
            } catch (error) {
                console.log(error)
            }

            try {
                let x = 0;
                const response = await NoteFinder.get(`/display`)
                for(let i=0; i<response.data.data.note.length; i++){
                    if((i+1) === response.data.data.note.length){
                        x=x+response.data.data.note[i].counter
                        setAllDownloadCount(x)
                    }else{
                        x = x+response.data.data.note[i].counter
                    }
                    
                }
            } catch (error) {
                console.log(error)
            }
        }

        // Involvement
        const getCountSubmitAndUpload = async() =>{
            console.log("masuk")
            try {
                const response = await SubmissionFinder.get(`/sublist/${id}`)
                console.log(response)
                setSubmitCount(response.data.data.sub.length)
            } catch (error) {
                console.log(error)
            }

            try {
                const response = await NoteFinder.get(`/counter/${id}`)
                setUploadCount(response.data.data.note.length)
            } catch (error) {
                console.log(error)
            }
        }

        const getAllCountSubmitUpload = async () => {
            try {
                const response = await SubmissionFinder.get('/display')
                setAllSubmitCount(response.data.data.sub.length)
            } catch (error) {
                console.log(error)
            }

            try {
                const response = await NoteFinder.get('/display')
                setAllUploadCount(response.data.data.note.length)
            } catch (error) {
                console.log(error)
            }
        }
    
        if(id){
            getData();
            getCounterLikeAndDownload();
            getAllCountLikeDownload();
            getCountSubmitAndUpload();
            getAllCountSubmitUpload();
            setToUpdate(true)
        }

    }, [id]);

    useEffect(() => {
        if(toUpdate === true && score.length === 4){
            let x = 0
            for(let i=0; i < score.length; i++){
                if((i+1) === score.length){
                    x=x+score[i]
                    setDisplayScore((x/(i+1))/10)
                }else{
                    x = x+score[i]
                }
            }
        }
    }, [toUpdate, score]);

    useEffect(() => {
        const updateScore = async() => {
            try {
                const response = await ProfileFinder.put('/update/score', {id, displayScore})
            } catch (error) {
                console.log(error)
            }
        }

        if(displayScore){
            updateScore();
        }
    }, [displayScore]);

    
    ///CONTRIBUTION
    useEffect(() => {
        if(likeCount && allLikeCount){
            let x = allLikeCount/2;
            // console.log(x);
            if(likeCount > x){
                setContScore(5)
            }else{
                setContScore(((likeCount/x)*10)/2)
            }
        }  
    }, [likeCount, allLikeCount]);

    useEffect(() => {
        if(contScore && downloadCount && allDownloadCount){
            let x = allDownloadCount/2;
            if(downloadCount > x){
                setContScore2(contScore+5)
            }else{
                setContScore2(contScore+(((downloadCount/x)*10)/2))
            }
        }
    }, [downloadCount, allDownloadCount, contScore]);

    useEffect(() => {

        const updateContribution = async() => {
            try {
                const response = await ProfileFinder.put(`/update/contribution`, {id, contScore2})
            } catch (error) {
                console.log(error)
            }
        }

        if(contScore2){
            updateContribution();
        }

    }, [contScore2]);

    //INVOLVEMENT
    useEffect(() => {
        if(submitCount && allSubmitCount){
            let x = allSubmitCount/2;
            console.log(x);
            if(submitCount > x){
                setInvolveScore(5)
            }else{
                setInvolveScore(((submitCount/x)*10)/2)
            }
        }
    }, [submitCount, allSubmitCount]);

    useEffect(() => {
        if(involveScore && uploadCount && allUploadCount){
            let x = allUploadCount/2;
            if(uploadCount > x){
                setInvolveScore2(involveScore+5)
            }else{
                setInvolveScore2(involveScore+(((uploadCount/x)*10)/2))
            }
        }
    }, [uploadCount, allUploadCount, involveScore]);

    useEffect(() => {

        const updateInvolvement = async() => {
            try {
                const response = await ProfileFinder.put(`/update/involvement`, {id, involveScore2})
            } catch (error) {
                console.log(error)
            }
        }

        if(involveScore2){
            updateInvolvement();
        }

    }, [involveScore2]);
    
    console.log("like count = ",likeCount)
    console.log("download count = ",downloadCount)
    console.log("all like count =", allLikeCount)
    console.log("all donwload count=", allDownloadCount)
    console.log("Contribution Score =", contScore)
    console.log("Contribution Score 2 =", contScore2)
    console.log("submit count = ",submitCount)
    console.log("upload count = ",uploadCount)
    console.log("all submit count =", allSubmitCount)
    console.log("all upload count=", allUploadCount)
    console.log("Involvement Score =", involveScore)
    console.log("Involvement Score 2 =", involveScore2)

    return (
        <div>
            <Bar
                data={{
                    labels: ['Score', 'Contribution', 'Involvement'],
                    datasets: [{
                        barPercentage: 0.5,
                        barThickness: 80,
                        maxBarThickness: 80,
                        minBarLength: 2,
                        data: [displayScore, contScore2, involveScore2 ],
                        backgroundColor: [
                            'rgba( 34, 139, 34, 1)',
                            'rgba(255, 205, 57, 1)',
                            'rgba(97, 70, 46, 1)',
                          ],
                    }]
                }}
                height={400}
                width={1000}
                options={{
                    indexAxis: 'y',
                    scales: {
                        x: {
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                          display: false
                        },
                        title: {
                            display: true,
                            text: 'Performance'
                        },
                    }
                }}
            />
        </div>
    );
}
 
export default BarChartPerform;