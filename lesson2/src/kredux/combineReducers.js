export default function combineReducers(reducers) {
  const keys = Object.keys(reducers)
  return (state = {}, action) => {
    let hasChanged = false
    const nextState = {}
    debugger
    for (let i = 0, len = keys.length; i < len; i++) {
      const key = keys[i]
      const reducer = reducers[key]
      const prevStateForKey = state[key]
      const nextStateForKey = reducer(prevStateForKey, action)
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== prevStateForKey
    }
    hasChanged = hasChanged || keys.length !== Object.keys(state).length
    return hasChanged ? nextState : state
  }
}
