<template>
  <div>
    <div class="start_content">
      <header class="start_header">
        <img src="../assets/images/canju.png"> 用餐人数
      </header>

      <p class="notice">请选择正确的用餐人数，小二马上给您送餐具</p>

      <div class="content">
        <ul class="user_list">
          <li class="active">
            <span>1人</span>
          </li>
          <li>
            <span>2人</span>
          </li>
          <li>
            <span>3人</span>
          </li>

          <li>
            <span>4人</span>
          </li>
          <li>
            <span>5人</span>
          </li>
          <li>
            <span>6人</span>
          </li>
          <li>
            <span>7人</span>
          </li>
          <li>
            <span>8人</span>
          </li>
          <li>
            <span>9人</span>
          </li>
          <li>
            <span>10人</span>
          </li>
          <li>
            <span>11人</span>
          </li>

          <li>
            <span>12人</span>
          </li>
        </ul>

        <div class="mark_input">
          <input type="text" v-model="p_mark" placeholder="请输入备注">
          <ul class="mark_list">
            <li>
              <span>打包带走</span>
            </li>
            <li>
              <span>不要辣椒</span>
            </li>
            <li>
              <span>微辣</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="start" class="start" @click="save()">
      <span>开始点菜</span>
    </div>
  </div>
</template>

<script>
import config from "../model/config";
import storage from "../model/storage.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      p_num: "1人",
      p_mark: ""
    };
  },
  methods: {
    addChangeEvent() {
      //dom操作
      var that = this;
      var lis = document.querySelectorAll(".user_list li");
      for (var i = 0; i < lis.length; i++) {
        lis[i].onclick = function() {
          //去掉li的class 让点击的li class == active
          for (var j = 0; j < lis.length; j++) {
            lis[j].className = "";
          }
          this.className = "active";
          that.p_num = this.querySelector("span").innerHTML.trim();
        };
      }

      var mlis = document.querySelectorAll(".mark_list li");
      for (var n = 0; n < mlis.length; n++) {
        mlis[n].onclick = function() {
          that.p_mark =
            that.p_mark + " " + this.querySelector("span").innerHTML.trim();
        };
      }
    },
    save() {
      this.$http
        .post(config.api_addPeopleInfo, {
          uid: storage.get("roomid"),
          p_num: this.p_num,
          p_mark: this.p_mark
        })
        .then(() => {
          this.$router.push({ path: "/home" });
        });
    },
    getPeopelInfoList() {
      this.$http
        .get(config.api_peopleInfoList + "?uid=" + storage.get("roomid"))
        .then(res => {
          if (res.body.result.length > 0) {
            Toast({
              message: "操作成功",
              iconClass: "icon icon-success"
            });
            this.$router.push({ path: "/home" });
          }
        });
    }
  },
  mounted() {
    this.getPeopelInfoList();
    this.addChangeEvent();
  }
};
</script>

<style lang="scss">
.start_content {
  .start_header {
    height: 3.2rem;
    line-height: 3.2rem;
    background: #000;
    color: #fff;
    width: 5rem;
    margin: 5rem auto 0rem auto;
    border-radius: 0.5rem;

    img {
      height: 2.2rem;
      line-height: 2.2rem;
      position: relative;
      top: 0.5rem;
      margin-left: 1rem;
    }
  }

  .notice {
    color: red;
    text-align: center;
    margin: 1rem 0rem;
  }

  .mark_input {
    padding: 1rem;
    input {
      height: 3rem;
      width: 100%;
      line-height: 3rem;
      border: 1px solid #eee;
    }
  }
  .user_list,
  .mark_list {
    display: flex;

    padding: 0.5rem;
    flex-wrap: wrap; //溢出 换行
    li.active {
      span {
        background: red;
        border: 1px solid red;
        color: #fff;
      }
    }
    li {
      width: 25%;
      padding: 0.5rem;
      box-sizing: border-box; //默认盒子的宽度 = 盒子的宽度+padding+border

      span {
        display: block;
        width: 100%;
        height: 3.2rem;
        line-height: 2.2rem;

        text-align: center;
        background: #fff;
        border-radius: 0.5rem;
        border: 1px solid #ccc;
        padding-top: 1rem;
      }
    }
  }
}
.start {
  position: fixed;
  bottom: 5rem;
  left: 50%;
  width: 6rem;
  height: 6rem;
  background: red;
  color: #fff;
  margin-left: -3rem;

  border-radius: 50%;

  span {
    display: block;
    width: 2rem;

    margin: 0 auto;
    position: relative;
    top: 1.5rem;
  }
}
</style>
