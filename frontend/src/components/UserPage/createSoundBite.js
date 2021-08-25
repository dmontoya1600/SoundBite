import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import * as sessionActions from '../../store/session'
import * as picActions from '../../store/uploadPic'
import { createSoundBite } from '../../store/soundBite';
import UploadImage from './UploadImage';


const CreateSoundBite = ({hideForm, libraries}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [url, setUrl] = useState('')
    const userId = user.id
    const userLibraries = useSelector((state) => {
        if (!libraries) return null;
        return libraries.map(libraryId => state.libraries[libraryId]);
    });
    const [libraryId, setLibraryId] = useState(userLibraries[0].id)

    async function handleClose(e) {

        hideForm()
    }
    async function handleSubmit(e) {
        const data = {
            title,
            libraryId,
            url,
            imageUrl
        }
         dispatch(createSoundBite(data, userId))

         hideForm();

    }
    function handleSelect (e) {
        setLibraryId(e.target.value)
    }
    // async function handleDelete() {
    //     history.push('/')
    //     await dispatch(sessionActions.deleteUser(userId));
    //     hideForm()
    // }
    // EACH INPUT SHOULD HAVE A VALUE OF CURRENT USER INFO AND PLACEHOLDER TOO
    function uploadAudio(e){
        setUrl(e.target.files[0])
    }
    return (
        <div className='popup-background'>
            <div className='box'>
                <h2>Create SoundBite</h2>
                <div className='exit' onClick={handleClose}>X</div>
                <label>
                    Title
                    <input type='text' value={title} onChange={(e) => {setTitle(e.target.value)}} />
                </label>
                <label>
                    Select Library
                    <select className='select-library' onChange={(e) => handleSelect(e)}>
                        {
                            userLibraries.map((key) => <option key={key.id} value={key.id}>{key.title}</option>)
                        }
                    </select>
                </label>
                <label>
                    IMAGE URL
                    <input type='text' value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} />
                </label>
                <label>
                    AUDIO FILE
                    <input type='file' onChange={uploadAudio} />
                </label>
                <button className='submit' onClick={handleSubmit}>Create</button>
                {/* <button className='delete' onClick={handleDelete}>Delete User</button> */}

            </div>
        </div>
    )
}

export default CreateSoundBite;
