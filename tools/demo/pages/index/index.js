import dataSource from '../../mock/performance'

Page({
  data: {
    dataSource: [],
    columns: [
      {
        title: '排名',
        key: 'index',
        width: 60,
        type: 'rank'
      },
      {
        title: '用户',
        key: 'admin_info.name',
        prop: 'admin_info',
        type: 'user',
        width: 260
      },
      {
        title: '上新',
        key: 'new_online_group.count',
        prop: 'new_online_group',
        width: 220,
        type: 'info-card'
      },
      {
        title: '预估提成(元)',
        key: 'bd_gain',
        prop: 'bd_gain',
        width: 220
      },
      {
        title: '在线门店',
        key: 'total_online',
        prop: 'total_online',
        width: 200
      },
      {
        title: '有效拜访',
        key: 'visit',
        prop: 'visit',
        width: 200
      },
      {
        title: '一通率',
        key: 'one_pass_rate',
        prop: 'one_pass_rate',
        width: 200
      },
    ],
    scrollTop: 0
  },
  onLoad() {
    this.initPage()
  },
  initPage() {
    this.setData({
      dataSource
    })
  },
  onPageScroll({scrollTop}) {
    this.setData({scrollTop})
  }
})
