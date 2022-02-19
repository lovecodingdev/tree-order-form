<template>
  <div class="tree-form">
    <div :style="indent" @click="toggleChildren">{{ label }}</div>
    <div v-if="showChildren">
      <tree-form
        v-for="node in nodes"
        :key="node.label"
        :nodes="node.nodes"
        :label="node.label"
        :depth="depth + 1"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TreeForm',
  props: ['label', 'nodes', 'depth'],
  data() {
    return { showChildren: false }
  },
  computed: {
    indent(): Object {
      return { transform: `translate(${this.depth * 50}px)` }
    }
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren
    }
  }
})
</script>
