import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import * as sessionActions from '../../store/session'
import * as picActions from '../../store/uploadPic'
import {updateLibrary} from '../../store/library'


const UpdateLibrary = ({hideForm, editLibraryId}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const history = useHistory();
    const [title, setTitle] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const libraryId= editLibraryId;
    const userId = user.id
    console.log('THIS IS THE USER',user)

    async function handleClose(e) {

        hideForm()
    }
     async function handleSubmit(e) {
        const library = {
            imageUrl,
            title,
        }
        await dispatch(updateLibrary(library, editLibraryId))
        hideForm();
    }
    async function handleDelete() {
        history.push('/')
        await dispatch();
        hideForm()
    }
    // EACH INPUT SHOULD HAVE A VALUE OF CURRENT USER INFO AND PLACEHOLDER TOO
    return (
        <div className='popup-background'>
            <div className='box'>
                <h2>Update user</h2>
                <div className='exit' onClick={handleClose}>X</div>
                <label>
                Title
                    <input type='text' value={title} onChange={(e) => {setTitle(e.target.value)}} />
                </label>
                <label>
                    Image Url
                    <input type='text' value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} />
                </label>
                <button className='submit' onClick={handleSubmit}>Update</button>
                <button className='delete' onClick={handleDelete}>Delete User</button>

            </div>
        </div>
    )
}

export default UpdateLibrary;
