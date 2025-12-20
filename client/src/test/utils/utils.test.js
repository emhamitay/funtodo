import { describe, it, expect } from 'vitest'
import { cn } from '../../lib/utils'

describe('Utils', () => {
  describe('cn function', () => {
    it('should combine class names', () => {
      const result = cn('class1', 'class2', 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle conditional classes', () => {
      const result = cn('base', true && 'conditional', false && 'hidden')
      expect(result).toBe('base conditional')
    })

    it('should handle empty strings and null values', () => {
      const result = cn('base', '', null, undefined, 'valid')
      expect(result).toBe('base valid')
    })

    it('should handle objects with boolean values', () => {
      const result = cn('base', {
        'active': true,
        'disabled': false,
        'hidden': true
      })
      expect(result).toBe('base active hidden')
    })

    it('should handle mixed inputs', () => {
      const result = cn('base', 'static', {
        'conditional': true,
        'hidden': false
      }, 'final')
      expect(result).toBe('base static conditional final')
    })
  })
}) 