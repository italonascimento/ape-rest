import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'
import onionify from 'cycle-onionify'
import {App} from './app/app'
import {makeHistoryDriver, captureClicks} from '@cycle/history'

const wrappedMain = onionify(App)

const drivers = {
  DOM: makeDOMDriver('#app'),
  history: captureClicks(makeHistoryDriver())
}

run(wrappedMain, drivers)
