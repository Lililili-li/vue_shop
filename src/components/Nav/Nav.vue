<template>
  <div class="type-nav">
    <div class="container">
      <h2 @mouseleave="navhide" @mouseenter="navshow">全部商品分类</h2>
      <ul class="nav">
        <li><a href="#">服装城</a></li>
        <li><a href="#">美会馆</a></li>
        <li><a href="#">超市</a></li>
        <li><a href="#">全球购</a></li>
        <li><a href="#">闪购</a></li>
        <li><a href="#">团购</a></li>
        <li><a href="#">有趣</a></li>
        <li><a href="#">秒杀</a></li>
      </ul>
      <transition name="sort">
        <div
          class="sort"
          @click="tosearch"
          v-show="show"
          @mouseenter="navshow"
          @mouseleave="navhide"
        >
          <ul class="list">
            <li
              class="haschild"
              v-for="item in categorylist"
              :key="item.categoryId"
            >
              <a
                :data-categoryName="item.categoryName"
                :data-category1Id="item.categoryId"
                >{{ item.categoryName }}</a
              >
              <div class="item-list">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="items in item.categoryChild"
                    :key="items.categoryId"
                  >
                    <dt>
                      <a
                        :data-categoryName="items.categoryName"
                        :data-category2Id="items.categoryId"
                        >{{ items.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="itemss in items.categoryChild"
                        :key="itemss.categoryId"
                      >
                        <a
                          :data-categoryName="itemss.categoryName"
                          :data-category3Id="itemss.categoryId"
                          >{{ itemss.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Nav',
  data () {
    return {
      show: true
    }
  },
  mounted () {
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      categorylist: (state) => state.home.categorylist
    })
  },
  methods: {
    tosearch (event) {
      // 使用事件委托性能优化
      const { categoryname } = event.target.dataset
      const { category1id } = event.target.dataset
      const { category2id } = event.target.dataset
      const { category3id } = event.target.dataset
      if (categoryname) {
        if (this.$route.params) {
          this.$router.push({
            name: 'search',
            query: { categoryname, category1id, category2id, category3id },
            params: this.$route.params
          })
        }
      }
      // console.log(this.$route.query);
    },
    navshow () {
      if (this.$route.path !== '/home') {
        this.show = true
      }
    },
    navhide () {
      if (this.$route.path !== '/home') {
        this.show = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    display: flex;
    position: relative;
    overflow: visible;
    h2 {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      text-align: center;
      color: #fff;
      line-height: 45px;
      font-size: 14px;
      font-weight: 700;
      transition: all 0.3s;
    }
    .nav {
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      li {
        margin-right: 10px;
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      z-index: 999;
      width: 210px;
      height: 510px;
      background: #fafafa;
      .list {
        position: relative;
        .haschild {
          &:hover {
            background-color: skyblue;
            .item-list {
              display: block !important;
            }
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 510px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;
            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;
              .fore {
                border-top: 0;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;
                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }
                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;
                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        li {
          > a {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            color: #333;
          }
        }
      }
    }
    .sort-enter {
      height: 0px;
    }
    .sort-enter-to {
      height: 510px;
    }
    .sort-enter-active {
      transition: all 0.3s linear;
    }
  }
}
</style>
