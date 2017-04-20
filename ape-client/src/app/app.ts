import {DOMSource, VNode, p, div} from '@cycle/dom'
import {StateSource} from 'cycle-onionify'
import xs from 'xstream'
import {Stream, MemoryStream} from 'xstream'
import {PushHistoryInput, GenericInput} from '@cycle/history'
import {routes} from './router'

export interface State {
  currentPage: string
}

export type Reducer = (prev?: State) => State | undefined;

export type Navigate = {

}

export type Action = Stream<Navigate>

export interface Sources {
  DOM: DOMSource
  onion: StateSource<State>
  history: Stream<GenericInput>
}

export interface Sinks {
  dom: Stream<VNode>
  onion: Stream<Reducer>
}

export function App(sources: Sources): Partial<Sinks> {

  const state$ = sources.onion.state$
  const action$ = intent(sources)
  const reducer$ = model(action$)
  const vdom$ = view(state$)

  const sinks: Sinks = {
    dom: vdom$,
    onion: reducer$
  }

  return sinks
}

function intent(sources: Sources): Action {
  const history$ = sources.history
}

function model(action: Action): Stream<Reducer> {

}

function view(state: MemoryStream<State>): Stream<VNode> {
  return state.map(state =>
    div('.main-content', [
      currentPage(state.currentPage)
    ])
  )
}

function currentPage(name: string): VNode {
  return routes[name].view
}
