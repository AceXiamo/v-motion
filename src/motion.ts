import { Directive, ref } from 'vue'

type StyleOption = {
  before: any
  after: any
  delay?: number
  visible?: {
    once: boolean
  }
  duration?: number
}

const defaultDuration = 200

class Motion {
  el?: HTMLElement
  option: StyleOption
  styles: any = {}

  constructor(el: HTMLElement, option: StyleOption) {
    this.el = el
    this.option = option
  }

  public run(index?: number) {
    if (index) console.log(`run - ${index}`)
    this.before()
    if (this.option.delay) {
      setTimeout(() => {
        this.animate()
      }, this.option.delay)
    } else this.animate()
  }

  private before() {
    Object.assign(this.el!.style, this.option.before)
    Object.keys(this.option.before).forEach((key: string) => {
      this.styles[key] = valueHandle(this.option.before[key])
    })
  }

  private animate() {
    const start = Date.now()
    const endStyles = Object.keys(this.option.after).map((key: string) => {
      const startValue = String(this.option.before[key])
      const endValue = String(this.option.after[key])
      const style = {
        key,
        startValue,
        endValue,
        template: this.styles[key],
      }
      return style
    })
    const fun = () => {
      const rate = (Date.now() - start) / (this.option.duration || defaultDuration)
      if (rate > 1) {
        endStyles.forEach((style) => {
          this.el?.style.setProperty(style.key, style.endValue)
        })
        return
      }
      endStyles.forEach((style) => {
        const { startValue, endValue, template } = style
        const current = currentValue(onlyMatchNumber(startValue), onlyMatchNumber(endValue), rate, template)
        this.el?.style.setProperty(style.key, current)
      })
      requestAnimationFrame(fun)
    }
    requestAnimationFrame(fun)
  }
}

const valueHandle = (value: any) => {
  const reg = /\d+/g
  return String(value).replace(reg, '#')
}

const onlyMatchNumber = (value: string): number => {
  const reg = /[+-]?\d+(\.\d+)?/g
  const result = value.match(reg)
  if (result) {
    return Number(result[0])
  }
  return 0
}

const currentValue = (startValue: number, endValue: number, rate: number, template: string) => {
  let value = startValue + (endValue - startValue) * rate
  return template.replace('#', String(value))
}

class VisibleMotion {
  queue: Motion[]
  windowH: number

  constructor() {
    this.queue = []
    this.windowH = window.innerHeight
    this.animateByView()
  }

  public animateByView() {
    this.queue.forEach((motion) => {
      const top = motion.el?.getBoundingClientRect().top || 0
      const bottom = motion.el?.getBoundingClientRect().bottom || 0
      const index = this.queue.indexOf(motion)
      if (!(top <= this.windowH && bottom >= 0)) {
        motion.run()
      } else {
        motion.option.visible?.once && this.queue.splice(index, 1)
      }
    })
    requestAnimationFrame(() => this.animateByView())
  }
}

let visibleInstance: VisibleMotion | null = null
const directive: Directive = {
  created: (el, binding) => {
    const options: StyleOption = binding.value
    const motion = new Motion(el, options)
    if (!!options.visible) {
      if (!visibleInstance) visibleInstance = new VisibleMotion()
      visibleInstance.queue.push(motion)
    } else {
      motion.run()
    }
  },
  beforeMount: () => {},
  mounted: () => {},
  beforeUpdate: () => {},
  updated: () => {},
  beforeUnmount: () => {},
  unmounted: () => {},
}

export default directive
