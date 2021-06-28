import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {Redirect, useParams, useHistory} from 'react-router-dom'
import { getSoundBites } from "../../store/soundBite";
import Comments from './Comments.js'
import './Soundbite.css'

const SoundBites = ({ currentUser, setEditSoundBiteId , setEditCommentId}) => {
    const paramId = Number(useParams().userId);
    const [effectRan, setEffectRan] = useState(false)

  const dispatch = useDispatch();
  console.log('CURENTUSER OBJ', currentUser[paramId])
  const soundbites = useSelector((state) => {
    if (!currentUser[paramId] || !currentUser[paramId].soundbites) return null;
    console.log('ENTIRE STATE', currentUser[paramId].soundbites, state)
    return currentUser[paramId].soundbites.map(soundbiteId => state.soundbites[soundbiteId]);
  });

  useEffect(async () => {
      let bitevalue = await dispatch(getSoundBites(paramId))
      bitevalue.forEach(soundbite => {
        dispatch(getSoundBites(paramId, soundbite.libraryId))
      })
      setEffectRan(!effectRan)

  }, [paramId])





    function handleCreateBite () {
      return null
  }
  if (!soundbites) {
    return null;
  }
  return soundbites.map((soundbite) => (
    !soundbite ? null :
    <tr className='soundbite-row' key={soundbite.id}>
      <td>
        <img
          className="bite-image"

          alt={soundbite.imageUrl}
          src={`${soundbite.imageUrl}`}
        />
      </td>

      <td className='bite-info'>
        <div className='soundbite-title'>{soundbite.title}</div>
        {currentUser.user?.id === paramId ?
            <div className="edit-soundbite">
            <button onClick={() => setEditSoundBiteId(soundbite.id)}>
                Edit
            </button>
            </div>
        : null}
      </td>
      <Comments setEditCommentId={setEditCommentId} soundbiteId={soundbite.id}/>
    </tr>
  ));
};

export default SoundBites;
