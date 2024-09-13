<script setup lang="ts"></script>

<template>
  <div class="title">
    Vitepress Fun Animation Title
  </div>
</template>

<style scoped>
.title {
  margin-top: 20px;
  font-size: 48px;
  line-height: 48px;
  text-align: center;
  background: linear-gradient(
    315deg,
    rgb(210 86 53) 10%,
    #647eff 50%,
    rgb(238 224 112) 90%
  );
  background-clip: text;
  background-clip: text;
  background-size: 400% 400%;
  animation: gradient 5s ease infinite;
  -webkit-text-fill-color: transparent;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>
