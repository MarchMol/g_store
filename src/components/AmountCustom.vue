<script setup lang="ts">
const props = defineProps<{
    count: number
}>()

const emit = defineEmits(['add', 'sub'])

const handleAdd = () => {
    emit('add')
}

const handleSubtract = () => {
    if (props.count >0) {
        emit('sub')
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
            {{ count }}
        </p>
        <div class="flex items-center text-[0.8rem] hover:bg-[var(--color-gray)] h-[1.25rem] w-[1rem] p-[0.5rem] rounded-md justify-center"
        @click="handleAdd"
        >
            <i class="pi pi-plus"></i>
        </div>
    </div>
</template>
