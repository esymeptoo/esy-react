import React, { Component } from 'react'
import CommonDanMu from './DanMuHoc'
import { InjectedDanMuProps } from './DanMuHoc'
import './DanMuContent.less'

interface UserProfile {
  name?: string
  cover?: string
}
export interface ContentProps extends InjectedDanMuProps {
  // 用户信息
  userProfile?: ImmutableMap<UserProfile>
}

class ContentWithUser extends Component<ContentProps> {
  constructor(props) {
    super(props)
  }
  handleClick = () => {
    this.props.onClick && this.props.onClick()
  }
  render() {
    const { userProfile } = this.props
    return <span className="danmu-with-uesr" onClick={this.handleClick}>{userProfile.get('name')}</span>
  }
}

export default CommonDanMu({
  onClick: function() {
    alert(1)
  },
})(ContentWithUser)
