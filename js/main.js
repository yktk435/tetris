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
    let d = Array.from(document.querySelectorAll('td'));
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
  constructor(tile, type = 0) {
    this.block = [{
        // □
        //□□□
        shape: [{
            x: 0,
            y: 0
          },
          {
            x: 1,
            y: 0
          },
          {
            x: 0,
            y: -1
          },
          {
            x: -1,
            y: 0
          }
        ],
        class: ['mountain-top', 'mountain']

      }, {
        // □□
        // □□
        shape: [{
            x: 0,
            y: 0
          },
          {
            x: 1,
            y: 0
          },
          {
            x: 1,
            y: -1
          },
          {
            x: 0,
            y: -1
          },
        ],
        class: ['square-top', 'square']
      },
      {
        // □
        // □
        // □□
        shape: [{
            x: 0,
            y: 0
          },
          {
            x: 0,
            y: 1
          },
          {
            x: 0,
            y: -1
          },
          {
            x: 1,
            y: -1
          },
        ],
        class: ['l-top', 'l']
      },
      {
        // □
        // □
        // □□
        shape: [{
            x: 0,
            y: 0
          },
          {
            x: 0,
            y: 1
          },
          {
            x: 0,
            y: -1
          },
          {
            x: -1,
            y: -1
          },
        ],
        class: ['ano-l-top', 'ano-l']
      },
      {
        // □
        // □
        // □
        // □
        shape: [{
            x: 0,
            y: 0
          },
          {
            x: 0,
            y: 1
          },
          {
            x: 0,
            y: -1
          },
          {
            x: 0,
            y: 2
          },
        ],
        class: ['stick-top', 'stick']
      },
      {
        // □□
        //  □□
        shape: [{
            x: 0,
            y: 0
          },
          {
            x: 0,
            y: -1
          },
          {
            x: 1,
            y: 0
          },
          {
            x: -1,
            y: -1
          },
        ],
        class: ['two-top', 'two']
      },
      {
        //  □□
        // □□
        shape: [{
            x: 0,
            y: 0
          },
          {
            x: 0,
            y: -1
          },
          {
            x: -1,
            y: 0
          },
          {
            x: 1,
            y: -1
          },
        ],
        class: ['s-top', 's']
      }

    ]
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
    this.nowBlock.forEach(item => {
      [item.x, item.y] = [(-1) * item.y, item.x]
    });
    //平行移動
    tempx = tempx - this.nowBlock[0].x
    tempy = tempy - this.nowBlock[0].y
    this.nowBlock.forEach(item => {
      [item.x, item.y] = [item.x + tempx, item.y + tempy]
    });
  }
  move(e) {
    let tempBlock = JSON.parse(JSON.stringify(this.nowBlock))
    
    if (e.keyCode === 37) {//左
      this.nowBlock.forEach(item => item.x--);
    } else if (e.keyCode === 38) {//上
      tempBlock = JSON.parse(JSON.stringify(this.nowBlock))
      this.rot();
    } else if (e.keyCode === 39) {//右
      this.nowBlock.forEach(item => item.x++);
    } else if (e.keyCode === 40) {//下
      this.nowBlock.forEach(item => item.y++);
    } else if (e.keyCode === 13) { //一番下まで落とす
      for (var i = 0; i < this.tile.y; i++) {
        this.nowBlock.forEach(item => item.y++)
        e = JSON.parse(JSON.stringify(e))
        e.keyCode = 40
        this.nowBlock = this.chechTouchAndFix(this.nowBlock, tempBlock, e)
      }
    }
    this.nowBlock = this.chechTouchAndFix(this.nowBlock, tempBlock, e)

    this.draw()

  }
  chechTouchAndFix(b, tempBlock, e) { //壁に触った 他のブロックと触ったなどを検知して修正
    let count = 0;
    b.forEach((item, i) => {
      //壁との接触

      if (item.x <= 0) { //左の壁にぶつかった
        b.forEach(it => it.x++);
      }
      if (item.x >= this.tile.x - 1) { //右の壁にぶつかった
        b.forEach(it => it.x--);
      }
      if (item.y == this.tile.y - 1) { //一番下に着いたら
        b.forEach(it => it.y--);
      }

      //ブロック同士の接触

      if (this.tile.tile[item.y][item.x] == 1) { //1と接触したらその方向へは進めない

        if (e.keyCode === 37) {//左
          b.forEach(it => it.x++);
        } else if (e.keyCode === 39) {//右
          b.forEach(it => it.x--);
        } else if (e.keyCode === 40) {//下
          b.forEach(it => it.y--);
        } else if (e.keyCode === 38) {//上
          
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

  draw(tile) {
    const X = this.tile.x
    const Y = this.tile.y
    let css


    //タイル初期化

    for (var i = 0; i < Y - 1; i++) {
      for (var j = 1; j < X - 1; j++) {
        // console.log(this.tile.td)
        if (this.tile.tile[i][j] == 0) {
          this.tile.td[i][j].className = 'default'
        }
      }
    }

    //描画
    this.nowBlock.forEach((item, i) => {
      // css = this.block[this.type].class[0]
      css = this.block[this.type].class[1]
      css = this.isBlockOonBlock(item, this.nowBlock) ? this.block[this.type].class[1] : css

      this.tile.td[Math.abs(item.y)][Math.abs(item.x)].className = css
    });

    //ガイドを描画

    let guide = JSON.parse(JSON.stringify(this.nowBlock))

    label:
      for (var i = 0; i < this.tile.y; i++) {
        guide.forEach((el) => {
          el.y++
        });

        for (var el of guide) {
          if (this.tile.tile[Math.abs(el.y)][Math.abs(el.x)] == 1) {
            guide.forEach((el) => {
              el.y--
            });
            break label
          }

        }
      }

    for (var item of guide) {
      let res

      for (var target of this.nowBlock) {
        res = 0


        if (JSON.stringify(target) == JSON.stringify(item)) {
          res = 1
          console.log('一致');
          break;
        }
      }
      if (res) {
        if (this.tile.tile[Math.abs(el.y)][Math.abs(el.x)] != 1) {
          // this.tile.td[Math.abs(item.y)][Math.abs(item.x)].className = 'default'
        }

      } else {
        this.tile.td[Math.abs(item.y)][Math.abs(item.x)].className = 'guide'

      }

    }
  }

  isBlockOonBlock(item, b) { // 上にブロックがあるか判定  
    let bool = 0
    let arr = Object.assign({}, item)
    
    arr.y--;
    b.forEach(item2 => {
      if (JSON.stringify(arr) == JSON.stringify(item2)) {
        bool = 1
      }
    })
    return bool;
  }

  init() { //ブロックの初期位置
    this.nowBlock.forEach((item) => {
      item.x += (this.tile.x - 2) / 2
      item.y++
    });
  }
}

class App {
  constructor(type = this.getRandomIntInclusive(0, 6)) {
    // constructor(type = 3) {
    this.tile = new Tile();
    this.block = new Block(this.tile, type)
    this.time = 0;
    window.onkeydown = (e) => {
      this.block.move(e)
      if (e.keyCode == 13) {
        this.createBlock()
      }
    }
  }
  init() {
    this.block.draw()
    this.time++;
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
        console.log(i, '揃った')
        this.removeLine(i)
      }
    }
  }
  removeLine(lineNum) {//行を消してブロックを落とす
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
    
    for (var i = 0; i < lineNum + 1; i++) {
      for (var j = 1; j < X - 1; j++) {
        if (i != 0) {
          if (i >= lineNum) {
            console.log('Debug')
          }
          this.tile.tile[i][j] = tileCopy[i - 1][j]
          this.tile.td[i][j].className = tdCopy[i - 1][j]
        }
      }
    }
  }
  show() {
    console.log(this.block)
    console.log(this.tile.tile)
  }
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

window.onload = () => {
  let game = new App()
  game.init()
  console.log(game.tile.td)
}