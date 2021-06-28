import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLibraries } from "../../store/library";
import {getSoundBites} from '../../store/soundBite';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import SoundBite from './SoundBite'
import './Library.css'



const UserLibraries = ({ currentUser, setEditLibraryId , setEditSoundBiteId, setIsOpen5}) => {
    const paramId = Number(useParams().userId);


  const dispatch = useDispatch();
  console.log('THIS IS POKE OBJ', currentUser[paramId])
  const libraries = useSelector((state) => {
    if (!currentUser[paramId] || !currentUser[paramId].libraries) return null;
    console.log('THIS IS STATE LIBS', state.libraries)
    return currentUser[paramId].libraries.map(libraryId => state.libraries[libraryId]);
  });
  const allSoundbites = useSelector(state => {
      return state.soundbites;
  })

  //
  useEffect(async () => {
     let biteValue = await dispatch(getLibraries(paramId))


        await biteValue.forEach(library => {
            dispatch(getSoundBites(paramId, library.id))
        })


        console.log('THIS IS ITEMS DISPATCH', currentUser.libraries)


    }, [paramId])
    useEffect(async () => {
        if(libraries){
            await libraries.forEach(library => {
                if(library.id)
                dispatch(getSoundBites(paramId, library.id))
              })
        }
    },[])
    console.log('SHOULD HAVE A VALUE ARR BY THIS TIME',libraries)
    console.log('THIS IS ALL LIBRSa', allSoundbites)
    if (!libraries) {
    return null;
  }
  function handleCreateBite () {
      return null
  }
  function bites (soundbites) {
      if(!soundbites) return null;
      console.log('I BELIEVE WE ARE PASSING THE NULL')
      return soundbites.map(id => (
           <SoundBite key={id} setEditSoundBiteId={setEditSoundBiteId} id={id} />
      ))
  }
  return libraries.map((library) => (

    library === undefined ? null : (<tr key={library.id} className='width-hundred library-row'>
      <td >
        <img
          className="library-image"
          alt={library.imageUrl}
          src={`${library.imageUrl}`}
        />
      </td>
      <div className='width-hundred'>
            {/* <button onClick={handleCreateBite} className='create-bite'>Create SoundBite</button> */}
                <table className='width-hundred'>
                    <thead>
                    </thead>
                    <tbody className='end-of-container'>
                    {/* <UserLibraries currentUser={currentUser} setEditLibraryId={setEditLibraryId} /> */}
                    {/* <SoundBite id={} /> */}
                    <div className='soundbite-container'>
                        {bites(library.soundbites)}
                    </div>
                    <td className='library-title' >{library.title}
                        {currentUser.user?.id === paramId ?
                            <div className='edit' onClick={() => {
                                setIsOpen5(true)
                                setEditLibraryId(library.id)}}>
                                Edit
                            </div>

                        : null}
                    </td>
                    </tbody>
                </table>
      </div>
    </tr>)
  ));
};

export default UserLibraries;
