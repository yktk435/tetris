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
    //               │
    //               │
    //               │
    //               │
    // ──────────────┼──────────────→y'=x
    //               │
    //               │
    //               │
    //               │
    //               ↓
    //               x'=-y
    this.block = [{
        // □
        //□□□
        shape: [
          [0, 0],
          [1, 0],
          [0, -1],
          [-1, 0]
        ],
        class: ['mountain-top', 'mountain']

      }, {
        // □□
        // □□
        shape: [
          [0, 0],
          [1, 0],
          [1, -1],
          [0, -1],
        ],
        class: ['square-top', 'square']
      },
      {
        // □
        // □
        // □□
        shape: [
          [0, 0],
          [0, 1],
          [0, -1],
          [1, -1],
        ],
        class: ['l-top', 'l']
      },
      {
        // □
        // □
        // □□
        shape: [
          [0, 0],
          [0, 1],
          [0, -1],
          [-1, -1],
        ],
        class: ['ano-l-top', 'ano-l']
      },
      {
        // □
        // □
        // □
        // □
        shape: [
          [0, 0],
          [0, 1],
          [0, -1],
          [0, -2],
        ],
        class: ['stick-top', 'stick']
      },
      {
        // □□
        //  □□
        shape: [
          [0, 0],
          [0, 1],
          [-1, 0],
          [1, 1],
        ],
        class: ['two-top', 'two']
      },
      {
        //  □□
        // □□
        shape: [
          [0, 0],
          [1, 0],
          [0, 1],
          [-1, 1],
        ],
        class: ['s-top', 's']
      }

    ]
    this.type = type //作成するブロクのタイプを覚えておく
    this.nowBlock = this.block[type].shape
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
    [tempx, tempy] = [this.nowBlock[0][0], this.nowBlock[0][1]]
    this.nowBlock.forEach(item => {
      [item[0], item[1]] = [(-1) * item[1], item[0]]
    });
    //平行移動
    tempx = tempx - this.nowBlock[0][0]
    tempy = tempy - this.nowBlock[0][1]
    this.nowBlock.forEach(item => {
      [item[0], item[1]] = [item[0] + tempx, item[1] + tempy]
    });
  }
  move(e) {
    if (e.keyCode === 37) {
      //左
      this.nowBlock.forEach(item => {
        item[0]--;
      });
    } else if (e.keyCode === 38) {
      //上
      this.rot();
    } else if (e.keyCode === 39) {
      //右
      this.nowBlock.forEach(item => {
        item[0]++;
      });
    } else if (e.keyCode === 40) {
      //下
      this.nowBlock.forEach(item => {
        item[1]++;
      });
    }

    this.nowBlock = this.chechTouchAndFix(this.nowBlock, e)

    this.draw()

  }
  chechTouchAndFix(block, e) { //壁に触った 他のブロックと触ったなどを検知して修正
    block.forEach((item, i) => {

      //壁との接触
      
      if (item[0] <= 0) { //左の壁にぶつかった
        block.forEach(item => item[0]++);
      }
      if (item[0] >= this.tile.x - 1) { //右の壁にぶつかった
        block.forEach(item => item[0]--);
      }
      if (item[1] == this.tile.y - 1) { //一番下に着いたら
        block.forEach(item => item[1]--);
      }
      
      //ブロック同士のの接触

      if (this.tile.tile[item[1]][item[0]] == 1) { //1と接触したらその方向へは進めない
        console.log('-------------')
        if (e.keyCode === 37) {
          //左
          block.forEach(item => item[0]++);
        } else if (e.keyCode === 39) {
          //右
          block.forEach(item => item[0]--);
        } else if (e.keyCode === 40) {
          //下
          block.forEach(item => item[1]--);
        } else if (e.keyCode === 38) {
          //上
          if (block[0][1] - item[1] > 0) {
            block.forEach(item => item[1]++);
          } else if (block[0][1] - item[1] < 0) {
            block.forEach(item => item[1]--);
          } else if (block[0][0] - item[0] > 0) {
            block.forEach(item => item[0]++);
          } else if (block[0][0] - item[0] < 0) {
            block.forEach(item => item[0]--);
          }
        }
      }
    })
    return block;
  }
  fixed() {//ブロックを固定
    this.nowBlock.forEach(item => this.tile.tile[Math.abs(item[1])][Math.abs(item[0])] = 1);
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

      td[NUM * Math.abs(item[1]) + Math.abs(item[0])].className = css
    });

    // td.forEach((el, i) => {
    //   if (i % NUM == 0 || (i + 1) % NUM == 0 || NUM2 * (NUM - 1) <= i) return;
    // })
  }

  isBlockOonBlock(item,b) {// 上にブロックがあるか判定
    let arr
    let bool=0
    
      arr = JSON.parse(JSON.stringify(item));
      arr[1]--;
      
      b.forEach(item2 => {
        if (JSON.stringify(arr) == JSON.stringify(item2)) {
          bool=1
        }
      })
    return bool;
  }

  init() {//ブロックの初期位置
    this.nowBlock.forEach((item) => item[0] += (this.tile.x - 2) / 2);
  }
}

class App {
  constructor(type = 6) {
    this.tile = new Tile();
    this.block = new Block(this.tile, type)
    
    

  }
  gameStart() {

  }
  createBlock(type = 0) {
    this.block.fixed();
    this.tile = this.block.tile
    this.block = new Block(this.tile, type)
  }
  show() {
    console.log(this.block)
    console.log(this.tile.tile)
  }

}



// let g = new Block()
let g = new App()