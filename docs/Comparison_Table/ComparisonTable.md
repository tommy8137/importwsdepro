## Comparison Table 交接文件

### 需求來源

eMDM 的使用者希望`可在Project List上，可匯出Comparison Table`，與ePro有關的需求為：

  - 可多選Project，再選擇每個Project要比較的版本及Cost SKU (1~5)，選擇版本時可同時看到該版本是否有cost
  - 匯出內容參考：   
    [Part_count_Comparison_table-V1-2020-0204.excel 無參數](https://gitlab.devpack.cc/e-procure-wsd/wi-procurement/blob/master/docs/Comparison_Table/Part_count_Comparison_table-V1-2020-0204.xlsx)  
    [Part_count_Comparison_table-V1-2020-0204-填寫規則Wei 有參數](https://gitlab.devpack.cc/e-procure-wsd/wi-procurement/blob/master/docs/Comparison_Table/Part_count_Comparison_table-V1-2020-0204-填寫規則Wei.xlsx)
  - 流程圖：
    ![](https://gitlab.devpack.cc/e-procure-wsd/wi-procurement/raw/master/docs/Comparison_Table/flow.png)

### ePro 要做的事

  - 回傳價格給eMDM，內容為 bom item 的 last price / suggestion cost / cePL / ceShipping / ceAssembly / clean sheet 的細項價格 (例如： 超音波清洗價格)

### 如何對應資料

  - ppId 為 eMDM 用來辨識要對應的input bom 識別子

### 詳細內容

  - eMDM 開 API 給 ePro 呼叫: [API 參考文件 - /eprocurement/sendProjectValuationInfo](https://192.168.100.105/swagger-ui.html#/e-Procurement/sendProjectValuationInfoUsingPOST)
  - 欄位對應參考ePro 的 key，例如： ce 運包 -> ceShipping
  - payload 中的 cmfForm 不用傳給eMDM，需回傳的程式定義在 backEnd/server/utils/mebom/emdmUtils.js 中
  - 若跟 sku 有關的價格須放在 skuPrice 。

### 測試方法

  - 由於ePro只要確定有將價格送回，可以在eMDM 匯出 Comparison table 的畫面，確認該版本是否有cost version 可以選擇。
  - form1 \ form5 價格是否正確，只能由eMDM來確認。
  - form2 ~ form4 的部分可以透過匯出來的檔案，比對放在 資料表bom_partlist_value中的 partlist_price欄位中的資訊來確認。

### 膠水重量API

  - 提供膠水重量API給eMDM呼叫，因為膠水密度為eProcurement公式資料庫維護
    - 程式位置：backEnd/server/service/bom/partList.js
    - function: getGlueWeight
    - API Route: bom/partlist/getGlueWeight/:{productType}/:{cmfProcessListThermalBondingPathLength}/:{cmfProcessListThermalBondingGlueSyringeDiameter}
  - Layout YAML也修改為使用fetchData呼叫此API取得膠水重量
    - 程式位置：backEnd/part-list-layout/housing-metal/layout/CmfProcessListThermalBonding.yaml
    - key: cmfProcessListThermalBondingGlueWeight

    





