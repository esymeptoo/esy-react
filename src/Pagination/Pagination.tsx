import React, { Component } from 'react';
import MiniPagination from './MiniPagination';
import NormalPagination from './NormalPagination';
import './Pagination.less';

import clx from 'classnames';

export type PaginationType = 'mini' | 'normal';

export interface PaginationProps {
    /*
    * 控件类型
    * */
    type: PaginationType;
    size?: string;
    total?: number;
    defaultCurrent?: number;
    /*
    * 当前位置
    * */
    current?: number;
    /*
    * 每页数量
    * */
    pageSize?: number;
    /*
    * 页码change事件
    * */
    onChange?: (page: number, pageSize?: number) => void;
    /*
    * 是否展示快速跳转控件
    * */
    showQuickJumper?: boolean;
    quickJumpText?: string;
    showTotal?: boolean;
    className?: string;
    /*
    * 显示的页数  比如总共10页 只需展示5页 剩余5页就需要手动翻
    * */
    showNum?: number;
    prefixCli?: string;
}

export interface PaginationState {
    leftDisabled?: boolean;
    rightDisabled?: boolean;
}

export default class Pagination extends Component<PaginationProps, PaginationState> {
    static defaultProps = {
        prefixCli: 'esy-pagination',
        /*
        * 默认每页10条数据
        * */
        pageSize: 10,
        showNum: 5,
        /*
        * 当前页数
        * */
        current: 1,
        /*
        * 默认显示快速跳转
        * */
        quickJumpText: true
    };

    constructor(props) {
        super(props);
        this.state = {
            leftDisabled: false,
            rightDisabled: false
        }
    }

    renderLeft() {
        return (
            <li className="esy-pagination-left">
                <a>{'<'}</a>
            </li>
        )
    }

    renderRight() {
        return (
            <li className="esy-pagination-right">
                <a>{'>'}</a>
            </li>
        )
    }

    renderMini(arrayPage, total, pageSize) {
        console.log(arrayPage, total, pageSize);
        const { current, prefixCli } = this.props;
        /*计算当前应该展示的页面数组*/
        return (
            <ul>
                {
                    this.renderLeft()
                }
                {
                    arrayPage.map((page, index) => {
                        return (
                            <li key={index} className={clx(prefixCli, {
                                [`${prefixCli}-active`]: (index + 1 === current)
                            })}>
                                {page}
                            </li>
                        )
                    })
                }
                {
                    this.renderRight()
                }
            </ul>
        )
    }

    renderNormal() {

    }

    renderMiniPagination () {
        const { total, pageSize } = this.props;
        /*计算总页数*/
        const pageTotal = Math.ceil(total / pageSize);
        const arrayPage = Array.apply(Array, Array(pageTotal)).map((v,k) => k + 1);
        return (
            <div className="esy-pagination-mini">
                {
                    arrayPage.length > 0 ? this.renderMini(arrayPage, total, pageSize) : null
                }
            </div>
        )
    }

    renderNormalPagination() {

    }

    render() {
        const {
            type = 'mini',
        } = this.props;
        return (
            <div className="esy-pagination">
                {
                    type == 'mini' ? this.renderMiniPagination() : this.renderNormalPagination()
                }
            </div>
        )
    }
}