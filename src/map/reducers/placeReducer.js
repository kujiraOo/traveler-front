/* @flow */
'use strict'

import { List } from 'immutable'

import type { PlaceState } from '../types'
import type { MapAction } from '../actions'

function getDefaultState (): PlaceState {
  return {
    all: List()
  }
}

export default function placeReducer (
  state: PlaceState = getDefaultState(),
  action: MapAction
): PlaceState {
  switch (action.type) {
    case 'map-stop':
      return {
        ...getDefaultState()
      }

    case 'map-search-success':
      return {
        ...state,
        all: action.places
      }

    case 'map-place-select-success':
      return {
        ...state,
        selected: action.place
      }

    default:
      return state
  }
}
