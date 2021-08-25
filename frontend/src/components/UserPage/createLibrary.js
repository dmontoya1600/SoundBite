import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import * as sessionActions from '../../store/session'
import * as picActions from '../../store/uploadPic'
import { createLibrary } from '../../store/library';


const CreateLibrary = ({hideForm}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const userId = user.id


    async function handleClose(e) {

        hideForm()
    }
     async function handleSubmit(e) {
        const data = {
            title,
            imageUrl
        }
         dispatch(createLibrary(data, userId))

         hideForm();

    }
    // async function handleDelete() {
    //     history.push('/')
    //     await dispatch(sessionActions.deleteUser(userId));
    //     hideForm()
    // }
    // EACH INPUT SHOULD HAVE A VALUE OF CURRENT USER INFO AND PLACEHOLDER TOO
    return (
        <div className='popup-background'>
            <div className='box'>
                <h2>Create Library</h2>
                <div className='exit' onClick={handleClose}>X</div>
                <label>
                    Title
                    <input type='text' value={title} onChange={(e) => {setTitle(e.target.value)}} />
                </label>
                <label>
                    Image URL
                    <input type='text' value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} />
                </label>
                <button className='submit' onClick={handleSubmit}>Create</button>
                {/* <button className='delete' onClick={handleDelete}>Delete User</button> */}

            </div>
        </div>
    )
}

export default CreateLibrary;
