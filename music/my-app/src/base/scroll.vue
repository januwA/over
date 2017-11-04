<template>    
    <div ref="wrapper">  
        <slot>暂无数据</slot>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import {mapGetters, mapActions} from 'vuex'
    
    export default {
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            data: {
                type: null,
                default: null
            },
            listenScroll: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            ...mapActions([
                'Escroll'
            ]),
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }

        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })

        if (this.listenScroll) {
          let me = this
          // 监听滚动事件
          this.scroll.on('scroll', (pos) => {
              me.Escroll(pos)
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
          this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
        mounted () {
           setTimeout(() => {
            this._initScroll()
          }, 20)
        },
        watch: {
            data () {
                setTimeout(() => {
                    this.refresh()
                }, 20)
            }
        }
    }
</script>

<style scoped>

</style>