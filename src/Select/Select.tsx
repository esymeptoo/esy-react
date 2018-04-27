import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
import './Select.less';
import OptGroup from './OptGroup';

import { esy_util as _ }from '../public/util';
import * as _ from 'lodash';

export interface CommonSelectProps {
    prefixCls?: string;
    className?: string;
    size?: 'mini' | 'small' | 'large';
    disabled?: boolean;
    style?: React.CSSProperties;
    placeholder?: string;
}

export interface LabelValue {
    label: string;
    value: string;
}

export type SelectValue = string | any[] | LabelValue | LabelValue[];

export interface SelectProps extends CommonSelectProps{
    defaultValue?: string;
    onChange?: (value: string, label: string) => void;
}

export interface SelectState {
    /*是否正在被focus
    * 是就弹出optGroup
    * */
    focused?: boolean;
    value?: string;
}

export default class Select extends Component<SelectProps, SelectState> {

    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            value: this.props.defaultValue || ''
        };
        this.clickHeader = this.clickHeader.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        size: PropTypes.oneOf(['mini', 'small', 'large']),
        disabled: PropTypes.bool,
        style: PropTypes.object
    };

    static defaultProps = {
        prefixCls: 'esy-select',
        disabled: false,
        placeholder: '请选择',
        size: 'small',
        defaultValue: ''
    };

    clickHeader(e) {
        this.setState({
            focused: true
        });
        e.nativeEvent.stopImmediatePropagation()
    }

    changeValue(value, label) {
        this.setState({
            value: value,
            focused: false
        }, () => {
            // this.props.onChange && this.props.onChange(value, label);
            if (this.props.onChange) {
                this.props.onChange(value, label);
            } else {
                console.log('you should register onChange function')
            }
        });
    }

    changeFocus(value) {
        this.setState({
            focused: value
        })
    }

    renderSelect() {
        const { defaultValue } = this.props;
        const targetSelectObj = this.props.children.find(item => {
            return item.props.label === defaultValue
        });
        const { focused } = this.state;
        return (
            <div className="esy-select-value" onClick={this.clickHeader}>
                {
                    targetSelectObj ? targetSelectObj.props.children : ''
                    // defaultValue
                }
                <i className={clx('esy-select-position', {
                    [`esy-select-position-down`]: focused
                })}/>
            </div>
        )
    }

    renderOptionGroup() {
        const { children, size } = this.props;
        const { focused, value } = this.state;
        return <OptGroup size={size} className={clx({
            'esy-optGroup-focused': focused
        })} value={value} changeValue={this.changeValue} changeFocus={this.changeFocus}>
            {children}
        </OptGroup>
    }

    componentDidMount() {
        //事件冒泡使下拉框消失
        document.addEventListener('click', () => {
            this.setState({
                focused: false
            })
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultValue !== this.state.value) {
            this.setState({
                value: nextProps.defaultValue
            })
        } else {
            console.log('no need to update')
        }
    }

    render() {
        const {
            className,
            prefixCls,
            size
        } = this.props;
        const { focused } = this.state;
        return (
            <div className={clx(prefixCls, {
                [`${prefixCls}-${_.getSizeOfInput(size)}`]: size,
                [`${prefixCls}-focused`]: focused
            }, className)}>
                {
                    this.renderSelect()
                }
                {
                    this.renderOptionGroup()
                }
            </div>
        )
    }
}