<template>
  <div class="game">
    <v-card width="400">
      <v-card-title>Game</v-card-title>
      <v-card-text>
        <v-text-field
          v-model.number="x"
          type="number"
          label="Size X"
          required
        ></v-text-field>
        <v-text-field
          v-model.number="y"
          type="number"
          label="Size Y"
          required
        ></v-text-field>
      </v-card-text>
    </v-card>

    <div
      class="game__content"
      :style="{
        width: `${blockSize * x}px`,
        height: `${blockSize * y}px`,
      }"
    >
      <div
        v-for="(block, index) in blocks"
        :key="block.id"
        class="game__block"
        :style="{
          width: `${blockSize}px`,
          height: `${blockSize}px`,
          top: `${block.y * blockSize}px`,
          left: `${block.x * blockSize}px`,
          backgroundColor: blocks[index].color,
        }"
        @mouseenter="changeBlock(index)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { Block, Color } from './types'
import { blockSize } from './constants'

const x = ref(5)
const y = ref(5)
const blocks = ref<Block[]>([])

watchEffect(() => {
  blocks.value = []
  for (let i = 0; i < +x.value; i++) {
    for (let j = 0; j < +y.value; j++) {
      blocks.value.push({
        color: 'white',
        x: i,
        y: j,
        id: `${i}-${j}`,
      })
    }
  }
})
const changeBlock = (index: number) => {
  const colorsUpdate: Record<Color, Color> = {
    white: 'blue',
    blue: 'white',
  }
  blocks.value[index].color = colorsUpdate[blocks.value[index].color]
}
</script>

<style lang="scss" scoped>
.game {
  overflow: auto;

  &__block {
    position: absolute;
    border: 1px black solid;
  }

  &__content {
    position: relative;
    display: flex;
  }
}
</style>
