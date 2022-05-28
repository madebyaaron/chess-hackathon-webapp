import { ReactNode } from 'react'

export interface Component {
  children?: ReactNode | string
  className?: string
  testId?: string
}
