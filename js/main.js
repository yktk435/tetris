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

  }
  dcopy() {
    this.copy = JSON.parse(JSON.stringify(this.tile));
  }
}
class Block {
  constructor(tile, type = 0) {
    //   ┼──────────────→x
    //   │
    //   │
    //   │
    //   │
    //   ↓
    //   y
    
    this.block = [
      {
        // □
        //□□□
        shape: [
          {x:0,y: 0},
          {x:1,y: 0},
          {x:0,y: -1},
          {x:-1,y: 0}
        ],
        class: ['mountain-top', 'mountain']

      }, {
        // □□
        // □□
        shape: [
        {x:0,y: 0},
        {x:1,y: 0},
        {x:1,y: -1},
        {x:0,y: -1},
        ],
        class: ['square-top', 'square']
      },
      {
        // □
        // □
        // □□
        shape: [
          {x:0,y: 0},
          {x:0,y: 1},
          {x:0,y: -1},
          {x:1,y: -1},
        ],
        class: ['l-top', 'l']
      },
      {
        // □
        // □
        // □□
        shape: [
          {x:0, y:0},
          {x:0, y:1},
          {x:0, y:-1},
          {x:-1,y: -1},
        ],
        class: ['ano-l-top', 'ano-l']
      },
      {
        // □
        // □
        // □
        // □
        shape: [
          {x:0, y:0},
          {x:0, y:1},
          {x:0, y:-1},
          {x:0, y:-2},
        ],
        class: ['stick-top', 'stick']
      },
      {
        // □□
        //  □□
        shape: [
          {x:0, y:0},
          {x:0, y:1},
          {x:-1,y: 0},
          {x:1, y:1},
        ],
        class: ['two-top', 'two']
      },
      {
        //  □□
        // □□
        shape: [
          {x:0, y:0},
          {x:1, y:0},
          {x:0, y:1},
          {x:-1,y: 1},
        ],
        class: ['s-top', 's']
      }

    ]
    this.type = type //作成するブロクのタイプを覚えておく
    this.nowBlock = this.block[type].shape
    console.log(this.nowBlock)
    this.tile = tile
    console.log(this.tile)
    this.init()

    window.onkeydown = (e) => {
      this.move(e)
    }


  }
  rot() { //右回転
    if (this.type == 1) { //ブロックが四角(田)のやつなら何もしない
      return;
    }
    let tempx
    let tempy
    //原点の値を一時コピー
    //原点は配列の一番最初に書く
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
    if (e.keyCode === 37) {
      //左
      this.nowBlock.forEach(item => {
        item.x--;
      });
    } else if (e.keyCode === 38) {
      //上
      this.rot();
    } else if (e.keyCode === 39) {
      //右
      this.nowBlock.forEach(item => {
        item.x++;
      });
    } else if (e.keyCode === 40) {
      //下
      this.nowBlock.forEach(item => {
        item.y++;
      });
    }

    this.nowBlock = this.chechTouchAndFix(this.nowBlock, e)

    this.draw()

  }
  chechTouchAndFix(block, e) { //壁に触った 他のブロックと触ったなどを検知して修正
    block.forEach((item, i) => {

      //壁との接触
      
      if (item.x <= 0) { //左の壁にぶつかった
        block.forEach(item => item.x++);
      }
      if (item.x >= this.tile.x - 1) { //右の壁にぶつかった
        block.forEach(item => item.x--);
      }
      if (item.y == this.tile.y - 1) { //一番下に着いたら
        block.forEach(item => item.y--);
      }
      
      //ブロック同士のの接触

      if (this.tile.tile[item.y][item.x] == 1) { //1と接触したらその方向へは進めない
        console.log('-------------')
        if (e.keyCode === 37) {
          //左
          block.forEach(item => item.x++);
        } else if (e.keyCode === 39) {
          //右
          block.forEach(item => item.x--);
        } else if (e.keyCode === 40) {
          //下
          block.forEach(item => item.y--);
        } else if (e.keyCode === 38) {
          //上
          if (block[0].y - item.y > 0) {
            block.forEach(item => item.y++);
          } else if (block[0].y - item.y < 0) {
            block.forEach(item => item.y--);
          } else if (block[0].x - item.x > 0) {
            block.forEach(item => item.x++);
          } else if (block[0].x - item.x < 0) {
            block.forEach(item => item.x--);
          }
        }
      }
    })
    return block;
  }
  fixed() {//ブロックを固定
    this.nowBlock.forEach(item => this.tile.tile[Math.abs(item.y)][Math.abs(item.x)] = 1);
  }
  draw() {
    const NUM = this.tile.x
    const NUM2 = this.tile.y
    const td = Array.from(document.querySelectorAll('td'));
    let css
    // let tileCopy = JSON.parse(JSON.stringify(this.tile.copy));
    
    // タイルを初期化
    td.forEach((item, i) => {
      if (i % NUM == 0 || (i + 1) % NUM == 0 || (NUM2 - 1) * (NUM) <= i) {
        item.className = 'outarea'
        
      }
      if (this.tile.tile[Math.floor(i / 12)][i % 12] == 0) { //tileが0なら
        item.className = 'default'
      }
    });


    this.nowBlock.forEach((item, i) => {
      css = this.block[this.type].class[0]
      
      if (this.isBlockOonBlock(item,this.nowBlock)) { //それより上にブロックがあるなら
        css = this.block[this.type].class[1]
      }

      td[NUM * Math.abs(item.y) + Math.abs(item.x)].className = css
    });

    // td.forEach((el, i) => {
    //   if (i % NUM == 0 || (i + 1) % NUM == 0 || NUM2 * (NUM - 1) <= i) return;
    // })
  }

  isBlockOonBlock(item,b) {// 上にブロックがあるか判定
    let arr
    let bool=0
    if(typeof(item)=="Object"){
      arr = Object.assign({},item)
    }else{
          arr = JSON.parse(JSON.stringify(item));
    }
      
      arr.y--;
      
      b.forEach(item2 => {
        if (JSON.stringify(arr) == JSON.stringify(item2)) {
          bool=1
        }
      })
    return bool;
  }

  init() {//ブロックの初期位置
    this.nowBlock.forEach((item) => item.x += (this.tile.x - 2) / 2);
  }
}

class App {
  constructor(type = this.getRandomIntInclusive(0,6)) {
    this.tile = new Tile();
    this.block = new Block(this.tile, type)
    
  }
  gameStart() {

  }
  createBlock(type = this.getRandomIntInclusive(0,6)) {
    this.block.fixed();
    this.tile = this.block.tile
    this.block = new Block(this.tile, type)
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



// let g = new Block()
let g = new App()