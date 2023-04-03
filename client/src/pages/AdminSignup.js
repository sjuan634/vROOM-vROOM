import React, { useState } from 'react'
import { Navbar } from '../components'
import { Link } from 'react-router-dom'
import { SIGNUP_ADMIN } from '../utils/mutations'
import { useMutation } from '@apollo/client'
import Auth from '../utils/auth'

const AdminSignup = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPass] = useState("")
    const [addUser, { loading, error, data }] = useMutation(SIGNUP_ADMIN);

    const [submitted, setSubmitted] = useState(false);
    const [error_, setError_] = useState(false);

    const handleName = (e) => {
        setFirstName(e.target.value);
        setLastName(e.target.value);
        setSubmitted(false);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    const handlePassword = (e) => {
        setPass(e.target.value);
        setSubmitted(false);
    };

    const handleSubmit = async (event) => {
        try {
            const { data } = await addUser({ variables: { firstName, lastName, email, password } });
            const token = data.signupAdmin.token
            const id = data.signupAdmin.user._id
            Auth.login(token, true, id)
            console.log('New user added:', data.addUser.user);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (firstName === '' || lastName === '' || email === '' || password === '') {
            setError_(true);
        } else {
            setSubmitted(true);
            setError_(false);
        }
    };

    const successMessage = () => {
        return (
            <div className='success' style={{ display: submitted ? '' : 'none', }}>
                <h3>User {firstName} successfully registered!</h3>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div className='error' style={{ display: error ? '' : 'none', }}>
                <h3>All fields are required.</h3>
            </div>
        );
    };

    return (
        <>
            <Navbar />
            <div className='login-card'>
                <h3>Admin Sign Up</h3>

                <div className='messages'>
                    {errorMessage()}
                    {successMessage()}
                </div>

                <form>

                    <input type="text" value={firstName} onChange={handleName} placeholder='First Name' />
                    <input type="text" value={lastName} onChange={handleName} placeholder='Last Name' />
                    <input type="email" value={email} onChange={handleEmail} placeholder='Email' />
                    <input type="password" value={password} onChange={handlePassword} placeholder='Password' />
                    <button type='submit' onClick={{handleSubmit, handleSubmitForm}}>Submit</button>

                    <Link to='/signup' >Sign Up as User</Link>


                </form>
            </div>
        </>
    )
}

export default AdminSignup