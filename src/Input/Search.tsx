import React, { Component } from 'react';
import Input, { InputProps } from './Input';

export interface SearchProps extends InputProps {
    searchPrefixCls?: string;
    onSearch?: (value: any) => any;
    enterButton?: boolean | React.ReactNode;
}

export default class Search extends Component<SearchProps, any> {
    static defaultProps = {
        searchPrefixCls: 'esy-input-search'
    }
}