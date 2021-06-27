import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './Navigation.css';

function Navigation( {setActivePage, activePage} ){
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    let activeLB=false;
    let activeSB=false;
    if(activePage === 'library'){
        activeLB = true
    } else if(activePage === 'soundbite'){
        activeSB = true
    }


    function handleSoundBiteClick() {

        setActivePage('soundbite')
    }

    function handleLibraryClick() {

        setActivePage('library')
    }

    return (
      <div className='lownav'>
          <div onClick={handleSoundBiteClick} className={activeSB? 'active' : null}>SoundBites</div>

          <div onClick={handleLibraryClick} className={activeLB? 'active' :null}>Libraries</div>
      </div>


    );
  }

  export default Navigation;
