import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import * as sessionActions from '../../store/session'



const UploadImage = ({hideForm}) => {
    const dispatch = useDispatch();
    const [imageText, setImageText] = useState('');
    const userId = useSelector(state => state.session.user.id)

    function uploadFile(e) {
        dispatch(sessionActions.uploadPic(e.target.files[0], userId))
        hideForm()
    }
    return (
        <div>
            <input type='file' placeholder='imageUrl' onChange={uploadFile}/>
        </div>
    )
}
export default UploadImage
