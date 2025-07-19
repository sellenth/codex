import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Save, TestTube, Key } from 'lucide-react'
import { useState } from 'react'
import type { GenerationSettings } from '@/types/storyboard'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})

function SettingsPage() {
  const [settings, setSettings] = useState<GenerationSettings>({
    mockMode: true,
    apiKeys: {
      openai: '',
      anthropic: '',
      elevenlabs: '',
      falai: '',
    },
    defaultModels: {
      chat: 'openai',
      speech: 'elevenlabs',
      image: 'falai',
      video: 'falai',
    },
  })

  const handleSave = () => {
    // In a real app, save to localStorage or backend
    console.log('Saving settings:', settings)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure API keys and generation preferences
        </p>
      </div>

      <Tabs defaultValue="api" className="space-y-6">
        <TabsList>
          <TabsTrigger value="api">API Configuration</TabsTrigger>
          <TabsTrigger value="generation">Generation Settings</TabsTrigger>
          <TabsTrigger value="mock">Mock Mode</TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Configure your API keys for various services. These are stored locally and never sent to our servers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <Input
                  id="openai-key"
                  type="password"
                  placeholder="sk-..."
                  value={settings.apiKeys.openai || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    apiKeys: { ...settings.apiKeys, openai: e.target.value }
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Used for chat generation and script writing
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="anthropic-key">Anthropic API Key</Label>
                <Input
                  id="anthropic-key"
                  type="password"
                  placeholder="sk-ant-..."
                  value={settings.apiKeys.anthropic || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    apiKeys: { ...settings.apiKeys, anthropic: e.target.value }
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Alternative to OpenAI for chat generation
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="elevenlabs-key">ElevenLabs API Key</Label>
                <Input
                  id="elevenlabs-key"
                  type="password"
                  placeholder="..."
                  value={settings.apiKeys.elevenlabs || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    apiKeys: { ...settings.apiKeys, elevenlabs: e.target.value }
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Used for voice generation and narration
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="falai-key">Fal.ai API Key</Label>
                <Input
                  id="falai-key"
                  type="password"
                  placeholder="..."
                  value={settings.apiKeys.falai || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    apiKeys: { ...settings.apiKeys, falai: e.target.value }
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Used for image and video generation
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Models</CardTitle>
              <CardDescription>
                Choose which services to use for different generation tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Chat Model</Label>
                <div className="flex gap-2">
                  <Button
                    variant={settings.defaultModels.chat === 'openai' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSettings({
                      ...settings,
                      defaultModels: { ...settings.defaultModels, chat: 'openai' }
                    })}
                  >
                    OpenAI
                  </Button>
                  <Button
                    variant={settings.defaultModels.chat === 'anthropic' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSettings({
                      ...settings,
                      defaultModels: { ...settings.defaultModels, chat: 'anthropic' }
                    })}
                  >
                    Anthropic
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Speech Model</Label>
                <Button variant="default" size="sm" disabled>
                  ElevenLabs
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Image & Video Model</Label>
                <Button variant="default" size="sm" disabled>
                  Fal.ai
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mock" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mock Mode</CardTitle>
              <CardDescription>
                Enable mock mode to test the application without making real API calls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="mock-mode" className="text-base">
                    Enable Mock Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Use placeholder data instead of real API responses
                  </p>
                </div>
                <Switch
                  id="mock-mode"
                  checked={settings.mockMode}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    mockMode: checked
                  })}
                />
              </div>

              {settings.mockMode && (
                <div className="rounded-lg bg-muted p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <TestTube className="h-4 w-4" />
                    Mock Mode Active
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The following features will use mock data:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>Chat/script generation will return sample text</li>
                    <li>Image generation will use placeholder images</li>
                    <li>Video generation will use sample videos</li>
                    <li>Speech generation will use pre-recorded samples</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}