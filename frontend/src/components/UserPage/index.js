import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import UploadImage from './UploadImage';
import './UserPage.css'
import * as picActions from '../../store/uploadPic'
import {loadImage, getUser} from '../../store/uploadPic'
import {createFollow} from '../../store/follow'


const UserPage = () =>{
    let currentUser = useSelector(state => state.session.user)
    let followCount = useSelector(state => state.followers.follow)
    console.log('THIS IS FOLLOW COUNT', followCount)
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
    const [followers, setFollowers] = useState(followCount)
    const images = useSelector(state =>  state.pic)

    const imgUrl = dispatch(loadImage(paramId))
    const loadedUser = dispatch(getUser(paramId))

    console.log('THIS IS THE PAGE USER',pageUser)
    useEffect(async () => {
        setFollowers(followCount)
    }, [followCount])
    useEffect(async () => {
        setImageUrl(await imgUrl)
        setPageUser(await loadedUser)
    }, [images])

    if(imageUpload){
        return <UploadImage hideForm={() => setImageUpload(null)}/>

    }

    function handleFollow (e) {
        dispatch(createFollow(currentUser.id, paramId))
    }
    return (
        <body className='page'>
            <div className='profile-banner'>
                <div className='image-button'>
                    {imageUrl ? <img className='profilePic' src={imageUrl}/> : <img className='profilePic' src={`https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg`}/>}

                    {paramId === currentUser.id ? <div  className='upload-photo' onClick={() => setImageUpload(true)}>
                        Upload Photo
                    </div> : null}
                </div>
                <div>
                    <h1 className='profile-text'>
                        {pageUser.username}
                    </h1>
                    <h3 className='profile-text'>
                        Follwing:
                    </h3>
                    <h3 className='profile-text'>
                        Followers:
                    </h3>
                </div>
                {/* MAKE SURE TO MAKE IT IMPOSSIBLE FOR NON-AUTH USERS TO Follow
                MAKE SURE TO CHANGE THE FOLLOW AND UNFOLLOW BUTTONS WHEN FOLLOWING USER */}
                <div onClick={handleFollow} className='subscribe'>
                    Follow
                </div>
            </div>
        </body>
    )
}

export default UserPage;
