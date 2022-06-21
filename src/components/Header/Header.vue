<template>
  <div>
    <header>
      <div class="header">
        <div class="container">
          <div class="loginlist">
            <ul>
              <li>尚品汇欢迎您！</li>
              <li v-if="!userinfo.name">
                <span>请</span>
                <span @click="tologin">登录</span>
                <span @click="toregister" class="register">免费注册</span>
              </li>
              <li v-if="userinfo.name">
                <span >{{userinfo.name}}</span>
                <span class="logout" @click="logout">退出登录</span>
              </li>
            </ul>
          </div>
          <div class="mylist">
            <ul class="list">
              <li>
                <router-link to="/center">我的订单</router-link>
              </li>
              <li>
                <router-link to="/shopcart">我的购物车</router-link>
              </li>
              <li>
                <a href="#">我的商品汇</a>
              </li>
              <li>
                <a href="#">商品汇会员</a>
              </li>
              <li>
                <a href="#">企业采购</a>
              </li>
              <li>
                <a href="#">关注商品汇</a>
              </li>
              <li>
                <a href="#">合作招商</a>
              </li>
              <li>
                <a href="#">商家后台</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="banner">
        <div class="container">
          <h1>
            <router-link to="/home">
              <img src="@/assets/images/logo.png" alt="" style="width:175px;height:56px;"/>
            </router-link>
          </h1>
          <div class="search">
            <form action="#" class="form">
              <input type="text" v-model="inputvalue" />
              <span>
                <span @click="tosearch">搜索</span>
              </span>
            </form>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  props: ['userinfo'],
  data () {
    return {
      inputvalue: ''
    }
  },
  methods: {
    tologin () {
      this.$router.replace({
        path: '/login'
      })
    },
    toregister () {
      this.$router.push('/register')
    },
    tosearch () {
      // push方法返回的是一个promise函数，参数不变多次传参会报错，解决办法是给一个成功的函数体，一个失败的函数体捕获错误治标不治本
      if (this.$route.query) {
        this.$router.push({
          name: 'search',
          params: { keyword: this.inputvalue || undefined },
          query: this.$route.query
        })
      }
    },
    logout () {
      window.localStorage.removeItem('token')
      this.$store.dispatch('userlogout')
    }
  },
  mounted () {
    this.$bus.$on('clear', () => {
      this.inputvalue = ''
    })
  }
}
</script>

<style scoped lang="less">
header {
  .header {
    height: 30px;
    line-height: 30px;
    background-color: #eaeaea;
    .container {
      display: flex;
      justify-content: space-between;
      .loginlist {
        ul {
          overflow: hidden;
          li {
            float: left;
            &:nth-child(1) {
              margin-right: 10px;
            }
            &:nth-child(2) {
              .register {
                border-left: 1px solid #b3aeae;
              }
              span {
                &:nth-child(n + 1) {
                  color: #666;
                  padding: 0 5px;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
      .mylist {
        .list {
          overflow: hidden;
          li {
            float: left;
            &:nth-child(1) {
              a {
                border-left: none;
              }
            }
            a {
              color: #666;
              padding: 0 10px;
              border-left: 1px solid #b3aeae;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
  .banner {
    .container {
      display: flex;
      justify-content: space-between;
      h1 {
        font-size: 18px;
        padding: 25px 45px;
      }
      .search {
        margin-top: 35px;
        .form {
          display: flex;
          justify-content: space-between;
          input {
            width: 490px;
            height: 32px;
            padding: 0px 4px;
            border: 2px solid #ea4a36;
            outline: none;
            border-right: none;
          }
          span {
            color: #fff;
            background-color: #ea4a36;
            height: 36px;
            line-height: 32px;
            width: 68px;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
