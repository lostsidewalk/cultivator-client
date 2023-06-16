<template>
  <div class="flex max-w-2xl mx-auto bg-white rounded-sm shadow-md">
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-violet-500 font-medium">
        {{ sensorDescription }}
      </div>
      <button class="mt-1 text-lg tracking-tight font-medium text-black hover:underline"
        @click="$emit('refreshValue')">
        REFRESH
      </button>
      <p class="mt-2 text-sm text-slate-500" v-if="sensorValueDescription">
        Value: {{ sensorValueDescription }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sensorDefinition: { type: Object, required: true },
    sensorValue: { default: null },
    lastUpdated: { type: Date, default: null }
  },
  computed: {
    sensorDescription: function () {
      let s = this.sensorDefinition.name + " / PIN " + this.sensorDefinition.pinAddress
      if (this.sensorDefinition.timeout) {
        s = s + " (" + sensorDefinition.timeout + "ms timeout)"
      }
      return s;
    },
    sensorValueDescription: function() {
      let valueDescription = null;
      if (this.sensorValue === null || this.sensorValue === undefined || this.sensorValue === '') {
        valueDescription = '<none>';
      } else {
        valueDescription = this.sensorValue;
      }
      if (this.lastUpdated) {
        valueDescription = (valueDescription + ' at ' + this.lastUpdated);
      }
      return valueDescription;
    },
  },
  emits: [
    "refreshValue",
  ]
}
</script>
