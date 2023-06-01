import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import './Signin.css';


const Signin = () => {
    const navigate = useNavigate();

    const homeHanler = (credentialResponse, error) => {
        if (error) alert('some error occured');
        const token = credentialResponse.credential;
        localStorage.clear();
        localStorage.setItem('user-token', token);
        setTimeout(() => {
            navigate('/home');
        }, 500);

    }
    
    return (
        <div className="google_signin">
            <GoogleOAuthProvider clientId="53240284106-3n37jfpcdv3ke7p6gb2amnhgm1fecds4.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={(credentialResponse) => homeHanler(credentialResponse)}
                    onError={() => {
                        alert('Login Failed');
                    }} />
            </GoogleOAuthProvider>
        </div>
    )
}
export default Signin;