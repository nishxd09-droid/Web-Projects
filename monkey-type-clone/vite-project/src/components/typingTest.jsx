import { useState, useEffect, useRef } from 'react'
import words from '../words'

function getRandomWords() {
  let result = []
  for (let i = 0; i < 30; i++) {
    let randomIndex = Math.floor(Math.random() * words.length)
    result.push(words[randomIndex])
  }
  return result.join(' ')
}

function TypingTest() {
  const [text, setText] = useState(getRandomWords())
  const [typed, setTyped] = useState('')
  const [timeLeft, setTimeLeft] = useState(60)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef(null)

  function handleInput(e) {
    if (!isRunning && timeLeft === 60) {
      setIsRunning(true)
    }
    if (timeLeft > 0) {
      setTyped(e.target.value)
    }
  }

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [isRunning])

  // Save result to backend
  async function saveResult(wpm, accuracy) {
    try {
      await fetch('http://localhost:5000/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ wpm, accuracy })
      })
      console.log('Result saved!')
    } catch (err) {
      console.log('Error saving result:', err)
    }
  }

  // Trigger save when timer hits 0
  useEffect(() => {
    if (timeLeft === 0) {
      saveResult(calcWPM(), calcAccuracy())
    }
  }, [timeLeft])

  function calcWPM() {
    const timeElapsed = (60 - timeLeft) / 60
    if (timeElapsed === 0) return 0
    let correct = 0
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === text[i]) correct++
    }
    return Math.round((correct / 5) / timeElapsed)
  }

  function calcAccuracy() {
    if (typed.length === 0) return 100
    let correct = 0
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === text[i]) correct++
    }
    return Math.round((correct / typed.length) * 100)
  }

  function restart() {
    clearInterval(timerRef.current)
    setText(getRandomWords())
    setTyped('')
    setTimeLeft(60)
    setIsRunning(false)
  }

  if (timeLeft === 0) {
    return (
      <div className="results">
        <h2>Your Results</h2>
        <div className="result-stats">
          <div>
            <p className="result-label">WPM</p>
            <p className="result-value">{calcWPM()}</p>
          </div>
          <div>
            <p className="result-label">Accuracy</p>
            <p className="result-value">{calcAccuracy()}%</p>
          </div>
        </div>
        <button className="restart-btn" onClick={restart}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="typing-container">
      <div className="stats">
        <div className="timer">{timeLeft}s</div>
        <div className="wpm"><span>{calcWPM()}</span>wpm</div>
        <div className="accuracy"><span>{calcAccuracy()}%</span>acc</div>
      </div>

      <div className="words">
        {text.split('').map((char, index) => {
          let color = 'untyped'
          if (index < typed.length) {
            color = typed[index] === char ? 'correct' : 'wrong'
          }
          return (
            <span key={index} className={color}>
              {char}
            </span>
          )
        })}
      </div>

      <input
        className="type-input"
        type="text"
        value={typed}
        onChange={handleInput}
        placeholder="Start typing..."
        autoFocus
      />
    </div>
  )
}

export default TypingTest