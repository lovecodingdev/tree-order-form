import { File } from '~/utils/types'

export const state = () => ({
  files: [] as File[]
})

export const mutations = {
  add(state, file) {
    state.files.push(file)
  }
}
