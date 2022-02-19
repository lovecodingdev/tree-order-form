<template>
  <div class="page">
    <tree-form :tree="tree" :depth="0" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TreeForm from '~/components/TreeForm.vue'

interface File {
  path: string
  url: string
  size: string
}

interface Tree {
  label: string
  nodes?: Tree[]
  lastFolder?: boolean
  file?: File
  key: string
}

export default defineComponent({
  components: { TreeForm },
  data: () => ({
    files: [] as File[],
    tree: {} as Tree
  }),
  async fetch() {
    this.files = await fetch(`${window.location.href}/files.json`).then((res) =>
      res.json()
    )
    let tree = [] as Tree[]
    for (const file of this.files) {
      let segments = file.path.split('/')
      let fileName = segments.pop()
      let treeFile = tree
      let key = ''
      segments.forEach((seg, segIndex) => {
        key = key === '' ? seg : key + '-' + seg
        let node = treeFile.find((node) => node.label === seg)
        if (!node) {
          treeFile.push({
            label: seg,
            nodes: [],
            lastFolder: segIndex === segments.length - 1,
            key
          })
          node = treeFile[treeFile.length - 1]
        }
        treeFile = node.nodes || []
      })
      treeFile.push({
        label: `${fileName} (${file.size})`,
        file,
        key: key + '-' + fileName
      })
    }
    console.log(tree)
    this.tree = tree[0]
  }
})
</script>

<style scoped>
.page {
  padding: 48px;
}
</style>
