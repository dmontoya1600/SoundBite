import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import UploadImage from './UploadImage';
import './UserPage.css'
import * as picActions from '../../store/uploadPic'
import {loadImage, getUser} from '../../store/uploadPic'
import {createFollow, getFollowers, removeFollow} from '../../store/follow'


const UserPage = () =>{
    let currentUser = useSelector(state => state.session.user)
    let followCount = useSelector(state => state.followers)
    console.log('THIS IS FOLLOW COUNT LINE 14', followCount)
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
    const [alreadyFollowed, setAlreadyFollowed] = useState(false)
    const [followers, setFollowers] = useState(followCount)
    const images = useSelector(state =>  state.pic)
    const changeInFollowers = useSelector(state => state.follow)
    console.log('CHECKING REDUCER', changeInFollowers)
    const imgUrl = dispatch(loadImage(paramId))
    const loadedUser = dispatch(getUser(paramId))
    const userFollowers = dispatch(getFollowers(paramId))

    useEffect(async () => {
        const users = await userFollowers
        console.log('THIS IS THE USER ARRAY', users.userIdArray)
        if(users.userIdArray.includes(currentUser.id)){
            setAlreadyFollowed(true)
        } else{
            setAlreadyFollowed(false)

        }

    }, [changeInFollowers])

    useEffect(async () => {
        setImageUrl(await imgUrl)
        setPageUser(await loadedUser)
    }, [images])

    useEffect(async () => {
        console.log('DETECTED CHANGE IN FOLLOWERS')
        const followCount = await userFollowers
        setFollowers(followCount.followCount)


    }, [changeInFollowers])


    if(imageUpload){
        return <UploadImage hideForm={() => setImageUpload(null)}/>

    }

    function handleFollow (e) {
        dispatch(createFollow(currentUser.id, paramId))
    }
    function handleUnfollow(e) {
        dispatch(removeFollow(currentUser.id, paramId))
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
                        Followers:{followers > 0 ? followers : 0}
                    </h3>
                </div>
                {/* MAKE SURE TO MAKE IT IMPOSSIBLE FOR NON-AUTH USERS TO Follow
                MAKE SURE TO CHANGE THE FOLLOW AND UNFOLLOW BUTTONS WHEN FOLLOWING USER */}
                {!alreadyFollowed ? <div onClick={handleFollow} className='subscribe'>
                    Follow
                </div> : <div onClick={handleUnfollow} className='subscribe'> Unfollow </div>}

            </div>
        </body>
    )
}

export default UserPage;
