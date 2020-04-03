Component({
  properties: {
    dataSource: {
      type: Array,
      value: () => []
    },
    columns: {
      type: Array,
      value: () => [],
      // eslint-disable-next-line object-shorthand
      observer: function (value) {
        let sum = 0
        for (let index = 0; index < value.length; index++) {
          const element = value[index]
          if (element.width) {
            sum += element.width
          } else {
            throw Error(`columns item must set width , ${element.title} got no width`)
          }
        }
        this.setData({
          width: `${sum}rpx`
        })
      }
    },
    scrollTop: {
      type: Number,
      value: 0
    }
  },
  data: {
    width: '100%',
    test: 'rank',
    container: null,
  },
  attached() {
    this.getContainer()
  },
  methods: {
    getContainer() {
      const selectClassName = '.table'
      let container = null
      container = () => wx.createSelectorQuery()
        .in(this)
        .select(selectClassName)
      this.setData({container})
    }
  }
})
