import { addEffect } from '@react-three/fiber';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { createClient } from '@supabase/supabase-js'
import useGame from '../../stores/useGame';
import styles from './Interface.module.scss';
import { useScoreboard } from '../../api/scoreboard';
import { useMillisecondsIntoSeconds } from '../../hooks/useMillisecondsIntoSeconds';
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';

export default function Interface() {
    const restart = useGame((state) => state.restart);
    const updateBlocksCount = useGame((state) => state.updateBlocksCount);
    const isStarted = useGame((state) => state.isStarted);
    const startGame = useGame((state) => state.startGame);
    const phase = useGame((state) => state.phase);
    const [amoutOfTraps, setAmountOfTraps] = useState();
    const [playerName, setPlayerName] = useState();
    const { scoreboard, submitUserResult } = useScoreboard();
    const sortedScoreboard = scoreboard.sort((a, b) => a.result - b.result);
    const millisecondsIntoSeconds = useMillisecondsIntoSeconds();
    let elapsedTime = 0;
    const storedPlayerName = localStorage.getItem('playerName')
    console.log(storedPlayerName);
    

    const timeRef = useRef();

    const handleAmountOfTraps = () => {
        updateBlocksCount(amoutOfTraps)
    }

    const handleStartGame = (e) => {
        if (!storedPlayerName) {
            e.preventDefault();
            localStorage.setItem("playerName", playerName);
        }
        startGame()
    }

    // const handlePlayerNameSubmit = (e) => {
    //     e.preventDefault();
    //     localStorage.setItem("playerName", playerName);
    // }

    const handlePlayerNameChange = (e) => {
        setPlayerName(e.target.value)
    }

    useEffect(() => {
        const unsubscribeEffect = addEffect(() => {
            const state = useGame.getState()

            
            if (state.phase === 'playing') {
                elapsedTime = Date.now() - state.startTime
            } else if (state.phase === 'ended') {
                elapsedTime = state.endTime - state.startTime
            }

            elapsedTime /= 1000;
            elapsedTime = elapsedTime.toFixed(2);

            if (timeRef.current) {
                timeRef.current.textContent = elapsedTime;
            }
        })

        return () => unsubscribeEffect()
    }, [])
    
    

    useEffect(() => {
        if (phase === 'ended') {
            const state = useGame.getState();
            elapsedTime = state.endTime - state.startTime;
            elapsedTime /= 1000;
            elapsedTime = elapsedTime.toFixed(2);
            console.log(elapsedTime);
            submitUserResult({
                username: storedPlayerName,
                result: elapsedTime
            })
        }
    }, [phase]);

    return (
      <div className={styles.container}>
        <div
          className={`${styles.timeContainer} ${
            isStarted ? styles.visible : ""
          }`}
        >
          <div className={styles.element} ref={timeRef}>
            0.00
          </div>
          <div className={styles.element} onClick={restart}>
            Restart
          </div>
          {/* <input
                    placeholder='amout of traps'
                    className={styles.input}
                    onChange={(e) => setAmountOfTraps(e.target.value)}
                />
                <button
                    className={styles.button} 
                    onClick={handleAmountOfTraps}
                >
                    Save
                </button> */}
        </div>
        <div className={`${styles.rules} ${isStarted ? styles.hidden : ""}`}>
          Welcome to the race.
          <br />
          Use your keys to controll the ball and spacebar for the jump.
          <br />
          Be fast and be furious.
          <br />
          Share your score with friends!
          {/* <div className={styles.startButton} onClick={handleStartGame}>
            Start
          </div> */}
        </div>

        <div
          className={`${styles.scoreboardContainer} ${
            isStarted ? styles.hidden : ""
          }`}
        >
          <div className={styles.header}>Leaderboard</div>
          {sortedScoreboard.map((item, i) => (
            <div className={styles.userContainer}>
              <div>
                {i + 1}. {item.username}
              </div>
              <div>{item.result} sec</div>
            </div>
          ))}
        </div>
        {/* <form onSubmit={handlePlayerNameSubmit}> */}
        <div
          className={`${styles.enterName} ${isStarted ? styles.hidden : ""}`}
        >
          {!storedPlayerName && (
            <input
              className={styles.header}
              placeholder="Enter Your Nickname"
              onChange={handlePlayerNameChange}
            />
          )}

          <div
            className={`${styles.startButton} ${
              !playerName && !storedPlayerName ? styles.disabled : ""
            }`}
            onClick={handleStartGame}
          >
            {!storedPlayerName ? (
              "Start"
            ) : (
              <>
                <span>Welcome back, {storedPlayerName}</span>
                <br />
                <span>Click to continue</span>
              </>
            )}
          </div>
        </div>
        {/* </form> */}
      </div>
    );
}