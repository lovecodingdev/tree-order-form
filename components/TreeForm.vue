<template>
  <div class="tree-form">
    <div :style="indent" class="flex">
      <span v-if="!tree.file">&bull;</span>
      <input
        v-if="tree.file"
        :id="'check_' + tree.key"
        :checked="checked"
        type="checkbox"
        @click="onFileCheck"
      />
      <label
        class="cursor-pointer label"
        :for="'check_' + tree.key"
        @click="toggleChildren"
      >
        {{ tree.label }}
      </label>
      <div v-if="tree.lastFolder && showChildren">
        <input
          :id="'check_all_' + tree.key"
          type="checkbox"
          :checked="checkAll"
          @click="onCheckAll"
        />
        <label :for="'check_all_' + tree.key">Check All</label>
      </div>
      <font-awesome-icon v-if="tree.nodes" :icon="arrowIcon" class="icon" />
    </div>
    <div v-if="showChildren">
      <tree-form
        v-for="node in tree.nodes"
        :key="node.key"
        :tree="node"
        :depth="depth + 1"
        @changeFileCheck="changeFileCheck"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { File, Tree } from '~/utils/types'

export default defineComponent({
  name: 'TreeForm',
  props: ['tree', 'depth'],
  data() {
    return {
      showChildren: false,
      checkAll: false
    }
  },
  computed: {
    arrowIcon(): string {
      return this.showChildren ? 'angle-up' : 'angle-down'
    },
    indent(): Object {
      return { padding: `0 0 0 ${this.depth * 24}px` }
    },
    checkedFiles(): File[] {
      return this.$store.state.files.checkedFiles
    },
    checked(): boolean {
      let fIndex = this.checkedFiles.findIndex(
        (f) => f.path === this.tree.file.path
      )
      return fIndex !== -1
    }
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren
    },
    onCheckAll(event: Event) {
      let checked = (event.target as HTMLInputElement).checked
      let files = this.tree.nodes.map((node: Tree) => node.file)
      if (checked) {
        this.$store.commit('files/addFiles', files)
      } else {
        this.$store.commit('files/removeFiles', files)
      }
      this.checkAll = checked
    },
    onFileCheck() {
      this.$store.commit('files/toggle', this.tree.file)
      this.$emit('changeFileCheck')
    },
    changeFileCheck() {
      this.checkedAll()
    },
    checkedAll() {
      let checked = true
      for (const node of this.tree.nodes) {
        let fIndex = this.checkedFiles.findIndex(
          (f) => f.path === node.file.path
        )
        if (fIndex === -1) {
          checked = false
          break
        }
      }
      this.checkAll = checked
    }
  }
})
</script>

<style scoped>
.tree-form {
}
.cursor-pointer {
  cursor: pointer;
}
.flex {
  display: flex;
}
.label {
  flex: 1;
}
.icon {
  margin: auto 8px;
}
</style>
