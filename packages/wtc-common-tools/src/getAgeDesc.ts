// 获取出生日期
export function getAgeDesc(birthday?: string | number | Date) {
  let dateStr = "";
  if (!birthday) {
    return "";
  }

  const start = new Date(birthday);
  const end = new Date();

  // @ts-ignore
  let deltaTS = end - start;

  const day = 1000 * 60 * 60 * 24;
  // @ts-ignore
  let deltaDay = parseInt(deltaTS / day);

  const diffYear = end.getFullYear() - start.getFullYear();
  const diffMonth = end.getMonth() - start.getMonth();
  const diffDay = end.getDate() - start.getDate();

  // 很多年前
  if (diffYear > 1) {
    dateStr = `${diffYear}`;
    if (diffMonth < 0) {
      dateStr = `${diffYear - 1}`;
    }

    if (diffMonth == 0 && diffDay < 0) {
      dateStr = `${diffYear - 1}`;
    }
  }
  dateStr = dateStr + "岁";

  // 去年
  if (diffYear == 1) {
    if (diffMonth > 0) {
      dateStr = diffYear + "岁";
    }

    if (diffMonth < 0) {
      let M = end.getMonth() + 12 - start.getMonth();
      dateStr = `${M}`;
      if (diffDay < 0) {
        dateStr = `${M - 1}`;
      }
      dateStr = dateStr + "个月";
    }

    if (diffMonth == 0 && diffDay >= 0) {
      dateStr = diffYear + "岁";
    }

    if (diffMonth == 0 && diffDay < 0) {
      // @ts-ignore
      dateStr = dateStr = +"个月";
    }
  }

  // 同年
  if (diffYear == 0) {
    if (diffMonth > 1) {
      dateStr = `${diffMonth}`;
      if (diffDay < 0) {
        dateStr = `${diffMonth - 1}`;
      }
      dateStr = dateStr + "个月";
    }

    if (diffMonth == 1 && diffDay >= 0) {
      dateStr = `${diffMonth}`;
      dateStr = dateStr + "个月";
    }

    if (diffMonth == 1 && diffDay < 0) {
      dateStr = deltaDay >= 1 ? deltaDay + "天" : "0天";
    }

    // 同年同月
    if (diffMonth == 0) {
      dateStr = deltaDay >= 1 ? deltaDay + "天" : "0天";
    }
  }

  return dateStr;
}
