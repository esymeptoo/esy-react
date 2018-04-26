import React, { Component } from 'React';
import PropTypes from 'prop-types';
import './Input.less';
import clx from 'classnames';
import omit from 'omit.js';

import Button from '../Button/Button';

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
    search?: boolean;
    onEnterSearch?: (value: string) => any;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
}

class Input extends Component<InputProps, any> {

    static propTypes = {
        placeholder: PropTypes.string,
        type: PropTypes.string,
        size: PropTypes.oneOf(['mini', 'small', 'large']),
        disabled: PropTypes.bool,
        onPressEnter: PropTypes.func,
        onKeyDown: PropTypes.func,
        onKeyUp: PropTypes.func,
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        autoFocus: PropTypes.bool,
        select: PropTypes.bool,
        search: PropTypes.bool,
        onEnterSearch: PropTypes.func,
        addonBefore: PropTypes.node,
        addonAfter: PropTypes.node
    };

    static defaultProps = {
        prefixCls: 'esy-input',
        type: 'text',
        disabled: false,
        size: 'small',
        /*默认不支持搜索*/
        search: false
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
            onPressEnter(event.target.value);
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

    handleSearch = () => {
        this.props.onEnterSearch && this.props.onEnterSearch(this.input.value);
    };

    /*当需要icon或者search的时候 先render一层span 进行布局
    * 当前的栗子是搜索 以后会补全icon等情况  prefix和suffix情况
    * */
    renderOuter(children) {
        const { search } = this.props;

        if (!search) {
            return children;
        }
        return (
            <span
                className="esy-input-outer"
                onClick={this.handleSearch}
            >
                {children}
                {
                    <Button className="esy-input-right" label="查询" type="primary" style={{padding: '0 14px'}}/>
                }
            </span>
        )
    }

    renderInputLabel(children: React.ReactHTMLElement<any>) {
        const { addonBefore, addonAfter } = this.props;

    }

    renderInput() {
        const {
            prefixCls,
            className = '',
            size,
            disabled,
        } = this.props;

        //排除一些已经定义的属性
        const new_props = omit(this.props, [
            'onChange', 'onPressEnter', 'size', 'className', 'prefixCls', 'onEnterSearch', 'search'
        ]);
        return <input
            ref={(el) => { this.input = el }}
            className={clx(prefixCls, className, {
                [`${prefixCls}-disabled`]: disabled,
                [`${prefixCls}-${this.getSizeOfInput(size)}`]: size
            })}
            onKeyDown={this.handleKeyDown}
            onChange={this.handleInputChange}
            {...new_props}
        />
    }

    render() {
        return this.renderOuter(this.renderInput())
    }
}


export default Input;