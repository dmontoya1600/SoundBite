import { csrfFetch } from './csrf';
import { useSelector } from 'react-redux';
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const UPLOAD_PIC = 'session/updatePic'

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
    default:
      return state;
  }
};

export default sessionReducer;
