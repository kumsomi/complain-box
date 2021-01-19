import React from 'react'
import firebase from '../database/fb'

export default function Vote({ comps }) {

    const compResolved=()=>{
        const compRef = firebase.database().ref("comp").child(comps.id);
        compRef.update({
            resolved:true
        })
    }

    return (
        <div>
            {!comps.resolved? 
            <>
            <h2>{comps.title}</h2>
            <h3>{comps.desc}</h3>
            {comps.anonymous? <h4>Anonymous</h4>:<h4>{comps.auth}</h4>}
            <button onClick={compResolved}>Resolved</button>
            </>
            : 'this problem is resolved'}
        </div>
    )
}