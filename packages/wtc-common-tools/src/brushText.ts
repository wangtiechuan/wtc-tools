export interface SearchValuePropa {
  aimTxt: string;
  jumpUrl?: string;
}

export interface BrushTextRes {
  text: string;
  mark: boolean;
  jumpUrl?: string;
}

export function brushText(
  str?: string,
  searchValue?: SearchValuePropa[]
): BrushTextRes[] {
  if (
    !searchValue ||
    searchValue.length === 0 ||
    !str ||
    !searchValue.some((item) => str.includes(item.aimTxt))
  ) {
    return [{ text: str || "", mark: false, jumpUrl: undefined }];
  }

  const tempMark = `______________`;

  const v1 = searchValue.reduce((v, item, index) => {
    return v.split(item.aimTxt).join(`${tempMark}${index}${tempMark}`); // 替代replaceAll
  }, str);

  const sStr = v1.split(tempMark);

  // console.log(sStr, v1);

  const arr: BrushTextRes[] = [];
  sStr.forEach((item) => {
    const mark = parseInt(item).toString() === item;

    const searchText = mark ? searchValue[parseInt(item)] : undefined;

    const info: BrushTextRes = {
      text: mark ? searchText?.aimTxt || "" : item,
      mark,
      jumpUrl: mark ? searchText?.jumpUrl : undefined,
    };

    if (info.text) {
      arr.push(info);
    }
  });
  return arr;
}
