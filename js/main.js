class Tile {
  constructor() {
    this.tile = [
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
    this.x = this.tile[0].length
    this.y = this.tile.length
    this.td = this.createTd();

    this.miniTile = [
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
    let nextBlockTd=this.createStockTd(document.querySelectorAll('.next td'))
    this.stockTd = this.createStockTd(document.querySelectorAll('.stock td'))
    this.nextBlockTd = [
      [nextBlockTd[0], nextBlockTd[1]],
      [nextBlockTd[2], nextBlockTd[3]],
      [nextBlockTd[4], nextBlockTd[5]],
    ]
  }
  createTd() {
    let d = Array.from(document.querySelectorAll('#game td'));
    let tmp = []
    let table = []
    d.forEach((el, i) => {
      tmp.push(el)
      if ((i + 1) % 12 == 0) {
        table.push(tmp)
        tmp = []
      }
    })
    return table
  }
  createStockTd(d) {
    let tmp = []
    let table = []
    d.forEach((el, i) => {
      tmp.push(el)
      if ((i + 1) % 4 == 0) {
        table.push(tmp)
        tmp = []
      }
    })
    return table
  }
  createNextBlockTd(d) {
    let tmp = []
    let table = []
    d.forEach((el, i) => {
      tmp.push(el)
      if ((i + 1) % 4 == 0) {
        table.push(tmp)
        tmp = []
      }
    })
    return table
  }
}
class Block {
  constructor(tile, type = this.getRandomIntInclusive(0, 6)) {
    // constructor(tile, type = 0) {
    this.block = [{
        // ┻
        shape: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0,y: -1},{x: -1, y: 0 },],
        class: ['mountain-top', 'mountain','mountain-top']
      }, {
        // 田
        shape: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1,y: -1}, {x: 0,y: -1},],
        class: ['square-top', 'square','square-top']
      },
      {
        // ┛
        shape: [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0,y: -1}, {x: -1,y: -1},],
        
        class: ['ano-l-top', 'ano-l','l-top']
      },
      {
        // ┗
        shape: [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0,y: -1},{x: 1,y: -1},],
        class: ['l-top', 'l','l-top']
      },
      {
        // |
        shape: [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0,y: -1}, {x: 0, y: 2},],
        class: ['stick-top', 'stick','stick-top']
      },
      {
        //2
        shape: [{x: 0, y: 0}, {x: 0,y: -1}, {x: 1, y: 0},{x: -1,y: -1},],
        class: ['two-top', 'two','two-top']
      },
      {
        // s
        shape: [{x: 0, y: 0}, {x: 0,y: -1},{x: -1, y: 0}, {x: 1,y: -1},],
        class: ['s-top', 's','s-top']
      }]
    this.type = type
    this.nowBlock = JSON.parse(JSON.stringify(this.block[type].shape))
    this.tile = tile
    this.init()

  }
  rot() { //右回転
    if (this.type == 1) { //ブロックが四角(田)のやつなら何もしない
      return;
    }
    let tempx
    let tempy
    //原点の値を一時コピー
    [tempx, tempy] = [this.nowBlock[0].x, this.nowBlock[0].y]
    this.nowBlock.forEach(item => [item.x, item.y] = [(-1) * item.y, item.x]);
    //平行移動
    [tempx, tempy] = [tempx - this.nowBlock[0].x, tempy - this.nowBlock[0].y]
    this.nowBlock.forEach(item => [item.x, item.y] = [item.x + tempx, item.y + tempy]);
  }
  move(code) {
    let tempBlock = JSON.parse(JSON.stringify(this.nowBlock))

    if (code === 37) { //左
      this.nowBlock.forEach(item => item.x--);
    } else if (code === 38) { //上
      this.rot();
    } else if (code === 39) { //右
      this.nowBlock.forEach(item => item.x++);
    } else if (code === 40) { //下
      this.nowBlock.forEach(item => item.y++);
    } else if (code === 13) { //一番下まで落とす
      for (let i = 0; i < this.tile.y; i++) {
        this.nowBlock.forEach(item => item.y++)
        this.nowBlock = this.chechTouchAndFix(this.nowBlock, tempBlock, 40)
      }
    }
    this.nowBlock = this.chechTouchAndFix(this.nowBlock, tempBlock, code)
    this.draw()
  }
  chechTouchAndFix(b, tempBlock, code) { //壁に触った 他のブロックと触ったなどを検知して修正
    let count = 0;
    b.forEach((item, i) => {
      if (this.tile.tile[item.y][item.x] == 1) { //1と接触したらその方向へは進めない
        if (code === 37 || item.x == 0) { //左
          b.forEach(it => it.x++);
        } else if (code === 39 || item.x == this.tile.x - 1) { //右
          b.forEach(it => it.x--);
        } else if (code === 40 || this.tile.y - 1) { //下
          b.forEach(it => it.y--);
        } else if (code === 38) { //上
          if (b[0].y - item.y > 0) { //回転して既存ブロックにぶつかったら避ける
            b.forEach(i => i.y++);
            count++
          } else if (b[0].y - item.y < 0) {
            b.forEach(it => it.y--);
            count++
          } else if (b[0].x - item.x > 0) {
            b.forEach(it => it.x++);
            count++
          } else if (b[0].x - item.x < 0) {
            b.forEach(it => it.x--);
            count++
          }
        }
      }
    })
    return count >= 1 ? tempBlock : b;
  }
  chechTouchAndFixSecond(b) {
    let check = 0;
    b.forEach((item, i) => {
      if (this.tile.tile[item.y][item.x] == 1) { //それでもぶつかるなら
        check++
      }
    });
    return check ? check - 1 : check
  }
  fixed() { //ブロックを固定
    this.nowBlock.forEach(item => this.tile.tile[Math.abs(item.y)][Math.abs(item.x)] = 1);
  }
  draw() {
    const X = this.tile.x
    const Y = this.tile.y
    let css
    let guide = JSON.parse(JSON.stringify(this.nowBlock))

    //タイル初期化
    for (let i = 0; i < Y - 1; i++) {
      for (let j = 1; j < X - 1; j++) {
        this.tile.td[i][j].className = this.tile.tile[i][j] == 0 ? 'default' : this.tile.td[i][j].className
      }
    }
    //描画
    this.nowBlock.forEach((item, i) => {
      css = this.block[this.type].class[0]
      css = this.isBlockOonBlock(item, this.nowBlock) ? this.block[this.type].class[1] : css
      this.tile.td[Math.abs(item.y)][Math.abs(item.x)].className = css
    });
    //ガイドを描画
    this.guideDraw(guide)
  }
  guideDraw(guide) {
    let res

    guideLoop:
      for (let i = 0; i < this.tile.y; i++) {
        guide.forEach(el => el.y++);
        for (let el of guide) {
          if (this.tile.tile[el.y][el.x] == 1) {
            guide.forEach(el => el.y--);
            break guideLoop
          }
        }
      }
    for (let item of guide) {
      for (let target of this.nowBlock) {
        res = 0
        if (JSON.stringify(target) == JSON.stringify(item)) {
          res = 1
          break;
        }
      }
      if (!res) {
        this.tile.td[item.y][item.x].className = 'guide'
      }
    }
  }
  isBlockOonBlock(item, b) { // 上にブロックがあるか判定  
    let arr = Object.assign({}, item)
    arr.y--;
    for (let item2 of b) {
      if (JSON.stringify(arr) == JSON.stringify(item2)) {
        return true
      }
    }
    return false;
  }
  init() { //ブロックの初期位置
    this.nowBlock.forEach(item => {
      item.x += (this.tile.x - 2) / 2;
      item.y++;
    });
  }
  getRandomIntInclusive(min, max) { //ランダムな整数の生成
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
  }
}

