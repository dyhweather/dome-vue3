<template>
  <div class="page">
    <div class="head">
      <h1>可视化大屏</h1>
      <span class="time"> 当前时间 {{ currentTime }} </span>
    </div>
    <div class="main">
      <div class="column">
        <div class="panel bar">
          <h2>柱形图-就业行业</h2>
          <div class="chart" id="bar1"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line">
          <h2>
            折线图-人员变化
            <a-button type="link">2021</a-button>
            <a-button type="link">2022</a-button>
          </h2>
          <div class="chart" id="bar3"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2>饼形图-年龄分布</h2>
          <div class="chart" id="bar5"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="column">
        <div class="no">
          <div class="no-hd">
            <ul>
              <li>13333</li>
              <li>22435</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li>前端需求人数</li>
              <li>市场供应人数</li>
            </ul>
          </div>
        </div>
        <div class="map">
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
          <div class="chart" id="map"></div>
        </div>
      </div>
      <div class="column">
        <div class="panel bar">
          <h2>柱形图-就业行业</h2>
          <div class="chart" id="bar2"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line">
          <h2>折线图-播放量</h2>
          <div class="chart" id="bar4"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2>柱形图-地区分布</h2>
          <div class="chart" id="bar6"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import '@/utils/china.js' // 中国地图
// 模拟航线地图模块 https://www.makeapie.cn/echarts_content/x0-ExSkZDM.html

const currentTime = ref(new Date().toLocaleString())

setInterval(() => {
  currentTime.value = new Date().toLocaleString()
}, 1000)
const geoCoordMap = {
  上海: [121.4648, 31.2891],
  东莞: [113.8953, 22.901],
  东营: [118.7073, 37.5513],
  中山: [113.4229, 22.478],
  临汾: [111.4783, 36.1615],
  临沂: [118.3118, 35.2936],
  丹东: [124.541, 40.4242],
  丽水: [119.5642, 28.1854],
  乌鲁木齐: [87.9236, 43.5883],
  佛山: [112.8955, 23.1097],
  保定: [115.0488, 39.0948],
  兰州: [103.5901, 36.3043],
  包头: [110.3467, 41.4899],
  北京: [116.4551, 40.2539],
  北海: [109.314, 21.6211],
  南京: [118.8062, 31.9208],
  南宁: [108.479, 23.1152],
  南昌: [116.0046, 28.6633],
  南通: [121.1023, 32.1625],
  厦门: [118.1689, 24.6478],
  台州: [121.1353, 28.6688],
  合肥: [117.29, 32.0581],
  呼和浩特: [111.4124, 40.4901],
  咸阳: [108.4131, 34.8706],
  哈尔滨: [127.9688, 45.368],
  唐山: [118.4766, 39.6826],
  嘉兴: [120.9155, 30.6354],
  大同: [113.7854, 39.8035],
  大连: [122.2229, 39.4409],
  天津: [117.4219, 39.4189],
  太原: [112.3352, 37.9413],
  威海: [121.9482, 37.1393],
  宁波: [121.5967, 29.6466],
  宝鸡: [107.1826, 34.3433],
  宿迁: [118.5535, 33.7775],
  常州: [119.4543, 31.5582],
  广州: [113.5107, 23.2196],
  廊坊: [116.521, 39.0509],
  延安: [109.1052, 36.4252],
  张家口: [115.1477, 40.8527],
  徐州: [117.5208, 34.3268],
  德州: [116.6858, 37.2107],
  惠州: [114.6204, 23.1647],
  成都: [103.9526, 30.7617],
  扬州: [119.4653, 32.8162],
  承德: [117.5757, 41.4075],
  拉萨: [91.1865, 30.1465],
  无锡: [120.3442, 31.5527],
  日照: [119.2786, 35.5023],
  昆明: [102.9199, 25.4663],
  杭州: [119.5313, 29.8773],
  枣庄: [117.323, 34.8926],
  柳州: [109.3799, 24.9774],
  株洲: [113.5327, 27.0319],
  武汉: [114.3896, 30.6628],
  汕头: [117.1692, 23.3405],
  江门: [112.6318, 22.1484],
  沈阳: [123.1238, 42.1216],
  沧州: [116.8286, 38.2104],
  河源: [114.917, 23.9722],
  泉州: [118.3228, 25.1147],
  泰安: [117.0264, 36.0516],
  泰州: [120.0586, 32.5525],
  济南: [117.1582, 36.8701],
  济宁: [116.8286, 35.3375],
  海口: [110.3893, 19.8516],
  淄博: [118.0371, 36.6064],
  淮安: [118.927, 33.4039],
  深圳: [114.5435, 22.5439],
  清远: [112.9175, 24.3292],
  温州: [120.498, 27.8119],
  渭南: [109.7864, 35.0299],
  湖州: [119.8608, 30.7782],
  湘潭: [112.5439, 27.7075],
  滨州: [117.8174, 37.4963],
  潍坊: [119.0918, 36.524],
  烟台: [120.7397, 37.5128],
  玉溪: [101.9312, 23.8898],
  珠海: [113.7305, 22.1155],
  盐城: [120.2234, 33.5577],
  盘锦: [121.9482, 41.0449],
  石家庄: [114.4995, 38.1006],
  福州: [119.4543, 25.9222],
  秦皇岛: [119.2126, 40.0232],
  绍兴: [120.564, 29.7565],
  聊城: [115.9167, 36.4032],
  肇庆: [112.1265, 23.5822],
  舟山: [122.2559, 30.2234],
  苏州: [120.6519, 31.3989],
  莱芜: [117.6526, 36.2714],
  菏泽: [115.6201, 35.2057],
  营口: [122.4316, 40.4297],
  葫芦岛: [120.1575, 40.578],
  衡水: [115.8838, 37.7161],
  衢州: [118.6853, 28.8666],
  西宁: [101.4038, 36.8207],
  西安: [109.1162, 34.2004],
  贵阳: [106.6992, 26.7682],
  连云港: [119.1248, 34.552],
  邢台: [114.8071, 37.2821],
  邯郸: [114.4775, 36.535],
  郑州: [113.4668, 34.6234],
  鄂尔多斯: [108.9734, 39.2487],
  重庆: [107.7539, 30.1904],
  金华: [120.0037, 29.1028],
  铜川: [109.0393, 35.1947],
  银川: [106.3586, 38.1775],
  镇江: [119.4763, 31.9702],
  长春: [125.8154, 44.2584],
  长沙: [113.0823, 28.2568],
  长治: [112.8625, 36.4746],
  阳泉: [113.4778, 38.0951],
  青岛: [120.4651, 36.3373],
  韶关: [113.7964, 24.7028]
}

