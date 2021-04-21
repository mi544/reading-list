/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import Contact from '../../pages/Contact.vue'

describe('Contact', () => {
  it('mounts successfully', () => {
    const wrapper = shallowMount(Contact)
    expect(wrapper.exists()).toBeTruthy()
  })
  it('matches snapshot', () => {
    const wrapper = shallowMount(Contact)
    expect(wrapper.element).toMatchSnapshot()
  })
})
