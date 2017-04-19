import {VNode} from '@cycle/dom'
import {DOMSource} from '@cycle/dom'
import {StateSource, MainFn} from 'cycle-onionify'
import { Stream } from 'xstream'

export declare type Reducer = (prev?: State) => State | undefined;

export declare interface State {

}

export declare interface Sources {
  dom: DOMSource
  onion: StateSource<State>
}

export declare interface Sinks {
  dom: Stream<VNode>
  onion: Stream<Reducer>
}
