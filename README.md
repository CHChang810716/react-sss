# react-sss (react simple shared state)

Yet, another react function component shared state management solution.

[![NPM](https://img.shields.io/npm/v/react-sss.svg)](https://www.npmjs.com/package/react-sss) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-sss
```

## Usage

```jsx
import React from 'react'
import { useState, State } from 'react-sss'

// create state(data model)
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
      // add edited todo to todo list
      todos.set([text, ...todoList])
      // clean editing todo input 
      editingTodo.set('')
    }}>add</button>
  </div>)
}

const Item = ({tid, text}) => {
  const todoList = useState(todos)
  const doneList = useState(done)
  return <div>
    <button onClick={e => {
      // remove item from todo list
      const target = todoList[tid];
      let arr = [...todoList]
      arr.splice(tid, 1)
      todos.set(arr).then(()=>{
        // add removed item to done list
        return done.set([target, ...doneList])
      })
    }}>done</button>
    <button onClick={e => {
      // remove item from todo list
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
```

## License

MIT © [CHChang810716](https://github.com/CHChang810716)
