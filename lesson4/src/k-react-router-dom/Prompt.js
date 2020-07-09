import React from 'react'
import {RouterContext} from './Context'

export default function Prompt({when = true, message}) {
  return (
    <RouterContext.Consumer>
      {(context) => {
        if (!when) return null
        // 阅读源码可知，block 中只是把 prompt 这个内部变量进行了赋值，并不会执行 window.confirm
        // 在下次路由变化的时候，confirmTransitionTo 这个方法中会将 prompt 传给 window.confirm 调用
        // block 调用后会返回一个函数，该函数执行会把 prompt 置为空
        const method = context.history.block
        return (
          <LifeCycle
            // 组件挂载后，对 prompt 进行赋值
            onMount={(self) => (self.release = method(message))}
            // 组件卸载的时候，即跳到其他路由后，把 prompt 置空，避免污染其他路由
            onUnmount={(self) => self.release()}
          />
        )
      }}
    </RouterContext.Consumer>
  )
}

class LifeCycle extends React.Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount.call(this, this)
    }
  }

  componentWillUnmount() {
    if (this.props.onUnmount) this.props.onUnmount.call(this, this)
  }

  render() {
    return null
  }
}
