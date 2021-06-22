import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'

const UserPage = () =>{
    const currentUser = useSelector(state => state.session.user)
    return (
        <h1 className='hello'>
            Hello {currentUser.username}
        </h1>
    )
}

export default UserPage;
