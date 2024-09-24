import type { StackFrame } from 'error-stack-parser-es'

export interface RegExpObjectRepresentation {
  pattern: string
  flags: string
}

export interface SerializedRegExpInfo {
  regex: RegExpObjectRepresentation
  calls: SerializedRegExpCall[]
}

export interface SerializedRegExpCall {
  duration: number
  string?: string
  trace?: StackFrame[]
}

export interface RegRxpCall {
  duration: number
  string?: string
  traceObj: Error
}

export interface RegexpInfo {
  regex: RegExp
  calls: RegRxpCall[]
}

export interface RegexDoctorOptions {

}
