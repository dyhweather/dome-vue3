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
          <h2>柱形图-就业行业</h2>
          <div class="chart"></div>
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
          <div class="chart" id="demo"></div>
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
          <h2>柱形图-就业行业</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
const currentTime = ref(new Date().toLocaleString())

setInterval(() => {
  currentTime.value = new Date().toLocaleString()
}, 1000)

const testDome = () => {
  const myChart = echarts.init(document.getElementById('demo'))
  // 绘制图表
  myChart.setOption({
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
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
          color: '#4c9bfd'
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
          color: '#4c9bfd'
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
    color: ['#00f2f1', '#ed3f35'],
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
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        stack: '总量'
      },
      {
        name: '新增游客',
        type: 'line',
        data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
        smooth: true,
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        stack: '总量'
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
  testDome()
})
</script>

<style lang="less" scoped>
.page {
  @font-face {
    font-family: electronicFont;
    src: url(@/assets/font/DS-DIGIT.TTF);
  }
  width: 100%;
  min-height: 100%;
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
    padding: 0 0.125rem 0.125rem 0;
    display: flex;
    .column {
      flex: 3;
      &:nth-child(2) {
        flex: 5;
        margin: 0 0.125rem 0.1875rem;
      }
      .panel {
        position: relative;
        height: 3.875rem;
        border: 1px solid rgba(25, 186, 139, 0.17);
        background: url('@/assets/images/line(1).png') rgba(255, 255, 255, 0.3);
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
