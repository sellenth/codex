import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'

export const MyComposition = () => {
  const frame = useCurrentFrame()
  const { fps, durationInFrames, width, height } = useVideoConfig()

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  })

  const rotation = interpolate(frame, [0, durationInFrames], [0, 360])

  const scale = spring({
    frame: frame - 60,
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 200,
    },
  })

  return (
    <AbsoluteFill className="bg-gradient-to-br from-blue-600 to-purple-600">
      <AbsoluteFill className="items-center justify-center">
        <Sequence from={0} durationInFrames={90}>
          <div
            style={{
              opacity,
              fontSize: 80,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}
          >
            Welcome to Remotion
          </div>
        </Sequence>

        <Sequence from={60} durationInFrames={Infinity}>
          <div className="flex flex-col items-center justify-center gap-8">
            <div
              className="w-48 h-48 bg-white rounded-2xl shadow-2xl flex items-center justify-center"
              style={{
                transform: `rotate(${rotation}deg) scale(${scale})`,
              }}
            >
              <span className="text-6xl">🎬</span>
            </div>
            
            <div
              className="text-white text-2xl font-semibold"
              style={{
                opacity: interpolate(frame, [90, 120], [0, 1]),
              }}
            >
              Create videos with React
            </div>
          </div>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}