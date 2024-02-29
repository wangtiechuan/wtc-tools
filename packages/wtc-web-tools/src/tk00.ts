/* eslint-disable @typescript-eslint/no-unused-vars */

function arrayRemove<T = any>(arr: T[], arg: T) {
  let i = 0;
  let n = 0;
  const arrSize = arr.length;
  for (i = 0; i < arrSize; i++) {
    if (arr[i] !== arg) {
      arr[n++] = arr[i];
    }
  }
  if (n < i) {
    arr.length = n;
  }
}

function arrayRemoveByIndex<T = any>(arr: T[], index: number) {
  let i = 0;
  let n = 0;
  const arrSize = arr.length;
  for (i = 0; i < arrSize; i++) {
    if (arr[i] !== arr[index]) {
      arr[n++] = arr[i];
    }
  }
  if (n < i) {
    arr.length = n;
  }
}

class Keyboard {
  UP: number;
  DOWN: number;
  RIGHT: number;
  LEFT: number;
  SPACE: number;
  TAB: number;
  ENTER: number;
  CTRL: number;
  ALT: number;
  Num0: number;
  Num1: number;
  Num2: number;
  Num3: number;
  Num4: number;
  Num5: number;
  Num6: number;
  Num7: number;
  Num8: number;
  Num9: number;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
  G: number;
  H: number;
  I: number;
  J: number;
  K: number;
  L: number;
  M: number;
  N: number;
  O: number;
  P: number;
  Q: number;
  R: number;
  S: number;
  T: number;
  U: number;
  V: number;
  W: number;
  X: number;
  Y: number;
  Z: number;
  constructor() {
    this.UP = 38;
    this.DOWN = 40;
    this.RIGHT = 39;
    this.LEFT = 37;

    this.SPACE = 32;
    this.TAB = 9;
    this.ENTER = 13;
    this.CTRL = 17;
    this.ALT = 18;

    this.Num0 = 48;
    this.Num1 = 49;
    this.Num2 = 50;
    this.Num3 = 51;
    this.Num4 = 52;
    this.Num5 = 53;
    this.Num6 = 54;
    this.Num7 = 55;
    this.Num8 = 56;
    this.Num9 = 57;

    this.A = 65;
    this.B = 66;
    this.C = 67;
    this.D = 68;
    this.E = 69;
    this.F = 70;
    this.G = 71;
    this.H = 72;
    this.I = 73;
    this.J = 74;
    this.K = 75;
    this.L = 76;
    this.M = 77;
    this.N = 78;
    this.O = 79;
    this.P = 80;
    this.Q = 81;
    this.R = 82;
    this.S = 83;
    this.T = 84;
    this.U = 85;
    this.V = 86;
    this.W = 87;
    this.X = 88;
    this.Y = 89;
    this.Z = 90;
  }
}
const keyboard = new Keyboard();

type ImageType = HTMLImageElement;

class ObjectNormalHasPositon {
  x: number;
  y: number;
  size: number;
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = 0;
  }
}

const mapCounts = 26;

/**
 * 1：水泥墙 2：铁墙 3：草 4：水 5：冰 9：家
 */
enum MapMarks {
  WALL = 1,
  GRID = 2,
  GRASS = 3,
  WATER = 4,
  ICE = 5,
  HOME = 9,
  ANOTHREHOME = 8,
}
class MapFactory {
  constructor() {}
}

