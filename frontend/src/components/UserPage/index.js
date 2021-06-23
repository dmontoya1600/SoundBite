import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import UploadImage from './UploadImage';
import './UserPage.css'

const UserPage = () =>{
    const currentUser = useSelector(state => state.session.user)
    const paramId = Number(useParams().userId);
    const [imageUpload, setImageUpload] = useState(null)
    console.log(paramId, currentUser.id)
    if (paramId !== currentUser.id) {
        console.log('HIT')
        return <Redirect to='/' />
    }
    if(imageUpload){
        return <UploadImage hideForm={() => setImageUpload(null)}/>

    }

    return (
        <div className='image-button'>
            <button onClick={() => setImageUpload(true)}>
                Upload Photo
            </button>
        </div>
    )
}

export default UserPage;
