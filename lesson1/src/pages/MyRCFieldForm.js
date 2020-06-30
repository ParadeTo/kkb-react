import React, {Component, useEffect} from 'react'
// import Form, {Field} from "rc-field-form";
import Form, {Field} from '../components/my-rc-field-form/'
import Input from '../components/Input'

const nameRules = {required: true, message: '请输入姓名！'}
const passworRules = {required: true, message: '请输入密码！'}

// export default function MyRCFieldForm(props) {
//   const [form] = Form.useForm()

//   const onFinish = (val) => {
//     console.log('onFinish', val)
//   }

//   const onFinishFailed = (val) => {
//     console.log('onFinishFailed', val)
//   }

//   useEffect(() => {
//     console.log('form', form)
//     form.setFieldsValue({username: 'default'})
//     console.log(form.getFieldValue('username'))
//   }, [])

//   return (
//     <div>
//       <h3>MyRCFieldForm</h3>
//       <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
//         <Field name='username' rules={[nameRules]}>
//           <Input placeholder='input UR Username' />
//         </Field>
//         <Field name='password' rules={[passworRules]}>
//           <Input placeholder='input UR Password' />
//         </Field>
//         <button>Submit</button>
//       </Form>
//     </div>
//   )
// }
export default class extends React.Component {
  formRef = React.createRef()

  onFinish = (val) => {
    console.log('onFinish', val)
  }

  onFinishFailed = (val) => {
    console.log('onFinishFailed', val)
  }

  componentDidMount() {
    this.formRef.current.setFieldsValue({username: 'default'})
  }

  render() {
    return (
      <div>
        <h3>MyRCFieldForm</h3>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}>
          <Field name='username' rules={[nameRules]}>
            <Input placeholder='input UR Username' />
          </Field>
          <Field name='password' rules={[passworRules]}>
            <Input placeholder='input UR Password' />
          </Field>
          <button>Submit</button>
        </Form>
      </div>
    )
  }
}
