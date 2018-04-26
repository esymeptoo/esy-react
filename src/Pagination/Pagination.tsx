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
    style?: React.CSSProperties;
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
    onChange?: (payload: ChangePage, event) => void;
    /*
    * 是否展示快速跳转控件
    * */
    showQuickJumper?: boolean;
    /*
    * 是否展示当前页数/总页数
    * */
    showProcess?: boolean;
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
    current?: number;
    totalPage?: number;
}

export interface ChangePage {
    page: number;
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
        quickJumpText: true,
        showProcess: false,
        total: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            current: this.props.current,
            totalPage: Math.ceil(this.props.total / this.props.pageSize)
        };
        this.clickLeftBtn = this.clickLeftBtn.bind(this);
        this.updateActivePage = this.updateActivePage.bind(this);
    }

    updateActivePage(page, event) {
        const { current } = this.state;
        if (page === current) {
            return;
        }
        this.setState({
            current: page
        }, () => {
            this.props.onChange && this.props.onChange(page, event)
        });
    }

    clickLeftBtn(event) {
        const {current} = this.state;
        if (current !== 1) {
            this.updateActivePage(current - 1, event)
        }
    }

    clickRightBtn(arrayPage, event) {
        const {current} = this.state;
        if (current !== arrayPage.length) {
            this.updateActivePage(current + 1, event)
        }
    }

    clickSingleBtn(page, event) {
        this.updateActivePage(page, event)
    }

    /*
    * 渲染miniPagination组件基础样式
    * */
    renderMini(arrayPage) {
        const { prefixCli, showNum } = this.props;
        const { current } = this.state;
        /*计算当前应该展示的页面数组*/
        // 例如: [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11]]
        let needPageNum = [];
        arrayPage.forEach((item, index) => {
            if (index % showNum === 0) {
                needPageNum[(Math.floor(index/showNum))] = [];
            }
            needPageNum[(Math.floor(index/showNum))].push(item);
        });
        return (
            <ul>
                {
                    <li className={clx('esy-pagination-left', {
                        [`${prefixCli}-disabled`]: current === 1
                    })} onClick={this.clickLeftBtn}>
                        <a/>
                    </li>
                }
                {
                    needPageNum[Math.floor((current - 1) / showNum)].map((page, index) => {
                        return (
                            <li key={index} className={clx(prefixCli, {
                                [`${prefixCli}-active`]: page === current
                            })} onClick={() => {this.clickSingleBtn(page, event)}}>
                                <a>{page}</a>
                            </li>
                        )
                    })
                }
                {
                    <li className={clx('esy-pagination-right', {
                        [`${prefixCli}-disabled`]: current === arrayPage.length
                    })} onClick={(e) => {this.clickRightBtn(arrayPage, e)}}>
                        <a/>
                    </li>
                }
            </ul>
        )
    }

    /*
    * 渲染normalPagination组件基础样式
    * _todo
    * */
    renderNormal() {

    }

    renderMiniPagination () {
        const { totalPage: pageTotal } = this.state;
        /*计算总页数*/
        const arrayPage = Array.apply(Array, Array(pageTotal)).map((v,k) => k + 1);
        return (
            <div className="esy-pagination-mini">
                {
                    arrayPage.length > 0 ? this.renderMini(arrayPage) : null
                }
            </div>
        )
    }

    renderNormalPagination() {

    }

    /*判断组件外动态改变current的情况
    * 外界改变了total值导致
    * */
    componentWillReceiveProps(nextProps) {
        const { current = 1, totalPage, total, pageSize } = nextProps;
        if ((current !== this.state.current && current <= this.state.totalPage && current >= 1) || (Math.ceil(total / pageSize) !== totalPage)) {
            this.setState({
                current: nextProps.current,
                totalPage: Math.ceil(total / pageSize)
            })
        }
    }

    render() {
        const {
            type = 'mini',
            total,
            pageSize,
            showProcess = false,
            style = {}
        } = this.props;
        const { current, totalPage: pageTotal } = this.state;
        return (
            <div className="esy-pagination" style={style}>
                {
                    showProcess ? <span>{ current + ' / ' + pageTotal}</span> : null
                }
                {
                    type == 'mini' ? this.renderMiniPagination() : this.renderNormalPagination()
                }
            </div>
        )
    }
}