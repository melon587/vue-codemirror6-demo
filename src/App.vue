<script setup>
import { ref } from 'vue';
import Codemirror from './components/codemirror';

const error = ['ian'];

const autocompletionOptions = [
  {
    displayName: '前端小白',
    prefix: {
      color: '#0F5FFF',
      text: 'Vue',
    },
  },
  {
    displayName: '前端萌新',
    prefix: {
      color: '#FAAE16',
      text: 'React',
    },
  },
  {
    displayName: '前端大牛',
    prefix: {
      color: '#52C718',
      text: 'Css3D',
    },
  },
];

const modelValue = ref('我是ian,你试试按@可触发自动补全');
</script>

<template>
  <Codemirror
    :style="{ height: '400px' }"
    v-model="modelValue"
    :error="error"
    :autocompletion-options="autocompletionOptions"
  />
</template>