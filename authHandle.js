import React, {useState, useEffect} from 'react'
import firebase from '../database/fb'
import Login from './login'
import RegComp from './RegComp'

export default function AuthHandle() {
    const [user, setUser] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[emailError, setEmailError] = useState('');
    const[passwordError, setPasswordError] = useState('');
    const[hasAccount, setHasAccount] = useState(false);
    const[toPassEmail, setToPassEmail] = useState("")



    const clearInputs = () => {
        setEmail("");
        setPassword("");
      }
    
      const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
      }

    const handleLogin = () => {
        setToPassEmail(email)
        clearErrors();
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .catch((err) => { //err not in bracket
            switch (err.code) {
              case "auth/invalid-email":
              case "auth/user-disabled":
              case "auth/user-not-found":
                setEmailError(err.message);
                break;
              case "auth/wrong-password":
                setPasswordError(err.message);
                break;
            }
          });
    
      };


      const handleSignup = () => {
        setToPassEmail(email)
        clearErrors();
        firebase
          .auth()
          .createUserWithEmailAndPassword(email,password)
          .catch(err => {
            switch(err.code) {
              case "auth/email-already-in-use":
              case "auth/invalid-email":
                setEmailError(err.message);
                break;
              case "auth/weak-password":
                setPasswordError(err.message);
                break;
            }
          });
      };

      const handleLogout = () => {
        firebase.auth().signOut();
      };

      const authListner = () => {
        firebase.auth().onAuthStateChanged((user) => { //user not in brackets--it has
          if (user) {
            
            clearInputs();
            setUser(user);
          }
          else {
            setUser("");
          }
        });
      };

      useEffect(()=>{
        authListner();
      },[])
    return (
      <>
        <div>
          {!user ?
        (<Login 
        email={email} 
        setEmail={setEmail} 
        password={password} 
        setPassword={setPassword} 
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
        />) :        
        (<RegComp handleLogout={handleLogout} toPassEmail={toPassEmail}/>)
          }   
        </div>
        
      </>
    )
}
