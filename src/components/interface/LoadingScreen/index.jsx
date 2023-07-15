import { useProgress } from "@react-three/drei";
import styles from './LoadingScreen.module.scss';

export default function LoadingScreen({
    started,
    onStarted
}) {
    const { progress } = useProgress();
    return (
        <div className={`${styles.container} ${progress === 100 ? styles.active : ''}`}>
            <div className={styles.loading}>
                Loading...
            </div>
        </div>
    )
}