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
    let history = useHistory();
    if(!currentUser){
        currentUser = {
            id:0
        }
    }

    const paramId = Number(useParams().userId);
    const [imageUpload, setImageUpload] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [pageUser, setPageUser] = useState({})
    const [alreadyFollowed, setAlreadyFollowed] = useState(false)
    const [followers, setFollowers] = useState(followCount)
    const [following, setFollowing] = useState(0)
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const images = useSelector(state =>  state.pic)
    const changeInFollowers = useSelector(state => state.follow)
    const imgUrl = dispatch(loadImage(paramId))
    const loadedUser = dispatch(getUser(paramId))
    const userFollowers = dispatch(getFollowers(paramId))

    useEffect(async () => {
        const users = await userFollowers
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
        const followCount = await userFollowers
        setFollowers(followCount.followCount)
        setFollowing(followCount.followingCount)

    }, [changeInFollowers])


    if(imageUpload){
        return <UploadImage hideForm={() => setImageUpload(null)}/>

    }

    function handleFollow (e) {
        if(currentUser.id < 1){
            history.push('/login')
        }else{
            dispatch(createFollow(currentUser.id, paramId))
        }
    }
    function handleUnfollow(e) {
        dispatch(removeFollow(currentUser.id, paramId))
    }
    function handleUpload () {
        setIsOpen(!isOpen)
    }
    return (
        <body className='page'>
            <div className='profile-banner'>
                {isOpen && <UploadImage hideForm={() => setIsOpen(false)} />}
                <div className='image-button'>
                    {imageUrl ? <img className='profilePic' src={imageUrl}/> : <img className='profilePic' src={`https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg`}/>}

                    {paramId === currentUser.id ? <div  className='upload-photo' onClick={handleUpload}>
                        Upload Photo
                    </div> : null}
                </div>
                <div>
                    <h1 className='profile-text'>
                        {pageUser.username}
                    </h1>
                    <h3 className='profile-text'>
                        Following:{following > 0 ? following : 0}
                    </h3>
                    <h3 className='profile-text'>
                        Followers:{followers > 0 ? followers : 0}
                    </h3>
                </div>
                {!alreadyFollowed ? <div onClick={handleFollow} className='subscribe'>
                    Follow
                </div> : <div onClick={handleUnfollow} className='subscribe'> Unfollow </div>}

            </div>
            {/* <COMP> FOR LIBRARIES (WHICH SHOULD RETURN DIV WITH BUTTON TO CREATE
                AND NESTED DIV WITH GRID LAYOUT TO DISPLAY LIBRYS) */}
        </body>
    )
}

export default UserPage;
