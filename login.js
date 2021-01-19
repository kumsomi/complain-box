import React, {useState} from 'react'
import CompList from './CompList'

export default function Login(props) {
    const {
        email, 
        setEmail, 
        password, 
        setPassword, 
        handleLogin,  
        handleSignup, 
        hasAccount, 
        setHasAccount, 
        emailError, 
        passwordError
    } = props;

    const[adminPassword, setAdminPassword] = useState('');
    const[passwordTrue, isPasswordTrue] = useState(0)

    const handleAdminLogin = () => {
        if(adminPassword==="123456654321"){
            isPasswordTrue(1)
        }
        else{
            isPasswordTrue(2)
        }
      }
    return (
        <div >
            
            {passwordTrue==1 ? (<CompList/>) :
            (<div>
                <h2>Complaint Box</h2>
            <div className="form__group field">
               <div class="form__group field">
                    <input type="input" class="form__field" placeholder="Email Address" name="email" id='email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label for="email" class="form__label">Email Address</label>
                </div>

                <p className="errorMsg">{emailError}</p>

                <div class="form__group field">
                    <input type="password" class="form__field" placeholder="Password" name="pass" id='pass'  required value={password} onChange={(e)=> setPassword(e.target.value)} />
                    <label for="pass" class="form__label">Password</label>
                </div>
                <p className="ErrorMsg">{passwordError}</p>
                <br></br>
            {hasAccount?(
                <>
                    <button className="comps" onClick={handleLogin}>Sign in</button>
                    <p>Don't have an account? <u><span onClick={()=>setHasAccount(!hasAccount)}>Sign Up</span></u></p>
                </>
                    ) : (
                <>
                    <button className="comps" onClick={handleSignup}>Sign Up</button>
                    <p>Have an account ? <u><span onClick={()=>setHasAccount(!hasAccount)}>Sign in</span></u></p>
                </>
            )}
            </div>
            <br></br>
            <h3>Admin Login</h3>
            <input placeholder="High Security Password" type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)}/>
            <button className="comps" onClick={handleAdminLogin}>Admin Login</button>
            {passwordTrue == 2 ? 
            (<h6>InCorrect Password</h6>) : ''
            
            }
            </div>
            )}
        </div>
    )
}
