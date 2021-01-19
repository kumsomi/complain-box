import React, {useState, useEffect} from 'react'
import firebase from '../database/fb'
import Vote from '../pages/Vote'

export default function CompList() {

    const [compsList, setCompsList] = useState()
    
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

    }, [])
    return (
        <div>
            <h1>Complaints By Students</h1>
            <div>
            {compsList ? compsList.map((comps, index)=>
            <div className="details">
                <Vote comps={comps} key={index}/>
            </div> ) : ''}
</div>
        </div>
    )
}
