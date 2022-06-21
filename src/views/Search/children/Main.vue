<template>
  <div class="container">
    <div class="bread">
      <div class="result"><a href="#">全部结果</a></div>
      <ul class="list">
        <li v-show="searchlist.categoryName">
          <a href="#">{{ searchlist.categoryName }}</a>
          <i @click="showinfo">×</i>
        </li>
        <li v-show="searchlist.keyword">
          <a href="#">{{ searchlist.keyword }}</a>
          <i @click="removekeyword">×</i>
        </li>
        <li v-show="searchlist.trademark">
          <a href="#">{{ name }}</a>
          <i @click="removetrademark">×</i>
        </li>
        <li v-for="(item, index) in searchlist.props" :key="index">
          <a href="#">{{ item.split(":")[1] }}</a>
          <i @click="removeprops(index)">×</i>
        </li>
      </ul>
    </div>
    <div class="selector">
      <div class="type-wrap logo">
        <div class="model key">品牌</div>
        <div class="value logos">
          <ul class="logo-list">
            <li
              v-for="item in trademarkList"
              :key="item.tmId"
              @click="selector(item)"
            >
              {{ item.tmName }}
            </li>
          </ul>
        </div>
        <div class="ext">
          <a href="#" class="sui-btn">多选</a>
          <a href="#">更多</a>
        </div>
      </div>
      <div class="type-wrap" v-for="item in attrsList" :key="item.attrId">
        <div class="key">{{ item.attrName }}</div>
        <div class="value">
          <ul class="type-list">
            <li
              v-for="(item1, index) in item.attrValueList"
              :key="index"
              @click="attrinfo(item.attrId, item.attrName, item1)"
            >
              <a>{{ item1 }}</a>
            </li>
          </ul>
        </div>
        <div class="ext"></div>
      </div>
    </div>
    <div class="details">
      <div class="sui-navbar">
        <div class="navbar-inner filter">
          <ul class="sui-nav">
            <li @click="comsort" :class="{active:searchlist.order.indexOf('1') !== -1}">
              <a >综合</a>
            </li>
            <li>
              <a href="#">销量</a>
            </li>
            <li>
              <a href="#">新品</a>
            </li>
            <li>
              <a href="#">评价</a>
            </li>
            <li @click="priceasc" :class="{active:searchlist.order.indexOf('2:desc') !== -1}">
              <a>价格⬆</a>
            </li>
            <li @click="pricedesc" :class="{active:searchlist.order.indexOf('2:asc') !== -1}">
              <a>价格⬇</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="goods-list">
        <ul class="yui3-g">
          <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
            <div class="list-wrap">
              <div class="p-img">
                <!-- <router-link :to="`/detial/${item.id}`">
                  <img :src="item.defaultImg" />
                </router-link> -->
                <a @click="todetial(item.id)">
                  <img v-lazy="item.defaultImg" />
                </a>
              </div>
              <div class="price">
                <strong>
                  <em>¥</em>
                  <i>{{ item.price }}</i>
                </strong>
              </div>
              <div class="attr">
                <a :title="item.title">
                  {{ item.title }}
                </a>
              </div>
              <div class="commit">
                <i class="command">已有<span>2000</span>人评价</i>
              </div>
              <div class="operate">
                <a  @click="addcart(item.id)"
                  class="sui-btn btn-bordered btn-danger"
                  >加入购物车</a
                >
                <a class="sui-btn btn-bordered"
                  >收藏</a
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
      <Pagination :pageNo = "searchlist.pageNo" :pageSize = "searchlist.pageSize" :total="total" :continues = "5" @getpageNo = 'getpageNo' @pageprev = "pageprev" @pagenext = "pagenext"/>
    </div>
    <div class="clearfix hot-sale">
      <h4 class="title">热卖商品</h4>
      <div class="hot-list">
        <ul class="yui3-g">
          <li class="yui3-u-1-4">
            <div class="list-wrap">
              <div class="p-img">
                <img src="./images/like_01.png" />
              </div>
              <div class="attr">
                <em>Apple苹果iPhone 6s (A1699)</em>
              </div>
              <div class="price">
                <strong>
                  <em>¥</em>
                  <i>4088.00</i>
                </strong>
              </div>
              <div class="commit">
                <i class="command">已有700人评价</i>
              </div>
            </div>
          </li>
          <li class="yui3-u-1-4">
            <div class="list-wrap">
              <div class="p-img">
                <img src="./images/like_03.png" />
              </div>
              <div class="attr">
                <em>金属A面，360°翻转，APP下单省300！</em>
              </div>
              <div class="price">
                <strong>
                  <em>¥</em>
                  <i>4088.00</i>
                </strong>
              </div>
              <div class="commit">
                <i class="command">已有700人评价</i>
              </div>
            </div>
          </li>
          <li class="yui3-u-1-4">
            <div class="list-wrap">
              <div class="p-img">
                <img src="./images/like_04.png" />
              </div>
              <div class="attr">
                <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
              </div>
              <div class="price">
                <strong>
                  <em>¥</em>
                  <i>4068.00</i>
                </strong>
              </div>
              <div class="commit">
                <i class="command">已有20人评价</i>
              </div>
            </div>
          </li>
          <li class="yui3-u-1-4">
            <div class="list-wrap">
              <div class="p-img">
                <img src="./images/like_02.png" />
              </div>
              <div class="attr">
                <em>Apple苹果iPhone 6s (A1699)</em>
              </div>
              <div class="price">
                <strong>
                  <em>¥</em>
                  <i>4088.00</i>
                </strong>
              </div>
              <div class="commit">
                <i class="command">已有700人评价</i>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: '',
  data () {
    return {
      searchlist: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        order: '1:desc',
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: ''
      },
      name: '',
      up: true,
      num: 1
    }
  },
  methods: {
    getsearch () {
      this.searchlist.category1Id = this.$route.query.category1id
      this.searchlist.category2Id = this.$route.query.category2id
      this.searchlist.category3Id = this.$route.query.category3id
      this.searchlist.categoryName = this.$route.query.categoryname
      this.searchlist.keyword = this.$route.params.keyword
      this.$route.query.order = this.searchlist.order
      this.$route.query.pageNo = this.searchlist.pageNo
      this.$route.query.pageSize = this.searchlist.pageSize
      this.$route.query.props = this.searchlist.props
      this.$route.query.trademark = this.searchlist.trademark
      this.$store.dispatch('getsearchlist', this.searchlist)
      // console.log(this.searchlist.order);
    },
    showinfo () {
      this.searchlist.pageNo = 1
      this.$route.query.categoryname = undefined
      this.$route.query.category1id = undefined
      this.$route.query.category2id = undefined
      this.$route.query.category3id = undefined
      this.getsearch()
      this.$router.push({ name: 'search', params: this.$route.params })
    },
    removekeyword () {
      this.searchlist.pageNo = 1
      this.$route.query.params.keyword = undefined
      this.getsearch()
      this.$router.push({ name: 'search', query: this.$route.query })
      this.$emit('show', '')
    },
    selector (data) {
      this.searchlist.pageNo = 1
      this.searchlist.trademark = `${data.tmId}:${data.tmName}`
      this.getsearch()
      this.$router.push({ name: 'search', query: this.$route.query })
      this.name = this.searchlist.trademark.split(':')[1]
    },
    removetrademark () {
      this.searchlist.pageNo = 1
      this.searchlist.trademark = undefined
      this.getsearch()
      this.$router.push({ name: 'search', query: this.$route.query })
    },
    attrinfo (id, name, value) {
      // this.searchlist.props.push(id,name,value)
      this.searchlist.pageNo = 1
      const props = `${id}:${value}:${name}`
      if (this.searchlist.props.indexOf(props) === -1) {
        this.searchlist.props.push(props)
        this.getsearch()
      }
    },
    removeprops (index) {
      this.searchlist.pageNo = 1
      this.searchlist.props.splice(index, 1)
      this.getsearch()
    },
    comsort () {
      this.searchlist.pageNo = 1
      let order = '1:asc'
      if (!this.up) {
        order = '1:desc'
      }
      this.up = !this.up
      this.searchlist.order = order
      this.getsearch()
    },
    priceasc () {
      this.searchlist.pageNo = 1
      const order = '2:desc'
      this.searchlist.order = order
      this.getsearch()
    },
    pricedesc () {
      this.searchlist.pageNo = 1
      const order = '2:asc'
      this.searchlist.order = order
      this.getsearch()
    },
    getpageNo (index) {
      this.searchlist.pageNo = index
      this.getsearch()
    },
    pageprev (pageprev) {
      this.searchlist.pageNo = pageprev
      this.getsearch()
    },
    pagenext (pagenext) {
      this.searchlist.pageNo = pagenext
      this.getsearch()
    },
    todetial (id) {
      this.$router.push({
        name: 'detial',
        params: {
          skuId: `${id}`
        }
      })
    },
    async addcart (id) {
      const token = window.localStorage.getItem('token')
      if (token) {
        await this.$store.dispatch('getdetial', id)
        await this.$store.dispatch('addgoodscart', { skuId: id, skuNum: this.num })
        window.sessionStorage.removeItem('goodsinfo', 'num')
        window.sessionStorage.setItem('goodsinfo', JSON.stringify(this.skuInfo))
        window.sessionStorage.setItem('num', this.num)
      }
      setTimeout(() => {
        this.$router.push({ name: 'addcartsuccess' })
      }, 500)
    }
  },
  mounted () {
    this.getsearch()
  },
  computed: {
    ...mapState({
      goodsList: (state) => state.search.searchlist.goodsList,
      trademarkList: (state) => state.search.searchlist.trademarkList,
      attrsList: (state) => state.search.searchlist.attrsList,
      total: (state) => state.search.searchlist.total,
      skuInfo: (state) => state.detial.detialist.skuInfo || {}
    })
  },
  watch: {
    $route (oldValue, newValu) {
      this.searchlist.category1Id = this.$route.query.category1id
      this.searchlist.category2Id = this.$route.query.category2id
      this.searchlist.category3Id = this.$route.query.category3id
      this.searchlist.categoryName = this.$route.query.categoryname
      this.searchlist.keyword = this.$route.params.keyword
      this.$route.query.order = this.searchlist.order
      this.$route.query.pageNo = this.searchlist.pageNo
      this.$route.query.pageSize = this.searchlist.pageSize
      this.$route.query.props = this.searchlist.props
      this.$route.query.trademark = this.searchlist.trademark
      this.getsearch()
      this.searchlist.category1Id = undefined
      this.searchlist.category2Id = undefined
      this.searchlist.category3Id = undefined
    }
  }
}
</script>

