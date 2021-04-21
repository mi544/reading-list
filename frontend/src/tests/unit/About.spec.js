/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import Index from '../../pages/Index.vue'

describe('Index', () => {
  it('mounts successfully', () => {
    const wrapper = shallowMount(Index)
    expect(wrapper.exists()).toBeTruthy()
  })
  it('matches snapshot', () => {
    const wrapper = shallowMount(Index)
    expect(wrapper.element).toMatchSnapshot()
  })
})
