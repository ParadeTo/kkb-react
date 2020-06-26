import React from 'react'

export function createForm(Comp) {
  return class extends React.Component {
    state = {}
    options = {}

    handleChange = (e) => {
      const {name, value} = e.target
      this.setState({
        [name]: value,
      })
    }

    getFieldDecorator = (field, option) => (InputCmp) => {
      this.options[field] = option
      return React.cloneElement(InputCmp, {
        name: field,
        value: this.state[field] || '',
        onChange: this.handleChange,
      })
    }

    setFieldsValue = (newStore) => {
      this.setState({
        ...this.state,
        ...newStore,
      })
    }

    getFieldsValue = () => {
      return this.state
    }

    validateFields = (callback) => {
      let err = []
      for (let field in this.options) {
        const options = this.options[field]
        for (let i = 0, len = options.rules.length; i < len; i++) {
          const rule = options.rules[i]
          // 暂时只处理了 required
          if (rule.required && !this.state[field]) {
            err.push({[field]: rule.message})
            break
          }
          // TODO 其他校验类型
        }
      }

      if (err.length === 0) {
        callback(null, this.state)
      } else {
        callback(err, this.state)
      }
    }

    getForm = () => {
      return {
        form: {
          getFieldDecorator: this.getFieldDecorator,
          setFieldsValue: this.setFieldsValue,
          getFieldsValue: this.getFieldsValue,
          validateFields: this.validateFields,
        },
      }
    }

    render() {
      return <Comp {...this.props} {...this.getForm()} />
    }
  }
}
