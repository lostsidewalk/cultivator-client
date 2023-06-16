<template>
  <li class="mr-2">
    <a href="#" @click.stop="$emit('select')" class="inline-flex p-4 border-b-2 rounded-t-lg group"
      :class="{
        'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500': isSelected,
        'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300': !isSelected
      }" :aria-current="isSelected ? 'page' : null">
      <svg aria-hidden="true" :class="{
        'w-5 h-5 mr-2 text-blue-600 dark:text-blue-500': isSelected,
        'w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300': !isSelected,
      }" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <slot name="path"></slot>
      </svg>{{ label }}
    </a>
  </li>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    isSelected: { type: Boolean, default: false },
  },
  emits: ['select'],
}
</script>
