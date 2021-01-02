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
  set = async (val) => {
    for(let setter of this.#setters) {
      await setter(val)
    }
    this.#val = val
    for(let after of this.#afters) {
      await after(val)
    }
  }
  read = () => {
    const val = this.#val
    return val
  }
  static useState = (mcbinder) => {
    const [val, setter] = React.useState(mcbinder.#val);
    const cbRef = React.useRef(null)
    const setThen = (val) => {
      return new Promise((resolve, reject) =>{
        cbRef.current = resolve;
        setter(val)
      })
    }
    React.useEffect(()=> {
      mcbinder.#link(setThen)
      return () => {
        mcbinder.#unlink(setThen)
      }
    }, [])
    React.useEffect(()=> {
      if(cbRef.current) {
        cbRef.current(val);
        cbRef.current = null;
      }
    }, [val])
    return val;
  }
}
const useState = (mcbinder) => {
  return State.useState(mcbinder)
}

export { useState, State }