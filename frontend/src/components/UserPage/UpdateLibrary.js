import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import * as sessionActions from '../../store/session'
import * as picActions from '../../store/uploadPic'
import {updateLibrary, deleteLibrary} from '../../store/library'
import { getSoundBites } from '../../store/soundBite';

const useForceUpdate = () => useState()[1];

const UpdateLibrary = ({hideForm, editLibraryId}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const history = useHistory();
    const [title, setTitle] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const libraryId= editLibraryId;
    const userId = user.id
    const forceUpdate = useForceUpdate();

    async function handleClose(e) {

        hideForm()
    }
     async function handleSubmit(e) {
        const library = {
            imageUrl,
            title,
        }
        await dispatch(updateLibrary(library, editLibraryId))
        await dispatch(getSoundBites(userId, editLibraryId))
        hideForm();

    }
    async function handleDelete() {
        await dispatch(deleteLibrary(editLibraryId));
        hideForm()


    }
    // EACH INPUT SHOULD HAVE A VALUE OF CURRENT USER INFO AND PLACEHOLDER TOO
    return (
        <div className='popup-background'>
            <div className='box'>
                <h2>Update Library</h2>
                <div className='exit' onClick={handleClose}>X</div>
                <label>
                Title
                    <input type='text' value={title} onChange={(e) => {setTitle(e.target.value)}} />
                </label>
                <label>
                    Image Url
                    <input type='text' value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} />
                </label>
                <button className='submit' type='submit' onClick={handleSubmit}>Update</button>
                <button className='delete' type='submit' onClick={handleDelete}>Delete Library</button>

            </div>
        </div>
    )
}

export default UpdateLibrary;
