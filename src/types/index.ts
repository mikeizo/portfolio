import { AlertColor } from '@mui/material/Alert'

export type Items = {
  items: []
}

export type SkillsProps = {
  skills: []
  experience: []
}

export type Skill = {
  name: string
  percent: number
}

export type Experience = {
  name: string
  icon: string
}

export type AboutProps = {
  settings: Settings
  about: []
}

export type Settings = {
  about: string
  email?: string
}

export type Timeline = {
  year_from: string
  description: string
  image: string
  year_to: string
  updated: string
}

export type WorkProps = {
  work: []
}

export type WorkItem = {
  work: WorkItems
}

export type WorkItems = {
  _id: string
  name: string
  description: string
  resources: string[]
  logo: string
  images?: string[]
  slug: string
  weight: number
  date: string
  git?: string
  url?: string
}

export type QueryParam = {
  query: {
    id: number
  }
}

export type AlertProps = {
  severity: AlertColor
  message: string
}
