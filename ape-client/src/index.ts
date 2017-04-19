import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'
import onionify from 'cycle-onionify'
import {App} from './app/App'

const wrappedMain = onionify(App)

const drivers = {
  dom: makeDOMDriver('#app')
}

run(wrappedMain, drivers)
