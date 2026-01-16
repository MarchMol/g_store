import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AmountCustom from '@/components/AmountCustom.vue'

describe('AmountCustom.vue', () => {
  it('displays current count', () => {
    const wrapper = mount(AmountCustom, {
      props: {
        count: 5
      }
    })

    expect(wrapper.text()).toContain('5')
  })

  it('renders increment button', () => {
    const wrapper = mount(AmountCustom, {
      props: {
        count: 1
      }
    })

    expect(wrapper.find('.pi-plus').exists()).toBe(true)
  })

  it('renders decrement button', () => {
    const wrapper = mount(AmountCustom, {
      props: {
        count: 1
      }
    })

    expect(wrapper.find('.pi-minus').exists()).toBe(true)
  })

  it('emits add event when plus button clicked', async () => {
    const wrapper = mount(AmountCustom, {
      props: {
        count: 5
      }
    })

    await wrapper.find('.pi-plus').element.parentElement?.click()

    expect(wrapper.emitted('add')).toBeTruthy()
  })

  it('emits sub event when minus button clicked', async () => {
    const wrapper = mount(AmountCustom, {
      props: {
        count: 5
      }
    })

    await wrapper.find('.pi-minus').element.parentElement?.click()

    expect(wrapper.emitted('sub')).toBeTruthy()
  })

  it('prevents subtraction when count is 0', async () => {
    const wrapper = mount(AmountCustom, {
      props: {
        count: 0
      }
    })

    await wrapper.find('.pi-minus').element.parentElement?.click()

    expect(wrapper.emitted('sub')).toBeFalsy()
  })

  it('allows addition when count is 0', async () => {
    const wrapper = mount(AmountCustom, {
      props: {
        count: 0
      }
    })

    await wrapper.find('.pi-plus').element.parentElement?.click()

    expect(wrapper.emitted('add')).toBeTruthy()
  })

  it('handles large count values', () => {
    const wrapper = mount(AmountCustom, {
      props: {
        count: 999999
      }
    })

    expect(wrapper.text()).toContain('999999')
  })

  it('handles count of 1', () => {
    const wrapper = mount(AmountCustom, {
      props: {
        count: 1
      }
    })

    expect(wrapper.text()).toContain('1')
  })

  it('allows addition at count 1', async () => {
    const wrapper = mount(AmountCustom, {
      props: {
        count: 1
      }
    })

    await wrapper.find('.pi-plus').element.parentElement?.click()

    expect(wrapper.emitted('add')).toBeTruthy()
  })
})