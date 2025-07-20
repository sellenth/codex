import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fal } from '@fal-ai/client'
import { getApiKey } from '@/utils/settings'
import { Loader2, Sparkles } from 'lucide-react'

interface ImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void
  defaultPrompt?: string
  aspectRatio?: string
  showCard?: boolean
}

interface ModelOption {
  id: string
  label: string
  aspectRatios: string[]
}

const models: ModelOption[] = [
  { id: 'fal-ai/flux/dev', label: 'FLUX.1 Dev', aspectRatios: ['1:1', '16:9', '9:16', '4:3', '3:4'] },
  { id: 'fal-ai/flux/schnell', label: 'FLUX.1 Schnell (Fast)', aspectRatios: ['1:1', '16:9', '9:16', '4:3', '3:4'] },
  { id: 'fal-ai/flux-pro', label: 'FLUX.1 Pro', aspectRatios: ['1:1', '16:9', '9:16', '4:3', '3:4'] },
]

export function ImageGenerator({ 
  onImageGenerated, 
  defaultPrompt = '', 
  aspectRatio = '16:9',
  showCard = true 
}: ImageGeneratorProps) {
  const [modelId, setModelId] = useState(models[0].id)
  const [prompt, setPrompt] = useState(defaultPrompt)
  const [aspect, setAspect] = useState(aspectRatio)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)
    
    const apiKey = getApiKey('falai')
    if (!apiKey) {
      setError('FAL API key not found. Please add it in Settings.')
      setLoading(false)
      return
    }
    
    fal.config({ credentials: apiKey })
    
    try {
      const result = await fal.run(modelId, { 
        input: { 
          prompt,
          aspect_ratio: aspect 
        } 
      }) as any
      
      console.log('Fal AI response:', result)
      
      // Handle different response formats
      let imageUrl: string | null = null
      if (result.images && result.images.length > 0) {
        imageUrl = result.images[0].url
      } else if (result.image) {
        imageUrl = result.image.url || result.image
      } else if (result.data) {
        const { data } = result
        if (data.images && data.images.length > 0) {
          imageUrl = data.images[0].url
        } else if (data.image_url || data.output) {
          imageUrl = data.image_url || data.output
        }
      } else if (result.output) {
        imageUrl = result.output
      } else if (result.image_url) {
        imageUrl = result.image_url
      }
      
      if (imageUrl) {
        console.log('Generated image URL:', imageUrl)
        setGeneratedUrl(imageUrl)
        onImageGenerated(imageUrl)
      } else {
        console.error('Could not extract image URL from response:', result)
        setError('No image URL found in response. Check console for details.')
      }
    } catch (err) {
      console.error('Image generation error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const content = (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Model</Label>
            <Select value={modelId} onValueChange={setModelId}>
              <SelectTrigger>
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
            <Label>Aspect Ratio</Label>
            <Select value={aspect} onValueChange={setAspect}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {models.find(m => m.id === modelId)?.aspectRatios.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="prompt">Image Description</Label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            rows={3}
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={loading || !prompt.trim()}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Image
            </>
          )}
        </Button>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {generatedUrl && (
          <div className="space-y-2">
            <Label>Generated Image</Label>
            <img 
              src={generatedUrl} 
              alt="Generated" 
              className="w-full rounded-md border"
            />
            <div className="mt-2 p-2 bg-muted rounded-md">
              <p className="text-xs text-muted-foreground mb-1">Image URL:</p>
              <p className="text-xs font-mono break-all select-all">{generatedUrl}</p>
            </div>
          </div>
        )}
      </div>
    </>
  )

  if (!showCard) {
    return content
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Image with AI</CardTitle>
        <CardDescription>
          Use AI to generate an image for this location
        </CardDescription>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  )
}