const XAData = [
  [{ name: '西安' }, { name: '北京', value: 100 }],
  [{ name: '西安' }, { name: '上海', value: 100 }],
  [{ name: '西安' }, { name: '广州', value: 100 }],
  [{ name: '西安' }, { name: '西宁', value: 100 }],
  [{ name: '西安' }, { name: '拉萨', value: 100 }]
]

const XNData = [
  [{ name: '西宁' }, { name: '北京', value: 100 }],
  [{ name: '西宁' }, { name: '上海', value: 100 }],
  [{ name: '西宁' }, { name: '广州', value: 100 }],
  [{ name: '西宁' }, { name: '西安', value: 100 }],
  [{ name: '西宁' }, { name: '银川', value: 100 }]
]

const YCData = [
  [{ name: '拉萨' }, { name: '北京', value: 100 }],
  [{ name: '拉萨' }, { name: '潍坊', value: 100 }],
  [{ name: '拉萨' }, { name: '哈尔滨', value: 100 }]
]

const planePath =
  'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
//const planePath = 'arrow';
const convertData = function (data) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const dataItem = data[i]

    const fromCoord = geoCoordMap[dataItem[0].name]
    const toCoord = geoCoordMap[dataItem[1].name]
    if (fromCoord && toCoord) {
      res.push({
        fromName: dataItem[0].name,
        toName: dataItem[1].name,
        coords: [fromCoord, toCoord],
        value: dataItem[1].value
      })
    }
  }
  return res
}

