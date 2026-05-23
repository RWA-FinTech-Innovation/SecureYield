# SecureYield Quest — 游戏规则

## 概述

**SecureYield Quest** 是一款俯视角 2D 像素风任务游戏，演示从绿色电力到 RWA 代币化的完整业务链路。风格参考《我的世界》方块像素美学，配合 SecureYield 品牌色（深青 + 荧光绿）。

## 目标

按顺序完成 **7 个关卡（Gate）**，获得 **RWA Passport** 完成徽章。

## 操作

| 操作 | 按键 / 方式 |
|------|-------------|
| 移动 | `W A S D` 或方向键 |
| 与关卡交互 | 靠近 Gate 后按 `Space`，或点击右侧「Interact」 |
| 点击传送 | 点击地图上的 Gate 标记（已解锁关卡） |
| 自动演示 | 点击「Auto Demo (~90s)」一键跑通全流程 |
| 全屏 | 打开 `/game/index.html` 独立入口 |

## 关卡顺序

| # | 关卡 | 玩家动作 | 获得资产 |
|---|------|----------|----------|
| 0 | Connect Wallet | 连接 MetaMask（可选签名） | 投资者身份 |
| 1 | Green Power Gate | 收集绿色电力凭证 | MWh、REC、IoT hash |
| 2 | AI Compute Gate | 电力 → 算力 | GPU-hour |
| 3 | Compute Token Gate | 记录算力收益 | Compute Token + tx hash |
| 4 | Evidence Vault | 打开五层账本 | audit / oracle / custody 证据 |
| 5 | HK Legal Gate | 合规校验 | 法律门控通过 |
| 6 | RWA Finance Gate | 认购 / 投资 | Fund Share + Portfolio Equity |
| 7 | Completion Badge | 钱包签名 | RWA Passport |

## 地图与建筑（迷宫模式）

- **土路**可行走；**草地**默认不可走（除非踩到门口绿垫）；**山石 / 水域**为障碍。
- 地图为迷宫，需绕路探索；**普通棕色小屋**在草地上，仅为干扰，不能打卡。
- **任务建筑**在草地上，门口有一块**绿色草垫**；从土路踩上草垫后按 `Space` 打卡获得代币。
- 每个关卡对应一座**专属任务建筑**：

| 关卡 | 建筑 |
|------|------|
| Connect Wallet | 钱包服务亭 |
| Green Power | 风力发电场（三台风机旋转） |
| AI Compute | 数据中心（机柜灯闪烁） |
| Compute Token | 代币铸造厂 |
| Evidence Vault | 地下金库（五层账本灯条） |
| HK Legal | 法院柱廊 + 紫荆花标识 |
| RWA Finance | 金融大厦 + 收益曲线 |
| Completion | RWA Passport 纪念碑 |

当前目标建筑会绿色脉冲高亮；已通关建筑保持点亮状态。

## 模式

| 模式 | 说明 |
|------|------|
| **Static Demo**（默认） | 无后端，使用 `snapshots/demo-run.json` 模拟链上结果 |
| **Live Local** | 连接本机 MVP（`localhost:8080`）获取真实 task / tx |
| **Wallet Demo** | 有 MetaMask 时可 `personal_sign` 签署任务意图 |

## 验收（GitHub Pages）

- 无钱包：静态演示不阻塞，可 Auto Demo。
- 有 MetaMask：可连接并签名。
- 嵌入着陆页 iframe，叙事与首页 How It Works 六个 Gate 对齐。
