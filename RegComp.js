import React, {useState, useEffect} from 'react'
import firebase from '../database/fb'
import RegCompList from '../pages/RegCompList'
import {Route, BrowserRouter as Router, Link} from 'react-router-dom' 
import Routes from '../Routes'

export default function RegComp(props) {

    const {
        handleLogout,
        toPassEmail
    }=props

    const [title, setTitle]=useState('')
    const [desc, setDesc]=useState('')
    const [isChecked, setIsChecked] = useState(false);
    const [compsList, setCompsList] = useState()

      
    const handleOnChange = (e)=>{
        setTitle(e.target.value);
    };

    const handleOnChangeText = (e)=>{
        setDesc(e.target.value);
    };

    const changeCheck=(e)=>{
        setIsChecked(e.target.checked)
        
    }

    useEffect(()=>{
        const compRef = firebase.database().ref("comp")
        compRef.on('value', (snapshot)=>{
            console.log(snapshot.val())
            const comps = snapshot.val();
            const compsList=[]
            for(let id in comps){
                compsList.push({id, ...comps[id]})
            }
            console.log(compsList)
            setCompsList(compsList)
        })

    }, []) //fetch the list

    const addComp=()=>{
        const compRef = firebase.database().ref("comp");
        const comp = {
            title,
            desc,
            auth : toPassEmail,
            resolved: false,
            anonymous: isChecked
        }
        if(title.length>=3)
            compRef.push(comp);
        else
            alert("Please give a valid complaint");
        setTitle('');
        setDesc('');
        setIsChecked(false)
    }; //add a new complaint

    

    return (
        <div>
        
            <h2>Write your complains here. <button className="comp" onClick={handleLogout}>LogOut</button></h2>
                
            
            <div className="form__group field">
            <div class="form__group field">
                <input type="input" class="form__field" placeholder="Title" name="title" id='title' required onChange={handleOnChange} value={title} required />
                <label for="title" class="form__label">Title</label>
                </div> 

                <div class="form__group field">
                <input type="input" class="form__field" placeholder="Description " name="description " id='description'  required onChange={handleOnChangeText} value={desc} required />
                <label for="description" class="form__label">Description </label>
            </div>
            <br></br>
            <h5>Do you wish to be Anonymous? <input type="checkbox" checked={isChecked}
            onChange={changeCheck}/> </h5>
            <br></br>

            <button className="comps" onClick={addComp}>Submit</button>

            {compsList ? compsList.map((comps, index)=>
            comps.auth == toPassEmail ? (<div>
                <RegCompList comps={comps} key={index} />
            </div> )
            : '') : ''} 
            </div>
            
        </div>
    );
}