interface ObjectPosition {
  x: number;
  y: number;
}
class ObjectInitPositions {
  selectTank: ObjectPosition;
  stageLevel: ObjectPosition;
  num: ObjectPosition;
  map: ObjectPosition;
  home: ObjectPosition;
  score: ObjectPosition;
  player: ObjectPosition;
  protected: ObjectPosition;
  enemyBefore: ObjectPosition;
  enemy1: ObjectPosition;
  enemy2: ObjectPosition;
  enemy3: ObjectPosition;
  bullet: ObjectPosition;
  tankBomb: ObjectPosition;
  bulletBomb: ObjectPosition;
  over: ObjectPosition;
  prop: ObjectPosition;
  constructor() {
    this.selectTank = {
      x: 128,
      y: 96,
    };
    this.stageLevel = {
      x: 396,
      y: 96,
    };
    this.num = {
      x: 256,
      y: 96,
    };
    this.map = {
      x: 0,
      y: 96,
    };
    this.home = {
      x: 256,
      y: 0,
    };
    this.score = {
      x: 0,
      y: 112,
    };
    this.player = {
      x: 0,
      y: 0,
    };
    this.protected = {
      x: 160,
      y: 96,
    };
    this.enemyBefore = {
      x: 256,
      y: 32,
    };
    this.enemy1 = {
      x: 0,
      y: 32,
    };
    this.enemy2 = {
      x: 128,
      y: 32,
    };
    this.enemy3 = {
      x: 0,
      y: 64,
    };
    this.bullet = {
      x: 80,
      y: 96,
    };
    this.tankBomb = {
      x: 0,
      y: 160,
    };
    this.bulletBomb = {
      x: 320,
      y: 0,
    };
    this.over = {
      x: 384,
      y: 64,
    };
    this.prop = {
      x: 256,
      y: 110,
    };
  }
}
const initPositions = new ObjectInitPositions();
type InitPositionKeys = keyof typeof initPositions;

// 爆炸类型
enum CRACK_TYPE {
  tank = 'tank',
  bullet = 'bullet',
}

class CrackAnimation extends ObjectNormalHasPositon {
  times: number;
  ctx: CanvasRenderingContext2D;
  frame: number;
  x: number;
  y: number;
  posName: InitPositionKeys;
  size: number;
  isOver: boolean;
  tempDir: number;
  owner: ObjectNormalHasPositon;
  constructor(
    type: CRACK_TYPE,
    context: CanvasRenderingContext2D,
    crackObj: ObjectNormalHasPositon,
  ) {
    super();

    this.times = 0;
    this.ctx = context;
    this.frame = 0;
    this.x = 0;
    this.y = 0;
    this.size = 0;
    this.isOver = false;
    this.tempDir = 1;
    this.owner = crackObj;

    if (type === CRACK_TYPE.tank) {
      this.posName = 'tankBomb';
      this.size = 66;
      this.frame = 4;
    } else if (type === CRACK_TYPE.bullet) {
      this.posName = 'bulletBomb';
      this.size = 32;
      this.frame = 3;
    } else {
      throw Error('CrackAnimation type 类型错误');
    }
    this.x = crackObj.x + parseInt(crackObj.size - this.size + '') / 2;
    this.y = crackObj.y + parseInt(crackObj.size - this.size + '') / 2;
  }

  draw(RESOURCE_IMAGE: ImageType) {
    const gaptime = 3;
    const temp = parseInt(this.times / gaptime + '');
    this.ctx.drawImage(
      RESOURCE_IMAGE,
      initPositions[this.posName].x + temp * this.size,
      initPositions[this.posName].y,
      this.size,
      this.size,
      this.x,
      this.y,
      this.size,
      this.size,
    );
    this.times += this.tempDir;
    if (this.times > this.frame * gaptime - parseInt(gaptime / 2 + '')) {
      this.tempDir = -1;
    }
    if (this.times <= 0) {
      this.isOver = true;
    }
  }
}

