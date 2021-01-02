import React from 'react'

class State {
  #val = null
  #setters = []
  #afters = []
  constructor(initial, after) {
    this.#val = initial
    this.#setters = new Set()
    this.#afters = []
    if(after) {
      this.#afters.push(after)
    }
  }

  #link = (setter) => {
    this.#setters.add(setter)
  }
  #unlink = (setter) => {
    this.#setters.delete(setter)
  }
  set = (val) => {
    this.#val = val
    for(let setter of this.#setters) {
      setter(val)
    }
  }
  read = () => {
    const val = this.#val
    return val
  }
  static useState = (mcbinder) => {
    const [val, setter] = React.useState(mcbinder.#val);
    const init = React.useRef(true);
    React.useEffect(()=> {
      mcbinder.#link(setter)
      return () => {
        mcbinder.#unlink(setter)
      }
    }, [])
    React.useEffect(()=> {
      if(init.current) {
        init.current = false;
        return
      }
      for(let after of mcbinder.#afters) {
        after(val)
      }
    }, [val])
    return val;
  }
}
const useState = (mcbinder) => {
  return State.useState(mcbinder)
}

export { useState, State }