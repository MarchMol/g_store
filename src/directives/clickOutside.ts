import type { Directive, DirectiveBinding } from 'vue'

type ClickOutsideEl = HTMLElement & {
  __clickOutside__?: (event: MouseEvent) => void
}

const clickOutside: Directive<ClickOutsideEl, (event: MouseEvent) => void> = {
  beforeMount(el: ClickOutsideEl, binding: DirectiveBinding) {
    const handler = (event: MouseEvent) => {
      if (!el.contains(event.target as Node)) {
        binding.value(event)
      }
    }

    el.__clickOutside__ = handler
    document.addEventListener('pointerdown', handler)
  },

  unmounted(el: ClickOutsideEl) {
    if (el.__clickOutside__) {
      document.removeEventListener('pointerdown', el.__clickOutside__)
      delete el.__clickOutside__
    }
  },
}

export default clickOutside
