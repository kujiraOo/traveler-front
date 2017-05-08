/* @flow */
'use strict'

import React from 'react'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { Link } from 'react-router'

import { PersonalCard } from '../../card-queue/components'

import type {
  PersonalCard as PersonalCardType,
  GroupCard
} from '../../core/types'

type OwnCardViewProps = {
  card: PersonalCardType | GroupCard | null,
  locationName: string,
  onRequestClose?: () => void
}

export default function OwnCardView ({
  card,
  locationName,
  onRequestClose = () => {}
}: OwnCardViewProps) {
  const buttons = [
    <FlatButton
      label='Ok'
      primary
      onTouchTap={onRequestClose}
    />,
    <Link to='/card-queue'>
      <FlatButton
        label='Match'
        primary
      />
    </Link>
  ]

  return card === null
  ? null
  : (
    <div>
      <Dialog
        title={card.title}
        actions={buttons}
        modal={false}
        open
        autoScrollBodyContent
        bodyStyle={{
          padding: 0
        }}
        onRequestClose={onRequestClose}
      >
        <PersonalCard
          styles={{
            margin: 0,
            padding: 0,
            width: '100%',
            maxWidth: '100%'
          }}
          username={card.owner.username}
          userImage={card.owner.photos.first()}
          cardTitle={card.title}
          tripStart={card.startTime}
          tripEnd={card.endTime}
          location={{ lat: card.lat, lon: card.lon }}
          images={card.photos}
          cardText={card.description}
          locationName={locationName} />
      </Dialog>
    </div>
  )
}