const color = ['#fff', '#fff', '#fff'] //航线的颜色
const series = []
;[
  ['西安', XAData],
  ['西宁', XNData],
  ['银川', YCData]
].forEach(function (item, i) {
  series.push(
    {
      name: item[0] + ' Top3',
      type: 'lines',
      zlevel: 1,
      effect: {
        show: true,
        period: 6,
        trailLength: 0.7,
        color: 'red', //arrow箭头的颜色
        symbolSize: 3
      },
      lineStyle: {
        normal: {
          color: color[i],
          width: 0,
          curveness: 0.2
        }
      },
      data: convertData(item[1])
    },
    {
      name: item[0] + ' Top3',
      type: 'lines',
      zlevel: 2,
      symbol: ['none', 'arrow'],
      symbolSize: 10,
      effect: {
        show: true,
        period: 6,
        trailLength: 0,
        symbol: planePath,
        symbolSize: 15
      },
      lineStyle: {
        normal: {
          color: color[i],
          width: 1,
          opacity: 0.6,
          curveness: 0.2
        }
      },
      data: convertData(item[1])
    },
    {
      name: item[0] + ' Top3',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 2,
      rippleEffect: {
        brushType: 'stroke'
      },
      label: {
        normal: {
          show: true,
          position: 'right',
          formatter: '{b}'
        }
      },
      symbolSize: function (val) {
        return val[2] / 8
      },
      itemStyle: {
        normal: {
          color: color[i]
        },
        emphasis: {
          areaColor: '#2B91B7'
        }
      },
      data: item[1].map(function (dataItem) {
        return {
          name: dataItem[1].name,
          value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
        }
      })
    }
  )
})
const option = {
  tooltip: {
    trigger: 'item',
    formatter: function (params, ticket, callback) {
      if (params.seriesType == 'effectScatter') {
        return '线路：' + params.data.name + '' + params.data.value[2]
      } else if (params.seriesType == 'lines') {
        return params.data.fromName + '>' + params.data.toName + '<br />' + params.data.value
      } else {
        return params.name
      }
    }
  },

  geo: {
    map: 'china',
    label: {
      emphasis: {
        show: true,
        color: '#fff'
      }
    },
    roam: false,
    //   放大我们的地图
    zoom: 1,
    itemStyle: {
      normal: {
        areaColor: 'rgba(20, 41, 87, .6)',
        borderColor: '#195BB9',
        borderWidth: 1
      },
      emphasis: {
        areaColor: '#2B91B7'
      }
    }
  },
  series: series
}
const map = () => {
  const myChart = echarts.init(document.getElementById('map'))
  // 绘制图表
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

const bar1 = () => {
  const myChart = echarts.init(document.getElementById('bar1'))
  const option = {
    color: ['#2f89cf'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '0%',
      top: '10px',
      right: '0%',
      bottom: '4%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['旅游行业', '教育培训', '游戏行业', '医疗行业', '电商行业', '社交行业', '金融行业'],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          color: 'rgba(255,255,255,.6)',
          fontAize: '12'
        },
        axisLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          color: 'rgba(255,255,255,.6)',
          fontAize: '12'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          }
        }
      }
    ],
    series: [
      {
        name: '直接访问',
        type: 'bar',
        barWidth: '35%',
        data: [200, 300, 300, 900, 1500, 1200, 600],
        itemStyle: {
          barBorderRadius: 5
        }
      }
    ]
  }
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
const bar2 = () => {
  const myChart = echarts.init(document.getElementById('bar2'))
  const option = {
    grid: {
      left: '22%',
      top: '10%',
      bottom: '10%'
      // containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLabel: {
          show: false,
          color: 'rgba(255,255,255,.6)'
          // fontAize: '12'
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        data: ['HTML5', 'CSS3', 'javascript', 'VUE', 'NODE'],
        inverse: true,
        axisLabel: {
          color: 'rgba(255,255,255)',
          fontAize: '12'
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      {
        data: [702, 350, 610, 793, 664],
        inverse: true,
        axisLabel: {
          color: 'rgba(255,255,255)'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '条',
        type: 'bar',
        barCategoryGap: 50,
        barWidth: 10,
        data: [70, 34, 60, 78, 69],
        itemStyle: {
          barBorderRadius: 20,
          color: (parmas) => {
            const colors = ['1089e7', '#f57474', '#56d0e3', '#f8b448', '#8b78f6']
            return colors[parmas.dataIndex]
          }
        },
        label: {
          color: '#fff',
          show: true,
          position: 'inside',
          formatter: '{c}%'
        },
        yAxisIndex: 0
      },
      {
        name: '框',
        type: 'bar',
        barCategoryGap: 50,
        barWidth: 15,
        data: [100, 100, 100, 100, 100],
        itemStyle: {
          color: 'none',
          borderColor: '#00c1de',
          borderWidth: 3,
          barBorderRadius: 15
        },
        yAxisIndex: 1
      }
    ]
  }
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
const bar3 = () => {
  const myChart = echarts.init(document.getElementById('bar3'))
  const option = {
    color: ['#00f2f1', '#ed3f35'],
    legend: {
      textStyle: {
        color: '#4c9bfd'
      },
      right: '10%'
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      show: true,
      borderColor: '#012f4a',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ],
        axisTick: {
          show: false
        },
        axisLabel: {
          color: 'rgba(255,255,255,.6)'
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        boundaryGap: false
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          color: 'rgba(255,255,255,.6)'
        },
        /* axisLine: {
          show: false
        }, */
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#012f4a'
          }
        }
      }
    ],
    series: [
      {
        name: '新增粉丝',
        type: 'line',
        data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        smooth: true
      },
      {
        name: '新增游客',
        type: 'line',
        data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
        smooth: true
      }
    ]
  }
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
const bar4 = () => {
  const myChart = echarts.init(document.getElementById('bar4'))
  const option = {
    legend: {
      top: '0%',
      textStyle: {
        color: 'rgba(255,255,255,.5)',
        fontSize: 12
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      left: '10',
      top: '30',
      right: '10',
      bottom: '10',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ],
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,.2)'
          }
        },
        splitLine: {
          show: false
        },
        boundaryGap: false
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          textStyle: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          }
        }
      }
    ],
    series: [
      {
        name: '新增粉丝',
        type: 'line',
        data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        stack: '总量',
        lineStyle: {
          color: '#0184d5'
        },
        areaStyle: {
          // opacity: 0.8,
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(1, 132, 213, 0.4)'
              },
              {
                offset: 0.8,
                color: 'rgba(1, 132, 213, 0.1)'
              }
            ],
            false
          ),
          shadowColor: 'rgba(0, 0, 0, 0.1)'
        },
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        itemStyle: {
          color: '#0184d5',
          borderColor: 'rgba(211, 220, 107, 0.1)',
          borderWidth: 12
        }
      },
      {
        name: '新增游客',
        type: 'line',
        data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        stack: '总量',
        lineStyle: {
          color: '#00d887'
        },
        areaStyle: {
          // opacity: 0.8,
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(0, 216, 135, 0.4)'
              },
              {
                offset: 0.8,
                color: 'rgba(0, 216, 135, 0.1)'
              }
            ],
            false
          ),
          shadowColor: 'rgba(0, 0, 0, 0.1)'
        },
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        itemStyle: {
          color: '#00d887',
          borderColor: 'rgba(211, 220, 107, 0.1)',
          borderWidth: 12
        }
      }
    ]
  }
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
const bar5 = () => {
  const myChart = echarts.init(document.getElementById('bar5'))
  const option = {
    color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab'],
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '10%',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: 'rgba(255, 255, 255, .5)',
        fontSize: '12'
      }
    },
    series: [
      {
        name: '年龄分布',
        type: 'pie',
        center: ['50%', '40%'],
        radius: ['40%', '60%'],
        avoidLabelOverlap: false,
        label: {
          show: false
        },
        data: [
          { value: 1, name: '0岁以下' },
          { value: 4, name: '20-29岁' },
          { value: 2, name: '30-39岁' },
          { value: 2, name: '40-49岁' },
          { value: 1, name: '50岁以上' }
        ]
      }
    ]
  }
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
const bar6 = () => {
  const myChart = echarts.init(document.getElementById('bar6'))
  const option = {
    color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '10%',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: 'rgba(255, 255, 255, .5)',
        fontSize: '12'
      }
    },
    series: [
      {
        name: '地区分布',
        type: 'pie',
        roseType: 'radius',
        center: ['50%', '40%'],
        radius: ['10%', '70%'],
        label: {
          show: true,
          fontSize: '10'
        },
        labelLine: {
          length: 6,
          length2: 8
        },
        data: [
          { value: 20, name: '云南' },
          { value: 26, name: '北京' },
          { value: 24, name: '山东' },
          { value: 25, name: '河北' },
          { value: 20, name: '江苏' },
          { value: 25, name: '浙江' },
          { value: 30, name: '四川' },
          { value: 42, name: '湖北' }
        ]
      }
    ]
  }
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
onMounted(() => {
  bar1()
  bar2()
  bar3()
  bar4()
  bar5()
  bar6()
  map()
})
</script>

