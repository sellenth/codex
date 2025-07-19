import { createFileRoute } from '@tanstack/react-router'
import { RemotionPlayer } from '~/components/RemotionPlayer'

export const Route = createFileRoute('/remotion-demo')({
  component: RemotionDemo,
})

function RemotionDemo() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Remotion Demo</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Interactive Video Composition</h2>
          <p className="text-muted-foreground mb-6">
            This demo showcases Remotion's capabilities for creating programmatic videos with React components.
          </p>
          <RemotionPlayer />
        </section>
      </div>
    </div>
  )
}