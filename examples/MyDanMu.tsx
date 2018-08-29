import React, { Component } from 'react'
import DanMu from '@src/Danmu'

import Immutable from 'immutable'

export default class MyDanMu extends Component<any> {
  constructor(props) {
    super(props)
    this.state = {
      data: Immutable.List([
        Immutable.Map({
          name: 'esymeptoo',
        }),
      ]),
    }
  }
  render() {
    return <div>
      <DanMu
        userTalks={this.state.data}
      />
    </div>
  }
}
