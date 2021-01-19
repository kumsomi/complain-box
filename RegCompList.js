import React, {useState} from 'react'
import firebase from '../database/fb'

export default function RegCompList({ comps }) {

    const [update, setUpdate] = useState(comps.title)
    const [updateDesc, setUpdateDesc] = useState(comps.desc)
    const [updClick, setUpdCli] = useState(false)

    const deleteComp=()=>{
        const compRef = firebase.database().ref("comp").child(comps.id);
        compRef.remove()
    }

    const handleOnChange = (e)=>{
        setUpdate(e.target.value);
    };

    const handleOnChangeText = (e)=>{
        setUpdateDesc(e.target.value);
    };

    const updateComp=()=>{
        setUpdCli(updClick?false:true)
    }

    const subUpdate=()=>{
        const compRef = firebase.database().ref("comp").child(comps.id);
        compRef.update({
            title:update,
            desc: updateDesc
        })
        updateComp()
    }
    
    return (
        <div className="details">
            {!updClick?
            <div>
                <h4>Title: <u>{comps.title}</u></h4>
                {comps.resolved ?
                    (<h6>This problem has been resolved</h6>) :
                    (<h6>This problem has been taken into notice!</h6>)
                }
                <button onClick={deleteComp}>Delete</button>
                <button onClick={updateComp}>Update</button>
                
            </div>
                :  
            <div>
            <input type="text" value={update} onChange={handleOnChange}></input>
            <textarea onChange={handleOnChangeText} value={updateDesc}/>
            <button onClick={subUpdate}>Submit</button>
            </div> }
            
        </div>
    )
}
