import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './HomePage.css';
import { loadImage } from '../../store/uploadPic';
import {getUsers} from '../../store/session'
import {getAllLibraries} from '../../store/library'



function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [userList, setUserList] = useState(undefined)
  const [users, setUsers] = useState(null)
  const [libraryList, setLibraryList] = useState(null)
  const history = useHistory()



  // if(userList){
  //   userList.forEach(user => {
  //     user.imgUrl = dispatch(loadImage(user.id))
  //   })
  // }
useEffect(async() => {
  setUserList(await dispatch(getUsers()))
  setLibraryList(await dispatch(getAllLibraries()))
},[])
function handleRedirection(userId){
  history.push(`/user/${userId}`)

}
function handleClick() {
  if(sessionUser?.id > 0){
    history.push(`/user/${sessionUser.id}`)
  } else {
    history.push(`/signup`)
  }
}
function allLibraries() {
  if(!libraryList) return null;
  return libraryList.map(library => {
    return <div key={library.id} className='library-card' onClick={() => handleRedirection(library.userId)}>
      <img className='library-image' src={library.imageUrl} />
      <div className='element-title'>{library.title}</div>
    </div>
  })

}

// function allLibraries () {
//   let libraryList = await
// }
  return (
    <div className='background'>
        <div className='lower-page'>
        <div className='background-image'>
          <div className='user-page-button' onClick={handleClick}>
            Start Creating
          </div>

        </div>
          <div className='featured-title'>Popular Libraries</div>
          {/* <div className='grid-users'>
            grid for USERS
            {allUsers()}
          </div> */}
          <div className='grid-libraries'>
            {allLibraries()}
          </div>
        </div>
    </div>

  );
}

export default HomePage;
