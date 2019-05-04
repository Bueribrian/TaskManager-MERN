import React, { Component } from 'react'

export default class FormTask extends Component {
    constructor() {
        super()
        this.state = {
            titleInputFocus: false,
            descriptionInputFocus: false
        }
    }
    addEmoji = e => {
        let target = e.target.innerText
        let title = document.querySelector('#title')
        let description = document.querySelector('#description');
        if (this.state.titleInputFocus) {
            title.value += target
        } else if (this.state.descriptionInputFocus) {
            description.value += target
        }
    }
    onFocus = e => {
        let target = e.target.name

        if (target === 'title') {
            this.setState({
                titleInputFocus: true,
                descriptionInputFocus: false
            })
        } else {
            this.setState({
                titleInputFocus: false,
                descriptionInputFocus: true
            })
        }

    }

    handleSubmit = (e) => {
        console.log(e.target.title.value)
        console.log(e.target.description.value)
        let task = {
            "title": e.target.title.value,
            "description": e.target.description.value
        }
        fetch('http://localhost:5000/task',
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                this.props.getTasks()
            })

        e.preventDefault()
    }
    render() {
        let emojis = ["✌", "😂", "😝", "😁", "😱", "👉", "🙌", "🍻", "🔥", "🌈", "☀", "🎈", "🌹", "💄", "🎀", "⚽", "🎾", "🏁", "😡", "👿", "🐻", "🐶", "🐬", "🐟", "🍀", "👀"]

        return (
            <div>
                <form className='form' method='POST' action='http://localhost:5000/task' onSubmit={this.handleSubmit}>
                    <h2 className='mb-1'>Add a task</h2>
                    <div className='form__control'>
                        <input onFocus={this.onFocus} className='form__control--input' type='text' placeholder='Task title' required id='title' name='title' />
                        <label className='form__control--label' htmlFor='title'>Title</label>
                    </div>
                    <div className='form__control'>
                        <textarea cols='15' onFocus={this.onFocus} className='form__control--input' type='text' placeholder='Task title' required id='description' name='description' />
                        <label className='form__control--label' htmlFor='description'>Description</label>
                    </div>
                    <div className='form__control'>
                        <div className='form__control--emojisBox'>
                            {emojis.map((emojiBtn, index) => <span key={index} className='emojiBtn' onClick={this.addEmoji}>{emojiBtn}</span>)}
                        </div>
                    </div>
                    <button className='btn btn--linearGradient'>Post</button>
                </form>
            </div>
        )
    }
}
