import { File } from '../utils/types'

export const state = () => ({
  checkedFiles: [] as File[]
})

export const mutations = {
  toggle(state, file: File) {
    let fIndex = state.checkedFiles.findIndex((f) => f.path === file.path)
    if (fIndex !== -1) {
      state.checkedFiles.splice(fIndex, 1)
    } else {
      state.checkedFiles.push(file)
    }
  },
  addFiles(state, files: File[]) {
    files.forEach((file) => {
      let fIndex = state.checkedFiles.findIndex((f) => f.path === file.path)
      if (fIndex === -1) {
        state.checkedFiles.push(file)
      }
    })
  },
  removeFiles(state, files: File[]) {
    files.forEach((file) => {
      let fIndex = state.checkedFiles.findIndex((f) => f.path === file.path)
      if (fIndex !== -1) {
        state.checkedFiles.splice(fIndex, 1)
      }
    })
  }
}
