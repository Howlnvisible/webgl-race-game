import { addEffect } from '@react-three/fiber';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import useGame from '../../stores/useGame';
import styles from './Interface.module.scss';

export default function Interface() {
    const restart = useGame((state) => state.restart);
    const phase = useGame((state) => state.phase);
    const updateBlocksCount = useGame((state) => state.updateBlocksCount);
    const [amoutOfTraps, setAmountOfTraps] = useState();

    const timeRef = useRef();

    const handleAmountOfTraps = () => {
        updateBlocksCount(amoutOfTraps)
    }

    useEffect(() => {
        const unsubscribeEffect = addEffect(() => {
            const state = useGame.getState()

            let elapsedTime = 0;
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

    return (
        <div className={styles.container}>
            <div className={styles.timeContainer}>
                <div 
                    className={styles.element}
                    ref={timeRef}
                >
                    0.00
                </div>
                <div 
                    className={styles.element}
                    onClick={restart}
                >
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
        </div>
    )
}