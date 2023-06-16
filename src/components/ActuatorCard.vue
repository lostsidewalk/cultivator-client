<template>
  <div class="flex max-w-2xl mx-auto bg-white rounded-sm shadow-md">
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-violet-500 font-medium">
        {{ actuatorDescription }}
      </div>
      <button class="mt-1 text-lg tracking-tight font-medium text-black hover:underline"
        @click="$emit('refreshState')">
        REFRESH
      </button>
      <button class="mt-1 text-lg tracking-tight font-medium text-black hover:underline"
        @click="$emit('activate')">
        ACTIVATE
      </button>
      <button class="mt-1 text-lg tracking-tight font-medium text-black hover:underline"
        @click="$emit('deactivate')">
        DEACTIVATE
      </button>
      <p class="mt-2 text-sm text-slate-500" v-if="actuatorStateDescription">
        State: {{ actuatorStateDescription }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    actuatorDefinition: { type: Object, required: true },
    actuatorState: { type: Boolean, default: null },
    lastUpdated: { type: Date, default: null },
  },
  computed: {
    actuatorDescription: function() {
      let s = this.actuatorDefinition.name + " / PIN " + this.actuatorDefinition.pinAddress
      if (this.actuatorDefinition.timeout) {
        s = s + " (" + actuatorDefinition.timeout + "ms timeout)"
      }
      return s;
    },
    actuatorStateDescription: function() {
      let stateDescription = null;
      if (this.actuatorState === null || this.actuatorState === undefined || this.actuatorState === '') {
        stateDescription = '<none>';
      } else {
        stateDescription = new String(this.actuatorState);
      }
      if (this.lastUpdated) {
        stateDescription = (stateDescription + ' at ' + this.lastUpdated);
      }
      return stateDescription;
    }
  },
  emits: [
    "refreshState",
    "activate",
    "deactivate", 
  ]
}
</script>
