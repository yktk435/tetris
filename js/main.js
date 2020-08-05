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
}
class Block {
  constructor(tile, type = this.getRandomIntInclusive(0, 6)) {
    this.block = [{
        // ┻
        shape: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0,y: -1},{x: -1, y: 0 },],
        class: ['mountain-top', 'mountain']

      }, {
        // 田
        shape: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1,y: -1}, {x: 0,y: -1},],
        class: ['square-top', 'square']
      },
      {
        // ┗
        shape: [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0,y: -1}, {x: 1,y: -1},],
        class: ['l-top', 'l']
      },
      {
        // ┛
        shape: [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0,y: -1},{x: -1,y: -1},],
        class: ['ano-l-top', 'ano-l']
      },
      {
        // |
        shape: [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0,y: -1}, {x: 0, y: 2},],
        class: ['stick-top', 'stick']
      },
      {
        //2
        shape: [{x: 0, y: 0}, {x: 0,y: -1}, {x: 1, y: 0},{x: -1,y: -1},],
        class: ['two-top', 'two']
      },
      {
        // s
        shape: [{x: 0, y: 0}, {x: 0,y: -1},{x: -1, y: 0}, {x: 1,y: -1},],
        class: ['s-top', 's']
      }]
    this.type = type
    this.nowBlock = this.block[type].shape
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
    [tempx,tempy]=[tempx - this.nowBlock[0].x,tempy - this.nowBlock[0].y]
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
      css = this.block[this.type].class[1]
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
    for (var item2 of b) {
      if(JSON.stringify(arr) == JSON.stringify(item2)){
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
  getRandomIntInclusive(min, max) {//ランダムな整数の生成
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
  }
}

class App {
  constructor(type = this.getRandomIntInclusive(0, 6)) {
    // constructor(type = 3) {
    this.tile = new Tile();
    this.block = new Block(this.tile, type)
    this.interval = 900;
    this.nextBlockCount=0
    this.previousBlockState=JSON.parse(JSON.stringify(this.block.nowBlock))
    this.stockBlock
    this.nextBlock=[new Block(this.tile),new Block(this.tile),new Block(this.tile)]
    console.log(this.nextBlock)
    
    window.onkeydown = (e) => {
      this.block.move(e.keyCode)
      if (e.keyCode == 13) {
        this.nextBlockCount=0;
        this.gameStart()
      }
    }
  }
  init() {
    this.block.draw()
    
  }
gameStart(){
  this.block.move(40)
  this.movecheck()
  // console.log('this.nextBlockCount',this.nextBlockCount)
  if(this.nextBlockCount==1){//ブロックが動かなかったら
    this.nextBlockCount=0
    this.createBlock()
  }
  
  
  
}
movecheck(){
  
  if(JSON.stringify(this.previousBlockState)==JSON.stringify(this.block.nowBlock)){
    this.nextBlockCount++
  }else{
  this.previousBlockState=JSON.parse(JSON.stringify(this.block.nowBlock))  
  }
  
}
  createBlock(type = this.getRandomIntInclusive(0, 6)) {
    // createBlock(type = 3) {
    this.block.fixed();
    this.alignCheckAndFix()
    this.block = new Block(this.block.tile, type)
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
  getRandomIntInclusive(min, max) {//ランダムな整数の生成
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
  }
}

window.onload = () => {
  let game = new App()
  game.init()
  // setInterval(function(){
  //   game.gameStart()
  // },game.interval)
}