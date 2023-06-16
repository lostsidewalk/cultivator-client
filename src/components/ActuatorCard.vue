<template>
  <div class="flex max-w-2xl mx-auto bg-white rounded-sm shadow-md">
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-violet-500 font-medium">
        ACTUATOR: {{ actuatorDescription }}
      </div>
      <hr class="py-1" />
      <div class="mt-2" v-if="actuatorStateDescription">
        <p class="text-sm text-slate-500">
          <span class="font-medium">State:</span> {{ actuatorStateDescription }}
        </p>
        <p class="text-sm text-slate-500">
          <span class="font-medium">Last Updated:</span> {{ lastUpdated ? lastUpdated.toLocaleString() : 'N/A' }}
        </p>
      </div>
      <div class="space-x-2">
        <button
          class="mt-2 px-3 py-1.5 text-sm tracking-wide font-medium text-white bg-violet-500 rounded hover:bg-violet-600 focus:outline-none focus:bg-violet-600"
          @click="$emit('refreshState')">
          REFRESH
        </button>
        <button
          :class="{
            'mt-2 px-3 py-1.5 text-sm tracking-wide font-medium text-white bg-green-400 rounded hover:bg-green-500 focus:outline-none focus:bg-green-500': this.actuatorState === true,
            'mt-2 px-3 py-1.5 text-sm tracking-wide font-medium text-white bg-red-400 rounded hover:bg-red-500 focus:outline-none focus:bg-red-500': this.actuatorState !== true
            }"
          @click="$emit(this.actuatorState === true ? 'deactivate' : 'activate')">
          {{ this.actuatorState ? 'DEACTIVATE' : 'ACTIVATE' }} 
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
        stateDescription = this.actuatorState ? 'Enabled' : 'Disabled' ; // new String(this.actuatorState);
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
