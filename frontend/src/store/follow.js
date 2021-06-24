import { csrfFetch } from './csrf';

const ADD_FOLLOW = 'follow/addFollow'
const REMOVE_FOLLOW = 'follow/removeFollow'

const addFollow = () => {
    return {
        type: ADD_FOLLOW,
        payload: 1
    }
}
const deleteFollow = () => {
    return {
        type: REMOVE_FOLLOW
    }
}
export const removeFollow = (userId, pageId) => async (dispatch) => {
    const res = await csrfFetch(`/api/follow/${pageId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId: userId})
    })
    const data = await res.json();
    dispatch(deleteFollow())
    return data
}

export const createFollow = (userId, pageId) => async (dispatch) => {

    const res = await csrfFetch(`/api/follow/${pageId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId: userId})
    })
    const data = await res.json();
    dispatch(addFollow())
    return data
}

const followerReducer = (state = {}, action) => {
    let newState;
    switch(action.type){
        case ADD_FOLLOW:
            newState = {...state}
            if(newState.follow >= 0) newState.follow++;
            else newState.follow = 1;
            return newState
        case REMOVE_FOLLOW:
            newState = {...state}
            newState.follow--;
            return newState
        default:
            return state
    }

}

export default followerReducer
