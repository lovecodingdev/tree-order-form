<template>
  <div class="tree-form">
    <div :style="indent" class="cursor-pointer flex">
      <input v-if="tree.file" type="checkbox" :checked="checked" />
      <span v-if="!tree.file">&bull;</span>
      <span class="label" @click="toggleChildren">{{ tree.label }}</span>
      <div v-if="tree.lastFolder" class="right">
        <input
          :id="'check_all_' + tree.key"
          v-model="checkAll"
          type="checkbox"
          @click="toggleCheck"
        />
        <label :for="'check_all_' + tree.key">Check All</label>
      </div>
    </div>
    <div v-if="showChildren">
      <tree-form
        v-for="node in tree.nodes"
        :key="node.key"
        :tree="node"
        :depth="depth + 1"
        :checked="checkAll"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TreeForm',
  props: ['tree', 'depth', 'checked'],
  data() {
    return {
      showChildren: false,
      checkAll: false
    }
  },
  computed: {
    indent(): Object {
      return { padding: `0 0 0 ${this.depth * 24}px` }
    }
  },
  methods: {
    toggleChildren() {
      this.showChildren = !this.showChildren
    },
    toggleCheck() {
      // console.log(this.checkAll)
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
.right {
  float: right;
}
.flex {
  display: flex;
}
.label {
  flex: 1;
}
</style>
