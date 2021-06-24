import { csrfFetch } from './csrf';

const UPLOAD_PIC = 'pic/updatePic'
const LOAD_PIC = 'pic/loadPic'

const setPic = (imgUrl) => {
    return {
      type: UPLOAD_PIC,
      payload: imgUrl
    }
  }

const loadPic = (imgUrl) => {
    return {
        type: LOAD_PIC,
        payload: imgUrl
    }
}


export const uploadPic = (image, userId) => async (dispatch) => {
    const formData = new FormData();

      if (image) {
        console.log('IMAGE EXISTS')
        formData.append("image", image)};

      const res = await csrfFetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const data = await res.json();
      console.log(data)
      dispatch(setPic(data.imageUrl));
      return data

    };

export const loadImage = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`)
    if(res.ok) {
        const user = await res.json();
        dispatch(loadPic(user.imgUrl))
        return user.imgUrl
    }
}

export const getUser = (userId => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`)
    if(res.ok) {
        const user = await res.json();
        return user
    }
})


    const uploadPicReducer = (state = {}, action) => {
        switch(action.type) {
            case UPLOAD_PIC:
              let newState = {...state}
              newState.pic = action.payload;
              console.log(newState)
              return newState
            default:
                return state;

        }
    }

    export default uploadPicReducer
