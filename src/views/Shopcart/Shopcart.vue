/* eslint-disable no-unused-expressions */
<template>
<div>
  <Header :userinfo = "userinfo"/>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-for="(list1,index) in cartlist" :key="index">
        <ul class="cart-list" v-for="item in list1.cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked === 1" @change="changecart(item.skuId,$event.target.checked)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <li class="cart-list-con4">
            <span class="price">{{item.cartPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changenum(0,item,-1)">-</a>
            <input @change="changenum(1,item,$event.target.value)" autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt" style="outline:none;vertical-align:top;height:31px">
            <a href="javascript:void(0)" class="plus" @click="changenum(2,item,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{item.cartPrice*item.skuNum}}.00</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deletecart(item.skuId)" style="cursor:pointer">删除</a>
            <br>
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="ischecked && this.cartInfoList.length>0" @change="updateallchecked($event.target.checked)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteallcart">删除选中的商品</a>
        <a >移到我的关注</a>
        <a >清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalgoods}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalmoney}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" style="cursor:pointer;" @click="toTrade">结算</a>
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
import { mapState, mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      isChecked: 1
    }
  },
  mounted () {
    this.getcartlist()
  },
  methods: {
    getcartlist () {
      this.$store.dispatch('getcartlist')
    },
    async changecart (id, checked) {
      if (checked) {
        this.isChecked = 1
      } else {
        this.isChecked = 0
      }
      await this.$store.dispatch('changecart', { skuId: id, isChecked: this.isChecked })
      this.getcartlist()
    },
    async deletecart (id) {
      await this.$store.dispatch('deletecart', id)
      this.getcartlist()
    },
    changenum: throttle(async function (flag, cart, skuNum) {
      if (flag === 0) {
        if (cart.skuNum > 1) {
          skuNum = -1
        } else {
          skuNum = 0
          return
        }
      } else if (flag === 2) {
        skuNum = 1
      } else {
        if (isNaN(skuNum) || skuNum < 0) {
          skuNum = 0
        } else {
          skuNum = parseInt(skuNum) - cart.skuNum
        }
      }
      try {
        await this.$store.dispatch('addgoodscart', {
          skuId: cart.skuId,
          skuNum: skuNum
        })
        this.getcartlist()
      } catch (error) {
        this.$message.error('添加失败')
      }
    }, 1000),
    async deleteallcart () {
      try {
        await this.$store.dispatch('deleteallcart')
        this.getcartlist()
      } catch (error) {
        console.log(error)
      }

      // const PromiseAll = []
      // this.cartInfoList.forEach((item) => {
      //   // eslint-disable-next-line no-unused-expressions
      //   if (item.isChecked === 1) {
      //     const result = this.deletecart(item.skuId)
      //     PromiseAll.push(result)
      //   }
      // })
      // console.log(PromiseAll)
      // Promise.all(PromiseAll).then(() => {
      //   this.getcartlist()
      // })
    },
    updateallchecked: throttle(async function (data) {
      const ischecked = data ? '1' : '0'
      await this.$store.dispatch('updateallchecked', ischecked)
      this.getcartlist()
    }, 1000),
    toTrade () {
      this.$router.push({ name: 'trade' })
    }
  },
  computed: {
    ...mapState({
      userinfo: (state) => state.register.userinfo,
      cartlist: (state) => state.cartlist.cartlist || []
    }),
    ...mapGetters(['cartinfolist']),
    cartInfoList () {
      return this.cartinfolist.cartInfoList || []
    },
    totalmoney () {
      let sum = 0
      this.cartInfoList.forEach(element => {
        if (element.isChecked === 1) {
          sum = sum + (element.cartPrice * element.skuNum)
        }
      })
      return sum
    },
    ischecked () {
      return this.cartInfoList.every((item) => item.isChecked === 1)
    },
    totalgoods () {
      const arry = []
      this.cartInfoList.forEach(item => {
        if (item.isChecked === 1) {
          if (arry.indexOf(item === -1)) {
            arry.push(item)
          }
        }
      })
      return arry.length
    }
  }
}
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }
          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 15%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
