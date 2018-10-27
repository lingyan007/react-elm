import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './header.scss'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { is, fromJS } from 'immutable';  // 保证数据的不可变
import {resetUserInfo} from '@/store/user/action'


class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    signUp: PropTypes.bool,
    goBack: PropTypes.func,
    edit: PropTypes.func,
    userInfo: PropTypes.object.isRequired,
  }
  state = {
    userInfo: false,
    headTitle: '首页'
  }
  handleBack = () => {
    console.log(this.props.history)
    this.props.goBack()
  }
  handleEdit = () => {
    this.props.edit()
  }
  shouldComponentUpdate(nextProps, nextState) {   // 判断是否要更新render, return true 更新  return false不更新
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }
  render () {
    return (
      <header className="header-container">
        {this.props.goBack&&<div className="icon-back header-back" onClick={this.handleBack}></div>}
        <div className="header-title">{this.props.title}</div>
        {this.props.signUp?(this.state.userInfo ? <span className='icon-account user-avatar'></span>
        : <span>登录|注册</span>):''}
        {this.props.edit&&<div onClick={this.handleEdit} className='user-avatar'>
        {this.props.userInfo.operate==='edit'?'编辑':'完成'}</div>}
      </header>
    )
  }
}

export default connect(state => ({
  userInfo: state.userInfo
}), {
})(Header)