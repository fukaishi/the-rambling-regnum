import React, { useState, useEffect, useCallback } from 'react'
import './App.css'
import DIALOGUES from './dialogues.json'

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
