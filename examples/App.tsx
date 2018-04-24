import React, { Component } from 'react';
import Module from './Module';
import Button from '../src/Button/Button';
import Icon from '../src/Icon/Icon';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        console.log('i am a hook')
    }
    render() {
        return (
            <div>
                <Module
                    title="按钮"
                >
                    <Button
                        label="默认"
                        type="default"
                        size="mini"
                        onClick={this.handleClick}
                    />
                    <Button
                        label="标准"
                        type="primary"
                        size="small"
                        icon="home"
                        // disabled={true}
                    />
                    <Button
                        label={
                            <span>危险</span>
                        }
                        type="danger"
                        size="large"
                        disabled={true}
                    />
                </Module>
                <Module
                    title="图标"
                >
                    <Icon
                        type="share"
                        width="20"
                        height="20"
                    />
                    <Icon
                        type="home"
                        width="30"
                        height="30"
                        onClick={this.handleClick}
                    />
                </Module>
            </div>
        )
    }
}