class Tank extends ObjectNormalHasPositon {
  dir: any;
  speed: number;
  frame: number;
  hit: boolean;
  isAI: boolean;
  isShooting: boolean;
  bullet: null;
  shootRate: number;
  isDestroyed: boolean;
  tempX: number;
  tempY: number;
  constructor() {
    super();

    this.x = 0;
    this.y = 0;
    this.size = 32; //坦克的大小
    this.dir = UP; //方向0：上 1：下 2：左3：右
    this.speed = 1; //坦克的速度
    this.frame = 0; //控制敌方坦克切换方向的时间
    this.hit = false; //是否碰到墙或者坦克
    this.isAI = false; //是否自动
    this.isShooting = false; //子弹是否在运行中
    this.bullet = null; //子弹
    this.shootRate = 0.6; //射击的概率
    this.isDestroyed = false;
    this.tempX = 0;
    this.tempY = 0;
  }
  move() {
    //如果是AI坦克，在一定时间或者碰撞之后切换方法

    if (this.isAI && emenyStopTime > 0) {
      return;
    }

    this.tempX = this.x;
    this.tempY = this.y;

    if (this.isAI) {
      this.frame++;
      if (this.frame % 100 == 0 || this.hit) {
        this.dir = parseInt(Math.random() * 4); //随机一个方向
        this.hit = false;
        this.frame = 0;
      }
    }
    if (this.dir == UP) {
      this.tempY -= this.speed;
    } else if (this.dir == DOWN) {
      this.tempY += this.speed;
    } else if (this.dir == RIGHT) {
      this.tempX += this.speed;
    } else if (this.dir == LEFT) {
      this.tempX -= this.speed;
    }
    this.isHit();
    if (!this.hit) {
      this.x = this.tempX;
      this.y = this.tempY;
    }
  }
  isHit() {
    //临界检测
    if (this.dir == LEFT) {
      if (this.x <= map.offsetX) {
        this.x = map.offsetX;
        this.hit = true;
      }
    } else if (this.dir == RIGHT) {
      if (this.x >= map.offsetX + map.mapWidth - this.size) {
        this.x = map.offsetX + map.mapWidth - this.size;
        this.hit = true;
      }
    } else if (this.dir == UP) {
      if (this.y <= map.offsetY) {
        this.y = map.offsetY;
        this.hit = true;
      }
    } else if (this.dir == DOWN) {
      if (this.y >= map.offsetY + map.mapHeight - this.size) {
        this.y = map.offsetY + map.mapHeight - this.size;
        this.hit = true;
      }
    }
    if (!this.hit) {
      //地图检测
      if (tankMapCollision(this, map)) {
        this.hit = true;
      }
    }
    //坦克检测
    /*if(enemyArray != null && enemyArray.length >0){
                  var enemySize = enemyArray.length;
                  for(var i=0;i<enemySize;i++){
                      if(enemyArray[i] != this && CheckIntersect(enemyArray[i],this,0)){
                          this.hit = true;
                          break;
                      }
                  }
              }*/
  }
  isShot() {}
  shoot(type) {
    if (this.isAI && emenyStopTime > 0) {
      return;
    }
    if (this.isShooting) {
      return;
    } else {
      var tempX = this.x;
      var tempY = this.y;
      this.bullet = new Bullet(this.ctx, this, type, this.dir);
      if (this.dir == UP) {
        tempX =
          this.x + parseInt(this.size / 2) - parseInt(this.bullet.size / 2);
        tempY = this.y - this.bullet.size;
      } else if (this.dir == DOWN) {
        tempX =
          this.x + parseInt(this.size / 2) - parseInt(this.bullet.size / 2);
        tempY = this.y + this.size;
      } else if (this.dir == LEFT) {
        tempX = this.x - this.bullet.size;
        tempY =
          this.y + parseInt(this.size / 2) - parseInt(this.bullet.size / 2);
      } else if (this.dir == RIGHT) {
        tempX = this.x + this.size;
        tempY =
          this.y + parseInt(this.size / 2) - parseInt(this.bullet.size / 2);
      }
      this.bullet.x = tempX;
      this.bullet.y = tempY;
      if (!this.isAI) {
        ATTACK_AUDIO.play();
      }
      this.bullet.draw();
      //将子弹加入的子弹数组中
      bulletArray.push(this.bullet);
      this.isShooting = true;
    }
  }
  distroy() {
    this.isDestroyed = true;
    crackArray.push(new CrackAnimation(CRACK_TYPE_TANK, this.ctx, this));
    TANK_DESTROY_AUDIO.play();
  }
}

// 子弹类型
enum BulletType {
  PLAYER = 1,
  ENEMY = 2,
}

// 方向 0：上 1：下 2：左3：右
enum BulletDir {
  UP = 0,
  DOWN = 1,
  LEFT = 2,
  RIGHT = 3,
}

