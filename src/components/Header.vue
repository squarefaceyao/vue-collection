<template>
  <div>
      <div id="nav">
          <!-- <img src="../assets/logo.png" class="logo" alt=""> -->
          <a>Plant electrical signal acquisition system</a>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :router="true"
            @select="handleSelect"
          >
            <el-menu-item class="nav-item" v-for="(item,index) of tables" :index="item.path" :key="index" >{{ item.title }}</el-menu-item>
          </el-menu>
      </div>
  </div>
</template>

<script>


export default {
  name: "Header",
  data() {
    return {
      tables: [],
      searchText:'',
      activeIndex: "/",
      activeIndex2: "/",
    };
  },

  mounted() {
    let router = this.$router.options.routes
    this.tables = router
    this.activeIndex = this.$route.path
    console.log(this.activeIndex)
    // Getheadres().then((response) => {
    //   /*自行替换接口返回的数据*/
    //   this.tables = response.data.data;
    //   console.log(this.tables);
    // });
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key 
      this.$router.push(key)
      console.log(key, keyPath);
    },
  }
};
</script> 

<style>
#nav {
  padding: 30px 30px 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-menu-demo {

  font-size: 24px;
      float: right;
    height: 100%;
    line-height: 80px;
    background: transparent;
    padding: 0;
    margin: 0;
}
.logo {
  width: 100px;
  height: 50px;
  object-fit: cover;
}

.nav-item {
    padding: 0 10px;
    font-size: 16px;
}


@media (max-width: 850px){
#nav .nav-item {
    margin-left: 6px;
    padding: 0 5px;
    font-size: 12px;
    vertical-align: top;
}

.logo {
  width: 50px;
  height: 25px;
  object-fit: cover;
}
#nav {
  padding: 10px 15px 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
}


#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
