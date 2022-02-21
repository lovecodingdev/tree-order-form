<template>
  <div class="page">
    <Downloader :files="files" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Downloader from '~/components/Downloader.vue'
import { File } from '~/utils/types'

export default defineComponent({
  components: { Downloader },
  data: () => ({
    files: [] as File[]
  }),
  async fetch() {
    this.files = await fetch(`${window.location.href}/files.json`).then((res) =>
      res.json()
    )
  }
})
</script>

<style scoped>
.page {
  padding: 48px;
}
</style>
