import { csrfFetch } from './csrf';

const ADD_FOLLOW = 'follow/addFollow'
const REMOVE_FOLLOW = 'follow/removeFollow'
const LOAD_FOLLOW = 'follow/loadFollow'

const addFollow = (num = 1) => {
    return {
        type: ADD_FOLLOW,
        payload: 1
    }
}
const loadFollow = (followCount) =>{
    return {
        type: LOAD_FOLLOW,
        payload: followCount
    }
}
const deleteFollow = () => {
    return {
        type: REMOVE_FOLLOW,
        payload: 1
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
export const getFollowers = (pageId) => async (dispatch) => {
    const res = await csrfFetch(`/api/follow/${pageId}`)
    const data = await res.json();
    dispatch(loadFollow(data.followCount))
    return data
}

export const createFollow = (userId, pageId) => async (dispatch) => {

    const res = await csrfFetch(`/api/follow/${pageId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId: userId})
    })
    const data = await res.json();
    if(!data.alreadyFollowed){
        dispatch(addFollow())
    }
    return data
}

const followerReducer = (state = {}, action) => {
    let newState;
    switch(action.type){
        case ADD_FOLLOW:
            newState = Object.assign({}, state);
            if(newState.followers >= 0) newState.followers++;
            else newState.followers = 1;
            return newState;
        case REMOVE_FOLLOW:
            newState = Object.assign({}, state);
            newState.followers--;
            return newState;
        // case LOAD_FOLLOW:
        //     newState = {...state}
        //     newState.follow = action.payload
        //     return newState
        default:
            return state
    }

}

export default followerReducer
