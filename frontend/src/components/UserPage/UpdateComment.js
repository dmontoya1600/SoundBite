import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import * as sessionActions from '../../store/session'
import * as picActions from '../../store/uploadPic'
import {updateComment, deleteComment} from '../../store/comment'


const UpdateComment = ({hideForm, editCommentId}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const currentComment = useSelector(state => {
        return state.comments[editCommentId]
    } )



    const [body, setBody] = useState(currentComment.body)

    const userId = user.id

    async function handleClose(e) {

        hideForm()
    }
     async function handleSubmit(e) {
        const comment = {
            body,
        }
        await dispatch(updateComment(comment, editCommentId))
        hideForm();
    }
    async function handleDelete() {
        hideForm()
        await dispatch(deleteComment(editCommentId));
    }
    // EACH INPUT SHOULD HAVE A VALUE OF CURRENT USER INFO AND PLACEHOLDER TOO
    return (
        <div className='popup-background'>
            <div className='box'>
                <h2>Update Comment</h2>
                <div className='exit' onClick={handleClose}>X</div>

                <input type='text' value={body} onChange={(e) => {setBody(e.target.value)}} />


                <button className='submit' onClick={handleSubmit}>Update</button>
                <button className='delete' onClick={handleDelete}>Delete Comment</button>

            </div>
        </div>
    )
}

export default UpdateComment;
