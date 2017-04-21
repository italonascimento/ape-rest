import {DOMSource, VNode, p, div} from '@cycle/dom'
import {StateSource} from 'cycle-onionify'
import xs from 'xstream'
import {Stream, MemoryStream} from 'xstream'
import {PushHistoryInput, GenericInput} from '@cycle/history'
import {routes, Route} from './router'
import * as _ from 'lodash'

export interface State {
  currentPage: string
}

export interface Sources {
  DOM: DOMSource
  onion: StateSource<State>
  history: Stream<GenericInput>
}

export interface Sinks {
  dom: Stream<VNode>
}

export function App(sources: Sources): Partial<Sinks> {

  const history$ = sources.history
  const vdom$ = view(history$)

  const sinks: Partial<Sinks> = {
    dom: vdom$,
  }

  return sinks
}

function view(history: Stream<GenericInput>): Stream<VNode> {
  return history.map(history =>
    div('.main-content', [
      currentPage(history)
    ])
  )
}

function currentPage(history: GenericInput): VNode {
  const node = _.find(routes, (route: Route) => route.path === history.pathname)
  return node ? node.view : null
}
