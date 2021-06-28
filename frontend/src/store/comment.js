import { csrfFetch } from './csrf';
export const LOAD_COMMENTS = "comment/LOAD_COMMENTS";
export const ADD_COMMENT = "comment/ADD_COMMENT";
export const UPDATE_COMMENT = "comment/UPDATE_COMMENT"
export const REMOVE_COMMENT = "comment/REMOVE_COMMENT"

const update = (comment) => (
    {
        type: UPDATE_COMMENT,
        comment,
    }
)

const remove = (commentId, soundbiteId) => ({
    type: REMOVE_COMMENT,
    commentId,
    soundbiteId,
  });


const add = (comment) =>(
    {type: ADD_COMMENT,
    comment}
)
const load = (comments, soundbiteId) => (
    {type: LOAD_COMMENTS,
    comments,
    soundbiteId,
})

export const updateComment = (data, id) => async(dispatch) => {
    const res = await csrfFetch(`/api/comments/${id}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if(res.ok) {
        const comment = await res.json()
        dispatch(update(comment))
        return comment
    }
}

export const deleteComment = commentId => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
      method: 'delete',
    });

    if (response.ok) {
      const comment = await response.json();
      dispatch(remove(comment.id, comment.soundBiteId));
    }
  };

  export const createComment = (data, soundbiteId) => async (dispatch) => {
      const response = await csrfFetch(`/api/soundbites/${soundbiteId}/comments`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const comment = await response.json();
        dispatch(add(comment));
        return comment;
      }
    };

export const getComments = (soundbiteId) => async (dispatch) => {
    const res = await csrfFetch(`/api/soundbites/${soundbiteId}/comments`)


    const list = await res.json();
    if(list.length < 1) return;
    dispatch(load(list, soundbiteId ))
    return list;

}


  const commentsReducer = (state = {}, action) => {
      switch (action.type) {
          case LOAD_COMMENTS: {
              const newComments = {};
              action.comments.forEach(comment =>{
                  newComments[comment.id] = comment;
              })
              return {
                  ...state,
                  ...newComments
              }
          }
          case ADD_COMMENT: {
              return {
                  ...state,
                  [action.comment.id]: action.comment
              }
          }
          case UPDATE_COMMENT: {
             return {
                 ...state,
                 [action.comment.id]: action.comment
             }
          }
          case REMOVE_COMMENT: {
              const newState ={...state};
              delete newState[action.commentId]
              return newState
          }
          default:
              return state
      }
  }

  export default commentsReducer;
