import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import './UserPage.css'

const UserPage = () =>{
    const currentUser = useSelector(state => state.session.user)
    const paramId = Number(useParams().userId);
    let history = useHistory();
    console.log(paramId, currentUser.id)
    if (paramId !== currentUser.id) {
        console.log('HIT')
        return <Redirect to='/' />
    }
    return (
        <div className='doug'>
            <h1> hello </h1>
        </div>
    )
}

export default UserPage;
