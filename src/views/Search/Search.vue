<template>
  <div>
    <Header :userinfo = 'userinfo'/>
    <Nav />
    <Main @show="show" />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
import Main from '@/views/Search/children/Main.vue'
import { mapState } from 'vuex'
export default {
  name: 'Search',
  components: {
    Header,
    Footer,
    Main
  },
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    show (data) {
      if (!data) {
        this.$bus.$emit('clear')
      }
    }
  },
  computed: {
    ...mapState({
      userinfo: state => state.register.userinfo
    })
  }
}
</script>

<style scoped lang="less">
</style>
