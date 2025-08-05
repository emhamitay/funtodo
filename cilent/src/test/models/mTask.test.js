import { describe, it, expect } from 'vitest'
import { mTask } from '../../models/mTask'

describe('mTask Model', () => {
  it('should create a task with all properties', () => {
    const task = new mTask('Test Task', 'Test Description', new Date('2024-01-01'), '1', false, 'high')
    
    expect(task.name).toBe('Test Task')
    expect(task.description).toBe('Test Description')
    expect(task.date).toEqual(new Date('2024-01-01'))
    expect(task.id).toBe('1')
    expect(task.isdone).toBe(false)
    expect(task.priority).toBe('high')
    expect(task.groupIndex).toBe(0)
  })

  it('should create a task with default values', () => {
    const task = new mTask('Test Task')
    
    expect(task.name).toBe('Test Task')
    expect(task.description).toBe('')
    expect(task.date).toBeNull()
    expect(task.id).toBeDefined()
    expect(task.isdone).toBe(false)
    expect(task.priority).toBe('medium')
    expect(task.groupIndex).toBe(0)
  })

  it('should create a task from server data', () => {
    const serverData = {
      id: 'server123',
      title: 'Server Task',
      description: 'Server Description',
      dueDate: '2024-01-01T00:00:00.000Z',
      completed: true,
      priority: 'low'
    }
    
    const task = mTask.fromServerData(serverData)
    
    expect(task.name).toBe('Server Task')
    expect(task.description).toBe('Server Description')
    expect(task.date).toEqual(new Date('2024-01-01T00:00:00.000Z'))
    expect(task.id).toBe('server123')
    expect(task.isdone).toBe(true)
    expect(task.priority).toBe('low')
  })

  it('should handle null date in server data', () => {
    const serverData = {
      id: 'server123',
      title: 'Server Task',
      description: 'Server Description',
      dueDate: null,
      completed: false,
      priority: 'medium'
    }
    
    const task = mTask.fromServerData(serverData)
    
    expect(task.date).toBeNull()
  })

  it('should generate unique IDs', () => {
    const task1 = new mTask('Task 1')
    const task2 = new mTask('Task 2')
    
    expect(task1.id).not.toBe(task2.id)
  })

  it('should handle different priority levels', () => {
    const lowPriority = new mTask('Low Task', '', null, '1', false, 'low')
    const mediumPriority = new mTask('Medium Task', '', null, '2', false, 'medium')
    const highPriority = new mTask('High Task', '', null, '3', false, 'high')
    
    expect(lowPriority.priority).toBe('low')
    expect(mediumPriority.priority).toBe('medium')
    expect(highPriority.priority).toBe('high')
  })

  it('should handle task completion status', () => {
    const incompleteTask = new mTask('Incomplete Task', '', null, '1', false)
    const completeTask = new mTask('Complete Task', '', null, '2', true)
    
    expect(incompleteTask.isdone).toBe(false)
    expect(completeTask.isdone).toBe(true)
  })

  it('should handle group index', () => {
    const task = new mTask('Test Task', '', null, '1', false, 'medium', 5)
    
    expect(task.groupIndex).toBe(5)
  })
}) 