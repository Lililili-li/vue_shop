<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <Select class="select" @change="changpagesize($event.target.value)">
        <Option value="3" >3条每页</Option>
        <Option value="4" >4条每页</Option>
        <Option value="5" >5条每页</Option>
        </Select>
      <ul>
        <li class="prev" :class="{disabled:this.pageNo == 1}" @click="prevpage">
          <a >«上一页</a>
        </li>
        <li v-show="startnumandendnum.start>1" :class="{active:this.pageNo == 1}" @click="$emit('getpageNo',1)">
          <a>1</a>
        </li>
        <li class="dotted" v-show="startnumandendnum.start>2"><span>...</span></li>
        <li
          v-for="(item, index) in parseInt(startnumandendnum.end) " :key="index" v-show="item >= startnumandendnum.start" @click="$emit('getpageNo',item)" :class="{active:pageNo == item}">
          <a>{{ item }}</a>
        </li>
        <li class="dotted" v-show="pageNo<totalpage-parseInt(this.continues / 2)-1"><span>...</span></li>
        <li v-show="pageNo<totalpage-parseInt(this.continues/2)-1" :class="{active:this.pageNo == this.totalpage}" @click="$emit('getpageNo',totalpage)">
          <a>{{ totalpage }} </a>
        </li>
        <li class="next" @click="nextpage" :class="{disabled:this.pageNo == this.totalpage}">
          <a>下一页»</a>
        </li>
      </ul>
      <div>
        <span>共{{ totalpage }}页&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  data () {
    return {
      indexpage: 1,
      values: ''
    }
  },
  methods: {
    prevpage () {
      this.indexpage = this.pageNo
      this.indexpage = this.indexpage - 1
      if (this.indexpage < 1) {
        this.indexpage = 1
      }
      this.$emit('pageprev', this.indexpage)
    },
    nextpage () {
      this.indexpage = this.pageNo
      this.indexpage = this.indexpage + 1
      // console.log(this.indexpage)
      if (this.indexpage >= this.totalpage) {
        // console.log(1)
        this.indexpage = this.totalpage
      }
      this.$emit('pagenext', this.indexpage)
    },
    changpagesize (value) {
      console.log(value)
      this.$emit('changesize', value)
    }
  },
  computed: {
    totalpage () {
      return Math.ceil(this.total / this.pageSize)
    },
    // 起始数字和结束数字的计算
    startnumandendnum () {
      // 初始化开始结束的值
      let start = 0
      let end = 0
      // 如果连续分页数量大于总页数
      if (this.continues > this.totalpage) {
        start = 0
        end = this.totalpage
      } else {
        start = this.pageNo - parseInt(this.continues / 2)
        end = this.pageNo + parseInt(this.continues / 2)
        // 如果起始页为一的话，开始数字就小于1
        if (this.pageNo < parseInt(this.continues / 2) + 1) {
          start = 1
          end = this.continues
        } else if (this.pageNo > this.totalpage - parseInt(this.continues / 2)) {
          end = this.totalpage
          start = this.totalpage - this.continues + 1
        }
      }
      return { start, end }
    }
  }
}
</script>

<style scoped lang="less">
.page {
  width: 100%;
  height: 66px;
  overflow: hidden;
  margin: 0 auto;
  .sui-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    .select {
      padding-right: 25px;
      border-radius: 3px;
      font-size: 13px;
      padding-left: 8px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      outline: none;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      padding: 0 15px;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      &:hover {
        color: #409eff;
        border-color: #409eff;
      }
    }
    ul {
      // margin-left: 0;
      // margin-bottom: 0;
      vertical-align: middle;
      // padding-top: 6px;
      margin-right: 20px;
      flex: 5;
      margin: 0 auto;
      line-height: 27px;
      li {
        line-height: 18px;
        display: inline-block;
        margin-right: 5px;
        cursor: pointer;
        &:hover {
          a {
              color: #409eff;
          }

        }
        &:nth-child(1) {
          margin-left: 50px;
        }
        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: rgba(238, 238, 238, 0.632);
          font-size: 14px;
          padding: 5px 7px;
          color: #5E6BC2;
        }
        &.active {
          a {
            background-color: #8871ae;
            color: #FF75A3;
            cursor: default;
          }
        }
        &.prev {
          a {
            background-color: #fafafa;
          }
        }
        &.disabled {
          a {
            color: #999;
            cursor: default;
            pointer-events: none;
          }
        }
        &.dotted {
          span {
            margin-left: -1px;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            border: 0;
            padding: 9px 18px;
            color: #333;
          }
        }
        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }
    div {
      color: #333;
      font-size: 14px;
      flex: 1;
      font-size: 12px;
      font-weight: 700;
    }
  }
}
</style>
