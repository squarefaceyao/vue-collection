<template>
  <div class="layout">
    <!-- 通用头部 -->
    <Header />  

    <el-container>
      <!-- 主体页面 -->
      <el-main>
        <slot />  
      </el-main>

    </el-container>
  </div>
</template>

<script>
import Header from "./Header"
export default {
  components: { Header }
};
</script>

<style>
</style>