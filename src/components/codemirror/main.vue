<script setup>
import { computed } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { autocompletion, language, linter, lintGutter, theme } from './plugin';

const props = defineProps({
  autocompletionOptions: {
    type: Array,
    default: () => [],
  },
  error: {
    type: Array,
    default: () => [],
  },
});

const extensions = computed(() => {
  const { autocompletionOptions, error } = props;

  return [
    autocompletion(autocompletionOptions),
    theme,
    language,
    linter(error),
    lintGutter,
  ];
});
</script>

<template>
  <Codemirror
    :extensions="extensions"
    v-bind="$attrs"
  />
</template>
