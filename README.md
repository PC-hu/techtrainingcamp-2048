<img alt="2048" align="left" width="120" hspace="20" src="https://raw.githubusercontent.com/mat-sz/2048/master/public/logo512.png">

# 2048 &bull; [Demo](https://demo.matsz.dev/2048/)

<img alt="workflow" src="https://img.shields.io/github/workflow/status/mat-sz/react-letter/Node.js%20CI%20(yarn)">

试玩地址：[2048](http://techtraining2048.hopto.org)

This is a reimplementation of Gabriele Cirulli's excellent [2048](https://play2048.co) game, built with React, Redux
and TypeScript. Unlike other React-based implementations, only functional components (with hooks) are used here. This project doesn't rely on canvas or element refs. This project was bootstrapped using the [mat-sz](https://github.com/mat-sz/cra-template-mat-sz) CRA template.

## Running/Development

As with many CRA-based application, 2048 can be run using the following commands:

```
yarn install
yarn start
```

## Unit Tests

Several unit tests for game logic are available. You can run the test suite using:

```
yarn test
```

## 新增多人游戏等功能

需要在src/config.ts中修改serverurl为后端服务器的地址
后端代码仓库：[techtrainingcamp-frontend-4-server](https://github.com/PC-hu/techtrainingcamp-frontend-4-server)

## 项目结构
├─src 
│ ├─actions ------------------- // 定义所有可以发出的动作
│ │ └─index.ts 
│ ├─App.scss ------------------ // 项目的样式文件
│ ├─App.tsx ------------------- // 项目主文件
│ ├─components ---------------- // 定义用到的组件
│ │ ├─Board.tsx --------------- // 棋盘
│ │ ├─BoardSizePicker.tsx ----- // 棋盘尺寸选择
│ │ ├─BoardTile.tsx ----------- // 棋盘块
│ │ ├─Chat.tsx ---------------- // 聊天框
│ │ ├─Header.tsx -------------- // 标题
│ │ ├─Info.tsx 
│ │ ├─ModePicker.tsx ---------- // 模式选择
│ │ ├─NameInput.tsx ----------- // 输入昵称
│ │ ├─Overlay.tsx ------------- // 展示游戏结果
│ │ ├─Rank.tsx ---------------- // 排行榜
│ │ ├─SmallBoard.tsx ---------- // 缩小棋盘
│ │ └─timer.tsx --------------- // 定时器
│ ├─config.ts ----------------- // 项目配置
│ ├─functions ----------------- // 用到的一些功能函数
│ │ ├─board.test.ts 
│ │ ├─board.ts 
│ │ ├─localStorage.test.ts 
│ │ └─localStorage.ts 
│ ├─img ----------------------- // 聊天框logo
│ │ ├─logo.jpg 
│ │ └─logo.svg 
│ ├─index.tsx 
│ ├─react-app-env.d.ts 
│ ├─reducers ------------------ // 定义全局数据及动作的处理函数
│ │ └─index.ts 
│ ├─setupTests.ts 
│ ├─store.ts 
│ └─types --------------------- // 自定义的类型
│   ├─ActionType.ts ----------- // 动作类型
│   ├─Animations.ts ----------- // 动画类型
│   ├─Direction.ts ------------ // 方向类型
│   ├─Models.ts --------------- // 数据模型
│   └─RankItem.ts ------------- // 排行榜数据类型
├─tsconfig.json 
├─yarn-error.log 
└─yarn.lock 