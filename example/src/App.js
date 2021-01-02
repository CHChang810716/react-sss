import React from 'react'
import { useState, State } from 'react-sss'

const todos = new State([]);
const done = new State([]);
const editingTodo = new State("");

const NewTodo = () => {
  const text = useState(editingTodo)
  const todoList = useState(todos)
  return (<div>
    <input type="text" value={text} onChange={
      e => editingTodo.set(e.target.value)
    }/>
    <button onClick={e => {
      todos.set([text, ...todoList])
      editingTodo.set('')
    }}>add</button>
  </div>)
}

const Item = ({tid, text}) => {
  const todoList = useState(todos)
  const doneList = useState(done)
  return <div>
    <button onClick={e => {
      const target = todoList[tid];
      let arr = [...todoList]
      arr.splice(tid, 1)
      todos.set(arr).then(()=>{
        return done.set([target, ...doneList])
      })
    }}>done</button>
    <button onClick={e => {
      let arr = [...todoList]
      arr.splice(tid, 1)
      todos.set(arr)
    }}>delete</button>
    <div style={{display: 'inline-block'}}>{text}</div>
  </div>
}

const App = () => {
  const todoList = useState(todos)
  const doneList = useState(done)
  return <div>
    <NewTodo />
    <div> TODO: </div>
    {
      todoList.map((text, i) => <Item key={i} tid={i} text={text}/>)
    }
    <div> DONE: </div>
    {
      doneList.map((text, i) => <div key={i}>{text}</div>)
    }
  </div>
}

export default App
