import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect, useParams, useHistory} from 'react-router-dom'
import * as sessionActions from '../../store/session'
import * as picActions from '../../store/uploadPic'


const UpdateUser = ({hideForm}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const history = useHistory();
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const userId = user.id
    console.log('THIS IS THE USER',user)

    async function handleClose(e) {

        hideForm()
    }
     async function handleSubmit(e) {
        console.log('THESE ARE THE VALUES', username, email)
        hideForm();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.update({ email, username, password, userId }))
              .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
              });
          }
          return setErrors(['Confirm Password field must be the same as the Password field']);
    }
    async function handleDelete() {
        history.push('/')
        await dispatch(sessionActions.deleteUser(userId));
        hideForm()
    }
    // EACH INPUT SHOULD HAVE A VALUE OF CURRENT USER INFO AND PLACEHOLDER TOO
    return (
        <div className='popup-background'>
            <div className='box'>
                <h2>Update user</h2>
                <div className='exit' onClick={handleClose}>X</div>
                <label>
                Username
                    <input type='text' value={username} onChange={(e) => {setUsername(e.target.value)}} />
                </label>
                <label>
                    Email
                    <input type='text' value={email} onChange={(e) => {setEmail(e.target.value)}} />
                </label>
                <label>
                New Password
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>
            <label>
                Confirm Password
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                />
            </label>
                <button className='submit' onClick={handleSubmit}>Update</button>
                <button className='delete' onClick={handleDelete}>Delete User</button>

            </div>
        </div>
    )
}

export default UpdateUser;
