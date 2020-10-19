Layout yaml 說明
===
## showMenu： true / false

是否需要顯示表單內左邊的Menu，Menu內條列所有composite的標題，點選標題後，右邊自動捲動到該區域。
ex: housing-plastic的Fill by ME RD和Fillby tooling Team ; die-cut則沒有Menu。


## layout

* fieldType: 對應前端的component。

* dataType: 目前有三種： string / int / float。

* displayConfig: 設定display的config，會引用tempalte內的displayConfig。

* multiple: 是否可以新增多個該欄位。<br />
  - true: Btn內的字是Add another。<br />
  - 自己輸入字串: Btn內的字是自己輸入的字串。

* require: 是否有必填(有星號)。composite不用設定。

* editable: 是否可以修改標題。

* default: 是否有default值。composite不用設定。

* constrains: 控制驗證欄位的內容。<br />

  ex: housing-plastic的備註yaml這樣設定：<br />

  ```yaml
  constrains:
    - function: "(val) => val.length > 100"
      message: "長度不得超過 100 字"
  ```

* switchable: 是否要有switch btn。 通常只有composite要用到。<br />
  - 自己輸入字串: 自己輸入字串的字串就是switch btn的標題。

* needExe: 前端是否需要處理該欄位，false 表示給後端使用

* level: 0 / 1 / 2 。只用於label。

* emdmKey: 對應從 eMDM 送來的 object path

* showCostByKey: 設定price object path，若有設定，會在title 上面顯示cost
---
> displayConfig<br />
> displayConfigFalse

* display: 是否要顯示欄位。true / false。
* grid: 欄位顯示寬度。0.5 / 1 / 1.5 / 2 / 2.5 / 3。
* depends:<br />
    action: lock  -> 欄位為disabled。<br />
    condtion: 可以設定哪些欄位有值了之後，此欄位就enabled。

---
> selectorConfig

使用selector時會用到的config。
* depends: 若這個欄位需要在A欄位選擇後才可以有值可以選，depends就放A欄位的key。
* values: 選單內容，陣列型態
* idKey: 對應 eMDM 回傳的識別字(identity key)，主要因為 ePro 是存 選單文字 ， eMDM 存 識別字(identity key)，需要此值來對應

---
> tab

若有一個以上就會有上方的tab。
ex: housing-plastic上方的Tooling Part List 和CMF and Process List。

---
> composite

目前tab的items裡只能放compoite。
ex: thermal-modual右邊表單的每一個灰底標題都是compoite，所有composite標題會條列在左邊Menu中。

* composite： 正常都使用這個。
* compositeMultiUpload： 用於上傳圖片的區域。ex: thermal-module的Image。

---
> inputString<br/>
> inputInt<br/>
> inputFloat<br/>

由使用者手動input的欄位，可以輸入字串、整數、小數。

---
> selectorString<br />
> selectorInt<br />
> selectorFloat<br />

由使用者手動選擇的`單選`下拉選單。

---
> multiSelectorString<br />
> multiSelectorInt<br />
> multiSelectorFloat<br />

由使用者手動選擇的`多選`下拉選單。

---
> fetchData<br />
> fetchSelector<br />
> fetchHidden ?

要使用api拿值的欄位，需要設定url。ex: 參考partname設定。<br />
* fetchData: fetch input的欄位
* fetchSelector: fetch下拉選單的欄位。
* fetchHidden: fetch資料但是不會在畫面顯示。


---
> inputDate

由使用者手動輸入的日期選擇器。

---
> uploadImage

由使用者手動選擇上傳單張照片的欄位。

---
> textarea

由使用者手動輸入的textarea。

---
> checkBox

Switch的欄位。<br />
正常是傳送true / false。<br />
如果要在左右邊放字串，就在values中設定：<br />
true(Btn是綠色、開關滑到右邊時): 設定要傳送的字。 <br />
false(Btn是灰色、開關滑到左邊時): 設定要傳送的字。 <br />


---
> label

顯示標題的欄位。
以cable-wire為例：<br />
* 線材群組（黑底）: level為0。
* Group Name（灰底）: level為1。
* 線材 (粗底線): level為2。


---

> mappedValue

表示該數值會使用其他數值比對後得到，通常對應值會寫在下拉選單裡面。
> mappedValueFloat<br />
> mappedValueInt<br />
> mappedValueString<br />

---
> mappedFunc

表示該數值會使用函數直接計算該數值。

> mappedFuncFloat<br />
> mappedFuncInt<br />

## formulas

說明後端計算公式時，會使用到的公式ymal 及對應的group。

以下方範例說明：
layout 找到 `group: materialCost`，<br />
接著可以在 formulas 找到 `materialCost` 的物件 <br />
其中的 $die-cut.materialCost 代表會去找到 die-cut/materialCost.yaml <br />
最後說明會用到該YAML 中哪幾個物件。 <br />

```yaml
  materialCost:
    $die-cut.materialCost:
      - ^formula
      - ^output
      - ^scope
``



```yaml
version: '1.0'
showMenu: false
layout:
  - key: dieCutTab
    label: dieCutTab
    group:
      - dieCut
    $Template:
      - tab
    items:
      - key: DieCutPartItemInfo
        label: 我不應該被顯示出來
        $die-cut.partItemInfo:
          - ^multiple
          - ^items
        visiable: false
        $Template:
          - composite
      - key: MainMaterial
        label: 主要材料
        group:
          - materialCost
        $die-cut.mainMaterial:
          - ^multiple
          - ^items
        $Template:
          - composite
      - key: usingSubMaterial
        label: 輔料
        group:
          - subMaterialCost
        multiple: 新增輔料
        switchable: 有使用輔料
        $die-cut.subMaterial:
          - ^items
        $Template:
          - composite

formulas:
  dieCut:
    $die-cut.DieCutFormula:
      - ^formula
      - ^output
  materialCost:
    $die-cut.materialCost:
      - ^formula
      - ^output
      - ^scope
  subMaterialCost:
    $die-cut.subMaterialCost:
      - ^formula
      - ^output
      - ^scope
      - ^constant

```
