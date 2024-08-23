<template>
  <div>

    <!-- start banner Area -->
    <section
      class="banner-area relative"
      id="home"
    >
      <div class="overlay overlay-bg"></div>
      <div class="container">
        <div
          class="row fullscreen d-flex align-items-center justify-content-center"
          style="height:850px"
        >
          <div class="banner-content col-lg-12 col-md-12">
            <h6 class="text-uppercase">提供各种实用工具</h6>
            <h1>
              ZooIf工具站
            </h1>
            <p class="text-white">
              提供各种实用工具 <br> 欢迎大家交流讨论
            </p>
            <a
              :href="openPath"
              class="primary-btn header-btn text-uppercase"
            >开启</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import api from "~/plugins/api";
import { Message, MessageBox } from "element-ui";
import { getToken, setToken, setExpiresIn, removeToken } from "~/plugins/auth";
export default {
  data: function () {
    return {
      openPath: "#",
      api:api
    };
  },
  head() {
    return {
      title: '首页 - ZooIf',
    }
  },
  beforeMount: function () {},
  mounted: function () {
    if (getToken()) {
      this.openPath=api.ServerDomain+":1008/"
    } else {
      this.openPath=api.ServerDomain+":1008/login"
    }
  },
  methods: {},
};
</script>

<style scoped>
@import "../static/css/index.css";
</style>
