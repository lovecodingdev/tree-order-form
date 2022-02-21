<template>
  <div class="downloader">
    <h2>Download System</h2>
    <tree-form :tree="tree" :depth="0" />
    <button class="download-button" @click="onDownload">Download</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import TreeForm from '~/components/TreeForm.vue'
import { File, Tree } from '~/utils/types'

export default defineComponent({
  name: 'Downloader',
  components: { TreeForm },
  props: ['files'],
  data() {
    return {
      tree: {} as Tree
    }
  },
  computed: {},
  watch: {
    files(newVal, oldVal) {
      this.getTreeData()
    }
  },
  methods: {
    getTreeData() {
      let tree = [] as Tree[]
      for (const file of this.files as File[]) {
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
    },
    onDownload() {
      confirm('Are you sure to download the files?')
      console.log(this.$store.state.files.checkedFiles)
    }
  }
})
</script>

<style scoped>
.downloader {
  width: 960px;
  margin: auto;
}
.download-button {
  position: fixed;
  right: calc((100% - 960px) / 2);
  top: 72px;
  background-color: #708edd;
  color: white;
  border-radius: 4px;
}
</style>
