import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
import './Select.less';
import OptGroup from './OptGroup';

import { esy_util as _ }from '../public/util';

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
    defaultValue?: SelectValue;
    onChange?: (value: SelectValue) => void;
}

export interface SelectState {
    /*是否正在被focus
    * 是就弹出optGroup
    * */
    focused?: boolean;
}

export default class Select extends Component<SelectProps, SelectState> {

    constructor(props) {
        super(props);
        this.state = {
            focused: false
        };
        this.clickHeader = this.clickHeader.bind(this);
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

    renderSelect() {
        const { defaultValue } = this.props;
        const { focused } = this.state;
        return (
            <div className="esy-select-value" onClick={this.clickHeader}>
                {defaultValue}
                <i className={clx('esy-select-position', {
                    [`esy-select-position-down`]: focused
                })}/>
            </div>
        )
    }

    renderOptionGroup() {
        const { children, size } = this.props;
        const { focused } = this.state;
        return <OptGroup size={size} className={clx({
            'esy-optGroup-focused': focused
        })}>
            {children}
        </OptGroup>
    }

    componentDidMount() {
        document.addEventListener('click', () => {
            this.setState({
                focused: false
            })
        })
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