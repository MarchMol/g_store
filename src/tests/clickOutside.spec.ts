import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import clickOutside from '@/directives/clickOutside'

const TestComponent = defineComponent({
    template: `
    <div>
      <div ref="target" v-click-outside="handleClickOutside" class="target">
        Content inside
      </div>
      <div class="outside">Outside content</div>
    </div>
  `,
    setup() {
        const clickCount = ref(0)
        const handleClickOutside = () => {
            clickCount.value++
        }
        return { clickCount, handleClickOutside }
    }
})

describe('clickOutside directive', () => {
    let wrapper: VueWrapper
    let target: HTMLElement
    let outside: HTMLElement

    beforeEach(() => {
        wrapper = mount(TestComponent, {
            global: {
                directives: {
                    clickOutside
                }
            }
        })
        target = wrapper.find('.target').element as HTMLElement
        outside = wrapper.find('.outside').element as HTMLElement
    })

    it('mounts without errors', () => {
        expect(wrapper.exists()).toBe(true)
    })


    it('cleans up event listener on unmount', () => {
        const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener')

        wrapper.unmount()

        expect(removeEventListenerSpy).toHaveBeenCalledWith('pointerdown', expect.any(Function))

        removeEventListenerSpy.mockRestore()
    })

    it('removes the stored handler reference on unmount', () => {
        const elementBeforeUnmount = target as any
        expect(elementBeforeUnmount.__clickOutside__).toBeDefined()

        wrapper.unmount()

        expect(elementBeforeUnmount.__clickOutside__).toBeUndefined()
    })

    it('handles multiple directives on same page', () => {
        const multiComponent = defineComponent({
            template: `
        <div>
          <div class="box1" v-click-outside="handler1">Box 1</div>
          <div class="box2" v-click-outside="handler2">Box 2</div>
        </div>
      `,
            setup() {
                const count1 = ref(0)
                const count2 = ref(0)
                return {
                    count1,
                    count2,
                    handler1: () => { count1.value++ },
                    handler2: () => { count2.value++ }
                }
            }
        })

        const multiWrapper = mount(multiComponent, {
            global: {
                directives: {
                    clickOutside
                }
            }
        })

        const outside = document.body

        outside.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))


        expect(multiWrapper.vm.count1).toBe(1)
        expect(multiWrapper.vm.count2).toBe(1)
    })
})