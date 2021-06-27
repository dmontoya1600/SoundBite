import { csrfFetch } from './csrf';
export const LOAD_SOUNDBITES = "libraries/LOAD_SOUNDBITES";
export const ADD_SOUNDBITE = "soundBites/ADD_SOUNDBITE";


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


export const getSoundBites = (userId, libId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/soundbites`)


    if(res.ok){
        const list = await res.json();
        console.log('HEREAAERAE IS THE LIST FOR SOUNBITES', list)
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
                newSoundbites[soundbite.id] = soundbite;
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
        default:
            return state
    }
}
export default soundBitesRedeucer;
