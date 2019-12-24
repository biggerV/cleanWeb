
// 记录被阻止的广告
const replaceList = {}

// 需要阻止的广告规则：正则
const matches = [
  /googlesyndication.com/,
  /linuxprobe.com/,
  /hm.baidu.com/,
  /\/\/t\d+.baidu.com/,
  /cpro.baidustatic.com/,
  /mediav.com/,
  /cdn.v2ex.com\/assets\/sidebar/,
  /static.oschina.net\/uploads\/cooperation/,
  /rabc2.iteye.com/,
  /adaccount.csdn.net/,
  /ydstatic.com/,
  /doubleclick.net/,
]

// 监听网络请求，阻止的广告加载
chrome.webRequest.onBeforeRequest.addListener(function (d) {
  // console.log(d)
  const tabid = String(d.tabId)

  replaceList[tabid] = replaceList[tabid] ? replaceList[tabid] : []
  var url = d.url;
  var isCancel = false

  matches.map(m => {
    if (m.test(url)) {
      if (replaceList[tabid].indexOf(url) === -1) {
        replaceList[tabid].push(url)
      }
      isCancel = true
      setIcon(tabid)
    }
  })

  return {
    cancel: isCancel
  }
},
  { urls: ["<all_urls>"] }, // 在所有网页执行
  ["blocking"] // 阻止源请求
)

console.log(replaceList)

function getReplaceList() {
  return replaceList
}

// 如果有阻止的广告则点亮图标
function setIcon(tabid) {
  chrome.browserAction.setIcon({
    tabId: parseInt(tabid),
    path: {
      "16": "icons/128.png",
      "48": "icons/128.png",
      "128": "icons/128.png"
    }
  })
}

