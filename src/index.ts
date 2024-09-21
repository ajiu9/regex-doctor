/* eslint-disable ts/explicit-function-return-type */
/* eslint-disable ts/no-unsafe-function-type */
/* eslint-disable no-extend-native */

import fs from 'node:fs/promises'
import { parse } from 'error-stack-parser-es'
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

export class RegexDoctor {
  map = new Map<RegExp, RegexpInfo>()

  constructor(public options?: RegexDoctorOptions) {}

  stop(): void {
    // Implemention will be replaced by start
  }

  start() {
    this.stop()

    const map = this.map
    const _exec = RegExp.prototype.exec

    // To avoid infinite recursion
    let tracing = true
    RegExp.prototype.exec = function (string) {
      if (!tracing)
        return _exec.call(this, string)

      tracing = false
      try {
        if (!map.has(this)) {
          map.set(this, {
            regex: this,
            calls: [],
          })
        }
        const info = map.get(this)!
        const start = performance.now()
        const result = _exec.call(this, string)
        const end = performance.now()
        const duration = end - start

        info.calls.push({
          traceObj: new Error(),
          string,
          duration,
        })

        return result
      }

      finally {
        tracing = true
      }
    }

    this.stop = () => {
      RegExp.prototype.exec = _exec
      this.stop = () => {}
    }

    /**
     * You can use the `using` syntax to automatically stop the tracing when the object is disposed.
     *
     * @see https://github.com/tc39/proposal-explicit-resource-management
     * @example
     * ```ts
     * {
     *   using _ = doctor.start()
     *   await import('./foo)
     * }
     */
    return {
      [Symbol.dispose]: () => {
        this.stop()
      },
    }
  }

  /**
   * Allow auto disposal the instance
   */
  [Symbol.dispose]() {
    this.stop()
    this.clear()
  }

  async run(fn: Function) {
    this.start()
    try {
      return await fn()
    }
    finally {
      this.stop()
    }
  }

  clear(): void {
    this.map.clear()
  }

  dump(): SerializedRegExpInfo[] {
    return Array.from(this.map.values()).map((info): SerializedRegExpInfo => {
      return {
        regex: {
          pattern: info.regex.source,
          flags: info.regex.flags,
        },
        calls: info.calls.map((call): SerializedRegExpCall => {
          return {
            duration: call.duration,
            string: call.string,
            trace: call.traceObj
              ? parse(call.traceObj)
                .slice(1)
                .filter(frame => !frame.fileName?.startsWith('node:'))
                .map((frame) => {
                  delete frame.source
                  return frame
                })
              : undefined,
          }
        }),
      }
    })
  }
}

export function startRegexDoctor() {
  const doctor = new RegexDoctor()
  doctor.start()
  return doctor
}
