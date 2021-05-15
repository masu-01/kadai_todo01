import React from 'react'
import {db} from '../firebase'


const TaskItem = ({id, name, birthday, relationship}) => {

    const deleteInputData = () => {
        db.collection("group").doc(id).delete();
    }

    return (
        <ul>
            <div className="list-row">
                <li>
                    <span className="span-head01">{name}</span>
                    <span className="span-head01">{relationship}</span>
                    <span className="span-head02">{birthday}</span>
                    <span className="span-head03"><button onClick={deleteInputData}>削除</button></span>
                </li>
            </div>        
        </ul>
    )
}

export default TaskItem
