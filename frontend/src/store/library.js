import { csrfFetch } from './csrf';
export const LOAD_LIBRARIES = "libraries/LOAD_LIBRARIES";
export const ADD_LIBRARY = "libraries/ADD_LIBRARY";


const load = (libraries, userId) => (
    {type: LOAD_LIBRARIES,
    libraries,
    userId,
})

const add = (library) => ({
    type: ADD_LIBRARY,
    library,
  });


export const getLibraries = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/libraries`)
    console.log('MAYBE PART WASNT  HIT')


    if(res.ok){
        const list = await res.json();
        console.log('THIS IS THE LIST FOR LIBRARIES', list)
        dispatch(load(list, userId))
        return list;
    }
}

export const createLibrary = (library, userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/libraries`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(library),
    });

    if (response.ok) {
      const newLibrary = await response.json();
      dispatch(add(newLibrary));
      return newLibrary;
    }
  };

const librariesReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_LIBRARIES: {
            const newLibraries = {};
            action.libraries.forEach(library => {
                newLibraries[library.id] = library;
            })
            console.log('IS THIS DISPATCH BEING HIT?',{
                ...state,
                ...newLibraries
            })
            return {
                ...state,
                ...newLibraries
            }
        }
        case ADD_LIBRARY:
        default:
            return state
    }
}
export default librariesReducer;
