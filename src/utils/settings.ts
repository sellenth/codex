import type { GenerationSettings } from '@/types/storyboard'

const DEFAULT_SETTINGS: GenerationSettings = {
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
}

const STORAGE_KEY = 'codex_settings'

export function getStoredSettings(): GenerationSettings {
  if (typeof localStorage === 'undefined') return DEFAULT_SETTINGS
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return DEFAULT_SETTINGS
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: GenerationSettings) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export function getApiKey(key: keyof GenerationSettings['apiKeys']): string | undefined {
  const settings = getStoredSettings()
  const envKey = `VITE_${key.toUpperCase()}_KEY`
  return settings.apiKeys[key] || (import.meta.env as any)[envKey]
}
