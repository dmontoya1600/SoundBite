import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import UploadImage from './UploadImage';
import './UserPage.css'
import * as picActions from '../../store/uploadPic'
import {loadImage, getUser} from '../../store/uploadPic'

import {createFollow, getFollowers, removeFollow} from '../../store/follow'
import UpdateUser from './UpdateUser'
import UserLibraries from './libraries';
import CreateLibrary from './createLibrary'
import CreateSoundBite from './createSoundBite'
import SoundBites from './SoundBites'
import Navigation from './LowerNavbar'
import UpdateLibrary from './UpdateLibrary';
import UpdateSoundBite from './UpdateSoundBite'
import UpdateComment from './UpdateComment'


const UserPage = () =>{
    let currentUser = useSelector(state => state.session.user)
    let currentSession = useSelector(state => state.session)

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
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);
    const [isOpen5, setIsOpen5] = useState(false);
    const [isOpen6, setIsOpen6] = useState(false);

    const [activePage, setActivePage] = useState('library')

    const [editLibraryId, setEditLibraryId] = useState(null)
    const [editSoundBiteId, setEditSoundBiteId] = useState(null)
    const [editCommentId, setEditCommentId] = useState(null)

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
        setPageUser(await loadedUser)
        setImageUrl(await imgUrl)

    }, [paramId])

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
    function handleEdit () {
        setIsOpen2(!isOpen2)
    }
    function handleCreateLibrary () {
        setIsOpen3(!isOpen3)
    }
    function handleCreateSoundBite () {
        setIsOpen4(!isOpen4)
    }

    function content () {
        if(activePage === 'library'){
            return (
                <div className='library-page width-hundred' >
                    {currentUser.id === paramId ? <button onClick={handleCreateLibrary} className='create-library'>Create Library</button>: null}

                    <table className='width-hundred'>
                        <thead>
                        <tr>
                            <th></th>

                        </tr>
                        </thead>
                        <tbody >
                        <UserLibraries setIsOpen5={setIsOpen5} currentUser={currentSession} setEditLibraryId={setEditLibraryId} />
                        </tbody>
                    </table>
                </div>
            )
        }
        else if (activePage === 'soundbite'){
            return (
                <div className='soundBite-page' >
                    {currentUser.id === paramId ?<button onClick={handleCreateSoundBite} className='create-soundBite'>Create SoundBite</button>: null}

                        <SoundBites setEditCommentId={setEditCommentId} currentUser={currentSession} setEditSoundBiteId={setEditSoundBiteId} setEditSoundBiteId={setEditSoundBiteId} />

                </div>
            )
        }
    }
    return (
        <div className='page'>
            <div className='profile-banner'>
                {isOpen && <UploadImage hideForm={() => setIsOpen(false)} />}
                {isOpen2 && <UpdateUser hideForm={() => setIsOpen2(false)}/>}
                {isOpen3 && <CreateLibrary hideForm={() => setIsOpen3(false)}/>}
                {isOpen4 && <CreateSoundBite libraries={currentSession[currentUser.id].libraries} hideForm={() => setIsOpen4(false)}/>}
                {isOpen5 && <UpdateLibrary editLibraryId={editLibraryId} hideForm={() => setIsOpen5(false)}/>}
                {editSoundBiteId && <UpdateSoundBite editSoundBiteId={editSoundBiteId} hideForm={() => setEditSoundBiteId(null)}/> }
                {editCommentId && <UpdateComment editCommentId={editCommentId} hideForm={() => setEditCommentId(null)}/>}
                {/* THIS SHOULD DISPLAY EDIT FORM FOR LIBRARY,
                PASS IN HIDEFORM WITH setEditLibraryId */}
                <div className='image-button'>
                    {imageUrl ? <img className='profilePic' src={imageUrl}/> : <img className='profilePic' src={`https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg`}/>}

                    {paramId === currentUser.id ? <div  className='upload-photo' onClick={handleUpload}>
                        Upload Photo
                    </div> : null}
                </div>
                <div>
                    <h1 className='profile-text'>
                        {currentUser.id === paramId ? currentUser.username : pageUser.username}
                    </h1>
                    <h3 className='profile-text'>
                        Following:{following > 0 ? following : 0}
                    </h3>
                    <h3 className='profile-text'>
                        Followers:{followers > 0 ? followers : 0}
                    </h3>
                </div>
                <div className='buttonsContainer'>
                    {paramId === currentUser.id ? <div onClick={handleEdit} className='editProfile' > Edit Profile </div> : null}

                    {paramId !== currentUser.id && currentUser.id >= 1?
                    (!alreadyFollowed ? <div onClick={handleFollow} className='subscribe'>
                    Follow
                    </div> : <div onClick={handleUnfollow} className='subscribe'> Unfollow </div>)
                    : null}
                </div>

            </div>
            {/* <COMP> FOR LIBRARIES (WHICH SHOULD RETURN DIV WITH BUTTON TO CREATE
                AND NESTED DIV WITH GRID LAYOUT TO DISPLAY LIBRYS) */}
            <Navigation activePage={activePage} setActivePage={setActivePage}/>
            <div className='lower-page width-hundred'>
                {content()}
            </div>
        </div>
    )
}

export default UserPage;
