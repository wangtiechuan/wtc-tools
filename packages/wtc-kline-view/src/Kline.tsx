/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from 'antd';
import {
  CandleTooltipCustomCallbackData,
  CandleType,
  Chart,
  TooltipShowRule,
  TooltipShowType,
  YAxisType,
  dispose,
  init,
  registerIndicator,
  registerLocale,
  registerOverlay,
} from 'klinecharts';
import React, { useEffect, useRef, useState } from 'react';

import './Kline.less';
import generatedDataList from './generatedDataList';

const timeFrames = ['1h', '4h'];

const chartLineColors = ['#E11D74', '#01C5C4', '#9D65C9', '#FF9600', '#2196F3'];
const chartLineColors2 = [
  '#52c41a',
  '#ff4d4f',
  '#eb2f96',
  '#ff7a45',
  '#2196F3',
];

const sideColor = ['rgb(246, 70, 93)', 'rgb(14, 203, 129)'];

const technicalIndicatorColors = [
  'rgba(241, 156, 56, 0.7)',
  'rgba(234, 61, 247, 0.7)',
  'rgba(116, 252, 253, 0.7)',
  'rgba(139, 43, 246, 0.7)',
  'rgba(0, 32, 245, 0.7)',
  'rgba(234, 51, 35, 0.7)',
  'rgba(87, 134, 224, 0.7)',
  'rgba(255, 254, 85, 0.7)',
  'rgba(117, 250, 76, 0.7)',
  'rgba(138, 26, 16, 0.7)',
];

registerLocale('zh-HK', {
  time: '時間：',
  open: '開：',
  high: '高：',
  low: '低：',
  close: '收：',
  volume: '成交量：',
});

function toRegisterEmojiIndicator() {
  const fruits = [
    '🍏',
    '🍎',
    '🍐',
    '🍊',
    '🍋',
    '🍌',
    '🍉',
    '🍇',
    '🍓',
    '🍈',
    '🍒',
    '🍑',
    '🍍',
    '🥥',
    '🥝',
    '🥭',
    '🥑',
    '🍏',
  ];

  interface EmojiEntity {
    emoji: number;
    text: string;
  }

  // 自定义指标
  registerIndicator<EmojiEntity>({
    name: 'EMOJI',
    figures: [{ key: 'emoji' }],
    calc: (kLineDataList) => {
      return kLineDataList.map((kLineData) => ({
        emoji: kLineData.close,
        text: fruits[Math.floor(Math.random() * 17)],
      }));
    },
    draw: ({ ctx, barSpace, visibleRange, indicator, xAxis, yAxis }) => {
      const { from, to } = visibleRange;

      ctx.font = `${barSpace.gapBar}px Helvetica Neue`;
      ctx.textAlign = 'center';
      const result = indicator.result;
      for (let i = from; i < to; i++) {
        const data = result[i];
        const x = xAxis.convertToPixel(i);
        const y = yAxis.convertToPixel(data.emoji);
        ctx.fillText(data.text, x, y);
      }
      return false;
    },
  });
}

