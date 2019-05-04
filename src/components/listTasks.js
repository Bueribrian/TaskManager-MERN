import React, { Component } from 'react'

export default class ListTasks extends Component {
    render() {

        const handleDelete = async (e) => {
            let id = e.target.value

            await fetch('http://localhost:5000/task/' + id,
                {
                    method: "DELETE",
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => res.json())
                .then(response => {
                    console.log(response)


                })
            await this.props.getTasks()
        }

        let tasks = this.props.tasks.map((task, index) => <div key={index} className='card'>
            <div className='card__frontside'>

                <p className='card__frontside--text'>{task.title}</p>
            </div>
            <div className='card__backside'>
                <p class='card__backside--text mb-1'><strong>Description:</strong> </p>
                <p className='card__backside--text'>{task.description}</p>
            </div>
            <button className='btn card__btn' value={task._id} onClick={handleDelete}>Delete</button>
        </div>)
        return (
            <div className='card-container'>
                {tasks}
            </div>
        )
    }
}
