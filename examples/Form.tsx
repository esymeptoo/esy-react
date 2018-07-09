import React, { Component } from 'react'
import FormItem from '../src/Form/FormItem'
import Input from '../src/Input/Input'

export default class FormExample extends Component<any> {

  constructor(props) {
    super(props)
    this.state = {
      form: {
        title: '标题',
      }
    }
  }

  render() {
    return (
      <div style={{ margin: '10px' }}>
        <FormItem label="标题">
          <Input/>
        </FormItem>
      </div>
    )
  }
}
