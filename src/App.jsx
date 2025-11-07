import React, { useState, useEffect, useCallback } from 'react'
import './App.css'

const DIALOGUES = {
  mother: {
    icon: '母',
    messages: [
      "おはよう、勇者よ。よく眠れたかい？",
      "今日もいい天気だねぇ。洗濯日和だわ。",
      "そういえば昨日ね、隣の奥さんと話していたんだけど…",
      "彼女の息子さんがね、最近冒険者になったらしいのよ。",
      "でもね、装備も揃えずに出かけていったもんだから…",
      "案の定、3日で帰ってきたんですって。情けない話よね。",
      "あなたはそんなことないわよね？ちゃんと朝ごはん食べてる？",
      "栄養が大事なのよ。冒険には体力が必要だからね。",
      "そうそう、今日の朝ごはんは何がいい？",
      "パンにする？それともご飯？",
      "あ、でも魔王を倒しに行くんだったわね。",
      "じゃあしっかり食べていきなさい。",
      "あ、そうだ。王様に会いに行くんでしょ？",
      "王様によろしく伝えてね。",
      "それと、帰りにお醤油買ってきてくれる？",
      "あ、でも魔王倒すんだったわね。じゃあいいわ。",
      "気をつけて行ってらっしゃい！"
    ]
  },
  king: {
    icon: '王',
    messages: [
      "よくぞ来た、勇者よ！",
      "待っておったぞ。",
      "実はな、魔王が復活したのじゃ。",
      "と言っても、すぐそこにおるんじゃがな。",
      "城の目の前、ほら、あそこに見えるじゃろう？",
      "近すぎて困っておるんじゃ。",
      "朝から魔王の怒鳴り声が聞こえてきてのう…",
      "城の者たちも安眠できんと嘆いておる。",
      "そこでじゃ、そなたに魔王討伐を依頼したい。",
      "報酬は…そうじゃな、金貨100枚でどうじゃ？",
      "え？少ない？いやいや、目の前じゃから楽じゃろう？",
      "移動時間もかからんしな。",
      "それに魔王も最近弱っておるらしいぞ。",
      "3回も殴れば倒れるんじゃないかのう。",
      "まあ、口だけは達者らしいがな。",
      "話が長いと評判じゃ。",
      "そなたも覚悟しておけよ。",
      "それでは頼んだぞ、勇者よ！",
      "魔王を倒して平和を取り戻してくれ！",
      "期待しておるぞ！"
    ]
  },
  boss: {
    icon: '魔',
    messages: [
      "ふははは！よくぞ来たな、勇者よ！",
      "我こそは魔王ダラダーラ！",
      "待っておったぞ。",
      "いや、本当に待っておった。",
      "誰も来ないから暇でのう…",
      "この城の前で毎日ぼーっとしておったわ。",
      "そなたは勇者か。なるほど、確かに勇者の顔をしておるな。",
      "ところで、朝ごはんは食べてきたか？",
      "戦闘は空腹では良くないぞ。",
      "わしか？わしはもう食べたわ。",
      "今朝は魔界のパンと魔界の牛乳じゃ。",
      "なかなか美味でな。そなたにも勧めたいところじゃが…",
      "まあ、これから戦うんじゃしな。",
      "さて、では戦闘と行こうか。",
      "ルールは簡単じゃ。",
      "そなたがわしを3回殴れば勝ち。",
      "わしがそなたを…まあ、わしは攻撃せんがな。",
      "では、始めるとしようか！"
    ]
  },
  bossCounter1: {
    icon: '魔',
    messages: [
      "むむ…！",
      "今の攻撃、なかなかやるではないか！",
      "だが、まだわしには余裕がある。",
      "そなた、その剣はどこで買ったのじゃ？",
      "なかなか良い切れ味じゃな。",
      "わしも昔は剣を振るっておったものじゃが…",
      "最近は腰が痛くてのう。",
      "歳は取りたくないものじゃ。",
      "さあ、次の攻撃をどうぞ！"
    ]
  },
  bossCounter2: {
    icon: '魔',
    messages: [
      "ぐふっ…！",
      "これは…なかなかの威力じゃ…",
      "だが、まだ倒れんぞ！",
      "わしにはまだ…まだ話したいことがある…！",
      "そういえばな、わしが魔王になった理由を話しておらんかったな。",
      "実はな、昔々…",
      "いや、今は時間がないか。",
      "また今度じゃ。",
      "次の一撃で終わりじゃな…",
      "覚悟はできておる。",
      "さあ、来い！"
    ]
  },
  bossDefeat: {
    icon: '魔',
    messages: [
      "ぐはっ…！",
      "やられた…か…",
      "さすがは勇者…じゃな…",
      "わしの負けじゃ…",
      "だが…最期に…一つだけ…",
      "言わせて…くれ…",
      "実は…わしには…娘が…おっての…",
      "いや、嘘じゃ。おらん。",
      "ただ…そなたに…伝えたかった…",
      "この世界は…",
      "話が…長い者ばかりで…",
      "できて…おることを…",
      "そなたも…気を…つけるが…よい…",
      "では…さらば…じゃ…",
      "ぐふっ……",
      "（魔王は倒れた）"
    ]
  },
  ending: {
    icon: '',
    messages: [
      "【 THE END 】",
      "",
      "魔王ダラダーラを倒した！",
      "世界に平和が訪れた。",
      "勇者は英雄として称えられた。",
      "",
      "しかし、この物語には続きがあった…",
      "帰り道、村人に話しかけられた勇者は、",
      "その村人の話が3時間も続き、",
      "日が暮れるまで帰れなかったという…",
      "",
      "The Rambling Regnum: The Never-Ending Prologue",
      "- 完 -",
      "",
      "（リロードして再プレイ）"
    ]
  }
}

