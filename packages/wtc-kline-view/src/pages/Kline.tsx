import { Button } from "antd";
import { init, dispose, Chart } from "klinecharts";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { taMaNameList, timeFrames } from "../../common/const";
import { klineSaveInfoName, randomRgbaColor, utcTime } from "../../common/util";
import fetchRequest from "../../common/fetchRequest";
import { webSymbol } from "../config";
import { getSymbolInfo } from "../../common/fetchMarkets";

import "./Kline.less";
import { baseInfo } from "../globalnfo";
import LoadMoreKline from "../comp/LoadMoreKline";
import LoadMarkes from "../comp/LoadMarkes";

const chartLineColors = ["#E11D74", "#01C5C4", "#9D65C9", "#FF9600", "#2196F3"];
const chartLineColors2 = [
  "#52c41a",
  "#ff4d4f",
  "#eb2f96",
  "#ff7a45",
  "#2196F3",
];

const sideColor = ["rgb(246, 70, 93)", "rgb(14, 203, 129)"];

const technicalIndicatorColors = [
  "rgba(241, 156, 56, 0.7)",
  "rgba(234, 61, 247, 0.7)",
  "rgba(116, 252, 253, 0.7)",
  "rgba(139, 43, 246, 0.7)",
  "rgba(0, 32, 245, 0.7)",
  "rgba(234, 51, 35, 0.7)",
  "rgba(87, 134, 224, 0.7)",
  "rgba(255, 254, 85, 0.7)",
  "rgba(117, 250, 76, 0.7)",
  "rgba(138, 26, 16, 0.7)",
];

const types = [
  { key: "candle_solid", text: "蜡烛实心" },
  { key: "candle_stroke", text: "蜡烛空心" },
  { key: "candle_up_stroke", text: "蜡烛涨空心" },
  { key: "candle_down_stroke", text: "蜡烛跌空心" },
  { key: "ohlc", text: "OHLC" },
  { key: "area", text: "面积图" },
];

const themes = [
  { key: "dark", text: "Dark" },
  { key: "light", text: "Light" },
];
const textColorDark = "#929AA5";
const gridColorDark = "#292929";
const axisLineColorDark = "#333333";
const crossTextBackgroundColorDark = "#373a40";

const textColorLight = "#76808F";
const gridColorLight = "#ededed";
const axisLineColorLight = "#DDDDDD";
const crossTextBackgroundColorLight = "#686d76";

const locals = [
  { key: "zh-CN", text: "简体中文" },
  { key: "zh-HK", text: "繁体中文" },
  { key: "en-US", text: "English" },
];

const candleShowType = [
  { key: "standard", text: "默认" },
  { key: "rect", text: "矩形框" },
];
const rules = [
  { key: "always", text: "总是显示" },
  { key: "follow_cross", text: "跟随十字光标" },
  { key: "none", text: "不显示" },
];

const timezones = [
  { key: "Asia/Shanghai", text: "上海" },
  { key: "Europe/Berlin", text: "柏林" },
  { key: "America/Chicago", text: "芝加哥" },
];

