import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "jose";
import './Signin.css';


const Signin = () => {
    const navigate = useNavigate();

    const homeHandler = (credentialResponse, error) => {
        if (error) {
            alert('Some error occurred');
        } else {
            const { credential } = credentialResponse;
            const payload = credential ? decodeJwt(credential) : undefined;
            console.log(payload)
            const profilePhoto = payload.picture;
            const name = payload.name;
            console.log(profilePhoto)
            setTimeout(() => {
                navigate(`/home?photo=${profilePhoto}&name=${name}`);
            }, 500);
        }
    };

    return (
        <div className="google_signin">
            <GoogleOAuthProvider clientId="53240284106-3n37jfpcdv3ke7p6gb2amnhgm1fecds4.apps.googleusercontent.com">
                <GoogleLogin
                    isSignedIn={true}
                    onSuccess={(credentialResponse) => homeHandler(credentialResponse)}
                    onError={() => {
                        alert('Login Failed');
                    }}
                    useOneTap
                />
            </GoogleOAuthProvider>
        </div>
    )
}
export default Signin;