import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';

import {esy_util as _} from '../public/util';

export interface OptGroupProps {
    size?: string;
    prefixCls?: string;
    className?: string;
}
export default class OptGroup extends Component<OptGroupProps, any> {

    static propTypes = {
        size: PropTypes.string
    };
    static defaultProps = {
        size: 'small',
        prefixCls: 'esy-optGroup'
    };

    render() {
        const { children, prefixCls, size, className } = this.props;
        return <div className={clx(prefixCls, {
            [`${prefixCls}-${_.getSizeOfInput(size)}`]: size
        }, className)}>
            <ul>
                {children}
            </ul>
        </div>
    }
}