<template>
  <div class="flex max-w-2xl mx-auto bg-white rounded-sm shadow-md">
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-violet-500 font-medium">
        {{ ruleDescription }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ruleDefinition: { type: Object, required: true },
    ruleValue: { type: Object, default: null },
    lastUpdated: { type: Date, default: null }
  },
  computed: {
    ruleDescription: function () {
      let s = this.ruleDefinition.name;
      return s;
    }
  },
}
</script>
