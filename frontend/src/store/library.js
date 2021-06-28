import { csrfFetch } from './csrf';
import { LOAD_SOUNDBITES, REMOVE_SOUNDBITE } from './soundBite';
export const LOAD_LIBRARIES = "libraries/LOAD_LIBRARIES";
export const ADD_LIBRARY = "libraries/ADD_LIBRARY";
export const UPDATE_LIBRARY = 'libraries/UPDATE_LIBRARY'
export const REMOVE_LIRBARY = 'libraries/REMOVE_LIBRARY'

const update = (library) => (
    {
        type: UPDATE_LIBRARY,
        library,
    }
)


const load = (libraries, userId) => (
    {type: LOAD_LIBRARIES,
    libraries,
    userId,
})

const add = (library) => ({
    type: ADD_LIBRARY,
    library,
  });

  const remove = (libraryId, userId) => ({
    type: REMOVE_LIRBARY,
    libraryId,
    userId,
  });

export const getAllLibraries = () => async(dispatch) => {
    const res = await csrfFetch('/api/libraries')

    const libraries = res.json()
    return libraries
}

export const updateLibrary = (data, id) => async(dispatch) => {
    const res = await csrfFetch(`/api/libraries/${id}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if(res.ok) {
        const library = await res.json()
        dispatch(update(library))
        return library
    }
}

export const deleteLibrary = libraryId => async dispatch => {
    const response = await csrfFetch(`/api/libraries/${libraryId}`, {
      method: 'delete',
    });

    if (response.ok) {
      const library = await response.json();
      dispatch(remove(library.id, library.userId));
    }
  };

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
            return {
                ...state,
                ...newLibraries
            }
        }
        case ADD_LIBRARY: {

            return {
                ...state,
                [action.library.id]: action.library
            }
        }
        case LOAD_SOUNDBITES: {
            if(!action.libId) return state
            return {
              ...state,
              [action.libId]: {
                ...state[action.libId],
                soundbites: action.soundbites.map(soundbite => {
                    if(soundbite.libraryId !== action.libId) return;
                    return soundbite.id;
                }),
              }
            };
          }
          case REMOVE_SOUNDBITE: {
            return {
              ...state,
              [action.libraryId]: {
                ...state[action.libraryId],
                soundbites: state[action.libraryId].soundbites.filter(
                  (soundbiteId) => soundbiteId !== action.soundbiteId
                ),
              }
            }
          }
          case UPDATE_LIBRARY: {
              return {
                  ...state,
                  [action.library.id]: action.library
              }
          }
          case REMOVE_LIRBARY: {
            const newState = {...state};
            delete newState[action.libraryId]
            return newState
          }
        default:
            return state
    }
}
export default librariesReducer;
