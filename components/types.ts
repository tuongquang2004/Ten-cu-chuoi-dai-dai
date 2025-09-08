import type { Icon } from './Icon'

export type IconKey = keyof typeof Icon 
export type TileItem = { label: string; icon: IconKey; href?: string; onClick?: () => void }
