const CBG = chrome.extension.getBackgroundPage()
const repalceListEle = document.querySelector("#repalceList")
const adsCount = document.querySelector("#adsCount")
const replaceList = CBG.getReplaceList()
let tabid = ""
let list = ""

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  tabid = String(tabs[0].id)

  adsCount.innerHTML = replaceList[tabid].length

  if (replaceList[tabid] && replaceList[tabid].length > 0) {
    replaceList[tabid].map((item) => {
      list += `<li>${item}</li>`
    })
  } else {
    list = "<li>没有找到广告</li>"
  }

  repalceListEle.innerHTML = list

});
