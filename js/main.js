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
  }
}
class Block {
  constructor(type = 0) {
    //数学のxy軸を右周りに90℃回転した座標に基づいている
    //プログラムの配列に合わせた表記
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
    this.block = [
      // □
      //□□□
      [
        [0, 0],
        [1, 0],
        [0, -1],
        [-1, 0]
      ],
      // □□
      // □□
      [
        [0, 0],
        [1, 0],
        [1, -1],
        [0, -1],
      ],

    ]
    this.type = type //作成するブロクのタイプを覚えておく
    this.nowBlock = this.block[type]
    this.tile = new Tile()
    this.init()

    window.onkeydown = (e) => {
      this.move(e)
      // if (e.keyCode === 37) {
      //     this.moveLeft();
      // } else if (e.keyCode === 38) {
      //     this.rotate();
      // } else if (e.keyCode === 39) {
      //     this.moveRight();
      // } else if (e.keyCode === 40) {
      //     this.fall();
    }


  }
  rot() { //右回転
    if (this.type == 1) { //ブロックが視覚のやつなら何もしない
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
        item[1] += 2;
      });
    }
    this.nowBlock.forEach(item => {
      item[1]++;
    });
    this.draw()

  }

  show() {
    console.log(this.nowBlock)
  }
  draw() {
    //ボードをすべて0にする
    this.tile.tile.forEach(item => {
      item.fill(0, 1, item.length - 1)
    })

    this.nowBlock.forEach(item => {
      this.tile.tile[Math.abs(item[1])][Math.abs(item[0])] = 1
    });
    console.log(this.tile.tile)
  }
  init() {
    this.nowBlock.forEach((item) => {
      item[0] += 5;
      item[1] += 1;
    });

  }

}

class App {
  constructor() {
    this.block = new Block()
  }
  createBlock() {

  }

}



let g = new Block()
// 
// 
// 
// 
// 
// 
//     let tile = [
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//     ];
//   //数学のxy表記と同じ
//   //回転したときのために原点をわかりやすくしとく必要がある。
//   //原点は配列の最初に持ってくる
//   let block=[
//     [0,0],[-1,0],[1,0],[0,-1]
//   ]
// 
// 
//   function rot(block){    
//     let tempx
//     let tempy
//     [tempx,tempy]=[block[0][0],block[0][1]]
//     block.forEach(item => {
//       [item[0],item[1]]=[(-1)*(item[1]-tempy),item[0]-tempx]
//       [item[0],item[1]]=[item[0]+tempy,item[1]+tempx]
//     });
// 
//   }
// 
// 
// function ini(block){
//   block.forEach(item => {
//     [item[0],item[1]]=[item[0]+5,item[1]]
//   });
//   console.log(block)
// }
// 
// ini(block)
// //ボーロに書く
// function draw(block,tile){
//   //ボードをすべて0にする
//   tile.forEach(item => {
//     item.fill(0,1,this.length-1)
//   })
// 
//   block.forEach(item => {
//     tile[Math.abs(item[1])][Math.abs(item[0])]=1
//     console.log(item[1],item[0])
//   });
//   console.log(tile)
//   // return [block,tile]
// }
// 
// function move(block){
//   block.forEach(item => {
//     item[1]--;
//   });  
// }
// 