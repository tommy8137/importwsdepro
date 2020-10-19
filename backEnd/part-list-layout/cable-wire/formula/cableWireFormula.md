## F.成品總價 =A.材料費 + B.二次加工費 + C.零件費 + D.運包檢 + E.(管銷&利潤) * 10%

---

### A.材料費
> SUM( (材料單價 *0.001) * cable lengh(mm) * pin * (1+loss_rate) )

- 材料單價:  用`線材種類`以及`GUAGE`查表得到材料單價
- loss rate: 3%

---
### B.二次加工費
> = 加工工時 / 60 * 工時費用(0.067)
>
- 加工工時: SUM( Assembly + 備料 + 寬放時間)
  - Assembly: connector工時 + 輔料工時 + 耗 材(基本定值)工時
    - connector工時: = SUM( 1 * connector工時 (使用function name, connector type,vendor pn去 mapping 工時))
    - 輔料工時:
      - 如果輔料是 醋酸布:`6 + 醋酸布QTY * (成品長度總和 / 30)`;
      - 其他 `輔料QTY * 12`
    - 耗 材(基本定值) 工時: SUM(0)
  - 備料: Assembly * 8%
  - 寬放時間: EXCEL上未填寫公式

> 問題1. UV GLUE 的 Assembly time 是 0 ?
> 問題2. 耗 材(基本定值) 都是 Assembly time 是 0 嗎?

---

### C.零件費
> = 輔料費 + 耗材費 + connector 費用

- 輔料費
  - 地片1 = 地片1Qty * 單價 (0.0049)* ( 1 + Loss rate (=1.5%))
  - 地片2 = 地片2Qty * 單價(0.0049) * ( 1 + Loss rate (=1.5%))
  - KAPTON1 = KAPTON1Qty * 單價 (1.1527)* (輔料長度(L) * 輔料寬度(W) /1000000 )* ( 1 + Loss rate (=1.5%))
  - KAPTON2 = KAPTON2Qty * 單價(1.1527) * (輔料長度(L) * 輔料寬度(W) /1000000 )*( 1 + Loss rate (=1.5%))
  - 醋酸布 = 醋酸布Qty * 單價(0.8)*(成品長度總和 * 2) * (pin數總和 * 0.5/1000000) * ( 1 + Loss rate (=1.5%))
  - Teflon膠带 = 輔料QTY * 單價 (3.0259)* (輔料長度(L)* 輔料寬度(W)/1000000)*( 1 + Loss rate (=1.5%))
  - 導電布1 =導電布1Qty * 導電布1單價 * ( 1 + Loss rate (=1.5%))
  - 導電布1單價= (輔料長度(L) * 輔料寬度(W)*0.000001) *32.5
  - 導電布2=導電布2Qty * 導電布2單價  * ( 1 + Loss rate (=1.5%))
  - 導電布2單價= (輔料長度(L) * 輔料寬度(W) * 0.000001) *32.5
  - UV GLUE= UV GLUEQty * 單價 (0.0001)* ( 1 + Loss rate (=1.5%))
  - LABEL= LABELQty * 單價 (0.001)* ( 1 + Loss rate (=1.5%))

- 耗材費
  - 助焊劑 = 1 *單價 (0.0001) * ( 1+ loss_rate)
  - 酒精 = 1 * 單價 (0.0001) * ( 1+ loss_rate)
  - 雙面膠紙 = 1 * 單價 (0.0003) * ( 1+ loss_rate)
  - 美紋膠紙 =  1 * 單價 (0) * ( 1+ loss_rate)
  - 棉紙 = 1 * 單價 (0.0001) * ( 1+ loss_rate)
  - 防焊膠紙 =1 * 單價 (0.0007) * ( 1+ loss_rate)
  - 美紋紙 耐高溫型 = 1 * 單價 (0.0108) * ( 1+ loss_rate)
  - PE膜 = 1 * 單價 (0.0047) * ( 1+ loss_rate)
  - 錫絲 = 1 * 單價 (0.0068) * ( 1+ loss_rate)
  - loss_rate = 0.015

- connector 費用
  > 1 * connector單價 * (1 + loss_rate)
  - loss_rate = 3%
  - connector單價: 可以用function name, connector type,vendor pn 去mapping出connector單價

---

### D.運包檢
-  如果(材料費+二次加工費+零件費 > 0.8) 運包檢 = 0.8
- 其他 運包檢=0.04

> 問題3. excel 上標注 EDP CABLE 的 運包檢 = 0.8 ？
---

### E.管銷&利潤 * 10%
> 二次加工費 *10%