<style lang="less" scoped>
.page {
  @font-face {
    font-family: electronicFont;
    src: url(@/assets/font/DS-DIGIT.TTF);
  }
  width: 100%;
  // min-height: 100%;
  background: url('@/assets/images/bg.jpg') no-repeat top center;
  .head {
    height: 1.25rem;
    background: url('@/assets/images/head_bg.png') no-repeat;
    background-size: 100% 100%;

    h1 {
      line-height: 1rem;
      color: #fff;
      font-size: 0.475rem;
      font-weight: 500;
      text-align: center;
    }
    .time {
      position: absolute;
      top: 0;
      right: 0.375rem;
      line-height: 0.9375rem;
      color: rgb(255, 255, 255, 0.7);
      font-size: 0.25rem;
    }
  }
  .main {
    min-width: 12.8rem;
    max-width: 24rem;
    margin: 0 auto;
    padding: 0.125rem 0.125rem 0;
    display: flex;
    .column {
      flex: 3;
      &:nth-child(2) {
        flex: 5;
        margin: 0 0.125rem 0.1875rem;
        overflow: hidden;
      }
      .panel {
        position: relative;
        height: 3.875rem;
        border: 1px solid rgba(25, 186, 139, 0.17);
        background: url('@/assets/images/line(1).png') rgba(255, 255, 255, 0.04);
        padding: 0 0.1875rem 0.5rem;
        margin-bottom: 0.1875rem;
        &::after {
          position: absolute;
          top: 0;
          left: 0;
          width: 0.125rem;
          height: 0.125rem;
          border-left: 0.025rem solid #02a6b5;
          border-top: 0.025rem solid #02a6b5;
          content: '';
        }
        &::before {
          position: absolute;
          top: 0;
          right: 0;
          width: 0.125rem;
          height: 0.125rem;
          border-right: 0.025rem solid #02a6b5;
          border-top: 0.025rem solid #02a6b5;
          content: '';
        }
        .panel-footer {
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          &::after {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0.125rem;
            height: 0.125rem;
            border-left: 0.025rem solid #02a6b5;
            border-bottom: 0.025rem solid #02a6b5;
            content: '';
          }
          &::before {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 0.125rem;
            height: 0.125rem;
            border-right: 0.025rem solid #02a6b5;
            border-bottom: 0.025rem solid #02a6b5;
            content: '';
          }
        }
        h2 {
          height: 0.6rem;
          line-height: 0.6rem;
          text-align: center;
          color: #fff;
          font-size: 0.25rem;
        }
        .chart {
          height: 3rem;
          // background: orange;
        }
      }
      .no {
        background: rgba(101, 132, 226, 0.1);
        padding: 0.1875rem;
        .no-hd {
          border: 0.0125rem solid rgba(25, 186, 139, 0.17);
          &::before {
            position: absolute;
            top: 0;
            left: 0;
            width: 0.375rem;
            height: 0.125rem;
            border-left: 0.025rem solid #02a6b5;
            border-top: 0.025rem solid #02a6b5;
            content: '';
          }
          &::after {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 0.375rem;
            height: 0.125rem;
            border-right: 0.025rem solid #02a6b5;
            border-bottom: 0.025rem solid #02a6b5;
            content: '';
          }
          ul {
            display: flex;
            li {
              list-style: none;
              flex: 1;
              line-height: 1rem;
              font-size: 0.875rem;
              color: #ffeb7b;
              text-align: center;
              font-family: 'electronicFont';
              &:first-child::after {
                content: '';
                position: absolute;
                top: 25%;
                right: 0;
                height: 50%;
                width: 0.0125rem;
                background: rgba(255, 255, 255, 0.2);
              }
            }
          }
        }
        .no-bd {
          ul {
            display: flex;
            li {
              list-style: none;
              flex: 1;
              text-align: center;
              color: rgba(255, 255, 255, 0.7);
              font-size: 0.225rem;
              height: 0.5rem;
              line-height: 0.5rem;
              padding-top: 0.125rem;
            }
          }
        }
      }
      .map {
        height: 10.125rem;
        position: relative;
        .map1 {
          position: absolute;
          width: 6.475rem;
          height: 6.475rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: url(@/assets/images/map.png);
          background-size: 100% 100%;
          opacity: 0.3;
        }
        .map2 {
          position: absolute;
          width: 8.0375rem;
          height: 8.0375rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: url(@/assets/images/lbx.png);
          background-size: 100% 100%;
          opacity: 0.6;
          animation: rotate1 15s linear infinite;
        }
        .map3 {
          position: absolute;
          width: 7.075rem;
          height: 7.075rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: url(@/assets/images/jt.png);
          background-size: 100% 100%;
          opacity: 0.6;
          animation: rotate2 10s linear infinite;
        }
        @keyframes rotate1 {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes rotate2 {
          from {
            transform: translate(-50%, -50%) rotate(360deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }
        .chart {
          width: 100%;
          height: 100%;
          // background: #ffeb7b;
        }
      }
    }
  }
}
</style>
<style>
@media screen and (max-width: 1024px) {
  html {
    font-size: 42px !important;
  }
}
@media screen and (min-width: 1920) {
  html {
    font-size: 80px !important;
  }
}
</style>
