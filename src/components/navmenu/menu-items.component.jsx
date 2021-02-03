import React from 'react'


export default function MenuItem (props) {
    return <div>
        {props.label.uid}- {props.label.title}
    </div>
}
