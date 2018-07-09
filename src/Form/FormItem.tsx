import React, { Component } from 'react'
import clx from 'classnames'
import { FIELD_META_PROP, FIELD_DATA_PROP } from './constants';

import './FormItem.less'

export interface FormItemProps {
  prefixCls?: string;
  className?: string;
  id?: string;
  label?: string;
}

export default class FormItem extends Component<FormItemProps, any> {
  static defaultProps = {
    hasFeedback: false,
    prefixCls: 'esy-form',
    colon: true,
  }

  getControls(children: React.ReactNode, recursively: boolean) {
    let controls: React.ReactElement<any>[] = []
    const childrenArray = React.Children.toArray(children)
    for (let i = 0; i < childrenArray.length; i++) {
      if (!recursively && controls.length > 0) {
        break;
      }
      const child = childrenArray[i] as React.ReactElement<any>
      if (child.type && (child.type as any === FormItem || (child.type as any).displayName === 'FormItem')) {
        continue
      }
      controls.push(child)
    }
    return controls
  }

  getOnlyControl() {
    const child = this.getControls(this.props.children, false)[0]
    return child !== undefined ? child : null
  }

  getChildProp(prop: string) {
    const child = this.getOnlyControl() as React.ReactElement<any>
    return child && child.props && child.props[prop]
  }

  getId() {
    return this.getChildProp('id')
  }

  getField() {
    return this.getChildProp(FIELD_DATA_PROP)
  }

  getValidateStatus() {
    const onlyControl = this.getOnlyControl()
    if (!onlyControl) {
      return ''
    }
    const field = this.getField()
    if (field.validating) {
      return 'validating'
    }
    if (field.errors) {
      return 'error'
    }
    const fieldValue = 'value' in field ? field.value : this.getMeta().initialValue
    if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
      return 'success'
    }
    return ''
  }

  renderValidateWrapper(c: React.ReactNode) {
    // const prop = this.props
    // const onlyControl = this.getOnlyControl
    return (
      <div className={clx(`${this.props.prefixCls}-validate-wrapper`)}>
        {c}
      </div>
    )
  }

  renderWrapper(c: React.ReactNode) {
    return (
      <div className={clx(`${this.props.prefixCls}-control-wrapper`)} key="wrapper">
        { c }
      </div>
    )
  }

  renderLabel() {
    return (
      <div className={clx(`${this.props.prefixCls}-label-wrapper`)} key="label">
        { this.props.label }
      </div>
    )
  }

  renderChildren() {
    return [
      this.renderLabel(),
      this.renderWrapper(
        this.renderValidateWrapper(this.getOnlyControl())
      ),
    ]
  }

  renderFormItem(children: React.ReactNode) {
    const props = this.props
    const itemClassName = {
      [`${props.prefixCls}-form-item`]: true,
      [`${props.className}`]: !!props.className,
    }
    return (
      <div className={clx(itemClassName)}>
        { children }
      </div>
    )
  }

  render() {
    const children = this.renderChildren()
    return this.renderFormItem(children)
  }
}
