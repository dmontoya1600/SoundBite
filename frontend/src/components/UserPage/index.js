import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import UploadImage from './UploadImage';
import './UserPage.css'
import * as picActions from '../../store/uploadPic'
import {loadImage, getUser} from '../../store/uploadPic'


const UserPage = () =>{
    let currentUser = useSelector(state => state.session.user)
    if(!currentUser){
        currentUser = {
            id:0
        }
    }

    const paramId = Number(useParams().userId);
    const [imageUpload, setImageUpload] = useState(null)
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState('')
    const [pageUser, setPageUser] = useState({})

    const imgUrl = dispatch(loadImage(paramId))
    const loadedUser = dispatch(getUser(paramId))

    console.log('THIS IS THE PAGE USER',pageUser)
    useEffect(async () => {
        console.log('THIS IS THE IMG URL', await imgUrl.then())
        console.log('THIS IS THE USER OBJ', await loadedUser)
        setImageUrl(await imgUrl)
        setPageUser(await loadedUser)
    }, [])

    if(imageUpload){
        return <UploadImage hideForm={() => setImageUpload(null)}/>

    }
    console.log('THIS IS THE IMG URL', imageUrl)
    return (
        <body className='page'>
            <div className='profile-banner'>
                <div className='image-button'>
                    {imageUrl ? <img className='profilePic' src={imageUrl}/> : <img className='profilePic' src={`https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg`}/>}

                    {paramId === currentUser.id ? <button onClick={() => setImageUpload(true)}>
                        Upload Photo
                    </button> : null}
                </div>
                <div>
                    <h1 className='profile-text'>
                        {pageUser.username}
                    </h1>
                    <h2 className='profile-text'>
                        Follwing:
                    </h2>
                    <h2 className='profile-text'>
                        Followers:
                    </h2>
                </div>
                <div className='subscribe'>
                    Follow
                </div>
            </div>
        </body>
    )
}

export default UserPage;
