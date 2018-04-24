/**
 * 按钮组件
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames'
import './Button.less'

import Ripple from '../hUI-ripple'


export type ButtonType = 'default' | 'primary' | 'danger'

export interface ButtonProps {
    type?: ButtonType;
    style?: React.CSSProperties;
    className?: string,
    disabled?: boolean;
    onClick?: React.FormEventHandler<any>;
    onMouseEnter?: React.FormEventHandler<any>;
    onMouseLeave?: React.FormEventHandler<any>;
    label?: string | React.ReactNode;
    prefixCls?: string;
    size?: Size;
}

export interface ButtonState {
    loading?: boolean
}

export type Size = 'mini' | 'small' | 'large'


export default class Button extends Component<ButtonProps, ButtonState> {
    static propTypes = {
        type: PropTypes.string,
        style: PropTypes.object,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        others: PropTypes.number,
        size: PropTypes.string
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

    componentDidMount () {
        if (this.domEl) {
            new Ripple(this.domEl, {
                dimBackground: false,
            });
        }
    }

    render() {
        const { type,
            disabled,
            style,
            label,
            onClick,
            onMouseEnter,
            onMouseLeave,
            prefixCls,
            className,
            size } = this.props;

        let sizeCli = '';

        switch(size) {
            case 'mini':
                sizeCli = 'mi';
                break;
            case 'small':
                sizeCli = 'sm';
                break;
            case 'large':
                sizeCli = 'lg';
                break;
            default:
                sizeCli = 'sm'
        }

        const classes = clx(prefixCls, className, {
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${sizeCli}`]: sizeCli
        });

        return (
            <button
                className={classes}
                ref={el => { this.domEl = el }}
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