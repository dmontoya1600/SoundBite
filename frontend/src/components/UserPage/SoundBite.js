import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLibraries } from "../../store/library";
import {getSoundBites} from '../../store/soundBite';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import './Soundbite.css'

const SoundBite = ({id}) => {
    const allSoundbites = useSelector(state => {
        return state.soundbites;
    })
    const soundbite = allSoundbites[id]
    // useEffect(() => {

    // })
    if(!soundbite) return null;
    return (
        <div key={id} className='soundbite'>
            <img className='soundbite-image'
            alt={soundbite.imageUrl}
            src={`${soundbite.imageUrl}`} />
            <h4>{soundbite.title}</h4>
        </div>
    )
}

export default SoundBite;
