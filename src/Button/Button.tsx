/**
 * 按钮组件
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames'
import './Button.less'


export type ButtonType = 'default' | 'primary' | 'danger'

export interface ButtonProps {
    type?: ButtonType;
    style?: React.CSSProperties;
    className?: string,
    disabled?: boolean;
    onClick?: React.FormEventHandler<any>;
    onMouseEnter?: React.FormEventHandler<any>;
    onMouseLeave?: React.FormEventHandler<any>;
    label?: React.ReactHTML;
    prefixCls?: string;
}

export interface ButtonState {
    loading: boolean
}


export default class Button extends Component<ButtonProps, ButtonState> {
    static propTypes = {
        type: PropTypes.string,
        style: PropTypes.object,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        label: PropTypes.node,
        others: PropTypes.number
    };

    static defaultProps = {
        prefixCls: 'esy-btn',
        type: 'default',
        disabled: false
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentWillMount () {

    }

    render() {
        const { type, disabled, style, label, onClick, onMouseEnter, onMouseLeave, prefixCls, className } = this.props;
        const classes = clx(prefixCls, className, {
            [`${prefixCls}-${type}`]: type
        });

        return (
            <button
                className={classes}
                ref={el => { this.btnDom = el }}
                disabled={disabled}
                style={style}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {label}
            </button>
        )
    }
}