function toRegisterMYMAIndicator() {
  // // 指标名
  // name: string
  // // 指标简短名称，用于显示，缺省将显示name
  // shortName?: string
  // // 精度，默认为4
  // precision?: number
  // // 计算参数
  // calcParams?: any[]
  // // 是否需要ohlc
  // shouldOhlc?: boolean
  // // 是否需要格式化大数据值，从1000开始格式化，比如100000是否需要格式化100K
  // shouldFormatBigNumber?: boolean
  // // 是否可见
  // visible?: boolean
  // // 扩展数据
  // extendData?: any
  // // 系列，默认为'normal'
  // series?: 'normal' | 'price' | 'volume'
  // // 数据信息
  // figures?: Array<{
  //   // 用于取计算结果中值
  //   key: string
  //   // 用于tooltip显示
  //   title?: string
  //   // 图形类型
  //   type?: string
  //   // 基准值，如果给定，将以这个值上下去绘制，一般用于type是'rect'
  //   baseValue?: number
  //   // 是一个方法，用于生成自定义图形的属性，
  //   attrs?: ({
  //     coordinate: IndicatorFigureAttrsCallbackCoordinate
  //     bounding: Bounding
  //     barSpace: BarSpace
  //     xAxis: XAxis
  //     yAxis: YAxis
  //   }) => IndicatorFigureAttrs
  //   // 是一个方法，用于生成样式
  //   styles?: (
  //     data: {
  //       // 上一个图形的数据
  //       prev: {
  //         // k线数据，类型参阅[数据源]
  //         kLineData?: KLineData
  //         // 技术指标数据
  //         indicatorData?: any
  //       }
  //       // 当前图形的数据
  //       current: {
  //         kLineData?: KLineData
  //         indicatorData?: any
  //       }
  //       // 下一个图形的数据
  //       next: {
  //         kLineData?: KLineData
  //         indicatorData?: any
  //       }
  //     },
  //     // 技术图表实例
  //     indicator: Indicator
  //     // 默认的技术指标样式，即全局设置的技术指标样式，参阅[样式]中的indicator
  //     defaultStyles: IndicatorStyle
  //   ) => IndicatorFigureStyle
  // }>
  // // 指定的最小值，默认null
  // minValue?: number
  // // 指定的最大值，默认null
  // maxValue?: number
  // // 样式，支持增量，默认为null，类型参阅[样式]中的indicator
  // styles?: IndicatorStyle
  // // 计算方法，可以是一个promise
  // calc: (
  //   // 数据源，类型参阅[数据源]
  //   dataList: KLineData[],
  //   // 技术指标实例
  //   indicator: Indicator
  // ) => Promise<Array<any>> | Array<any>
  // // 重新生成数图形配置方法，会在计算参数发生变化后触发，返回类型参阅figures，默认为null
  // regenerateFigures?: (
  //   // 计算参数
  //   calcParms: any[]
  // ) => Array<IndicatorFigure<D>>
  // // 创建自定义提示文字
  // createTooltipDataSource?: (params: {
  //   // 数据源，类型参阅[数据源]
  //   kLineDataList: KLineData[]
  //   // 技术指标实例
  //   indicator: Indicator
  //   // 可见区域信息
  //   visibleRange: {
  //     // 起点数据索引
  //     from: number
  //     // 终点数据索引
  //     to: number
  //     // 实际起点数据索引
  //     realFrom: number
  //     // 实际终点数据索引
  //     realTo: number
  //   },
  //   // 窗口尺寸信息
  //   bounding: {
  //     // 宽
  //     width: number
  //     // 高
  //     height: number
  //     // 距离左边距离
  //     left: number
  //     // 距离右边距离
  //     right: number
  //     // 距离顶部距离
  //     top: number
  //     // 距离底部距离
  //     bottom: number
  //   },
  //   // 十字光标的信息
  //   crosshair: {
  //     // 十字光标交叉点所在的窗口id
  //     paneId?: string
  //     // 真实的x坐标
  //     realX?: number
  //     // k线数据，类型参阅[数据源]
  //     kLineData?: KLineData
  //     // 数据索引
  //     dataIndex?: number
  //     // 真实数据索引
  //     realDataIndex?: number
  //   }
  //   // 默认的技术指标样式，即全局设置的技术指标样式，参阅[样式]中的indicator
  //   defaultStyles: IndicatorStyle
  //   // x轴组件，内置一些转换方法
  //   xAxis: XAxis
  //   // y轴组件，内置一些转换方法
  //   yAxis: YAxis
  // }) => ({
  //   // 名字
  //   name?: string
  //   // 计算参数文字，如果name无值，则不会显示
  //   calcParamsText?: string
  //   // 值信息
  //   values?: Array<{
  //     title: string | {
  //       text: string
  //       color: string
  //     }
  //     value: string | {
  //       text: string
  //       color: string
  //     }
  //   }>
  // }),
  // // 自定义绘制，如果返回true，则figures配置的图形不会绘制
  // draw?: (params: {
  //   // 画布上下文
  //   ctx: CanvasRenderingContext2D
  //   // 数据源，类型参阅[数据源]
  //   kLineDataList: KLineData[]
  //   // 技术指标实例
  //   indicator: Indicator
  //   // 可见区域信息
  //   visibleRange: {
  //     // 起点数据索引
  //     from: number
  //     // 终点数据索引
  //     to: number,
  //     // 实际起点数据索引
  //     realFrom: number
  //     // 实际终点数据索引
  //     realTo: number
  //   },
  //   // 窗口尺寸信息
  //   bounding: {
  //     // 宽
  //     width: number
  //     // 高
  //     height: number
  //     // 距离左边距离
  //     left: number
  //     // 距离右边距离
  //     right: number
  //     // 距离顶部距离
  //     top: number
  //     // 距离底部距离
  //     bottom: number
  //   },
  //   // 蜡烛柱的尺寸信息
  //   barSpace: {
  //     // 蜡烛柱尺寸
  //     bar: number
  //     halfBar: number
  //     // 蜡烛柱不包含蜡烛柱之间间隙的尺寸
  //     gapBar: number
  //     halfGapBar: number
  //   },
  //   // 默认的技术指标样式，即全局设置的技术指标样式，参阅[样式]中的indicator
  //   defaultStyles: IndicatorStyle
  //   // x轴组件，内置一些转换方法
  //   xAxis: XAxis
  //   // y轴组件，内置一些转换方法
  //   yAxis: YAxis
  // }) => boolean

  // 自定义指标
  registerIndicator({
    name: 'MYMA',
    shortName: 'MYMA',
    calcParams: [5, 93],
    figures: [
      { key: 'ma1', title: 'MA5: ', type: 'line' },
      { key: 'ma2', title: 'MA93: ', type: 'line' },
    ],
    // 当计算参数改变时，希望提示的和参数一样，即title的值需要改变
    regenerateFigures: (params) => {
      return params.map((p, i) => {
        return { key: `ma${i + 1}`, title: `MA${p}: `, type: 'line' };
      });
    },
    // 计算结果
    calc: (kLineDataList, { calcParams, figures }) => {
      // 注意：返回数据个数需要和kLineDataList的数据个数一致，如果无值，用{}代替即可。
      // 计算参数最好取回调参数calcParams，如果不是，后续计算参数发生变化的时候，这里计算不能及时响应
      // @ts-ignore
      const closeSums = [];
      return kLineDataList.map((kLineData, i) => {
        const ma = {};
        const close = kLineData.close;
        calcParams.forEach((param, j) => {
          // @ts-ignore
          closeSums[j] = (closeSums[j] || 0) + close;
          if (i >= param - 1) {
            // @ts-ignore
            ma[figures[j].key] = closeSums[j] / param;
            // @ts-ignore
            closeSums[j] -= kLineDataList[i - (param - 1)].close;
          }
        });
        // 如果有值的情况下，这里每一项的数据格式应该是 { ma1: xxx, ma2: xxx }
        // 每个key需要和figures中的子项key对应的值一致
        return ma;
      });
    },
  });
}

