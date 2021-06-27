import { ADD_LIBRARY, LOAD_LIBRARIES} from './library';
import {ADD_SOUNDBITE, LOAD_SOUNDBITES} from './soundBite'
import { csrfFetch } from './csrf';
import { useSelector } from 'react-redux';
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const UPLOAD_PIC = 'session/updatePic';


const setPic = (imgUrl) => {
  return {
    type: UPLOAD_PIC,
    payload: imgUrl
  }
}

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};
// const updatePic = ()
const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
export const uploadPic = (image, userId) => async (dispatch) => {
  const formData = new FormData();

    if (image) {
      formData.append("image", image)};

    const res = await csrfFetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
    const data = await res.json();
    dispatch(setPic(data.imgUrl));
    return data

  };

  export const update = (user) => async (dispatch) => {
    const { username, email, password, userId } = user;
    const response = await csrfFetch("/api/users", {
      method: 'PUT',
      body: JSON.stringify({
        userId,
        username,
        email,
        password,
      })
    })
    const data = await response.json();
    dispatch(setUser(data.user));

    return response;
  }

  export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };

  export const deleteUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}`, {
      method: 'DELETE'
    })

    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };


export const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case LOAD_LIBRARIES: {
      console.log('LOAD IN SESSIION IS BEING HIT', {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          libraries: action.libraries.map(library => library.id),
        }
      })
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          libraries: action.libraries.map(library => library.id),
        }
      };
    }
    case ADD_LIBRARY: {
      return {
        ...state,
        [action.library.userId]: {
          ...state[action.library.userId],
          libraries: [...state[action.library.userId].libraries, action.library.id],
        },
      };
    }
    case LOAD_SOUNDBITES: {
      console.log('THIS IS THE LOAD INSIDE SESSION', action.soundbites)
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          soundbites: action.soundbites.map(soundbite => soundbite.id),
        }
      };
    }
    case ADD_SOUNDBITE: {
      return {
        ...state,
        [action.soundbite.userId]: {
          ...state[action.soundbite.userId],
          soundbites: [...state[action.soundbite.userId].soundbites, action.soundbite.id],
        },
      };
    }
    default:
      return state;
  }
};

export default sessionReducer;
