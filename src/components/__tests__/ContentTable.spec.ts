import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Content from '../ContentTable.vue' // Pastikan path sesuai dengan lokasi Content Anda

describe('Content Component', () => {
  it('renders Content with correct initial state', () => {
    const wrapper = mount(Content)
    expect(wrapper.find('.w-64').exists()).toBe(true) // Content terbuka secara default
  })

  it('toggles Content when button is clicked', async () => {
    const wrapper = mount(Content)
    const button = wrapper.find('button')

    await button.trigger('click')
    expect(wrapper.find('.w-16').exists()).toBe(true) // Content harus mengecil

    await button.trigger('click')
    expect(wrapper.find('.w-64').exists()).toBe(true) // Content kembali terbuka
  })
})
