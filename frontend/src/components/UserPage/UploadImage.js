import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import * as sessionActions from '../../store/session'
import * as picActions from '../../store/uploadPic'



const UploadImage = ({hideForm}) => {
    const dispatch = useDispatch();
    const [imageText, setImageText] = useState('');
    const userId = useSelector(state => state.session.user.id)
    const picUrl = useSelector(state=> state.pic)
    useEffect(async () => {
        console.log('this is the front end IMG', await picUrl)
    }, [picUrl])
     async function uploadFile(e) {
       await dispatch(picActions.uploadPic(e.target.files[0], userId))
        hideForm()
    }
    return (
        <div>
            <input  type='file' placeholder='imageUrl' onChange={uploadFile}/>
        </div>
    )
}
export default UploadImage