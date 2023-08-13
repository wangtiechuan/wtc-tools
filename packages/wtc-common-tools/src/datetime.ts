const week = ['日', '一', '二', '三', '四', '五', '六'];

// 两个日期之间的差距
export function getDeltaDays(delta_timestamp: number) {
  const delta_ms = delta_timestamp;

  let _D = 1000 * 60 * 60 * 24;
  let _h = 1000 * 60 * 60;
  let _m = 1000 * 60;
  let _s = 1000;

  // day
  let D = parseInt(`${delta_ms / _D}`).toString();
  let DD = D;
  if (D.length < 2) {
    DD = '0' + D;
  }

  // hour
  let t = delta_ms % _D;
  let h = parseInt(`${t / _h}`).toString();
  let hh = h;
  if (h.length < 2) {
    hh = '0' + h;
  }

  // minute
  t = delta_ms % _h;
  let m = parseInt(`${t / _m}`).toString();
  let mm = m;
  if (m.length < 2) {
    mm = '0' + m;
  }

  // second
  t = delta_ms % _m;
  let s = parseInt(`${t / _s}`).toString();
  let ss = s;
  if (s.length < 2) {
    ss = '0' + s;
  }

  // ms
  let ms = delta_ms % _s;

  return {
    DD,
    D,
    hh,
    h,
    mm,
    m,
    ss,
    s,
    ms,
  };
}

export function getDateDesc(date: Date) {
  let style: string | 0 = '';

  let _D = 1000 * 60 * 60 * 24;

  // get 今天零点 以此为标准 进行日期 推算
  let dArray = new Date().toString().split(' ');
  dArray[4] = '00:00:00';
  let dString = dArray.join(' ');
  let ts_today0 = +new Date(dString); // 以今天零点 时刻的时间戳 为标准

  let n = +date - ts_today0; // 和 中国 标准 今天 零点 比较
  let delta = n / _D;

  // 从 远到近 一点一点往0接近 无穷接近于0
  if (delta >= 0) {
    style = 0;

    // 将来时
    if (delta <= 3) {
      style = '后天';
    }
    if (delta <= 2) {
      style = '明天';
    }
    if (delta <= 1) {
      style = '今天';
    }
  } else if (delta < 0) {
    // 过去时

    style = 0;

    if (delta >= -7) {
      // 过去一周内 week
      style = week[date.getDay()];
    }
    if (delta >= -2) {
      style = '前天';
    }
    if (delta >= -1) {
      style = '昨天';
    }
  }

  return style;
}

// 格式化时间
export function DateT(dateInput: string | number | Date) {
  const _date =
    typeof dateInput === 'string' && dateInput.indexOf('-') > -1
      ? dateInput.replace(/-/g, '/')
      : dateInput;
  const date = new Date(_date);
  // 四位数字年份
  const Y = date.getFullYear().toString();

  // 月中的某一天 1~31
  const D = date.getDate().toString();
  let DD = D;
  if (D.length < 2) {
    DD = '0' + D;
  }

  // 月份 (0 ~ 11)
  const M = (date.getMonth() + 1).toString(); // 从1开始
  let MM = M;
  if (M.length < 2) {
    MM = '0' + M;
  }

  // 周中的某一天 0～6
  const W = date.getDay().toString();

  // 中文 星期
  // @ts-ignore
  const WC = `星期${week[W]}`;
  // @ts-ignore
  const WK = week[W];

  let frame = 'am';

  // 小时 (0 ~ 23)
  const H = date.getHours().toString();
  let HH = H;
  if (H.length < 2) {
    HH = 0 + H;
  }

  let h = H;
  // @ts-ignore
  if (h > 12) {
    frame = 'pm';
    // @ts-ignore
    h = (H - 12).toString();
  }

  let hh = h;
  if (h.length < 2) {
    hh = '0' + h;
  }

  // 分钟 (0 ~ 59)
  let m = date.getMinutes().toString();
  let mm = m;
  if (m.length < 2) {
    mm = '0' + m;
  }

  // 秒数 (0 ~ 59)
  let s = date.getSeconds().toString();
  let ss = s;
  if (s.length < 2) {
    ss = '0' + s;
  }

  // 毫秒(0 ~ 999)
  let ms = date.getMilliseconds().toString();
  let msms = ms;
  if (ms.length < 2) {
    msms = '0' + ms;
  }

  let out = {
    YYYY: Y,
    yyyy: Y,
    yy: Y.slice(-2),
    YY: Y.slice(-2),
    Y: Y,
    M: M,
    MM: MM,
    D: D,
    DD: DD,
    H: H,
    HH: HH,
    h: h,
    hh: hh,
    m: m,
    mm: mm,
    s: s,
    ss: ss,
    ms: ms,
    msms: msms,
    W: W,
    WC: WC,
    WK,
    frame: frame,
  };

  return out;
}

// 获取指定时间的毫秒数， 默认指当前时间的毫秒数
export function getTimes(now: string | number | Date) {
  const _now =
    typeof now === 'string' && now.indexOf('-') > -1
      ? now.replace(/-/g, '/')
      : now;
  const now2 = _now ? new Date(_now) : new Date();
  const arr = now2.toString().split(' ');
  arr[4] = '00:00:00';
  return +new Date(arr.join(' '));
}

// 获取一天毫秒数
export function getOneDayTimes() {
  return 1000 * 60 * 60 * 24;
}

// 是否是同一天
export function isSameDay(
  one: string | number | Date,
  two: string | number | Date,
) {
  return getTimes(one) === getTimes(two);
}

// 获取时间串
export function getFormateDay(times: string | number | Date, hasWeek = true) {
  const dt = DateT(times);
  let t = `${dt.YYYY}-${dt.MM}-${dt.DD}`;
  if (hasWeek) {
    t += `(周${dt.WK})`;
  }
  return t;
}

/**
 * 获取时间，格式为2020.01.01
 * @param {*} time
 * @param {*} splitDes 默认以.为间隔
 * @returns
 */
export const getTimeByDateString = (
  timeInput: string | number | Date,
  splitDes?: string,
) => {
  let time = timeInput;
  if (!time) {
    return '';
  }
  if (typeof time === 'string') {
    // @ts-ignore
    time = time.replace(/-/g, '/');
  }
  const date = new Date(time);
  const year = date.getFullYear();
  let month: any = date.getMonth() + 1;
  month = month > 9 ? month : '0' + month;
  let day: any = date.getDate();
  day = day > 9 ? day : '0' + day;
  let createdDes = [year, month, day].join(splitDes || '.');
  if (splitDes === 'word') {
    createdDes = year + '年' + month + '月' + day + '日';
  }
  return createdDes;
};
