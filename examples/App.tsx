import React, { Component } from 'react';
import Module from './Module';
import Button from '../src/Button/Button';
import Icon from '../src/Icon/Icon';
import Pagination from '../src/Pagination'
import Input from '../src/Input';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: 'test',
            total: 100
        };
        this.handleClick = this.handleClick.bind(this);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }
    handleClick() {
        console.log('i am a hook')
    }

    handlePaginationChange(page) {
        console.log('choose page:' + page);
    }

    handleInputChange(val) {
        this.setState({
            inputValue: val
        })
    }

    handleEnter() {

    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                total: this.state.total + 90
            })
        }, 3000);
    }

    render() {
        const { inputValue } = this.state;
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
                            <span>特大</span>
                        }
                        type="primary"
                        size="large"
                        disabled={false}
                    />
                </Module>
                <Module
                    title="图标"
                >
                    <Icon
                        type="home"
                        width="30"
                        height="30"
                        onClick={this.handleClick}
                    />
                </Module>
                <Module
                    title="分页"
                >
                    <div style={{textAlign: 'center'}}>
                        <Pagination
                            type="mini"
                            total={this.state.total}
                            pageSize={9}
                            current={1}
                            showNum={6}
                            showProcess={true}
                            onChange={this.handlePaginationChange}
                        />
                    </div>
                    <Pagination
                        type="mini"
                        total={170}
                        pageSize={9}
                        current={1}
                        showNum={6}
                        showProcess={false}
                        onChange={this.handlePaginationChange}
                    />
                </Module>
                <Module
                    title="表单"
                >
                    <Input
                        style={{width: '300px'}}
                        type="text"
                        value={inputValue}
                        onChange={this.handleInputChange}
                        placeholder="简单的input标签"
                        autoFocus={true}
                        size="large"
                        onPressEnter={(value) => {console.log('enter input' + value)}}
                        disabled={false}
                        search={true}
                    />
                    <Input
                        type="text"
                        value={inputValue}
                        onChange={this.handleInputChange}
                        placeholder="简单的input标签"
                        autoFocus={true}
                        size="small"
                        onPressEnter={(value) => {console.log('enter input' + value)}}
                        disabled={false}
                        search={true}
                        onEnterSearch={(value) => {console.log('click search btn' + value)}}
                    />
                </Module>
            </div>
        )
    }
}