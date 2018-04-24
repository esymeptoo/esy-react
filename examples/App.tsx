import React, { Component } from 'react';
import Module from './Module';
import Button from '../src/Button/Button'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        console.log(1)
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
                    />
                    <Button
                        label={
                            <span>危险</span>
                        }
                        type="danger"
                        size="large"
                    />
                </Module>
            </div>
        )
    }
}