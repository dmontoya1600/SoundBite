import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import * as sessionActions from '../../store/session'
import * as picActions from '../../store/uploadPic'
import {updateSoundbite, deleteSoundbite} from '../../store/soundBite'


const UpdateSoundBite = ({hideForm, editSoundBiteId}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const currentSoundbite = useSelector(state => {
        return state.soundbites[editSoundBiteId]
    } )



    const [title, setTitle] = useState(currentSoundbite.title)
    const [imageUrl, setImageUrl] = useState(currentSoundbite.imageUrl)
    const [url, setUrl] = useState(currentSoundbite.url)
    const userId = user.id

    async function handleClose(e) {

        hideForm()
    }
     async function handleSubmit(e) {
        const soundbite = {
            imageUrl,
            title,
            url
        }
        await dispatch(updateSoundbite(soundbite, editSoundBiteId))
        hideForm();
    }
    async function handleDelete() {
        hideForm()
        await dispatch(deleteSoundbite(editSoundBiteId));
    }
    // EACH INPUT SHOULD HAVE A VALUE OF CURRENT USER INFO AND PLACEHOLDER TOO
    return (
        <div className='popup-background'>
            <div className='box'>
                <h2>Update SoundBite</h2>
                <div className='exit' onClick={handleClose}>X</div>
                <label>
                Title
                    <input type='text' value={title} onChange={(e) => {setTitle(e.target.value)}} />
                </label>
                <label>
                    IMAGE URL
                    <input type='text' value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} />
                </label>
                <label>
                    AUDIO URL
                    <input type='text' value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} />
                </label>
                <button className='submit' onClick={handleSubmit}>Update</button>
                <button className='delete' onClick={handleDelete}>Delete SoundBite</button>

            </div>
        </div>
    )
}

export default UpdateSoundBite;