<style scoped lang="less">
.bread {
  display: flex;
  align-items: center;
  height: 50px;
  .result {
    > a {
      padding: 3px 15px;
      margin: 0;
      font-weight: 400;
      border-radius: 3px;
    }
  }
  .list {
    list-style: none;
    font-size: 0;
    line-height: 0;
    display: flex;
    align-items: center;
    li {
      font-size: 12px;
      margin: 0 5px 5px 0;
      display: inline-block;
      overflow: hidden;
      color: #000;
      background: #f7f7f7;
      padding: 0 7px;
      height: 20px;
      line-height: 20px;
      border: 1px solid #dedede;
      white-space: nowrap;
      transition: color 400ms;
      cursor: pointer;
      a {
        transition: color 400ms;
      }
      &:hover {
        color: #28a3ef;
        a {
          color: #28a3ef;
        }
      }
    }
  }
}
.selector {
  border: 1px solid #ddd;
  border-top: none;
  margin-bottom: 5px;
  overflow: hidden;
  .type-wrap {
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;
    a {
      color: #666;
    }
    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }
    .model {
      padding-bottom: 87px !important;
    }
    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;
    }
    .logos {
      ul {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;
        }
      }
    }
    .ext {
      position: absolute;
      top: 10px;
      right: 10px;
      .sui-btn {
        display: inline-block;
        padding: 2px 14px;
        box-sizing: border-box;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
        margin-right: 5px;
      }
      a {
        color: #666;
      }
    }
    .type-list {
      li {
        float: left;
        display: block;
        margin-right: 30px;
        line-height: 26px;
      }
    }
  }
}
.details {
  margin-bottom: 5px;
  .sui-navbar {
    .filter {
      min-height: 40px;
      padding-right: 20px;
      background: #fbfbfb;
      border: 1px solid #e2e2e2;
      padding-left: 0;
      border-radius: 0;
      box-shadow: 0 1px 4px rgb(0 0 0 / 7%);
      .sui-nav {
        display: flex;
        li {
          line-height: 18px;
          a {
            display: block;
            cursor: pointer;
            padding: 11px 15px;
            color: #777;
          }
        }
        .active {
          background: #e1251b;
          a {
            color: #fff;
          }
        }
      }
    }
  }
  .goods-list {
    margin: 20px 0;
    i {
      font: 18px "Microsoft YaHei";
      font-weight: 700;
    }
    .yui3-g {
      display: flex;
      flex-wrap: wrap;
      .yui3-u-1-5 {
        height: 100%;
        width: 20%;
        margin-top: 10px;
        line-height: 28px;
        .list-wrap {
          .p-img {
            padding-left: 15px;
            width: 215px;
            height: 255px;
            a {
              &:hover {
                color: rgb(79, 76, 212) !important;
              }
              img {
                max-width: 100%;
                height: auto;
                vertical-align: middle;
              }
            }
          }
          .price {
            padding-left: 15px;
            font-size: 18px;
            color: #c81623;
            strong {
              font-weight: 700;
              i {
                margin-left: 5px;
              }
            }
          }
          .attr {
            padding-left: 15px;
            width: 85%;
            overflow: hidden;
            margin-bottom: 8px;
            min-height: 38px;
            cursor: pointer;
            line-height: 1.8;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            a {
              &:hover {
                color: rgb(79, 76, 212) !important;
              }
              color: #333;
            }
          }
          .commit {
            padding-left: 15px;
            height: 22px;
            font-size: 13px;
            color: #a7a7a7;
            .command {
              font-weight: normal;
              font-size: 16px;
              span {
                font-weight: 700;
                color: #646fb0;
              }
            }
          }
          .operate {
            padding: 12px 15px;
            > a {
              min-width: 85px;
              background-color: transparent;
              border: 1px solid #8c8c8c;
              color: #8c8c8c;
              display: inline-block;
              padding: 2px 14px px;
              box-sizing: border-box;
              margin-bottom: 0;
              font-size: 12px;
              line-height: 18px;
              text-align: center;
              vertical-align: middle;
              cursor: pointer;
              border-radius: 0;
              margin-right: 15px;
            }
            .btn-danger {
              border: 1px solid #e1251b;
              color: #e1251b;
            }
          }
        }
      }
    }
  }
}
.hot-sale {
  margin-bottom: 5px;
  border: 1px solid #ddd;
  .title {
    font-weight: 700;
    font-size: 14px;
    line-height: 21px;
    border-bottom: 1px solid #ddd;
    background: #f1f1f1;
    color: #333;
    margin: 0;
    padding: 5px 0 5px 15px;
  }
  .hot-list {
    padding: 15px;
    ul {
      display: flex;
      li {
        width: 25%;
        height: 100%;
        .list-wrap {
          cursor: pointer;
          .p-img,
          .price,
          .attr,
          .commit {
            padding-left: 15px;
          }
          .p-img {
            img {
              max-width: 100%;
              vertical-align: middle;
              border: 0;
            }
          }
          .attr {
            width: 85%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin-bottom: 8px;
            min-height: 38px;
            cursor: pointer;
            line-height: 1.8;
          }
          .price {
            font-size: 18px;
            color: #c81623;
            strong {
              font-weight: 700;
              i {
                margin-left: 5px;
                font: 18px "Microsoft YaHei";
                font-weight: 700;
              }
            }
          }
          .commit {
            height: 22px;
            font-size: 13px;
            color: #a7a7a7;
            .command {
              font: 14px "Microsoft YaHei";
            }
          }
        }
      }
    }
  }
}
</style>
