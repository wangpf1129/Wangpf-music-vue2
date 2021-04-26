<template>
  <div class="progress-bar">
    <div class="bar-inner">
      <div class="progress"></div>
      <div class="progress-btn-wrapper">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar'
};
</script>

<style scoped lang="scss">
.progress-bar {
  height: 30px;
  
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(255, 255, 255, 0.6);
    
    .progress {
      position: absolute;
      height: 100%;
      background: #1a73e8;
    }
  
    .progress-btn-wrapper {
      width: 30px;
      height: 30px;
      position: relative;
      left: -8px;
      top: -13px;
    
      .progress-btn {
        position: absolute;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid #ccc;
        border-radius: 50%;
        background: #1a73e8;
      }
    }
  }
}
</style>