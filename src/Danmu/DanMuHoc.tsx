import React, { Component } from 'react'

export interface CommonDanMuOptions {
  onClick?: () => void
}
export interface InjectedDanMuProps {
  speed?: number
  message?: React.ReactNode | string,
  style?: object
  onClick?: () => void
}

// 普通弹幕的hoc
function CommonDanMu(options: CommonDanMuOptions) {
  const { onClick } = options
  return function <P extends InjectedDanMuProps>(WrapperComponent: React.ComponentType<P>) {
    const displayName = WrapperComponent.displayName || WrapperComponent.name || 'Component'
    class Content extends Component {
      static displayName = `content${displayName}`

      render() {
        return <WrapperComponent
          {...this.props}
          onClick={onClick}
        />
      }
    }
    return Content
  }
}

export default CommonDanMu
