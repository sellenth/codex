import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fal } from '@fal-ai/client'

interface ModelOption {
  id: string
  label: string
  supportsImage: boolean
  aspectRatios?: string[]
}

const models: ModelOption[] = [
  { id: 'fal-ai/kontext-pro', label: 'Kontext Pro', supportsImage: false },
  { id: 'fal-ai/fast-flux', label: 'Fast FLUX', supportsImage: true, aspectRatios: ['1:1', '16:9', '9:16'] },
]

export const Route = createFileRoute('/fal')({
  component: FalPage,
})

function FalPage() {
  const [modelId, setModelId] = useState(models[0].id)
  const model = models.find((m) => m.id === modelId)!
  const [prompt, setPrompt] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [aspect, setAspect] = useState(model.aspectRatios ? model.aspectRatios[0] : '')
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    fal.config({ credentials: import.meta.env.VITE_FAL_KEY as string })
    try {
      const input: any = { prompt }
      if (model.supportsImage && imageFile) {
        input.image_url = await fileToDataUrl(imageFile)
      }
      if (model.aspectRatios) {
        input.aspect_ratio = aspect
      }
      const { data } = await fal.run(model.id, { input })
      if (data && (data.image_url || data.output)) {
        setResultUrl(data.image_url ?? data.output)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">fal.ai Playground</h1>
        <p className="text-muted-foreground mt-1">Generate media using fal.ai models</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generation</CardTitle>
          <CardDescription>Select a model and enter your prompt</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Model</Label>
              <Select value={modelId} onValueChange={setModelId}>
                <SelectTrigger id="model">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prompt">Prompt</Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
              />
            </div>

            {model.supportsImage && (
              <div className="space-y-2">
                <Label htmlFor="image">Upload Image (optional)</Label>
                <Input id="image" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
              </div>
            )}

            {model.aspectRatios && (
              <div className="space-y-2">
                <Label>Aspect Ratio</Label>
                <Select value={aspect} onValueChange={setAspect}>
                  <SelectTrigger id="aspect">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {model.aspectRatios.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button type="submit" disabled={loading} className="mt-2">
              {loading ? 'Generating...' : 'Generate'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {resultUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <img src={resultUrl} alt="result" className="w-full rounded-md" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
