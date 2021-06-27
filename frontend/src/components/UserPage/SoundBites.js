import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {Redirect, useParams, useHistory} from 'react-router-dom'
import { getSoundBites } from "../../store/soundBite";


const SoundBites = ({ currentUser, setEditSoundBiteId }) => {
    const paramId = Number(useParams().userId);
    const [effectRan, setEffectRan] = useState(false)

  const dispatch = useDispatch();
  console.log('CURENTUSER OBJ', currentUser[paramId])
  const soundbites = useSelector((state) => {
    if (!currentUser[paramId] || !currentUser[paramId].soundbites) return null;
    console.log('ENTIRE STATE', currentUser[paramId].soundbites, state)
    return currentUser[paramId].soundbites.map(soundbiteId => state.soundbites[soundbiteId]);
  });
  console.log('SHOULD HAVE A VALUE ARR BY THIS TIME',soundbites)
//
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
    <tr key={soundbite.id}>
      <td>
        <img
          className="library-image"

          alt={soundbite.imageUrl}
          src={`${soundbite.imageUrl}`}
        />
      </td>
      <td>{soundbite.title}</td>

      {currentUser.user.id === paramId ?
        <td className="centered">
          <button onClick={() => setEditSoundBiteId(soundbite.id)}>
            Edit
          </button>
        </td>
      : null}

    </tr>
  ));
};

export default SoundBites;
