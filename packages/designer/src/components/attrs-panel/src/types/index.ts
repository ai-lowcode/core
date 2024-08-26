export interface EventItem {
  key: string
  label?: string
  children?: Array<any>
}

export interface EventGroup {
  label: string
  index: number
  key: string
  children: Array<EventItem>
}
