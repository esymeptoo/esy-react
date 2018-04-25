import React, { Component } from 'React';
import './Input.less';
import clx from 'classnames';
import omit from 'omit.js';

export interface commonInputProps {
    prefixCls?: string;
    className?: string;
    style?: React.CSSProperties;
    value?: any;
}

export interface InputProps extends commonInputProps {
    placeholder?: string;
    type?: string;
    name?: string;
    size?: 'large' | 'small' | 'mini';
    disabled?: boolean;
    onPressEnter?: React.FormEventHandler<HTMLInputElement>;
    onKeyDown?: React.FormEventHandler<HTMLInputElement>;
    onKeyUp?: React.FormEventHandler<HTMLInputElement>;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onClick?: React.FormEventHandler<HTMLInputElement>;
    onFocus?: React.FormEventHandler<HTMLInputElement>;
    onBlur?: React.FormEventHandler<HTMLInputElement>;
    autoFocus?: boolean;
    select?: boolean;
}

class Input extends Component<InputProps, any> {
    static defaultProps = {
        prefixCls: 'esy-input',
        type: 'text',
        disabled: false,
        size: 'small'
    };

    blur() {
        this.input.blur();
    }

    focus() {
        this.input.focus();
    }

    select() {
        this.input.select();
    }

    handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { onPressEnter, onKeyDown } = this.props;
        if (event.keyCode === 13 && onPressEnter) {
            onPressEnter(event);
        }
        if (onKeyDown) {
            onKeyDown(event);
        }
    };

    /*
    * 这里封装是为了直接返回event.target.value而不是event
    * */
    handleInputChange = (e) => {
        this.props.onChange && this.props.onChange(e.target.value);
    };

    componentDidMount() {
        const { autoFocus = false, select = false } = this.props;
        if (autoFocus) {
            this.focus();
        }

        if (select) {
            this.select();
        }
    }

    getSizeOfInput(size) {
        switch(size) {
            case 'mini':
                return 'mi';
            case 'small':
                return 'sm';
            case 'large':
                return 'lg';
            default:
                return 'sm';
        }
    }

    renderInput() {
        const {
            prefixCls,
            className = '',
            onPressEnter,
            size,
            disabled,
            onChange,
            ...rest
        } = this.props;

        //排除一些已经定义的属性
        const new_props = omit(this.props, [
            'onChange', 'onPressEnter', 'size', 'className', 'prefixCls'
        ]);
        return <input
            ref={(el) => { this.input = el }}
            className={clx(prefixCls, className, {
                [`${prefixCls}-${this.getSizeOfInput(size)}`]: size,
                [`${prefixCls}-${disabled}`]: disabled
            })}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleInputChange}
            {...new_props}
        />
    }

    render() {
        return this.renderInput()
    }
}


export default Input;