import React, { Component } from 'react';
import {Button} from '@src/index'

export default class App extends Component {
    render() {
        return (
            <div>
                <Button
                    // label="测试按钮"
                    type="default"
                    label={
                        <span>默认按钮</span>
                    }
                />
                <Button
                    // label="测试按钮"
                    type="primary"
                    label={
                        <span>常用按钮</span>
                    }
                />
                <Button
                    // label="测试按钮"
                    type="danger"
                    label={
                        <span>危险按钮</span>
                    }
                />
            </div>
        )
    }
}