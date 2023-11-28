<template>
    <div>
      <select :value="selectedPage" @input="updateSelectedPage(parseInt(($event as any)?.target?.value || '0'))">
        <option v-for="i in nbPages" :key="i" :value="i - 1">{{ i }}</option>
      </select>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    props: {
      nbPages: {
        type: Number,
        default: 2,
      },
      selectedPage: {
        type: Number,
        default: 1,
      },
    },
    methods: {
      updateSelectedPage(value: number) {
        this.$emit('update:selectedPage', value);
      },
    },
  });
  </script>
  