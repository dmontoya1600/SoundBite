import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {Redirect, useParams, useHistory} from 'react-router-dom'
import { getSoundBites } from "../../store/soundBite";
import {getComments, createComment} from '../../store/comment'
import './Soundbite.css'

const Comments = ({ soundbiteId, setEditCommentId }) => {
    const paramId = Number(useParams().userId);
    const [effectRan, setEffectRan] = useState(false)
    const userId = useSelector(state => state.session.user?.id)
    const [commentText, setCommentText] = useState('')
    const dispatch = useDispatch();

  const comments = useSelector(state => {
      if(!state.soundbites[soundbiteId] || !state.soundbites[soundbiteId].comments) return null;
      return state.soundbites[soundbiteId].comments.map(commentId => state.comments[commentId])
  })
  const commentsArr = useSelector(state => {
      if(!state.soundbites[soundbiteId].comments) return null;
      return state.soundbites[soundbiteId].comments;
  })
  useEffect(async () => {
      let commentsValue = await dispatch(getComments(soundbiteId))


  }, [paramId])


    async function handleCreateComment (e) {

        let data = {
            userId: userId,
            body: commentText,
        }
        await dispatch(createComment(data, soundbiteId))
        setCommentText('')

  }


  function createCommentBar(){
      return <div className='create-comment'>
          <input required type='text' value={commentText} placeholder='Post Comment' onChange={(e) => setCommentText(e.target.value)} />
          {userId > 0 ? <button disabled={!commentText? true: false} onClick={handleCreateComment}>Post</button>  :null}
      </div>
  }
  function commentElements(commentsArr) {
    if (commentsArr){
    return commentsArr.map((id, i) => {
        if(!comments[i]) {
            if(i === 0) return (<h2>Be the First to Comment</h2>);
            else return;
        }

       return <div className='comment-body'  >
            {comments[i].userId === userId ?
            <button className='edit-comment' onClick={() => setEditCommentId(id)}>Edit</button> : null}
                {/* {console.error(comments[i], id, commentsArr, 'WE ARE IN THE COMMENTS')} */}
                {comments[i].body}
            </div>

    })
    }else {
        return (<h2 className='comment-section'>Be the First to Comment</h2>);
    }

  }
  return (
      <td classname='comments-body'>
          <div className='comment-section'>
            {commentElements(commentsArr)}
          </div>
        {createCommentBar()}
      </td>
  )
};

export default Comments;
