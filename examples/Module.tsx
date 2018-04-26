import React, { Component } from 'react';
import './Module.less';


interface ModuleProps {
    title?: string;
}

export default class Module extends Component<ModuleProps, any> {
    render() {
        const { title, children } = this.props;
        return (
            <div className="esy-module">
                <p>{title}</p>
                {
                    children ? children : null
                }
            </div>
        )
    }
}