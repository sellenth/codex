import { Player } from '@remotion/player'
import { MyComposition } from './remotion/MyComposition'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Slider } from './ui/slider'
import { useState } from 'react'

export const RemotionPlayer = () => {
  const [fps] = useState(30)
  const [durationInFrames] = useState(150)
  const [compositionWidth] = useState(1280)
  const [compositionHeight] = useState(720)
  const [playbackRate, setPlaybackRate] = useState(1)

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle>Remotion Video Player</CardTitle>
        <CardDescription>
          An interactive video created with React components
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
          <Player
            component={MyComposition}
            durationInFrames={durationInFrames}
            compositionWidth={compositionWidth}
            compositionHeight={compositionHeight}
            fps={fps}
            style={{
              width: '100%',
              height: '100%',
            }}
            controls
            playbackRate={playbackRate}
            acknowledgeRemotionLicense
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Playback Speed</label>
              <span className="text-sm text-muted-foreground">{playbackRate}x</span>
            </div>
            <Slider
              value={[playbackRate]}
              onValueChange={(value) => setPlaybackRate(value[0])}
              min={0.25}
              max={2}
              step={0.25}
              className="w-full"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPlaybackRate(1)}
            >
              Reset Speed
            </Button>
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h4 className="font-medium text-sm">Composition Details</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Resolution:</span>{' '}
                <span className="font-mono">{compositionWidth}x{compositionHeight}</span>
              </div>
              <div>
                <span className="text-muted-foreground">FPS:</span>{' '}
                <span className="font-mono">{fps}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Duration:</span>{' '}
                <span className="font-mono">{(durationInFrames / fps).toFixed(1)}s</span>
              </div>
              <div>
                <span className="text-muted-foreground">Frames:</span>{' '}
                <span className="font-mono">{durationInFrames}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}