import React, { Component } from 'react'
import FormTask from './components/formTask'
import ListTasks from './components/listTasks'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      task: []
    }
    this.getTasks = this.getTasks.bind(this)
  }
  componentDidMount() {
    this.getTasks()
  }
  getTasks() {
    fetch('http://localhost:5000/task/')
      .then(res => res.json())
      .then(response => {
        console.log(response)
        this.setState({
          task: response.tasks
        })
      })
  }
  render() {
    return (
      <div>

        <div className='row'>
          <h1 className='title-primary mb-1'>Task manager - <span className='badge-white'>{this.state.task.length}</span></h1>
          <div className='col-1-of-3'>
            <FormTask onChange={this.getTasks} getTasks={this.getTasks} />
          </div>
          <div className='col-2-of-3'>
            <ListTasks onChange={this.getTasks} getTasks={this.getTasks} tasks={this.state.task} />
          </div>
        </div>
      </div>
    )
  }
}

