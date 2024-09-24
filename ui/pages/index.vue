<script setup lang="ts">
import type { SerializedRegExpInfo } from '../../src'
const data = await $fetch('/api/payload') as SerializedRegExpInfo[]
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
       1
      </DataField>
      <DataField title="Regex instances">
      2
      </DataField>
      <DataField title="Regexes with details">
       3
      </DataField>
      <DataField title="Total regex execution time">
        4
      </DataField>
      <DataField title="Total time of the process">
        5
      </DataField>
    </div>
    <div v-for="item, idx of data" :key="idx">
      <code>/{{ item.regex.pattern }}/{{ item.regex.flags }}</code>
      <div>{{ item.calls.length }}</div>
    </div>
  </div>
 
</template>
