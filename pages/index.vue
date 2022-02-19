<template>
  <div>
    <div>Hello World!</div>
    <tree-form :label="tree.label" :nodes="tree.nodes" :depth="0" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TreeForm from '~/components/TreeForm.vue'
let tree = {
  label: 'root',
  nodes: [
    {
      label: 'item1',
      nodes: [
        {
          label: 'item1.1'
        },
        {
          label: 'item1.2',
          nodes: [
            {
              label: 'item1.2.1'
            }
          ]
        }
      ]
    },
    {
      label: 'item2'
    }
  ]
}

export default defineComponent({
  components: { TreeForm },
  data: () => ({
    files: [],
    tree
  }),
  async fetch() {
    this.files = await fetch(`${window.location.href}/files.json`).then((res) =>
      res.json()
    )
  }
})
</script>

<style scoped></style>
