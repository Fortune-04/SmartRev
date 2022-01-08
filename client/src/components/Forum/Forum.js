import React, {useState, useEffect} from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import ForumFinder from "../../apis/ForumFinder";


const Forum = () => {

    const {id} = useParams();
    // const [searchParams, setSearchParams] = useSearchParams();
    const [contents, setContents] = useState();
    
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

        fetchForum();

    }, [])

    console.log(contents)

    return (
        <>
        <div>{contents && contents.map(content => ( <div key={content.forumid}>{content.title}</div>))}</div>
        </>
    )
}

export default Forum;