// @flow
/* eslint-disable no-unused-vars */
'use strict'

import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Maps from 'material-ui/svg-icons/maps/map'
import Person from 'material-ui/svg-icons/social/person'
import Group from 'material-ui/svg-icons/social/group'
import AppBar from './AppBar'
import Sidebar from './Sidebar'
import Whatshot from 'material-ui/svg-icons/social/whatshot'
import MyDestinationIcon from 'material-ui/svg-icons/maps/place'
import SubscriptionIcon from 'material-ui/svg-icons/maps/local-activity'
import MatchIcon from 'material-ui/svg-icons/action/favorite'
import AddLocation from 'material-ui/svg-icons/maps/add-location'
import TextMessage from 'material-ui/svg-icons/communication/message'

import * as actionCreators from '../../profile/action-creators'

import type { AppState } from '../../types'

type NavigationState = {
  open: boolean,
  title: string
}
type NavigationProps = {
  username: string,
  useremail: string,
  avatarImg: number,
  children: any,
  actions: any
}
const optionGenerator = (
  label,
  leftIcon,
  callback,
  disabled,
  useSubheader,
  subheaderLabel,
  ...args
) => {
  return {
    label,
    leftIcon,
    onTouchTap: callback,
    disabled,
    subheader: useSubheader,
    subheaderLabel,
    subItems: args
  }
}

class Navigation extends Component {
  props: NavigationProps
  state: NavigationState

  constructor (props: any) {
    super(props)
    this.state = { open: false, title: 'Travel Mate Finder' }

    props.actions.loadProfile.loadProfileInfo()
  }

  handleToggle = () => this.setState((prev, props) => { return {open: !(prev.open)} })
  handleClose = () => this.setState({open: false})

  render () {
    const {
      username,
      useremail,
      avatarImg
    } = this.props

    return (
      <div>
        <AppBar
          title={this.state.title}
          menuIconCallback={this.handleToggle}
          signout={() => { alert('You signed out!') }}
        />
        <Sidebar
          open={this.state.open}
          onRequestChange={this.handleToggle}
          username={username}
          useremail={useremail}
          avatarImg={avatarImg}
          items={[ // static links, using hardcoded value
            optionGenerator(
              'Browse Trip',
              <Maps />,
              () => { console.log('write your navigation function here!') },
              false,
              true,
              'Explore',
              optionGenerator('Solo trips', <Person />, () => { console.log('write your navigation function here') }, false),
              optionGenerator('Group trips', <Group />, () => console.log('write your navigation function here'), true)
            ),
            optionGenerator(`What's hot`, <Whatshot />, () => {}, true),
            optionGenerator('My destinations', <MyDestinationIcon />, () => {}, false, true, 'My travel'),
            optionGenerator('Plan a trip', <AddLocation />, () => {}, false),
            optionGenerator('My subscription', <SubscriptionIcon />, () => {}, false),
            optionGenerator('Matches', <MatchIcon />, () => {}, false),
            optionGenerator('Messages', <TextMessage />, () => {}, false, true, 'Contacts')
          ]}
        />
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state: AppState) {
  return {
    username: state.profile.profile.username,
    useremail: state.profile.profile.email,
    avatarImg: state.profile.profile.photos.first()
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      loadProfile: bindActionCreators(actionCreators.profileLoad, dispatch)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
