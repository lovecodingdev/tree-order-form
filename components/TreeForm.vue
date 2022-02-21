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
      <div v-if="tree.lastFolder">
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
        :checked="checkedFiles.includes(node.key)"
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
  props: ['tree', 'depth', 'checked'],
  data() {
    return {
      showChildren: false,
      checkAll: false,
      checkedFiles: [] as string[]
    }
  },
  computed: {
    arrowIcon(): string {
      return this.showChildren ? 'angle-up' : 'angle-down'
    },
    indent(): Object {
      return { padding: `0 0 0 ${this.depth * 24}px` }
    }
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren
    },
    onCheckAll(event: Event) {
      let checked = (event.target as HTMLInputElement).checked
      if (checked) {
        this.checkedFiles = this.tree.nodes.map(
          (node: { key: string }) => node.key
        )
      } else {
        this.checkedFiles = []
      }
      this.checkAll = checked
    },
    onFileCheck(event: Event) {
      let checked = (event.target as HTMLInputElement).checked
      this.$emit('changeFileCheck', this.tree.key, checked)
      this.$store.commit('files/toggle', this.tree.file)
      console.log(this.$store.state)
    },
    changeFileCheck(key: string, checked: boolean) {
      let index = this.checkedFiles.indexOf(key)
      if (index === -1 && checked) {
        this.checkedFiles.push(key)
      }
      if (index !== -1 && !checked) {
        this.checkedFiles.splice(index, 1)
      }
      this.checkedAll()
    },
    checkedAll() {
      let checked = true
      for (const node of this.tree.nodes) {
        if (!this.checkedFiles.includes(node.key)) {
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
  width: 960px;
  background: #dee9f7;
  margin: auto;
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
