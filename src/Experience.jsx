import { Physics } from '@react-three/rapier'
import Lights from './components/lights/Lights.jsx'
import Level from './components/scene/level/index.jsx'
import Player from './components/scene/Player/index.jsx'
import useGame from './stores/useGame.js'

export default function Experience() {
    const blocksCount = useGame((state) => state.blocksCount)
    const blockSeed = useGame((state) => state.blockSeed)

    return (
      <>
        <color args={['#000000']} attach='background' />

        <Physics debug={false}>
          <Lights />
          <Level 
            levelCount={blocksCount}
            levelSeed={blockSeed} />
          <Player />
        </Physics>
      </>
    );
}