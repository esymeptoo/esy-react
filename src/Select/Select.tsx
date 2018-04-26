import React, { Component } from 'react';

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

export interface SelectProps {
    value?: SelectValue;
    defaultValue?: SelectValue;
    onChange?: (value: SelectValue) => void;
}

export default class Select extends Component<SelectProps, any> {

}