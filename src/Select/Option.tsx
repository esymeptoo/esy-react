import React, { Component } from 'react';

export interface OptionProps {
    label?: string;
    prefixCls?: string;
    active?: boolean;
}

export default class Option extends Component<OptionProps, any> {

    static defaultProps = {
        prefixCls: 'esy-option',
        active: false
    };

    render() {
        const { children, label, active, prefixCls } = this.props;
        return <li className={active ? `${prefixCls}-active` : ''}>{children}</li>
    }
}