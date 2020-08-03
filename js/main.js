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
            x: -1,
            y: 0
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
    let tempBlock = []
    if (e.keyCode === 37) {
      //左
      this.nowBlock.forEach(item => {
        item.x--;
      });
    } else if (e.keyCode === 38) {
      //上
      tempBlock = JSON.parse(JSON.stringify(this.nowBlock))
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
    }else if (e.keyCode === 13) {
      //一気に下に落とす
      console.log('enter')
      //4つのブロックのy座標が一番大きいブロックを見つけてそれが18になるようにする
      let max=[]
      let key
      let diff
      this.nowBlock.forEach((item) => {
        max.push(item.y)
      });
      
      for (var i = 0; i < max.length; i++) {
        if(max[i]==Math.max(...max)){
          key=i          
          break;
        }
      }
      diff=18-this.nowBlock[i].y
      this.nowBlock.forEach((item) => {
        item.y+=diff
      });
      
        

    }

    this.nowBlock = this.chechTouchAndFix(this.nowBlock, tempBlock, e)

    this.draw()

  }
  finish(){//処理を終わりにして次のブロックに映る
    
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

        if (e.keyCode === 37) {
          //左
          b.forEach(it => it.x++);
        } else if (e.keyCode === 39) {
          //右
          b.forEach(it => it.x--);
        } else if (e.keyCode === 40) {
          //下
          b.forEach(it => it.y--);
        } else if (e.keyCode === 38) {

          //上
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
    const NUM = this.tile.x
    const NUM2 = this.tile.y
    const td = Array.from(document.querySelectorAll('td'));
    let css


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

      if (this.isBlockOonBlock(item, this.nowBlock)) { //それより上にブロックがあるなら
        css = this.block[this.type].class[1]
      }

      td[NUM * Math.abs(item.y) + Math.abs(item.x)].className = css
    });
  }

  isBlockOonBlock(item, b) { // 上にブロックがあるか判定
    let arr
    let bool = 0
    if (typeof(item) == "Object") {
      arr = Object.assign({}, item)
      arr[1]--;
    } else {
      arr = JSON.parse(JSON.stringify(item));
      arr.y--;
    }
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
    this.tile = new Tile();
    this.block = new Block(this.tile, type)
    this.time=0;
    window.onkeydown = (e) => {
      this.block.move(e)
      if(e.keyCode==13){
        this.createBlock()
      }
      
    }


  }
  gameStart() {
    this.block.draw()
    this.time++;
  }
  createBlock(type = this.getRandomIntInclusive(0, 6)) {
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


window.onload=()=>{
  
  // let g = new Block()
  let game = new App()

  game.gameStart()


}


