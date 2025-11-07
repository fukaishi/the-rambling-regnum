import React, { useState, useEffect } from 'react'
import './App.css'

const DIALOGUES = {
  mother: [
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
  ],
  king: [
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
  ],
  bossIntro: [
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
  ],
  bossAttack1: [
    "むむ…！",
    "今の攻撃、なかなかやるではないか！",
    "だが、まだわしには余裕がある。",
    "そなた、その剣はどこで買ったのじゃ？",
    "なかなか良い切れ味じゃな。",
    "わしも昔は剣を振るっておったものじゃが…",
    "最近は腰が痛くてのう。",
    "歳は取りたくないものじゃ。",
    "さあ、次の攻撃をどうぞ！"
  ],
  bossAttack2: [
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
  ],
  bossDefeat: [
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
  ],
  ending: [
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

function App() {
  const [gameState, setGameState] = useState('start')
  const [location, setLocation] = useState('home')
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [currentDialogue, setCurrentDialogue] = useState([])
  const [bossHP, setBossHP] = useState(3)
  const [turn, setTurn] = useState(0)
  const [message, setMessage] = useState('')
  const [showNextButton, setShowNextButton] = useState(true)

  const startGame = () => {
    setGameState('dialogue')
    setCurrentDialogue(DIALOGUES.mother)
    setDialogueIndex(0)
    setMessage(DIALOGUES.mother[0])
  }

  const nextDialogue = () => {
    const newIndex = dialogueIndex + 1

    if (location === 'home' && newIndex >= DIALOGUES.mother.length) {
      setLocation('castle')
      setCurrentDialogue(DIALOGUES.king)
      setDialogueIndex(0)
      setMessage(DIALOGUES.king[0])
    } else if (location === 'castle' && newIndex >= DIALOGUES.king.length) {
      setLocation('bossArea')
      setCurrentDialogue(DIALOGUES.bossIntro)
      setDialogueIndex(0)
      setMessage(DIALOGUES.bossIntro[0])
    } else if (location === 'bossArea' && gameState === 'dialogue' && newIndex >= DIALOGUES.bossIntro.length) {
      setGameState('battle')
      setMessage('【戦闘開始！】魔王ダラダーラが現れた！')
      setShowNextButton(false)
    } else if (gameState === 'bossDefeating' && newIndex >= DIALOGUES.bossDefeat.length) {
      setGameState('ending')
      setCurrentDialogue(DIALOGUES.ending)
      setDialogueIndex(0)
      setMessage(DIALOGUES.ending[0])
    } else if (gameState === 'ending' && newIndex >= DIALOGUES.ending.length) {
      setShowNextButton(false)
    } else {
      setDialogueIndex(newIndex)
      setMessage(currentDialogue[newIndex])
    }
  }

  const attack = () => {
    const newTurn = turn + 1
    const newHP = bossHP - 1
    setTurn(newTurn)
    setBossHP(newHP)

    if (newHP === 2) {
      setGameState('bossTalking1')
      setCurrentDialogue(DIALOGUES.bossAttack1)
      setDialogueIndex(0)
      setMessage(DIALOGUES.bossAttack1[0])
      setShowNextButton(true)
    } else if (newHP === 1) {
      setGameState('bossTalking2')
      setCurrentDialogue(DIALOGUES.bossAttack2)
      setDialogueIndex(0)
      setMessage(DIALOGUES.bossAttack2[0])
      setShowNextButton(true)
    } else if (newHP === 0) {
      setGameState('bossDefeating')
      setCurrentDialogue(DIALOGUES.bossDefeat)
      setDialogueIndex(0)
      setMessage(DIALOGUES.bossDefeat[0])
      setShowNextButton(true)
    }
  }

  const continueFromBossTalk = () => {
    const newIndex = dialogueIndex + 1
    if (newIndex >= currentDialogue.length) {
      setGameState('battle')
      setMessage(`魔王のHP: ${bossHP}/3`)
      setShowNextButton(false)
    } else {
      setDialogueIndex(newIndex)
      setMessage(currentDialogue[newIndex])
    }
  }

  const renderLocation = () => {
    if (location === 'home') {
      return (
        <div className="location">
          <div className="building home">
            <div className="building-label">自宅</div>
          </div>
          <div className="character hero">勇</div>
          <div className="character mother">母</div>
        </div>
      )
    } else if (location === 'castle') {
      return (
        <div className="location">
          <div className="building castle">
            <div className="building-label">城</div>
          </div>
          <div className="character hero">勇</div>
          <div className="character king">王</div>
        </div>
      )
    } else if (location === 'bossArea') {
      return (
        <div className="location">
          <div className="building boss-castle">
            <div className="building-label">魔王城</div>
          </div>
          <div className="character hero">勇</div>
          <div className="character boss">魔</div>
          {gameState === 'battle' || gameState.includes('bossTalking') ? (
            <div className="hp-bar">
              <div className="hp-label">魔王HP: {bossHP}/3</div>
              <div className="hp-bar-container">
                <div className="hp-bar-fill" style={{ width: `${(bossHP / 3) * 100}%` }}></div>
              </div>
            </div>
          ) : null}
        </div>
      )
    }
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
            {renderLocation()}
          </div>
          <div className="message-box">
            <div className="message-text">{message}</div>
            <div className="button-container">
              {showNextButton && gameState === 'dialogue' && (
                <button className="game-button" onClick={nextDialogue}>
                  ▼ 次へ
                </button>
              )}
              {showNextButton && (gameState === 'bossTalking1' || gameState === 'bossTalking2') && (
                <button className="game-button" onClick={continueFromBossTalk}>
                  ▼ 次へ
                </button>
              )}
              {showNextButton && gameState === 'bossDefeating' && (
                <button className="game-button" onClick={nextDialogue}>
                  ▼ 次へ
                </button>
              )}
              {showNextButton && gameState === 'ending' && (
                <button className="game-button" onClick={nextDialogue}>
                  ▼ 次へ
                </button>
              )}
              {gameState === 'battle' && bossHP > 0 && (
                <button className="game-button attack-button" onClick={attack}>
                  ⚔ 攻撃する
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
