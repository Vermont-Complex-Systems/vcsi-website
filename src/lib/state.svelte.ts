import { innerWidth } from 'svelte/reactivity/window';

export function isMobile() {
  return innerWidth.current < 768;
}