const candleTypes = [
  { key: CandleType.CandleSolid, text: '蜡烛实心' },
  { key: CandleType.CandleStroke, text: '蜡烛空心' },
  { key: CandleType.CandleUpStroke, text: '蜡烛涨空心' },
  { key: CandleType.CandleDownStroke, text: '蜡烛跌空心' },
  { key: CandleType.Ohlc, text: 'OHLC' },
  { key: CandleType.Area, text: '面积图' },
];

const themes = [
  { key: 'dark', text: '深色' },
  { key: 'light', text: '浅色' },
];
const locals = [
  { key: 'zh-CN', text: '简体中文' },
  { key: 'zh-HK', text: '繁体中文' },
  { key: 'en-US', text: 'English' },
];

// 主图显示类型
const candleShowType = [
  { key: TooltipShowType.Standard, text: '默认' },
  { key: TooltipShowType.Rect, text: '矩形框' },
];

// k线提示显示规则 和 指标提示显示规则
const tooltipShowRules = [
  { key: TooltipShowRule.Always, text: '总是显示' },
  { key: TooltipShowRule.FollowCross, text: '跟随十字光标' },
  { key: TooltipShowRule.None, text: '不显示' },
];

const timezones = [
  { key: 'Asia/Shanghai', text: '上海' },
  { key: 'Europe/Berlin', text: '柏林' },
  { key: 'America/Chicago', text: '芝加哥' },
];

