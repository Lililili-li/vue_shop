# vue_shop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

<Pagination :pageNo="page" :pageSize = "pagedata.size" :total = "pagedata.total" :continues = '5'  @getpageNo = 'getpageNo' @pageprev = "pageprev" @pagenext = "pagenext" @changesize="changesize"/>自己用的分页器，pageNo当前页码pageSize 每页显示条数total 总条数getpageNo 动态切换当前页码pageprev 切换到上一页pagenext 切换到下一页changesize下拉框选择每条显示条数

 getpageNo (index) {

   this.page = index

   console.log(this.page)

   this.getpagelist()

  },

  pageprev (pageprev) {

   this.page = pageprev

   if (this.page <= 1) {

​    return

   }

   this.getpagelist()

  },

  pagenext (pagenext) {

   this.page = pagenext

   if (this.page >= Math.ceil(this.pagedata.total / this.limit)) {

​    return

   }

   this.getpagelist()

  },

  changesize (value) {

   this.limit = value

   this.getpagelist()

  }