class Bullet extends ObjectNormalHasPositon {
  ctx: CanvasRenderingContext2D;
  owner: Tank;
  type: BulletType;
  dir: number;
  speed: number;
  hit: boolean;
  isDestroyed: boolean;
  constructor(
    context: CanvasRenderingContext2D,
    owner: Tank,
    type: BulletType,
    dir: BulletDir,
  ) {
    super();

    this.ctx = context;
    this.x = 0;
    this.y = 0;
    this.owner = owner; //子弹的所属者
    this.type = type; //1、玩家  2、敌方
    this.dir = dir;
    this.speed = 3;
    this.size = 6;
    this.hit = false;
    this.isDestroyed = false;
  }
  draw() {
    this.ctx.drawImage(
      RESOURCE_IMAGE,
      POS['bullet'][0] + this.dir * this.size,
      POS['bullet'][1],
      this.size,
      this.size,
      this.x,
      this.y,
      this.size,
      this.size,
    );
    this.move();
  }
  move() {
    if (this.dir == UP) {
      this.y -= this.speed;
    } else if (this.dir == DOWN) {
      this.y += this.speed;
    } else if (this.dir == RIGHT) {
      this.x += this.speed;
    } else if (this.dir == LEFT) {
      this.x -= this.speed;
    }

    this.isHit();
  }
  isHit() {
    if (this.isDestroyed) {
      return;
    }
    //临界检测
    if (this.x < map.offsetX) {
      this.x = map.offsetX;
      this.hit = true;
    } else if (this.x > map.offsetX + map.mapWidth - this.size) {
      this.x = map.offsetX + map.mapWidth - this.size;
      this.hit = true;
    }
    if (this.y < map.offsetY) {
      this.y = map.offsetY;
      this.hit = true;
    } else if (this.y > map.offsetY + map.mapHeight - this.size) {
      this.y = map.offsetY + map.mapHeight - this.size;
      this.hit = true;
    }
    //子弹是否碰撞了其他子弹
    if (!this.hit) {
      if (bulletArray != null && bulletArray.length > 0) {
        for (var i = 0; i < bulletArray.length; i++) {
          if (
            bulletArray[i] != this &&
            this.owner.isAI != bulletArray[i].owner.isAI &&
            bulletArray[i].hit == false &&
            CheckIntersect(bulletArray[i], this, 0)
          ) {
            this.hit = true;
            bulletArray[i].hit = true;
            break;
          }
        }
      }
    }

    if (!this.hit) {
      //地图检测
      if (bulletMapCollision(this, map)) {
        this.hit = true;
      }
      //是否击中坦克
      if (this.type == BULLET_TYPE_PLAYER) {
        if (enemyArray != null || enemyArray.length > 0) {
          for (var i = 0; i < enemyArray.length; i++) {
            var enemyObj = enemyArray[i];
            if (!enemyObj.isDestroyed && CheckIntersect(this, enemyObj, 0)) {
              CheckIntersect(this, enemyObj, 0);
              if (enemyObj.lives > 1) {
                enemyObj.lives--;
              } else {
                enemyObj.distroy();
              }
              this.hit = true;
              break;
            }
          }
        }
      } else if (this.type == BULLET_TYPE_ENEMY) {
        if (player1.lives > 0 && CheckIntersect(this, player1, 0)) {
          if (!player1.isProtected && !player1.isDestroyed) {
            player1.distroy();
          }
          this.hit = true;
        } else if (player2.lives > 0 && CheckIntersect(this, player2, 0)) {
          if (!player2.isProtected && !player2.isDestroyed) {
            player2.distroy();
          }
          this.hit = true;
        }
      }
    }

    if (this.hit) {
      this.distroy();
    }
  }
  distroy() {
    this.isDestroyed = true;
    crackArray.push(new CrackAnimation(CRACK_TYPE_BULLET, this.ctx, this));
    if (!this.owner.isAI) {
      BULLET_DESTROY_AUDIO.play();
    }
  }
}
