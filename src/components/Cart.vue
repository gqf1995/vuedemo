<template>
  <div>
    <div class="cart_content">
      <div class="cart_info">
        <h2>购物车</h2>
        <div class="p_number">
          <div class="p_number_left">
            <p>用餐人数:{{peoplelist.p_num}}</p>
            <p>
              备注：
              <span v-if="!peoplelist.p_mark">无</span>
              <span v-if="peoplelist.p_mark">{{peoplelist.p_mark}}</span>
            </p>
          </div>
          <div class="p_number_right">
            <router-link to="/editpeopleinfo">
              <img src="../assets/images/edit.png">
              <p>修改</p>
            </router-link>
          </div>
        </div>
        <div class="cart_p_num">
          <p>购物车中总共有{{list.length}}个菜</p>
          <p>
            合计：
            <span class="price">${{allPrcie}}</span>
          </p>
        </div>
      </div>
      <div class="cart_list">
        <ul>
          <li class="item" v-for="(item,index) in list" :key="index">
            <div class="left_food">
              <img :src="api+item.img_url">
              <div class="food_info">
                <p>{{item.title}}</p>
                <p class="price">¥{{item.price}}</p>
              </div>
            </div>

            <div class="right_cart">
              <div class="cart_num">
                <div class="input_left" @click="decNum(item,index)">-</div>
                <div class="input_center">
                  <input type="text" readonly="readonly" v-model="item.num" name="num" id="num">
                </div>
                <div class="input_right" @click="incNum(item)">+</div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="hot_food">
        <h3 class="item_cate">本店顾客最常点的菜</h3>

        <div class="item_list_outer">
          <ul class="item_list">
            <li>
              <div class="inner">
                <img src="../assets/images/1.jpeg">
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>

            <li>
              <div class="inner">
                <img class="item_img" src="../assets/images/2.jpeg">

                <p class="title">家乡扣肉</p>

                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="inner">
                <img class="item_img" src="../assets/images/3.jpeg">

                <p class="title">主打鸡</p>

                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="inner">
                <img class="item_img" src="../assets/images/2.jpeg">

                <p class="title">酸辣土豆丝</p>

                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="inner">
                <img class="item_img" src="../assets/images/3.jpeg">

                <p class="title">家乡腊肉</p>

                <p class="price">¥26</p>
              </div>
            </li>

            <li>
              <div class="inner">
                <img class="item_img" src="../assets/images/2.jpeg">

                <p class="title">长沙臭豆腐</p>

                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="inner">
                <img class="item_img" src="../assets/images/3.jpeg">

                <p class="title">主打鸡</p>

                <p class="price">¥26</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <v-navfooter></v-navfooter>
    <div id="footer_cart" class="footer_cart">
      <img src="../assets/images/doorder.png">
      <p>下单</p>
    </div>

    <div id="footer_book" class="footer_book">
      <router-link to="/home">
        <img src="../assets/images/cart.png">
        <p>菜单</p>
      </router-link>
      <span class="num" v-if="cartNum">{{cartNum}}</span>
    </div>
  </div>
</template>

<script>
import NavFooter from "./public/NavFooter.vue";
import config from "../model/config";
import storage from '../model/storage.js';

export default {
  data() {
    return {
      cartNum: 0,
      api: config.api,
      list: [],
      peoplelist: [],
      allPrcie: 0
    };
  },
  sockets: {
    addcart: function() {
      /*接受服务器广播过来的addcart*/
      //更新购物车的数量
      this.getCartData();
    }
  },
  methods: {
    getCartData() {
      this.$http
        .get(config.api_cartlist + "?uid=" + storage.get('roomid'))
        .then(response => {
          this.list = response.body.result;
          this.getTotalResult();
        });
    },
    decNum(item, key) {
      this.$http
        .get(
          config.api_decCart +
            "?uid=" +
            storage.get('roomid') +
            "&product_id=" +
            item.product_id +
            "&num=" +
            item.num
        )
        .then(() => {
          this.getTotalResult();
        });
      if (item.num == 1) {
        this.list.splice(key, 1);
      } else {
        --item.num;
      }
    },
    incNum(item) {
      this.$http
        .get(
          config.api_incCart +
            "?uid=" +
            storage.get('roomid') +
            "&product_id=" +
            item.product_id +
            "&num=" +
            item.num
        )
        .then(() => {
          this.getTotalResult();
        });
      ++item.num;
    },
    getTotalResult() {
      var allPrice = 0;
      for (var i = 0; i < this.list.length; i++) {
        allPrice += parseFloat(this.list[i].price * this.list[i].num);
      }
      this.allPrcie = allPrice;
      this.$socket.emit("addcart", "addcart");
    },
    getpeopleinfolist() {
      this.$http
        .get(config.api_peopleInfoList + "?uid=" + storage.get('roomid'))
        .then(response => {
          this.peoplelist = response.body.result[0];
        });
    }
  },
  mounted() {
    //生命周期函数
    this.getCartData();
    this.getpeopleinfolist();
  },
  components: {
    "v-navfooter": NavFooter
  }
};
</script>

<style lang="scss">
.cart_content {
  padding: 1rem;

  .cart_info {
    background: #fff;
    text-align: left;
    h2 {
      text-align: center;
      font-size: 1.8rem;
      padding: 0.8rem 0px;
      border-bottom: 1px solid #eee;
    }

    border-radius: 0.5rem;

    padding: 0.5rem;

    .p_number {
      display: flex;
      padding: 0.5rem 0rem;

      border-bottom: 1px solid #eee;

      .p_number_left {
        flex: 1;

        p {
          line-height: 2;

          &:first-child {
            color: red;
          }
        }
      }

      .p_number_right {
        width: 4rem;
        height: 4rem;
        text-align: center;
        a {
          text-decoration: none;
        }
        img {
          width: 1.8rem;
          height: 1.8rem;
          margin: 0 auto;
        }
      }
    }

    .cart_p_num {
      p {
        line-height: 2.4rem;

        .price {
          font-size: 3rem;
          color: red;
        }
      }

      border-bottom: 1px solid #eee;
    }
  }

  .cart_list {
    padding: 0.5rem;
    background: #fff;
    border-radius: 0.5rem;
    margin-top: 1rem;

    ul {
      width: 100%;

      .item {
        display: flex;
        width: 100%;
        padding: 1rem 0px;
        border-bottom: 1px solid #eee;

        .left_food {
          flex: 1;
          display: flex;

          img {
            width: 4rem;
            border-radius: 0.5rem;
            height: 4rem;
          }

          .food_info {
            flex: 1;
            margin-left: 0.5rem;
          }
        }

        .right_cart {
          width: 10rem;
        }
      }
    }
  }

  .hot_food {
    background: #fff;

    margin-top: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 4rem;

    h3 {
      font-size: 1.4rem;
      padding: 0.5rem 0px;
      margin-left: 1rem;
    }

    .item_list_outer {
      width: 100%;
      overflow-x: auto;
      .item_list {
        padding: 0px 0.5rem;
        width: 50rem;

        li {
          width: 6rem;
          padding: 0.5rem;
          box-sizing: border-box;
          float: left;

          .inner {
            background: #fff;
            width: 100%;
            border-radius: 0.5rem;
            overflow: hidden;

            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
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

.cart_empty {
  text-align: center;
  line-height: 3rem;
  h3 {
    font-size: 1.8rem;
  }
}
</style>
