class Magnet {
  constructor(sizeL, sizeW, sizeH) {
    this._sizeL = sizeL
    this._sizeW = sizeW
    this._sizeH = sizeH
  }
  get volume() {
    return this._sizeH * this._sizeL * this._sizeW
  }
  // set volume(value) {
  //   this.volume = value
  // }
  get finishWeight() {
    // 成品重量 = 成品尺寸(L) *  成品尺寸(W) *  成品尺寸(H) * 材料密度 / 1000000
    return this.volume * this.material.density / 1000000
  }
  get costMaterial() {
    // 材料費 = 材料單價 * 成品重量 * ( 1 + Loss 率)
    return this.material.unitPrice * this.finishWeight * ( 1 + this.material.lossRate)
  }
  get costProcessing() {
    // 二次加工費 = 裁切邊料耗損 + 裁切加工費 + (充磁費+人工費) + 貼背膠_3M_9448
    return this.costProcA + this.costProcB + this.costProcC + this.costProcD
  }
  get costProcA() {
    // 裁切邊料耗損 = 材料費 * 損耗率
    // let lossRate = 0
    // if (this.volume <= 60) lossRate = 0.45
    // else if (this.volume > 60 && this.volume <= 100) lossRate = 0.40
    // else lossRate = 0.35
    let itemA = new ProcessingItemA('裁切邊料耗損', '刀具寬度0.3mm', this.volume, 0.1303, '單價*損耗率')
    return itemA.cost
  }
  get costProcB() {
    // 裁切加工費 = 單價 * 體積(V)
    // let unitPrice = 0.0001
    let itemB = new ProcessingItemB('裁切加工費', null, this.volume, 0.0001, '單價*體積(V)')
    return itemB.cost
  }
  get costProcC() {
    // 充磁費+人工費 = 單價 * 時間(sec)
    // let unitPrice = 0
    // let manCharge = 1.66
    // if (this.volume <= 200) unitPrice = 200
    // else if (this.volume > 200 && this.volume <= 300) unitPrice = 0.008
    // else unitPrice = 0.01
    let itemC = new ProcessingItemC('充磁費+人工費', null, this.volume, null, '單價*時間(sec)', 1.66)
    return itemC.cost
  }
  get costProcD() {
    //  貼背膠_3M_9448 = 單價 * 面積(mm) /100 * ( 1 + 損耗率)
    // let unitPrice = 0.0012
    // let lossRate = 0.10    
    // return unitPrice * this._sizeL * this._sizeW  / 100 * ( 1 + lossRate )
    let itemD = new ProcessingItemD('貼背膠_3M_9448', '面積 長*寬 (mm)', this.volume, 0.0012, '單價*面積(mm)', this._sizeL * this._sizeW)
    return itemD.cost

  }
  get material() {
    return this._material
  }
  set material(value) {
    let material = new MagnetMaterial(value)
    this._material = material
  }
  
  // getVolume() {
  //   return this.sizeH * this.sizeL * this.sizeW
  // }
  // static costB1() {
  //   // 裁切邊料耗損
  // }
}


class MagnetMaterial {
  constructor(material) {
    this._type = 'material'
    this._unitPrice = null
    this._density = null
    this._specName = material
    this._lossRate = 0
    this.spec = material
  }
  get density() { return this._density }
  get spec() { return this._spec }
  get unitPrice() { return this._unitPrice }
  get lossRate() { return this._lossRate }
  set spec(value) {
    switch (value) {
      case 'Nd-Fe-B N48':
        this._spec = value
        this._unitPrice = 35.1
        this._density = 7.58
        break
      case 'Nd-Fe-B N52':
        this._spec = value
        this._unitPrice = 35.1
        this._density = 7.58
        break
      case 'Nd-Fe-B N48H':
        this._spec = value
        this._unitPrice = 35.1
        this._density = 7.58
        break
      case 'Nd-Fe-B N52H':
        this._spec = value
        this._unitPrice = 35.1
        this._density = 7.58
        break
      default:
        break
    }
  }

}

class ProcessingItem {
  constructor(name, content, volume, unitPrice, remark) {
    this._name = name
    this._content = content
    this._volume = volume
    this._unitPrice = unitPrice
    // this._procSec = procSec
    // this._area = area
    this._lossRate = 0
    this._remark = remark
    this._cost = 0
  }

}

class ProcessingItemA extends ProcessingItem {
  // 裁切邊料耗損 = 材料費 * 損耗率
  constructor(name, content, volume, unitPrice, remark) {
    super(name, content, volume, unitPrice, remark)
  }
  get lostRate() {
    let _lossRate
    if (this._volume <= 60) _lossRate = 0.45
    else if (this._volume > 60 && this._volume <= 100) _lossRate = 0.40
    else _lossRate = 0.35
    return _lossRate
  }
  get cost() { return this._unitPrice * this.lostRate }
}

class ProcessingItemB extends ProcessingItem {
  // 裁切加工費 = 單價 * 體積(V)
  constructor(name, content, volume, unitPrice, remark) {
    super(name, content, volume, unitPrice, remark)
  }
  get cost() { return this._unitPrice * this._volume }
}

class ProcessingItemC extends ProcessingItem {
  // 充磁費+人工費 = 單價 * 時間(sec)
  constructor(name, content, volume, unitPrice, remark, procSec) {
    super(name, content, volume, unitPrice, remark)
    this._procSec = procSec
  }
  get unitPrice() {
    let unitPrice
    if (this._volume <= 200) unitPrice = 200
    else if (this._volume > 200 && this._volume <= 300) unitPrice = 0.008
    else unitPrice = 0.01
    return unitPrice
  }
  get cost() { return this.unitPrice * this._procSec }
}

class ProcessingItemD extends ProcessingItem {
  //  貼背膠_3M_9448 = 單價 * 面積(mm) /100 * ( 1 + 損耗率)
  constructor(name, content, volume, unitPrice, remark, area) {
    super(name, content, volume, unitPrice, remark)
    this._area = area
  }
  get lostRate() {
    return 0.1
  }
  get cost() { return this._unitPrice * this._area / 100 * (1 + this.lostRate) }
}

module.exports = { Magnet }
