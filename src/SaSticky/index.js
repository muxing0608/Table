/* eslint-disable promise/catch-or-return */
// this height containerHeight containerTop
const ROOT_ELEMENT = '.sa-sticky'

function getIfFixed({
  scrollTop,
  containerHeight,
  containerTop,
  isScrolling,
  height,
}) {
  const top = isScrolling ? 0 : scrollTop - containerTop

  const fixed = top > height && top < containerHeight - height
  const isInContainer =
    scrollTop > containerTop && scrollTop < containerHeight + containerTop
  // console.log(`header is ${top}`, `fixed is ${fixed}`)
  return {
    fixed,
    top: isInContainer && !top ? scrollTop - containerTop : top,
    isInContainer,
  }
}


Component({
  properties: {
    scrollTop: {
      type: Number,
      value: 0,
      // eslint-disable-next-line object-shorthand
      observer: function () {
        this.setFixed()
      }
    },
    onContainer: {
      type: Function,
      value: null,
      // eslint-disable-next-line object-shorthand
      observer: function () {
        setTimeout(() => {
          this.getContainerInfo()
          this.initObserver()
        }, 1000)
      }
    },
    zIndex: {
      type: Number,
      value: 1
    },
    isScrolling: {
      value: false,
      type: Boolean,
      // eslint-disable-next-line object-shorthand
      observer: function () {
        this.setFixed()
      }
    }
  },
  data: {
    fixed: false,
    top: 0,
    height: 0,
  },
  methods: {
    getRect(selector, all) {
      return new Promise(resolve => {
        wx.createSelectorQuery()
          .in(this)[all ? 'selectAll' : 'select'](selector)
          .boundingClientRect(rect => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect)
            }
            if (!all && rect) {
              resolve(rect)
            }
          })
          .exec()
      })
    },
    getContainerRect() {
      const nodesRef = this.data.onContainer()
      return new Promise(resolve => nodesRef.boundingClientRect(resolve).exec())
    },
    initObserver() {
      this.getRect(ROOT_ELEMENT).then(rect => {
        this.height = rect.height
        console.log(ROOT_ELEMENT, rect)
      })
    },
    getContainerInfo() {
      if (typeof this.data.onContainer !== 'function') {
        return
      }

      this.getContainerRect().then(rect => {
        // console.log(
        //   rect.top,
        //   this.props.scrollTop,
        //   rect.top + this.props.scrollTop
        // )
        console.log(rect)

        this.containerHeight = rect.height
        this.containerTop = rect.top + this.data.scrollTop
      })
    },
    setFixed() {
      const {height, containerHeight, containerTop} = this
      const {scrollTop, isScrolling} = this.data
      console.log(height, containerHeight, containerTop)
      const {fixed, top} = getIfFixed({
        scrollTop,
        containerHeight,
        containerTop,
        isScrolling,
        height,
      })

      this.setData({
        fixed,
        top,
        height
      })
    }
  },
  attached() {
    this.initObserver()
  }

})
