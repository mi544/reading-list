<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
    <div class="spinner"></div>
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
}
</script>

<style lang="scss">
@keyframes loading-spinner {
  0% {
    transform: rotate(305deg);
  }
  50% {
    transform: rotate(60deg);
  }
  100% {
    transform: rotate(305deg);
  }
}

.loading-spinner {
  display: flex;
  width: 100px;
  height: 35px;
  justify-content: space-between;
  align-items: center;

  & > .spinner {
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    border-radius: 4px;
  }

  $spinners: ((1, 1s, -0.2s) (2, 1.7s, 0s) (3, 1s, -0.2s));

  @each $num, $duration, $delay in $spinners {
    & > div:nth-child(#{$num}) {
      animation: loading-spinner
        $duration
        $delay
        infinite
        cubic-bezier(0.65, -0.05, 0.38, 0.96);
    }
  }
}
</style>
