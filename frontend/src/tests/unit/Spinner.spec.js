/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import Spinner from '../../components/Spinner.vue'

describe('Spinner', () => {
  it('mounts successfully', () => {
    const wrapper = shallowMount(Spinner)
    expect(wrapper.exists()).toBeTruthy()
  })
  it('matches snapshot', () => {
    const wrapper = shallowMount(Spinner)
    expect(wrapper.element).toMatchSnapshot()
  })
})
