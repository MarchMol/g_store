<script setup lang="ts">
const props = defineProps<{
    modelValue: number
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: number): void
}>()

const handleAdd = () => {
    emit('update:modelValue', props.modelValue+1)
}

const handleSubtract = () => {
    if (props.modelValue >0) {
        emit('update:modelValue', props.modelValue-1)
    }
    
}

</script>

<template>
    <div class="flex gap-[0.5rem] border rounded-md p-[0.4rem] border-[var(--color-dark-gray)] items-center h-fit">
        <div class="flex items-center text-[0.8rem] hover:bg-[var(--color-gray)] h-[1.25rem] w-[1rem] p-[0.5rem] rounded-md justify-center"
            @click="handleSubtract"
        >
            <i class="pi pi-minus"></i>
        </div>
        <!-- <input class="w0" :value="props.amount" type="number"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" /> -->

        <p>
            {{ modelValue }}
        </p>
        <div class="flex items-center text-[0.8rem] hover:bg-[var(--color-gray)] h-[1.25rem] w-[1rem] p-[0.5rem] rounded-md justify-center"
        @click="handleAdd"
        >
            <i class="pi pi-plus"></i>
        </div>
    </div>
</template>
