import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Auth from '../utils/auth';
import { LOGIN } from '../utils/mutations';
import { Navbar } from '../components';
import { Link } from 'react-router-dom';



const UserLogin = () => {

    const [login, { error }] = useMutation(LOGIN);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [submitted, setSubmitted] = useState(false);
    const [error_, setError_] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { email: email, password: password },
            });
            const token = mutationResponse.data.login.token;
            const id = mutationResponse.data.login.user._id;
            Auth.login(token, undefined, id);
        } catch (e) {
            alert('Unauthorized')
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setError_(true);
        } else {
            setSubmitted(true);
            setError_(false);
        }
    };

    const successMessage = () => {
        return (
            <div className='success' style={{ display: submitted ? '' : 'none', }}>
                <h3>Welcome back!</h3>
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
                <h3>User Log In</h3>

                <div className='messages'>
                    {errorMessage()}
                    {successMessage()}
                </div>

                <form>
                    <input type="email" onChange={handleEmail} value={email} />
                    <input type="password" onChange={handlePassword} value={password} />
                    <button type='submit' onClick={{handleFormSubmit, handleSubmit}}>Submit</button>
                    
                    <Link to='/admin-login'>Log In as Admin</Link>
                </form>
            </div>
        </>
    )
}


export default UserLogin