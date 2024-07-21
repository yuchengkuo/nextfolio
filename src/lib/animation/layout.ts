import { animate, style, type AnimationOptionsWithOverrides } from '@motionone/dom'

export interface LayoutDiff {
  from: DOMRect
  to: DOMRect
}

export function layout(
  element: Element,
  { from, to }: LayoutDiff,
  transition: AnimationOptionsWithOverrides
) {
  // Read
  element.getAnimations().forEach((animation) => animation.commitStyles())

  // Write
  const [originX, originY] = getComputedStyle(element).transformOrigin.split(' ').map(parseFloat)
  const currentX = parseFloat(style.get(element, 'x') as string)
  const currentY = parseFloat(style.get(element, 'y') as string)

  const delta = {
    x: from.left + (from.width * originX) / to.width - (to.left + originX - currentX),
    y: from.top + (from.height * originY) / to.height - (to.top + originY - currentY),
    scaleX: from.width / to.width,
    scaleY: from.height / to.height
  }

  const { duration = 0.3 } = transition

  animate(
    element,
    {
      x: [delta.x, 0],
      y: [delta.y, 0],
      scaleX: [delta.scaleX, 1],
      scaleY: [delta.scaleY, 1]
    },
    transition
  )

  return {
    duration: duration * 1000
  }
}
