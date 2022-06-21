<template>
<div class="body">
  <Header :userinfo = "userinfo"/>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
      <h3><i class="sui-icon icon-pc-right"></i>商品已成功加入购物车！</h3>
      <div class="goods" v-for="(item,index) in skuInfo" :key="index">
        <div class="left-good">
          <div class="left-pic">
            <img :src="item.skuDefaultImg">
          </div>
          <div class="right-info">
            <p class="title">{{item.skuName}}</p>
            <p class="attr">{{item.skuDesc}}
              <span v-if="item.has">数量：{{skuNum}}</span>
              <span v-else>数量：{{skum}}</span>
              </p>
            <!-- <p class="attr1" v-if="skum !== skuNum &&skum ===1">{{item.skuDesc}} 数量：{{skum}}</p> -->
          </div>
        </div>
        <div class="right-gocart">
          <a class="sui-btn btn-xlarge" @click="todetial">查看商品详情</a>
          <router-link to="/shopcart">去购物车结算 > </router-link>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</div>

</template>

<script>
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
import { mapState } from 'vuex'
export default {
  name: 'AddCartSuccess',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      skuInfo: [],
      skuNum: this.$route.query.skuNum || window.sessionStorage.getItem('skuNum'),
      skum: 1
    }
  },
  methods: {
    todetial () {
      this.$router.push({ name: 'detial', params: { skuId: this.skuInfo.id } })
    }
  },
  mounted () {
    const skuinfo = JSON.parse(window.sessionStorage.getItem('skuinfo')) || {}
    const goodsinfo = JSON.parse(window.sessionStorage.getItem('goodsinfo')) || {}
    if (Object.keys(skuinfo).length !== 0) {
      this.skuInfo.push(skuinfo)
    }
    if (Object.keys(goodsinfo).length !== 0) {
      this.skuInfo.push(goodsinfo)
    }
    this.skum = window.sessionStorage.getItem('num')
  },
  computed: {
    ...mapState({
      userinfo: (state) => state.register.userinfo
    })
  }
}
</script>

<style lang="less" scoped>
  .cart-complete-wrap {
    background-color: #f4f4f4;

    .cart-complete {
      width: 1200px;
      margin: 0 auto;

      h3 {
        font-weight: 400;
        font-size: 16px;
        color: #6aaf04;
        padding-top: 15px;
        padding-bottom: 15px;
        margin: 0;

        .icon-pc-right {
          background-color: #fff;
          border: 2px solid #6aaf04;
          padding: 3px;
          margin-right: 8px;
          border-radius: 15px;
        }
      }

      .goods {
        overflow: hidden;
        padding: 10px 0;

        .left-good {
          float: left;

          .left-pic {
            border: 1px solid #dfdfdf;
            width: 60px;
            float: left;
            img {
              width: 60px;
              height: 60px;
            }
          }

          .right-info {
            color: #444;
            float: left;
            margin-left: 10px;

            .title {
              width: 100%;
              line-height: 28px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 14px;
            }

            .attr {
              color: #aaa;
            }
          }
        }

        .right-gocart {
          float: right;

          a {
            padding: 7px 36px;
            font-size: 15px;
            line-height: 22px;
            color: #333;
            background-color: #eee;
            text-decoration: none;
            box-sizing: border-box;
            border: 1px solid #e1e1e1;
          }

          a:hover {
            background-color: #f7f7f7;
            border: 1px solid #eaeaea;
          }

          a:active {
            background-color: #e1e1e1;
            border: 1px solid #d5d5d5;
          }

          .btn-danger {
            background-color: #e1251b;
            color: #fff;
          }

          .btn-danger:hover {
            background-color: #e1251b;
          }
        }

      }
    }
  }
</style>
