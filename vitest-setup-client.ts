import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
})

// Mock IntersectionObserver
;(window as any).IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}))

// Mock ResizeObserver
;(window as any).ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}))

// Mock scrollTo
Element.prototype.scrollTo = vi.fn()

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
    width: 100,
    height: 100,
    top: 0,
    left: 0,
    bottom: 100,
    right: 100,
    x: 0,
    y: 0,
    toJSON: () => {},
})

// Mock scrollWidth and scrollHeight
Object.defineProperty(Element.prototype, 'scrollWidth', {
    configurable: true,
    value: 300,
})

Object.defineProperty(Element.prototype, 'scrollHeight', {
    configurable: true,
    value: 300,
})

// Mock window.innerWidth and innerHeight
Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 1024,
})

Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: 768,
})

// Mock window.scrollTo
window.scrollTo = vi.fn()

// Mock console methods to reduce noise in tests
;(window as any).console = {
    ...console,
    log: vi.fn(),
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
}
