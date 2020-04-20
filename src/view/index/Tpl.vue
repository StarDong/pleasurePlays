<template>
  <div>
    <div class="home">
      <div v-for="item in listData" class="content" :key="item">
        <div class="up_content">
          <div>
            <p class="up_p">用Python+树莓派开发智能音箱</p>
            <p class="down_p">2019-10-14 09:23:44</p>
          </div>
          <div>
            <img src="../../../static/img/content.png" alt />
          </div>
        </div>
        <div class="down_content">
          <ul>
            <li>Python</li>
            <li>热门文章</li>
          </ul>
        </div>
      </div>
      <!-- <x-button type="primary" action-type="button">submit</x-button> -->
    </div>
    <HelloMarkDown></HelloMarkDown>
    <!-- <div>
      <VmEditor width="100%" height="400px" @upload="showHtml"></VmEditor>
    </div> -->
    <div id="main">
      <mavon-editor v-model="value"/>
    </div>
  </div>
</template>
<script>
import controller from './Controller.js'
export default controller
</script>
<style lang="less">
@import "style.less";
@import "~vux/src/styles/close";
.home {
  padding: 30px 30px 0px;
  height: 100%;
  .content {
    border-radius: 8px;
    margin-bottom: 30px;
    font-size: 32px;
    background-color: #fff;
    position: relative;
    .up_content:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 86px;
      background: #eeeeee;
      width: 100%;
      height: 2px;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
    }
    .up_content {
      display: flex;
      padding: 30px;
      div {
        p {
          margin: 0px 0px 10px;
        }
        .up_p {
          font-family: PingFangSC-Medium;
          font-size: 32px;
          color: #333333;
          letter-spacing: 0;
        }
        .down_p {
          font-size: 24px;
          color: #999;
        }
        img {
          width: 191px;
          height: 116px;
        }
      }
    }
    .down_content {
      ul {
        display: flex;
        margin: 0;
        padding: 20px 0 30px 35px;
        li {
          list-style: none;
          background: #f3f4f7;
          border-radius: 100px;
          padding: 3px 20px 2px;
          font-family: PingFangSC-Regular;
          font-size: 22px;
          color: #888888;
          letter-spacing: 0;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
