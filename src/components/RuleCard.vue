<template>
  <div class="flex max-w-2xl mx-auto bg-white rounded-sm shadow-md">
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-violet-500 font-medium">
        RULE: {{ ruleName }}
        <hr class="py-1" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ruleName: { type: String, required: true },
  },
}
</script>
