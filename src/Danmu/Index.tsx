import React, { Component } from 'react'
import ContentWithUser, { ContentProps } from '@src/Danmu/ContentWithUser'
import './index.less'

interface DanMuState {
  loading?: boolean
}

interface DanMuProps {
  userTalks: ImmutableList<ImmutableMap<ContentProps>>
}

export default class DanMu extends Component<DanMuProps, DanMuState> {
  constructor(props) {
    super(props)
  }

  renderDanMus() {
    return this.props.userTalks.map((userTalk, idx) =>
      <ContentWithUser
        key={idx}
        userProfile={userTalk}
      />
    )
  }

  render() {
    return <div className="esy-danmu-box">
      {this.renderDanMus()}
    </div>
  }
}
