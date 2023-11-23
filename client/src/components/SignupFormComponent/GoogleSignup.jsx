import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const GoogleSignup = ( { handleGoogleLogin } ) => {
  return (
    <GoogleOAuthProvider clientId="1059131890610-0a3dua6ik9pq0b5pvk2fch3o8dkardk7.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        handleGoogleLogin(decoded.email)
        // console.log(decoded)
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignup;