const drawLines = [
  {
    key: "horizontalStraightLine",
    text: "横向直线",
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
    key: "horizontalRayLine",
    text: "横向射线",
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
    key: "horizontalSegment",
    text: "横向线段",
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
    key: "verticalStraightLine",
    text: "纵向直线",
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
    key: "verticalRayLine",
    text: "纵向射线",
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
    key: "verticalSegment",
    text: "纵向线段",
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
    key: "straightLine",
    text: "直线",
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
    key: "rayLine",
    text: "射线",
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
    key: "segment",
    text: "线段",
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
    key: "priceLine",
    text: "价格线",
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
    key: "priceChannelLine",
    text: "价格通道线",
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
    key: "parallelStraightLine",
    text: "平行直线",
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
    key: "fibonacciLine",
    text: "斐波那契回调",
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

const chartId = "chart";

function Kline() {
  const chartRef = useRef<HTMLDivElement>(null);
  const kLineChartRef = useRef<Chart>();

  const symbolInfo = useMemo(() => {
    return getSymbolInfo(baseInfo.value!.markets, webSymbol);
  }, []);

  useEffect(() => {
    kLineChartRef.current = init(chartRef.current!)!;
    const kLineChart = kLineChartRef.current!;

    kLineChart.setTimezone(timezones[0].key);

    const resizeFunc = () => {
      kLineChart.resize();
    };
    window.addEventListener("resize", resizeFunc, false);
    return () => {
      window.removeEventListener("resize", resizeFunc);
      dispose(chartId);
    };
  }, []);

  const [theme, setTheme] = useState(themes[0].key);
  const [ctimeframe, setCtimeframe] = useState(
    timeFrames[Math.floor(timeFrames.length / 4)]
  );

  const styleOptions = useCallback(() => {
    const language = locals[0].key;

    const textColor = theme === "dark" ? textColorDark : textColorLight;
    const gridColor = theme === "dark" ? gridColorDark : gridColorLight;
    const axisLineColor =
      theme === "dark" ? axisLineColorDark : axisLineColorLight;
    const crossLineColor =
      theme === "dark" ? axisLineColorDark : axisLineColorLight;
    const crossTextBackgroundColor =
      theme === "dark"
        ? crossTextBackgroundColorDark
        : crossTextBackgroundColorLight;
    return {
      grid: {
        horizontal: {
          color: gridColor,
        },
        vertical: {
          color: gridColor,
        },
      },
      candle: {
        priceMark: {
          high: {
            color: textColor,
          },
          low: {
            color: textColor,
          },
        },
        tooltip: {
          text: {
            color: textColor,
          },
          showType: candleShowType[0].key,
          showRule: rules[0].key,
          labels:
            language === "zh-CN"
              ? [
                  "时间：",
                  "开：",
                  "收：",
                  "高：",
                  "低：",
                  "成交量：",
                  "涨跌幅：",
                  "振幅：",
                ]
              : language === "zh-HK"
              ? [
                  "時間：",
                  "開：",
                  "收：",
                  "高：",
                  "低：",
                  "成交量：",
                  "涨跌幅：",
                  "振幅：",
                ]
              : ["T: ", "O: ", "C: ", "H: ", "L: ", "V: ", "R: ", "A: "],
          values(kLineData) {
            const change =
              ((kLineData.close - kLineData.open) / kLineData.open) * 100;

            let amplitude =
              ((kLineData.high - kLineData.low) /
                (change > 0 ? kLineData.low : kLineData.high)) *
              100;
            amplitude = change < 0 ? -amplitude : amplitude;

            return [
              { value: utcTime(kLineData.timestamp).format() },
              { value: kLineData.open },
              { value: kLineData.close },
              { value: kLineData.high },
              { value: kLineData.low },
              { value: kLineData.volume },
              {
                value: `${change.toFixed(2)}%`,
                color: change < 0 ? "#EF5350" : "#26A69A",
              },
              {
                value: `${amplitude.toFixed(2)}%`,
                color: change < 0 ? "#EF5350" : "#26A69A",
              },
            ];
          },
        },
        type: types[1].key,
        bar: {
          upColor: sideColor[1],
          downColor: sideColor[0],
        },
      },
      technicalIndicator: {
        tooltip: {
          text: {
            color: textColor,
          },
          showRule: rules[0].key,
        },
        line: {
          colors: technicalIndicatorColors,
        },
      },
      xAxis: {
        axisLine: {
          color: axisLineColor,
        },
        tickLine: {
          color: axisLineColor,
        },
        tickText: {
          color: textColor,
        },
      },
      yAxis: {
        axisLine: {
          color: axisLineColor,
        },
        tickLine: {
          color: axisLineColor,
        },
        tickText: {
          color: textColor,
        },
      },
      separator: {
        color: axisLineColor,
      },
      crosshair: {
        horizontal: {
          line: {
            color: crossLineColor,
          },
          text: {
            backgroundColor: crossTextBackgroundColor,
          },
        },
        vertical: {
          line: {
            color: crossLineColor,
          },
          text: {
            backgroundColor: crossTextBackgroundColor,
          },
        },
      },
    };
  }, [theme]);

  useEffect(() => {
    const kLineChart = kLineChartRef.current!;
    kLineChart.setStyleOptions(styleOptions());
  }, [styleOptions]);

  useEffect(() => {
    // const kLineChart = kLineChartRef.current!;
    // kLineChart.createTechnicalIndicator("BOLL", true, { id: "candle_pane" });
    // kLineChart.overrideTechnicalIndicator({
    //   name: "MACD",
    //   calcParams: [7, 50, 5],
    // });
    // kLineChart.createTechnicalIndicator("MACD", false);
    // kLineChart.createTechnicalIndicator("KDJ", false);
    // kLineChart.createTechnicalIndicator("VOL", false);
  }, []);

  const loadNewData = useCallback((data) => {
    const kLineChart = kLineChartRef.current!;
    kLineChart.applyNewData(data);
  }, []);

  const myCalcTemp = useCallback(
    (myCalcName: string, testData: any, colors?: string[]) => {
      // const colors: string[] = [];
      const myCalcPlots = Object.keys(testData).reduce((v, k, idx) => {
        const titles = [k];
        titles.forEach((item) => {
          const config = {
            key: item,
            title: `${item} : `,
            type: "line",
          };
          Object.assign(
            config,
            colors
              ? {
                  color: (data, options) => {
                    return colors[idx];
                    // if (colors[idx]) {
                    //   return colors[idx];
                    // }
                    // const color = randomRgbaColor(true, 1);
                    // colors[idx] = color;
                    // return color;
                  },
                }
              : undefined
          );
          v.push(config);
        });
        return v;
      }, [] as any);
      const myCalc = {
        name: myCalcName,
        shortName: myCalcName,
        series: "price",
        plots: myCalcPlots,
        precision: symbolInfo?.precision.price,
        calcTechnicalIndicator: (dataList, { params, plots }) => {
          return dataList.map((item, index) => {
            return myCalcPlots.reduce((v, plot) => {
              const key = plot.key;
              v[key] = testData[key][index];
              return v;
            }, {});
          });
        },
      };

      return myCalc;
    },
    [symbolInfo?.precision.price]
  );

  useEffect(() => {
    const kLineChart = kLineChartRef.current!;

    let isloadKline = false;
    const myCalcInfos = taMaNameList.map((taMaName) => {
      fetchRequest(
        `/testData/${klineSaveInfoName(webSymbol, ctimeframe, taMaName)}.json`
      );

      const myCalcName = `trygo/${taMaName}`;
      const paneIdObj = { id: null } as { id: string | null };
      const sub = fetchRequest(
        `/testData/${klineSaveInfoName(webSymbol, ctimeframe, taMaName)}.json`
      ).subscribe((data) => {
        const calcInfo = data.calcInfo;
        kLineChart.addTechnicalIndicatorTemplate(
          myCalcTemp(
            myCalcName,
            {
              外: calcInfo.outBarMa?.ma || [],
              [`外(${calcInfo.outBarMa?.last?.period})`]:
                calcInfo.outBarMa?.last?.ma || [],
              内: calcInfo.overBarMa?.ma || [],
              [`内(${calcInfo.overBarMa?.last?.period})`]:
                calcInfo.overBarMa?.last?.ma || [],
              自由: calcInfo.mergeHL,
            },
            taMaName === "ma" ? chartLineColors : chartLineColors2
          ) as any
        );
        const paneId = kLineChart.createTechnicalIndicator(myCalcName, true, {
          id: "candle_pane",
        });
        paneIdObj.id = paneId;

        if (!isloadKline) {
          loadNewData(data.klineData);
          isloadKline = true;
        }
        kLineChart.resize();
      });

      return { sub, myCalcName, paneIdObj };
    });

    return () => {
      myCalcInfos.forEach((item) => {
        item.sub.unsubscribe();
        if (item.paneIdObj.id) {
          kLineChart.removeTechnicalIndicator(
            item.paneIdObj.id,
            item.myCalcName
          );
        }
      });
    };
  }, [loadNewData, ctimeframe, myCalcTemp]);

  return (
    <div className={`klinechart ${theme}`}>
      <div className="kline_top">
        <div className="symbolName">{webSymbol}</div>
        <div className="framelist">
          {timeFrames.map((tf) => {
            return (
              <Button
                className={`timeframitem ${ctimeframe === tf ? "active" : ""}`}
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
                return pre === "dark" ? "light" : "dark";
              });
            }}
          >
            {themes.find((item) => item.key !== theme)?.text}
          </Button>
          <LoadMoreKline />
          <LoadMarkes />
        </div>
      </div>
      <div className="kline_bottom">
        <div className="kline_left">
          {drawLines.map(({ key, text, ico }) => {
            return (
              <Button
                className="svgbox"
                key={key}
                onClick={() => {
                  kLineChartRef.current!.createShape(key);
                }}
                title={text}
              >
                {ico}
              </Button>
            );
          })}
          <Button
            className="svgbox cleatmark"
            onClick={() => {
              kLineChartRef.current!.removeShape();
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

export default Kline;