const TILE_SIZE = 32
const MAP_WIDTH = 20
const MAP_HEIGHT = 15

function App() {
  const [gameState, setGameState] = useState('start')
  const [heroPos, setHeroPos] = useState({ x: 9, y: 12 })
  const [heroAwake, setHeroAwake] = useState(false)
  const [dialogue, setDialogue] = useState(null)
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [talkedToMother, setTalkedToMother] = useState(false)
  const [talkedToKing, setTalkedToKing] = useState(false)
  const [battleState, setBattleState] = useState(null)
  const [bossHP, setBossHP] = useState(3)
  const [bossDefeated, setBossDefeated] = useState(false)

  // NPCの位置
  const motherPos = { x: 11, y: 12 }
  const kingPos = { x: 10, y: 6 }
  const bossPos = { x: 10, y: 2 }

  // キーボード入力処理
  const handleKeyDown = useCallback((e) => {
    if (gameState === 'start') return

    // エンターキー
    if (e.key === 'Enter') {
      e.preventDefault()

      // 寝ている状態から起きる
      if (!heroAwake) {
        setHeroAwake(true)
        setDialogue(null)
        return
      }

      // 会話中
      if (dialogue) {
        const currentDialogue = DIALOGUES[dialogue]
        if (dialogueIndex < currentDialogue.messages.length - 1) {
          setDialogueIndex(dialogueIndex + 1)
        } else {
          // 会話終了
          if (dialogue === 'boss') {
            // バトル開始
            setBattleState('playerTurn')
            setDialogue(null)
          } else if (dialogue === 'bossCounter1' || dialogue === 'bossCounter2') {
            // バトルに戻る
            setBattleState('playerTurn')
            setDialogue(null)
          } else if (dialogue === 'bossDefeat') {
            // エンディングへ
            setDialogue('ending')
            setDialogueIndex(0)
          } else if (dialogue === 'ending') {
            // エンディング終了
            setDialogue(null)
          } else {
            setDialogue(null)
          }
        }
        return
      }

      // バトル中の攻撃
      if (battleState === 'playerTurn') {
        // プレイヤーの攻撃
        const newHP = bossHP - 1
        setBossHP(newHP)

        if (newHP === 2) {
          setDialogue('bossCounter1')
          setDialogueIndex(0)
          setBattleState(null)
        } else if (newHP === 1) {
          setDialogue('bossCounter2')
          setDialogueIndex(0)
          setBattleState(null)
        } else if (newHP === 0) {
          setDialogue('bossDefeat')
          setDialogueIndex(0)
          setBattleState(null)
          setBossDefeated(true)
        }
        return
      }

      // NPCとの会話開始
      if (!talkedToMother && Math.abs(heroPos.x - motherPos.x) <= 1 && Math.abs(heroPos.y - motherPos.y) <= 1) {
        setDialogue('mother')
        setDialogueIndex(0)
        setTalkedToMother(true)
        return
      }

      if (talkedToMother && !talkedToKing && Math.abs(heroPos.x - kingPos.x) <= 1 && Math.abs(heroPos.y - kingPos.y) <= 1) {
        setDialogue('king')
        setDialogueIndex(0)
        setTalkedToKing(true)
        return
      }

      if (talkedToKing && !bossDefeated && Math.abs(heroPos.x - bossPos.x) <= 1 && Math.abs(heroPos.y - bossPos.y) <= 1) {
        setDialogue('boss')
        setDialogueIndex(0)
        return
      }
    }

    // 移動キー（会話中やバトル中は移動不可）
    if (dialogue || battleState || !heroAwake) return

    let newX = heroPos.x
    let newY = heroPos.y

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      newY = Math.max(0, heroPos.y - 1)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      newY = Math.min(MAP_HEIGHT - 1, heroPos.y + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      newX = Math.max(0, heroPos.x - 1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      newX = Math.min(MAP_WIDTH - 1, heroPos.x + 1)
    }

    // NPCとの衝突判定（すり抜け不可）
    const collidesWithNPC =
      (newX === motherPos.x && newY === motherPos.y) ||
      (newX === kingPos.x && newY === kingPos.y) ||
      (newX === bossPos.x && newY === bossPos.y && !bossDefeated)

    if (!collidesWithNPC) {
      setHeroPos({ x: newX, y: newY })
    }
  }, [gameState, heroAwake, dialogue, dialogueIndex, battleState, heroPos, bossHP, talkedToMother, talkedToKing, bossDefeated, motherPos, kingPos, bossPos])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const startGame = () => {
    setGameState('playing')
  }

  const getCurrentMessage = () => {
    if (!heroAwake) {
      return '朝だ... Enterキーで起きる'
    }

    if (dialogue) {
      return DIALOGUES[dialogue].messages[dialogueIndex]
    }

    if (battleState === 'playerTurn') {
      return `【バトル中】魔王のHP: ${bossHP}/3 - Enterキーで攻撃！`
    }

    // ヒント表示
    if (!talkedToMother) {
      return '矢印キーで移動 / 母親に近づいてEnterキーで話す'
    } else if (!talkedToKing) {
      return '矢印キーで移動 / 王様に近づいてEnterキーで話す'
    } else if (!bossDefeated) {
      return '矢印キーで移動 / 魔王に近づいてEnterキーで話す'
    }

    return '世界に平和が訪れた...'
  }

  const getCurrentSpeaker = () => {
    if (dialogue && DIALOGUES[dialogue]) {
      return DIALOGUES[dialogue].icon
    }
    return null
  }

  return (
    <div className="game-container">
      {gameState === 'start' ? (
        <div className="title-screen">
          <h1 className="title">The Rambling Regnum</h1>
          <h2 className="subtitle">The Never-Ending Prologue</h2>
          <p className="description">勇者以外の登場人物の話が、ただひたすら長いことだけが特徴のRPG</p>
          <button className="start-button" onClick={startGame}>
            ゲームスタート
          </button>
        </div>
      ) : (
        <div className="game-screen">
          <div className="game-world">
            <div className="map" style={{
              width: MAP_WIDTH * TILE_SIZE,
              height: MAP_HEIGHT * TILE_SIZE
            }}>
              {/* 背景グリッド */}
              {Array.from({ length: MAP_HEIGHT }).map((_, y) => (
                Array.from({ length: MAP_WIDTH }).map((_, x) => (
                  <div
                    key={`tile-${x}-${y}`}
                    className="tile"
                    style={{
                      left: x * TILE_SIZE,
                      top: y * TILE_SIZE,
                      width: TILE_SIZE,
                      height: TILE_SIZE
                    }}
                  />
                ))
              ))}

              {/* 自宅 */}
              <div className="building home" style={{ left: 7 * TILE_SIZE, top: 11 * TILE_SIZE }}>
                <div className="building-label">自宅</div>
              </div>

              {/* 城 */}
              <div className="building castle" style={{ left: 8 * TILE_SIZE, top: 4 * TILE_SIZE }}>
                <div className="building-label">城</div>
              </div>

              {/* 魔王城 */}
              <div className="building boss-castle" style={{ left: 8 * TILE_SIZE, top: 0 }}>
                <div className="building-label">魔王城</div>
              </div>

              {/* 母親 */}
              <div
                className="character mother"
                style={{
                  left: motherPos.x * TILE_SIZE,
                  top: motherPos.y * TILE_SIZE,
                  width: TILE_SIZE,
                  height: TILE_SIZE
                }}
              >
                母
              </div>

              {/* 王様 */}
              <div
                className="character king"
                style={{
                  left: kingPos.x * TILE_SIZE,
                  top: kingPos.y * TILE_SIZE,
                  width: TILE_SIZE,
                  height: TILE_SIZE
                }}
              >
                王
              </div>

              {/* ラスボス */}
              {!bossDefeated && (
                <div
                  className="character boss"
                  style={{
                    left: bossPos.x * TILE_SIZE,
                    top: bossPos.y * TILE_SIZE,
                    width: TILE_SIZE,
                    height: TILE_SIZE
                  }}
                >
                  魔
                </div>
              )}

              {/* 勇者 */}
              <div
                className={`character hero ${!heroAwake ? 'sleeping' : ''}`}
                style={{
                  left: heroPos.x * TILE_SIZE,
                  top: heroPos.y * TILE_SIZE,
                  width: TILE_SIZE,
                  height: TILE_SIZE
                }}
              >
                勇
              </div>

              {/* HP表示（バトル中） */}
              {(battleState || dialogue === 'bossCounter1' || dialogue === 'bossCounter2') && !bossDefeated && (
                <div className="hp-display">
                  <div className="hp-label">魔王HP</div>
                  <div className="hp-bar-container">
                    <div className="hp-bar-fill" style={{ width: `${(bossHP / 3) * 100}%` }}></div>
                  </div>
                  <div className="hp-text">{bossHP}/3</div>
                </div>
              )}
            </div>
          </div>

          <div className="message-box">
            {getCurrentSpeaker() && (
              <div className="speaker-icon">
                {getCurrentSpeaker()}
              </div>
            )}
            <div className="message-content">
              <div className="message-text">{getCurrentMessage()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
