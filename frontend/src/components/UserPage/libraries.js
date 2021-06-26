import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLibraries } from "../../store/library";
import {Redirect, useParams, useHistory} from 'react-router-dom'


const UserLibraries = ({ currentUser, setEditLibraryId }) => {
    const paramId = Number(useParams().userId);


  const dispatch = useDispatch();
  console.log('THIS IS POKE OBJ', currentUser[paramId])
  const libraries = useSelector((state) => {
    if (!currentUser[paramId]) return null;
    return currentUser[paramId].libraries.map(libraryId => state.libraries[libraryId]);
  });
  console.log('SHOULD HAVE A VALUE ARR BY THIS TIME',libraries)
//
  useEffect(() => {
    dispatch(getLibraries(paramId))
  console.log('THIS IS ITEMS DISPATCH', currentUser.libraries)


  }, [paramId])

  if (!libraries) {
    return null;
  }

  return libraries.map((library) => (
    <tr key={library.id}>
      <td>
        <img
          className="library-image"
          alt={library.imageUrl}
          src={`${library.imageUrl}`}
        />
      </td>
      <td>{library.title}</td>

      {currentUser.user.id === paramId ?
        <td className="centered">
          <button onClick={() => setEditLibraryId(library.id)}>
            Edit
          </button>
        </td>
      : null}
    </tr>
  ));
};

export default UserLibraries;