const yAxisTypes = [
  { key: YAxisType.Normal, text: '线性轴' },
  { key: YAxisType.Percentage, text: '百分比轴' },
  { key: YAxisType.Log, text: '对数轴' },
];

function getTooltipOptions(
  candleShowType: TooltipShowType,
  candleShowRule: TooltipShowRule,
  indicatorShowRule: TooltipShowRule,
) {
  return {
    candle: {
      tooltip: {
        showType: candleShowType,
        showRule: candleShowRule,
        custom: (data: CandleTooltipCustomCallbackData) => {
          const { prev, current } = data;
          const prevClose = prev?.close ?? current.open;
          const change = ((current.close - prevClose) / prevClose) * 100;
          return [
            { title: 'open', value: current.open.toFixed(2) },
            { title: 'close', value: current.close.toFixed(2) },
            {
              title: 'Change: ',
              value: {
                text: `${change.toFixed(2)}%`,
                color: change < 0 ? '#EF5350' : '#26A69A',
              },
            },
          ];
        },
      },
    },
    indicator: {
      tooltip: {
        showRule: indicatorShowRule,
      },
    },
  };
}

interface OverlaysListItem {
  key: string;
  text: string;
  ico?: React.JSX.Element;
}
const overlays: OverlaysListItem[] = [
  {
    key: 'horizontalStraightLine',
    text: '横向直线',
    ico: (
      <svg viewBox="0 0 30 30">
        <g>
          <rect x="1" y="14.5" width="28" height="1"></rect>
          <circle cx="15" cy="15" r="3"></circle>
        </g>
      </svg>
    ),
  },
  {
    key: 'horizontalRayLine',
    text: '横向射线',
    ico: (
      <svg viewBox="0 0 30 30">
        <g>
          <rect x="3" y="14.5" width="26" height="1"></rect>
          <circle cx="3" cy="15" r="3"></circle>
        </g>
      </svg>
    ),
  },
  {
    key: 'horizontalSegment',
    text: '横向线段',
    ico: (
      <svg viewBox="0 0 30 30">
        <g>
          <rect x="3" y="14.5" width="24" height="1"></rect>
          <circle cx="3" cy="15" r="3"></circle>
          <circle cx="27" cy="15" r="3"></circle>
        </g>
      </svg>
    ),
  },
  {
    key: 'verticalStraightLine',
    text: '纵向直线',
    ico: (
      <svg viewBox="0 0 30 30">
        <g>
          <rect x="15" y="1" width="1" height="28"></rect>
          <circle cx="15.5" cy="15" r="3"></circle>
        </g>
      </svg>
    ),
  },
  {
    key: 'verticalRayLine',
    text: '纵向射线',
    ico: (
      <svg viewBox="0 0 30 30">
        <g>
          <rect x="15" y="1" width="1" height="28"></rect>
          <circle cx="15.5" cy="27" r="3"></circle>
        </g>
      </svg>
    ),
  },
  {
    key: 'verticalSegment',
    text: '纵向线段',
    ico: (
      <svg viewBox="0 0 30 30">
        <g>
          <rect x="15" y="1" width="1" height="28"></rect>
          <circle cx="15.6" cy="3" r="3"></circle>
          <circle cx="15.6" cy="27" r="3"></circle>
        </g>
      </svg>
    ),
  },
  {
    key: 'straightLine',
    text: '直线',
    ico: (
      <svg viewBox="0 0 30 30">
        <g>
          <path d="M5 25 L25 5 L26 6 L6 26 Z"></path>
          <circle cx="15" cy="16" r="3"></circle>
        </g>
      </svg>
    ),
  },
  {
    key: 'rayLine',
    text: '射线',
    ico: (
      <svg viewBox="0 0 30 30">
        <g>
          <path d="M5 25 L25 5 L26 6 L6 26 Z"></path>
          <circle cx="7" cy="24" r="3"></circle>
        </g>
      </svg>
    ),
  },
  {
    key: 'segment',
    text: '线段',
    ico: (
      <svg viewBox="0 0 30 30">
        <g>
          <path d="M6 24 L24 6 L25 7 7 25 Z"></path>
          <circle cx="6" cy="25" r="3"></circle>
          <circle cx="25" cy="6" r="3"></circle>
        </g>
      </svg>
    ),
  },
  {
    key: 'priceLine',
    text: '价格线',
    ico: (
      <svg viewBox="0 0 30 30">
        <g>
          <rect x="3" y="19.5" width="26" height="1"></rect>
          <circle cx="3" cy="20" r="3"></circle>
          <rect x="8" y="10" width="1" height="7"></rect>
          <g>
            <rect x="11" y="10" width="3" height="1"></rect>
            <rect x="14" y="10" width="1" height="4"></rect>
            <rect x="11" y="13" width="3" height="1"></rect>
            <rect x="11" y="13" width="1" height="4"></rect>
            <rect x="11" y="16" width="4" height="1"></rect>
          </g>
          <g>
            <rect x="17" y="10" width="3" height="1"></rect>
            <rect x="20" y="10" width="1" height="7"></rect>
            <rect x="17" y="13" width="3" height="1"></rect>
            <rect x="17" y="16" width="4" height="1"></rect>
          </g>
        </g>
      </svg>
    ),
  },
  {
    key: 'priceChannelLine',
    text: '价格通道线',
    ico: (
      <svg viewBox="0 0 30 30">
        <g>
          <path d="M2 16 L16 2 L17 3 L3 17 Z"></path>
          <circle cx="10" cy="9" r="3"></circle>
          <path d="M5 25 L25 5 L26 6 L6 26 Z"></path>
          <line x1="5" y1="25" x2="25" y2="5"></line>
          <circle cx="11" cy="20" r="3"></circle>
          <circle cx="21" cy="10" r="3"></circle>
          <path d="M14 28 L28 14 L29 15 L15 29 Z"></path>
        </g>
      </svg>
    ),
  },
  {
    key: 'parallelStraightLine',
    text: '平行直线',
    ico: (
      <svg viewBox="0 0 30 30">
        <g>
          <path d="M2 22 L22 2 L21 1 L1 21 Z"></path>
          <circle cx="7" cy="16" r="3"></circle>
          <circle cx="16" cy="7" r="3"></circle>
          <path d="M8 28 L28 8 L29 9 L9 29 Z"></path>
          <circle cx="19" cy="18" r="3"></circle>
        </g>
      </svg>
    ),
  },
  {
    key: 'fibonacciLine',
    text: '斐波那契回调',
    ico: (
      <svg viewBox="0 0 30 30">
        <g>
          <rect x="1" y="2.5" width="28" height="1"></rect>
          <circle cx="15" cy="3" r="3"></circle>
          <rect x="1" y="8.5" width="28" height="1"></rect>
          <rect x="1" y="14.5" width="28" height="1"></rect>
          <rect x="1" y="20.5" width="28" height="1"></rect>
          <rect x="1" y="26.5" width="28" height="1"></rect>
          <circle cx="15" cy="27" r="3"></circle>
        </g>
      </svg>
    ),
  },
];

