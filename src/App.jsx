import { useState } from "react"

import "./App.css"
import Keyboard from "./Keyboard"
import Words from "./Words"
import GameOver from "./GameOver"

const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const SPECIAL_CHARS = "ÄÖÜ"

const CORRECT_WORD = "Hallo".toUpperCase()

function copyWords(words) {
    return [...words.map((word) => ({ ...word }))]
}

function App() {
    // const [words, setWords] = useState(["", "", "", "", "", ""])
    const [words, setWords] = useState([
        { word: "", entered: undefined },
        { word: "", entered: undefined },
        { word: "", entered: undefined },
        { word: "", entered: undefined },
        { word: "", entered: undefined },
        { word: "", entered: undefined },
    ])
    const [entryLocked, setEntryLocked] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [wordIdx, setWordIdx] = useState(0)
    const wordLength = 5

    // function handleKeyDown(key) {
    //     if (entryLocked) return

    //     if (key === "Enter") {
    //         if (words[wordIdx].length !== 5) {
    //             console.error("Wort kleiner als 5")
    //             return
    //         }

    //         setWordIdx((prevIdx) => prevIdx + 1)
    //     } else if (
    //         (UPPERCASE_LETTERS + SPECIAL_CHARS).includes(key.toUpperCase())
    //     ) {
    //         if (words[wordIdx].length < 5) {
    //             setWords((prevWords) => {
    //                 const newWords = [...prevWords]
    //                 newWords[wordIdx] += key

    //                 return newWords
    //             })
    //         }
    //     } else if (key === "Backspace") {
    //         if (words[wordIdx].length > 0) {
    //             setWords((prevWords) => {
    //                 const newWords = [...prevWords]
    //                 const curWord = newWords[wordIdx]
    //                 newWords[wordIdx] = curWord.slice(0, curWord.length - 1)

    //                 return newWords
    //             })
    //         }
    //     }
    // }

    function handleKeyDown(key) {
        if (entryLocked) return

        const currentWord = words[wordIdx].word
        if (key === "Backspace") {
            if (currentWord.length > 0) {
                setWords((prevWords) => {
                    const newWords = copyWords(prevWords)
                    const curWord = newWords[wordIdx].word
                    newWords[wordIdx].word = curWord.slice(
                        0,
                        curWord.length - 1
                    )

                    return newWords
                })
            }
        } else if (key === "Enter") {
            if (currentWord.length !== 5) return

            if (currentWord === CORRECT_WORD) {
                setEntryLocked(true)
                setGameOver(true)

                return
            }

            setWords((prevWords) => {
                const newWords = copyWords(prevWords)
                newWords[wordIdx].entered = true

                return newWords
            })
            setWordIdx((prevIdx) => prevIdx + 1)
        } else if (
            (UPPERCASE_LETTERS + SPECIAL_CHARS).includes(key.toUpperCase())
        ) {
            if (currentWord.length < 5) {
                const letter = key.toUpperCase()
                setWords((prevWords) => {
                    const newWords = copyWords(prevWords)
                    newWords[wordIdx].word += letter.toUpperCase()

                    return newWords
                })
            }
        }
    }

    return (
        <div
            className={"app" + (gameOver ? "status-game-over" : "")}
            onKeyDown={(e) => handleKeyDown(e.key)}
            tabIndex={0}
        >
            <header>
                <h1 className="page-title">
                    <span>Wordle</span>
                </h1>
            </header>
            <main>
                <Words
                    words={words}
                    length={wordLength}
                    correctWord={CORRECT_WORD}
                />
                <Keyboard onKeyPress={handleKeyDown} />
                {gameOver && <GameOver />}
            </main>
        </div>
    )
}

export default App
