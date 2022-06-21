<template>
  <div>
    <Header :userinfo = 'userinfo'/>
    <Nav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="item in floorlist" :key="item.id" :list = "item"/>
    <Brand />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
import ListContainer from '@/views/Home/ListContainer/ListContainer.vue'
import Recommend from '@/views/Home/Recommend/Recommend.vue'
import Rank from '@/views/Home/children/Rank.vue'
import Like from '@/views/Home/children/Like.vue'
import Floor from '@/views/Home/children/Floor.vue'
import Brand from '@/views/Home/children/Brand.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    Header,
    Footer,
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  data () {
    return {}
  },
  methods: {
    // getuserinfo () {
    //   const token = window.localStorage.getItem('token')
    //   if (token) {
    //     this.$store.dispatch('getuserinfo')
    //   }
    // }
  },
  mounted () {
    this.$store.dispatch('getfloorlist')
    // this.getuserinfo()
  },
  computed: {
    ...mapState({
      floorlist: (state) => state.home.floorlist,
      userinfo: (state) => state.register.userinfo
    })
  }
}
</script>

<style scoped lang="less">
</style>
