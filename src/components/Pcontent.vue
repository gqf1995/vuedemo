<template>
  <div>
    <router-link to="/home">
      <div class="back">返回</div>
    </router-link>

    <div class="p_content">
      <div class="p_info">
        <img :src="api+list.img_url">
        <h2>{{list.title}}</h2>
        <p class="price">{{list.price}}/份</p>
      </div>
      <div class="p_detial">
        <h3>商品详情</h3>
        <div class="p_content" v-html="list.content"></div>
      </div>
    </div>

    <footer class="pfooter">
      <div class="cart">
        <strong>数量：</strong>
        <div class="cart_num">
          <div class="input_left" @click="decNum()">-</div>
          <div class="input_center">
            <input type="text" readonly="readonly" v-model="num" name="num" id="num">
          </div>
          <div class="input_right" @click="incNum()">+</div>
        </div>
      </div>

      <button class="addcart" @click="addCart()">加入购物车</button>
    </footer>
  </div>
</template>

<script>
import config from "../model/config";
import storage from '../model/storage.js';

export default {
  data() {
    return {
      list: [],
      api: config.api,
      num: 1
    };
  },
  methods: {
    requestData(id) {
      this.$http.get(config.api_detail + "?id=" + id).then(response => {
        this.list = response.body.result[0];
      });
    },
    decNum() {
      --this.num;
      if (this.num == 0) {
        this.num = 1;
      }
    },
    incNum() {
      ++this.num;
    },
    addCart() {
      //获取数据加入购物车
      this.$http
        .post(config.api_addcart, {
          uid: storage.get('roomid'),
          title: this.list.title,
          price: this.list.price,
          num: this.num,
          product_id: this.list._id,
          img_url: this.list.img_url
        })
        .then(() => {
          //this.$socket.emit('addcart','addcart');
          this.$socket.emit("addcart", "addcart");
          this.$router.push({ path: "/home" });
        });
    }
  },
  mounted() {
    this.requestData(this.$route.params.id);
  }
};
</script>

<style lang="scss">
.p_content {
  .p_info {
    background: #fff;

    img {
      width: 100%;
      height: 18rem;
    }

    h2 {
      padding: 0.2rem 0.5rem;
    }

    .price {
      padding: 0.2rem 0.5rem;
      color: red;
    }
  }

  .p_detial {
    background: #fff;
    margin-top: 1rem;

    h3 {
      padding: 0.5rem;
    }

    .p_content {
      padding: 1rem;

      img {
        max-width: 90%;
        display: block;
        margin: 0 auto;
      }

      * {
        line-height: 1.5;
        color: #666;
      }
    }
  }
}

.pfooter {
  position: fixed;

  bottom: 0px;
  height: 4.4rem;
  line-height: 4.4rem;

  background: #fff;

  left: 0px;

  width: 100%;

  border-top: 1px solid #eee;

  .cart {
    float: left;

    display: flex;

    strong {
      flex: 1;

      font-size: 1.6rem;
      padding: 0 0.5rem;
    }

    .cart_num {
      display: flex;
      width: 10rem;

      margin-top: 0.8rem;

      .input_left,
      .input_right {
        flex: 1;

        width: 2.8rem;
        height: 2.8rem;
        text-align: center;
        color: red;
        border: 1px solid #eee;
        line-height: 2.8rem;
        font-size: 2.4rem;
      }

      .input_center {
        flex: 1;

        input {
          width: 2rem;
          text-align: center;

          width: 100%;
          height: 2.8rem;
          border: none;

          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;

          float: left;
        }
      }
    }
  }

  .addcart {
    float: right;
    background: red;
    color: #fff;
    height: 3rem;
    border: none;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    margin-top: 0.8rem;
    margin-right: 0.5rem;
    a {
      color: #fff;
      text-decoration: none;
    }
  }
}

.back {
  height: 3.8rem;
  line-height: 3.8rem;
  width: 3.8rem;
  border-radius: 50%;
  background: #000;

  position: fixed;
  top: 0.5rem;

  left: 0.5rem;
  color: #fff;

  &:before {
    content: "";
    display: block;
    width: 0.8rem;
    height: 0.8rem;

    border-left: 0.2rem solid#fff;
    border-bottom: 0.2rem solid #fff;

    float: left;

    position: relative;

    top: 1.4rem;
    left: 0.6rem;
    transform: rotate(45deg);
    margin-right: 0.4rem;
  }
}
</style>
