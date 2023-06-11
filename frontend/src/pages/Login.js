import React, {SyntheticEvent, useState} from 'react';
import NavBar from '../components/NavBar';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Signup.css'

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    
    const handleLogin = async(e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json();
        setRedirect(true);
        // props.setName(content.name);
    };
    const navigate = useNavigate();

    if (redirect) {
        navigate('/');
    }
    return (
        <div>
            <NavBar></NavBar>
            <div className='sign-up'>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <input 
                        type='email'
                        placeholder='Email'
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type='password'
                        placeholder='Password'
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Login;       