function toRegisterCircleOverlay() {
  // 自定义Overlay
  registerOverlay({
    name: 'circle',
    needDefaultPointFigure: true,
    needDefaultXAxisFigure: true,
    needDefaultYAxisFigure: true,
    totalStep: 3,
    createPointFigures: function ({ overlay, coordinates }) {
      if (coordinates.length === 2) {
        const xDis = Math.abs(coordinates[0].x - coordinates[1].x);
        const yDis = Math.abs(coordinates[0].y - coordinates[1].y);
        const radius = Math.sqrt(xDis * xDis + yDis * yDis);
        return {
          key: 'circle',
          type: 'circle',
          attrs: {
            ...coordinates[0],
            r: radius,
          },
          styles: {
            style: 'stroke_fill',
          },
        };
      }
      return [];
    },
  });
  overlays.push({
    key: 'circle',
    text: '圆',
    ico: undefined,
  });
}
toRegisterCircleOverlay();

export function KlineChartView() {
  const chartRef = useRef<HTMLDivElement>(null);
  const kLineChartRef = useRef<Chart>();

  const paneId = useRef<string | null>(null);

  useEffect(() => {
    kLineChartRef.current = init(chartRef.current!, {
      // styles: { grid: { horizontal: { style: LineType.Dashed } } },
    })!;
    const kLineChart = kLineChartRef.current!;

    // 主图指标
    // kLineChart.createIndicator('MA', false, { id: 'candle_pane' });
    // 覆盖指标（先使用再覆盖）
    // kLineChart.overrideIndicator({
    //   name: 'MA',
    //   calcParams: [4, 53],
    //   precision: 4,
    // });

    // 副图指标需要获取下paneId，以备后续副图指标使用
    // paneId.current = kLineChart.createIndicator('VOL', false);

    // 相当于使用指标，并覆盖指标
    kLineChart.createIndicator(
      {
        name: 'MA',
        calcParams: [4, 53],
        precision: 4,
      },
      false,
      { id: 'candle_pane' },
    );

    // 副图指标
    // kLineChart.createIndicator('MACD', false, { id: paneId.current! });

    // 自定义指标注册
    // toRegisterEmojiIndicator();
    // 主图指标(自定义)
    // kLineChart.createIndicator('EMOJI', true, { id: 'candle_pane' });
    // 副图指标(自定义)
    // kLineChart.createIndicator('EMOJI', false, { id: paneId.current! });

    // toRegisterMYMAIndicator();
    // kLineChart.createIndicator('MYMA', true, { id: 'candle_pane' });

    kLineChart.setLocale(locals[0].key);

    kLineChart.setTimezone(timezones[0].key);

    kLineChart.setStyles({
      candle: {
        type: candleTypes[0].key,
      },
    });

    kLineChart.setStyles(
      getTooltipOptions(
        candleShowType[0].key,
        tooltipShowRules[0].key,
        tooltipShowRules[0].key,
      ),
    );

    kLineChart.setStyles({
      yAxis: { type: yAxisTypes[0].key },
    });

    kLineChart.applyNewData(generatedDataList());

    // 实时更新数据
    setInterval(() => {
      const dataList = kLineChart.getDataList();
      const lastData = dataList[dataList.length - 1];
      const newData = generatedDataList(
        lastData.timestamp,
        lastData.close,
        1,
      )[0];
      newData.timestamp += 1000 * 60;
      kLineChart.updateData(newData);
    }, 1000);

    // 历史数据
    // kLineChart.applyNewData(generatedDataList(Date.now(), 5000, 200),true);
    // kLineChart.loadMore((timestamp) => {
    //   setTimeout(() => {
    //     const firstData = kLineChart.getDataList()[0];
    //     console.log(4543534)
    //     kLineChart.applyMoreData(
    //       generatedDataList(timestamp as number, firstData.close, 100),
    //       true,
    //     );
    //   }, 3000);
    // });

    const resizeFunc = () => {
      kLineChart.resize();
    };
    window.addEventListener('resize', resizeFunc, false);
    return () => {
      window.removeEventListener('resize', resizeFunc);
      kLineChart.clearData();
      dispose(chartRef.current!);
    };
  }, []);

  const [ctimeframe, setCtimeframe] = useState(timeFrames[0]);

  const [theme, setTheme] = useState(themes[0].key);

  useEffect(() => {
    const kLineChart = kLineChartRef.current!;
    kLineChart.setStyles(theme);
  }, [theme]);

  return (
    <div className={`klinechart ${theme}`}>
      <div className="kline_top">
        <div className="symbolName">symbolName</div>
        <div className="framelist">
          {timeFrames.map((tf) => {
            return (
              <Button
                className={`timeframitem ${ctimeframe === tf ? 'active' : ''}`}
                key={tf}
                type="text"
                onClick={() => {
                  setCtimeframe(tf);
                }}
              >
                {tf}
              </Button>
            );
          })}
        </div>
        <div>
          <Button
            className="themectro"
            type="text"
            onClick={() => {
              setTheme((pre) => {
                return pre === 'dark' ? 'light' : 'dark';
              });
            }}
          >
            {themes.find((item) => item.key !== theme)?.text}
          </Button>
        </div>
      </div>
      <div className="kline_bottom">
        <div className="kline_left">
          {overlays.map(({ key, text, ico }) => {
            return (
              <Button
                className="svgbox"
                key={key}
                onClick={() => {
                  kLineChartRef.current!.createOverlay(key);
                }}
                title={text}
              >
                {ico || text}
              </Button>
            );
          })}
          <Button
            className="svgbox cleatmark"
            onClick={() => {
              kLineChartRef.current!.removeOverlay();
            }}
            title="清除"
          >
            <svg viewBox="0 0 1024 1024">
              <path d="M845.12256 287.55456v572.62592c0 15.77984 10.89024 86.44096-15.2576 86.44096H247.7568c-11.74528 0-36.38784 4.56704-37.92384-12.53888-0.90112-10.0352 0-20.57216 0-30.63296V287.55968c0-33.01888-51.2-33.01888-51.2 0v572.62592c0 44.94848-10.20416 99.40992 31.56992 128.94208 15.00672 10.60352 35.80928 8.69888 53.31968 8.69888h531.38432c48.04096 0 121.41568 6.58432 121.41568-63.7952V287.55968c0-33.024-51.2-33.024-51.2-0.00512z"></path>
              <path d="M501.86752 420.46976v361.33888c0 33.01376 51.22048 33.01376 51.22048 0V420.46976c0-33.01888-51.22048-33.01888-51.22048 0zM325.35552 420.46976v361.33888c0 33.01376 51.2 33.01376 51.2 0V420.46976c0-33.01888-51.2-33.01888-51.2 0zM676.00384 420.46976v361.33888c0 33.01376 51.2 33.01376 51.2 0V420.46976c0-33.01888-51.2-33.01888-51.2 0zM102.5024 217.5232h849.95584c33.01376 0 33.01376-51.2 0-51.2H102.5024c-33.01888 0-33.01888 51.2 0 51.2z"></path>
              <path d="M338.7648 174.82752V94.53056c0-18.37056 1.00864-30.9248 21.6832-30.9248h334.0544c20.67456 0 21.6832 12.55424 21.6832 30.9248v80.29696c0 33.01888 51.2 33.01888 51.2 0 0-54.73792 18.51392-162.42176-65.26464-162.42176H352.82432c-83.77344 0-65.25952 107.68384-65.25952 162.42176 0 33.01888 51.2 33.01888 51.2 0z"></path>
            </svg>
          </Button>
        </div>
        <div className="kline_right">
          <div className="chart" ref={chartRef}></div>
        </div>
      </div>
    </div>
  );
}
