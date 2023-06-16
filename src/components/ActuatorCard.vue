<template>
  <div class="flex max-w-2xl mx-auto bg-white rounded-sm shadow-md">
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-violet-500 font-medium">
        {{ actuatorDescription }}
      </div>
      <hr class="py-1" />
      <p class="mt-2 text-sm text-slate-500" v-if="actuatorStateDescription">
        State: {{ actuatorStateDescription }}
      </p>
      <div class="space-x-2 flex">
        <button
          class="mt-2 px-3 py-1.5 text-sm tracking-wide font-medium text-white bg-violet-500 rounded hover:bg-violet-600 focus:outline-none focus:bg-violet-600"
          @click="$emit('refreshValue')">
          REFRESH
        </button>
        <button
          class="mt-2 px-3 py-1.5 text-sm tracking-wide font-medium text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
          @click="$emit('activate')">
          ACTIVATE
        </button>
        <button
          class="mt-2 px-3 py-1.5 text-sm tracking-wide font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
          @click="$emit('deactivate')">
          DEACTIVATE
        </button>
      </div>
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
    actuatorDescription: function () {
      let s = this.actuatorDefinition.name + " / PIN " + this.actuatorDefinition.pinAddress
      if (this.actuatorDefinition.timeout) {
        s = s + " (" + actuatorDefinition.timeout + "ms timeout)"
      }
      return s;
    },
    actuatorStateDescription: function () {
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