class App {
  constructor() {
    let stock = document.querySelector('.stock')
    // constructor(type = 3) {
    this.tile = new Tile();
    this.block = new Block(this.tile)
    this.interval = 900;
    this.nextBlockCount = 0
    this.previousBlockState = JSON.parse(JSON.stringify(this.block.nowBlock))
    this.stockBlockIns
    this.nextBlockIns = [new Block(this.tile), new Block(this.tile), new Block(this.tile)]
    this.stockBlock = [
      [{x: 1,y: 0}, {x: 0,y: 1}, {x: 1,y: 1}, {x: 2,y: 1}],
      [{x: 1,y: 0}, {x: 2,y: 0}, {x: 1,y: 1}, {x: 2,y: 1}],
      [{x: 2,y: 0}, {x: 0,y: 1}, {x: 1,y: 1}, {x: 2,y: 1}],
      [{x: 0,y: 0}, {x: 0,y: 1}, {x: 1,y: 1}, {x: 2,y: 1}],
      [{x: 0,y: 1}, {x: 1,y: 1}, {x: 2,y: 1}, {x: 3,y: 1}],
      [{x: 0,y: 0}, {x: 1,y: 0}, {x: 1,y: 1}, {x: 2,y: 1}],
      [{x: 1,y: 0}, {x: 2,y: 0}, {x: 0,y: 1}, {x: 1,y: 1}],
    ];
    this.stockType = null

    window.onkeydown = (e) => {
      this.block.move(e.keyCode)
      if (e.keyCode == 13) {
        this.nextBlockCount = 0;
        this.gameStart()
      }
    }
    stock.addEventListener('click', () => this.drawStock())
  }
  init() {
    this.block.draw()
  }
  gameStart() {
    this.block.move(40)
    this.movecheck()
    if (this.nextBlockCount == 1) { //ブロックが動かなかったら
      this.nextBlockCount = 0
      this.block.fixed();
      this.alignCheckAndFix()
      this.createBlock()
    }
  }
  movecheck() {
    if (JSON.stringify(this.previousBlockState) == JSON.stringify(this.block.nowBlock)) {
      this.nextBlockCount++
    } else {
      this.previousBlockState = JSON.parse(JSON.stringify(this.block.nowBlock))
    }
  }
  createBlock() {
    // createBlock(type = 3) {
    this.block = this.nextBlockIns[0]
    this.nextBlockIns.shift()
    this.nextBlockIns.push(new Block(this.tile))
    this.drawNextBlock()
    this.init()
  }
  alignCheckAndFix() { //1行揃っているかチェックして行を消す
    let arr
    for (let i = 0; i < this.tile.y - 1; i++) {
      arr = new Set(this.tile.tile[i])
      if (arr.size == 1) {
        this.removeLine(i)
      }
    }
  }
  removeLine(lineNum) { //行を消してブロックを落とす
    const X = this.tile.x
    const Y = this.tile.y
    let tdCopy = [];
    let tileCopy;

    // デザインの状態を保存
    this.tile.td.forEach((item, i) => {
      let temp = []
      item.forEach(item2 => temp.push(item2.className));
      tdCopy.push(temp)
    })
    //今のブロックの色の状態を保存
    tileCopy = JSON.parse(JSON.stringify(this.tile.tile))

    for (let i = 1; i < lineNum + 1; i++) {
      for (let j = 1; j < X - 1; j++) {
        this.tile.tile[i][j] = tileCopy[i - 1][j]
        this.tile.td[i][j].className = tdCopy[i - 1][j]
      }
    }
  }
  drawStock() {
    const Y = this.tile.y
    const X = this.tile.x
    let tempType = 0

    // タイル初期化
    for (let i = 0; i < Y - 1; i++) {
      for (let j = 1; j < X - 1; j++) {
        this.tile.td[i][j].className = this.tile.tile[i][j] == 0 ? 'default' : this.tile.td[i][j].className
      }
    }
    // ミニタイル初期化
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 4; j++) {
        this.tile.stockTd[i][j].className = ''
      }
    }
    if (this.stockType == null) {//ストック時
      this.stockType = this.block.type
      this.createBlock()
    } else {//2回めのストック時
      tempType = this.block.type
      this.block = new Block(this.tile, this.stockType)
      this.init()
      this.stockType = tempType
    }
    //描画
    this.stockBlock[this.stockType].forEach((item, i) => {
      this.tile.stockTd[item.y][item.x].className = 'white-block'
    });
  }
  drawNextBlock() {
    // ミニタイル初期化
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        for (let k = 0; k < 4; k++) {
          this.tile.nextBlockTd[i][j][k].className = ''
        }
      }
      this.stockBlock[this.nextBlockIns[i].type].forEach(item => {
        this.tile.nextBlockTd[i][item.y][item.x].className = 'white-block'
      });
    }
  }
}

window.onload = () => {
  let game = new App()
  game.init()
  game.drawNextBlock()
  // setInterval(function() {
  //   game.gameStart()
  // }, game.interval)
}