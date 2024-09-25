<script setup lang="ts">
import type { SerializedRegExpInfo } from '../../src'
const payload = await $fetch('/api/payload') as SerializedRegExpInfo[]
import { version } from '../../package.json'

</script>

<template>
  <div h-full flex="~ col">
    <div p4 border="b base rounded">
      <div>
        <span font-bold>Regex</span><span font-100>Doctor</span> <sup op50>v{{ version }}</sup>
      </div>
    </div>
    <div p4 border="b base rounded" grid="~ cols-8">
      <DataField title="Unique regexes">
        <NumberDisplay :number="10000" />
      </DataField>
      <DataField title="Regex instances">
        <NumberDisplay :number="100" />
      </DataField>
      <DataField title="Regexes with details">
        <NumberDisplay :number="100" />
      </DataField>
      <DataField title="Total regex execution time">
        <NumberDisplay :number="100" />
      </DataField>
      <DataField title="Total time of the process">
        <NumberDisplay :number="100" />
      </DataField>
    </div>
    <div v-for="item, idx of payload" :key="idx">
      <code>/{{ item.regex.pattern }}/{{ item.regex.flags }}</code>
      <div>{{ item.calls.length }}</div>
    </div>
  </div>
 
</template>
