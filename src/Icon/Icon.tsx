/**
 * 图标组件
 * */
import React from 'react';
import clx from 'classnames';
import './Icon.less';

interface IconProps {
    type?: string;
    style?: React.CSSProperties;
    className?: string;
    onClick?: React.MouseEventHandler<any>;
    width?: string;
    height?: string;
    size?: string;
}

const Icon = (props: IconProps) => {
    const {
        type,
        className = '',
        size = 'small',
        width = 16,
        height = 16,
        style = {},
        ...rest,
    } = props;

    const classes = clx('esy-icon', {
        [`esy-icon-${type}`]: type,
        // [`esy-icon-${size}`]: size
    }, className);


    return <i
        style={{
            width: width,
            height: height,
            backgroundSize: `${width}px ${height}px`,
            ...style
        }}
        {...rest}
        className={classes}
    />
};

export default Icon;