import { useEffect, useRef } from 'react'

// Lightweight scroll-parallax: moves an element by (scrollY * speed) px
// via transform, using rAF-throttled scroll listener. No library needed.
// Respects prefers-reduced-motion — becomes a no-op if the user opts out.
export function useParallax<T extends HTMLElement>(speed: number) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let ticking = false
    let rafId = 0

    const update = () => {
      const rect = el.getBoundingClientRect()
      // Only animate while the element is near/within the viewport
      if (rect.bottom > -200 && rect.top < window.innerHeight + 200) {
        const offset = window.scrollY * speed
        el.style.transform = `translate3d(0, ${offset}px, 0)`
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(update)
        ticking = true
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [speed])

  return ref
}

// Scroll-reveal: fades + translates an element up once it enters the viewport.
// Uses IntersectionObserver (cheap, no scroll listener). Respects reduced-motion.
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      return
    }

    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            obs.unobserve(el)
          }
        })
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return ref
}