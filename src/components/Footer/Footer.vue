<template>
  <div>
    <footer>
      <div class="container">
        <div class="footer-container">
          <div class="footerList">
            <ul class="list1">
              <h4>购物指南</h4>
              <li>购物流程</li>
              <li>会员介绍</li>
              <li>生活旅行/团购</li>
              <li>常见问题</li>
              <li>购物指南</li>
            </ul>
            <ul class="list1">
              <h4>配送方式</h4>
              <li>上门自提</li>
              <li>211限时达</li>
              <li>配送服务查询</li>
              <li>配送费收取标准</li>
              <li>海外配送</li>
            </ul>
            <ul class="list1">
              <h4>支付方式</h4>
              <li>货到付款</li>
              <li>在线支付</li>
              <li>分期付款</li>
              <li>邮局汇款</li>
              <li>公司转账</li>
            </ul>
            <ul class="list1">
              <h4>售后服务</h4>
              <li>售后政策</li>
              <li>价格保护</li>
              <li>退款说明</li>
              <li>返修/退换货</li>
              <li>取消订单</li>
            </ul>
            <ul class="list1">
              <h4>特色服务</h4>
              <li>夺宝岛</li>
              <li>DIY装机</li>
              <li>延保服务</li>
              <li>尚品汇E卡</li>
              <li>尚品汇通信</li>
            </ul>
            <div>
              <h4>帮助中心</h4>
              <img src="@/assets/images/myname.jpg" alt="" />
              <span>联系我@！</span>
            </div>
          </div>
          <div class="alllist">
            <ul class="list">
              <li>关于我们</li>
              <li>联系我们</li>
              <li>关于我们</li>
              <li>商家入驻</li>
              <li>营销中心</li>
              <li>友情链接</li>
              <li>关于我们</li>
              <li>营销中心</li>
              <li>友情链接</li>
              <li>关于我们</li>
            </ul>
            <p>地址：北京市昌平区宏福科技园综合楼6层</p>
            <p>京ICP备19006430号</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  components: {},
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
footer {
  background-color: #eaeaea;
  .container {
    .footer-container {
      padding: 0 15px;
      border-top: 1px solid #e4e1e1;
      .footerList {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        padding-left: 40px;
        border-bottom: 1px solid #e4e1e1;
        .list1 {
          h4 {
            font-size: 14px;
          }
        }
        > div {
          width: 121px;
          img {
            width: 100%;
            transform: translate(-28%);
          }
        }
      }
      .alllist {
        padding: 20px;
        .list {
          overflow: hidden;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          line-height: 18px;
          li {
            float: left;
            border-right: 1px solid #666;
            padding: 0 10px;
            &:last-child {
              border-right: none;
            }
          }
        }
        p {
            text-align: center;
            margin-top: 10px;
        }
      }
    }
  }
}
</style>
