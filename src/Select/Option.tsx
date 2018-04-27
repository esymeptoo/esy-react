import React, { Component } from 'react';

export interface OptionProps {
    label?: string;
    prefixCls?: string;
    active?: boolean;
    changeValue?: (value: string) => void;
    changeFocus?: (value: boolean) => void;
}

export default class Option extends Component<OptionProps, any> {

    static defaultProps = {
        prefixCls: 'esy-option',
        active: false
    };

    constructor(props) {
        super(props);
    }
    _changeValue(e, value) {
        e.nativeEvent.stopImmediatePropagation();
        this.props.changeValue && this.props.changeValue(value);
    }

    render() {
        const { children, active, prefixCls } = this.props;
        return <li className={active ? `${prefixCls}-active` : ''} onClick={(e) => { this._changeValue(e, children) }}>{children}</li>
    }
}