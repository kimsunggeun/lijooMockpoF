<template>
  <!-- 임윤주 tagview 수정 -->
  <!-- //tabviewbg //2022-03-17 by lyj tabview테마적용 2222222222222223-->

  <div id="tags-view-container" class="tags-view-container tabview_bg scrollDiv">
    <!-- <vue-scroll> -->
    <!-- <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll"> -->
    <div class="tags-view-wrapper scrollBox">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        <span v-bind:class="isActive(tag) ? '' : 'tabview_text--text'"> {{ getMenuTitle(tag) }}</span>
        <span>
          <v-btn x-small icon v-bind:color="isActive(tag) ? 'white' : 'gray'"
            ><v-icon x-small v-if="!isAffix(tag)" @click.prevent.stop="closeSelectedTag(tag)">$close</v-icon>
          </v-btn></span
        >
        <!-- <span><i v-if="!isAffix(tag)" class="far fa-window-close ml-1 mr-1" @click.prevent.stop="closeSelectedTag(tag)"></i></span> -->
      </router-link>
    </div>
    <!-- </scroll-pane> -->
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <!-- <li @click="refreshSelectedTag(selectedTag)">Refresh</li> -->
      <!-- <li @click="closeSelectedTag(selectedTag)">Close</li> -->
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul>
    <!-- </vue-scroll> -->
  </div>
</template>

<script>
import path from 'path'
import routers from '@/router'

export default {
  components: {},
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      options: {
        height: '100%',
        width: '100%',
        size: 2
      }
    }
  },
  created() {
    //20220406 LYJ SUPER경우 설정변경시 Tagviews 리셋처리
    this.$EventBus.$on('ResetTagviews', parm => {
      //this.refreshRouter(`${msg}`)
      this.ResetTagviews(parm)
    })
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      //return this.$store.state.permission.routes
      return routers.options.routes
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    ResetTagviews(parm) {
      this.closeAllTags(parm)
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []

      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)

          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        // if (route.children) {
        //   const tempTags = this.filterAffixTags(route.children, route.path)
        //   if (tempTags.length >= 1) {
        //     tags = [...tags, ...tempTags]
        //   }
        // }
      })
      return tags
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes))
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            // this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view

        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    //마지막 방문페이지로 이동 처리
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath).catch(() => {}) //20220406 LYJ EXCEPTION 처리
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/dashboard') //visitedView route가 없다면 dashboad로 이동
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.left = this.left - 20 //보정 처리 2022-03-16 by lyj
      this.top = e.clientY - 45 //보정 처리 2022-03-16 by lyj
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
    },
    getMenuTitle(tag) {
      return this.$t(tag.meta.title) //2021-09-23
    }
  }
}
</script>
<style scoped>
.wrapper {
  height: 300px;
  width: 300px;
}
</style>
