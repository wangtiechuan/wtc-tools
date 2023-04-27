const createScriptRecord: Map<string, Promise<string>> = new Map();
export function createScript(url: string): Promise<string> {
  if (createScriptRecord.has(url)) {
    const res: any = createScriptRecord.get(url);
    return res;
  }
  const pms: Promise<string> = new Promise((resolve, reject) => {
    const id = url?.replace(/\//g, "")?.replace(/\./g, "");
    let script: any = document.getElementById(id);
    let isHasScript = !!script;
    if (!script) {
      script = document.createElement("script");
      script.type = "text/javascript";
      script.id = id;
    }
    script.onload = function () {
      resolve(url);
    };
    script.onerror = function () {
      reject(url);
      createScriptRecord.delete(url);
    };
    script.src = url;
    if (!isHasScript) {
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  });
  createScriptRecord.set(url, pms);
  return pms;
}
