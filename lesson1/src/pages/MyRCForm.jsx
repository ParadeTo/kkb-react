import React, {Component} from 'react'
// import {createForm} from 'rc-form'
import {createForm} from '../components/my-rc-form'
import Input from '../components/Input'

const nameRules = {required: true, message: '请输入姓名！'}
const passworRules = {required: true, message: '请输入密码！'}

class MyRCForm extends Component {
  state = {username: '', password: ''}

  componentDidMount() {
    this.props.form.setFieldsValue({username: 'default'})
  }

  submit = () => {
    const {getFieldsValue, validateFields} = this.props.form
    validateFields((err, val) => {
      if (err) {
        console.log('失败', err)
      } else {
        console.log('成功', val)
      }
    })
    console.log('submit', getFieldsValue())
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        <h3>MyRCForm</h3>
        {getFieldDecorator('username', {rules: [nameRules]})(
          <Input placeholder='Username' />
        )}
        {getFieldDecorator('password', {rules: [passworRules]})(
          <Input placeholder='Password' />
        )}
        <button onClick={this.submit}>submit</button>
      </div>
    )
  }
}

export default createForm(MyRCForm)
