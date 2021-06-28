import { csrfFetch } from './csrf';
import { LOAD_COMMENTS, ADD_COMMENT, UPDATE_COMMENT, REMOVE_COMMENT } from './comment';
export const LOAD_SOUNDBITES = "soundBites/LOAD_SOUNDBITES";
export const ADD_SOUNDBITE = "soundBites/ADD_SOUNDBITE";
export const UPDATE_SOUNDBITE = "soundBites/UPDATE_SOUNDBITE"
export const REMOVE_SOUNDBITE = "soundBites/REMOVE_SOUNDBITE"

const update = (soundbite) => (
    {
        type: UPDATE_SOUNDBITE,
        soundbite,
    }
)

const remove = (soundbiteId, userId, libraryId) => ({
    type: REMOVE_SOUNDBITE,
    soundbiteId,
    libraryId,
    userId,
  });


const add = (soundbite) =>(
    {type: ADD_SOUNDBITE,
    soundbite}
)
const load = (soundbites, userId, libId) => (
    {type: LOAD_SOUNDBITES,
    soundbites,
    userId,
    libId
})

export const updateSoundbite = (data, id) => async(dispatch) => {
    const res = await csrfFetch(`/api/soundbites/${id}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if(res.ok) {
        const soundbite = await res.json()
        dispatch(update(soundbite))
        return soundbite
    }
}

export const deleteSoundbite = soundBiteId => async dispatch => {
    const response = await csrfFetch(`/api/soundbites/${soundBiteId}`, {
      method: 'delete',
    });

    if (response.ok) {
      const soundbite = await response.json();
      dispatch(remove(soundbite.id, soundbite.userId, soundbite.libraryId));
    }
  };

export const getSoundBites = (userId, libId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/soundbites`)


    if(res.ok){
        const list = await res.json();
        dispatch(load(list, userId, libId ))
        return list;
    }
}

export const createSoundBite = (data, userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/soundbites`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const soundBite = await response.json();
      dispatch(add(soundBite));
      return soundBite;
    }
  };

  const soundBitesRedeucer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_SOUNDBITES: {
            const newSoundbites = {};
            action.soundbites.forEach(soundbite => {
                if(!state[soundbite.id]){
                    newSoundbites[soundbite.id] = soundbite;
                }
            })
            console.log('IS LOAD DISPATCH SOUNDBITES BEING HIT',{
                ...state,
                ...newSoundbites
            })
            return {
                ...state,
                ...newSoundbites
            }
        }
        case ADD_SOUNDBITE:{
            return {
                ...state,
                [action.soundbite.id]: action.soundbite
            }
        }
        case REMOVE_SOUNDBITE:{
            const newState = {...state};
            delete newState[action.soundbiteId ]
            return newState
        }
        case UPDATE_SOUNDBITE: {
            return {
                ...state,
                [action.soundbite.id]: action.soundbite
            }
        }
        case LOAD_COMMENTS: {
            if(!action.soundbiteId) return state;
            return {
                ...state,
                [action.soundbiteId]: {
                    ...state[action.soundbiteId],
                    comments: action.comments.map(comment => {
                        if(comment.soundBiteId !== action.soundbiteId) return;
                        return comment.id;
                    }),
                }
            };
        }
        case ADD_COMMENT: {

            return {
                ...state,
                [action.comment.soundBiteId]: {
                    ...state[action.comment.soundBiteId],
                    comments: typeof state[action.comment.soundBiteId].comments === 'object' ? [...state[action.comment.soundBiteId].comments, action.comment.id]: [action.comment.id],
                }
            }
        }
        case REMOVE_COMMENT: {
            return {
                ...state,
                [action.soundbiteId]: {
                    ...state[action.soundbiteId],
                    comments: state[action.soundbiteId].comments.filter(
                        (commentId) => commentId !== action.id
                    )
                }
            }
        }
        default:
            return state
    }
}
export default soundBitesRedeucer;
