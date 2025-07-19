import React from 'react';
import { Player, Composition } from '@remotion/player';

const MyVideo = () => {
  return (
    <div style={{flex: 1, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <h1>Hello Remotion!</h1>
    </div>
  );
};

export default function RemotionDemo() {
  return (
    <div>
      <h2>Remotion Demo</h2>
      <Player
        component={MyVideo}
        durationInFrames={60}
        fps={30}
        compositionWidth={1280}
        compositionHeight={720}
        controls
      />
    </div>
  );
}
