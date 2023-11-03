<script setup>
import { computed } from 'vue'

const props = defineProps({
  content: {
    type: String,
    default: ''
  },

  format: {
    type: String,
    default: 'CONTENT_DEFAULT'
  }
})

const formats = {
  CONTENT_DEFAULT: {
    tag: 'p',
    styles: {
      fontSize: 'var(--font-size-base)'
    }
  },
  CONTENT_SMALL: {
    tag: 'p',
    styles: {
      fontSize: 'var(--font-size-sm)'
    }
  },
  CONTENT_MIDDLE: {
    tag: 'p',
    styles: {
      fontSize: 'var(--font-size-base)'
    }
  },
  CONTENT_LARGE: {
    tag: 'p',
    styles: {
      fontSize: 'var(--font-size-lg)'
    }
  },
  H1: {
    tag: 'h1',
    styles: {
      fontSize: '64px',
      fontWeight: 600
    }
  },
  H2: {
    tag: 'h2',
    styles: {
      fontSize: '48px',
      fontWeight: 600
    }
  },
  H3: {
    tag: 'h3',
    styles: {
      fontSize: '36px',
      fontWeight: 600
    }
  },
  H4: {
    tag: 'h4',
    styles: {
      fontSize: '24px',
      fontWeight: 600
    }
  },
  H5: {
    tag: 'h5',
    styles: {
      fontSize: '20px',
      fontWeight: 600
    }
  },
  H6: {
    tag: 'h6',
    styles: {
      fontSize: '18px',
      fontWeight: 600
    }
  },
  H7: {
    tag: 'h6',
    styles: {
      fontSize: '18px',
      fontWeight: 600
    }
  },
  H8: {
    tag: 'h6',
    styles: {
      fontSize: '16px',
      fontWeight: 600
    }
  },
  H9: {
    tag: 'h6',
    styles: {
      fontSize: '14px',
      fontWeight: 600
    }
  }
}

const currentFormat = computed(() => {
  return formats[props.format]
})
</script>

<template>
  <component
    v-if="currentFormat"
    class="app-text"
    :is="currentFormat.tag"
    :style="currentFormat.styles"
  >
    {{ content }}
  </component>
</template>

<style scoped>
.app-text {
  margin: 0;
  padding: 0;
  font-size: inherit;
  font-weight: inherit;
  line-height: 1.5;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
}
</style>
