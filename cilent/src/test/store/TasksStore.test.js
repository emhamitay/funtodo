import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act } from '@testing-library/react'
import useTasksStore from '../../store/TasksStore'
import { mTask } from '../../models/mTask'

// Mock the toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('TasksStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
    localStorage.clear()
    // Reset the store state
    useTasksStore.getState().clearTasks()
  })

  afterEach(() => {
    useTasksStore.getState().clearTasks()
  })

  it('should initialize with empty state', () => {
    const { tasks, userId, isOnline } = useTasksStore.getState()
    expect(tasks).toEqual([])
    expect(userId).toBeNull()
    expect(isOnline).toBe(false)
  })

  it('should set user ID', () => {
    const testUserId = 'test123'
    
    act(() => {
      useTasksStore.getState().setUserId(testUserId)
    })
    
    const { userId, isOnline } = useTasksStore.getState()
    expect(userId).toBe(testUserId)
    expect(isOnline).toBe(true)
  })

  it('should clear user ID on logout', () => {
    const testUserId = 'test123'
    
    act(() => {
      useTasksStore.getState().setUserId(testUserId)
      useTasksStore.getState().setUserId(null)
    })
    
    const { userId, isOnline } = useTasksStore.getState()
    expect(userId).toBeNull()
    expect(isOnline).toBe(false)
  })

  it('should create task locally when offline', async () => {
    const task = new mTask('New Task', 'Task Description', null)
    
    await act(async () => {
      await useTasksStore.getState().createTask(task)
    })
    
    const { tasks } = useTasksStore.getState()
    expect(tasks).toHaveLength(1)
    expect(tasks[0].name).toBe('New Task')
    expect(tasks[0].description).toBe('Task Description')
  })

  it('should create task on server when online', async () => {
    const mockResponse = { 
      ok: true, 
      json: () => Promise.resolve({ 
        task: { 
          id: 'server123', 
          title: 'New Task',
          description: 'Task Description',
          dueDate: null,
          completed: false,
          priority: 'medium'
        } 
      }) 
    }
    global.fetch.mockResolvedValueOnce(mockResponse)
    
    const testUserId = 'test123'
    const task = new mTask('New Task', 'Task Description', null)
    
    act(() => {
      useTasksStore.getState().setUserId(testUserId)
    })
    
    await act(async () => {
      await useTasksStore.getState().createTask(task)
    })
    
    expect(global.fetch).toHaveBeenCalledWith('/api/tasks/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: testUserId,
        title: 'New Task',
        description: 'Task Description',
        dueDate: null,
        priority: 'medium'
      })
    })
  })

  it('should load tasks from server when online', async () => {
    const mockTasks = [
      {
        id: 1,
        title: 'Server Task',
        description: 'Server Description',
        dueDate: null,
        completed: false,
        priority: 'medium'
      }
    ]
    const mockResponse = { 
      ok: true, 
      json: () => Promise.resolve({ tasks: mockTasks }) 
    }
    global.fetch.mockResolvedValueOnce(mockResponse)
    
    const testUserId = 'test123'
    
    await act(async () => {
      await useTasksStore.getState().loadTasks(testUserId)
    })
    
    const { tasks, isOnline } = useTasksStore.getState()
    expect(tasks).toHaveLength(1)
    expect(tasks[0].name).toBe('Server Task')
    expect(isOnline).toBe(true)
  })

  it('should update task', async () => {
    const task = new mTask('Original Task', 'Original Description', null)
    
    await act(async () => {
      await useTasksStore.getState().createTask(task)
    })
    
    const { tasks } = useTasksStore.getState()
    const taskId = tasks[0].id
    
    const updatedTask = {
      id: taskId,
      name: 'Updated Task',
      description: 'Updated Description'
    }
    
    await act(async () => {
      await useTasksStore.getState().editTask(updatedTask)
    })
    
    const { tasks: updatedTasks } = useTasksStore.getState()
    expect(updatedTasks[0].name).toBe('Updated Task')
    expect(updatedTasks[0].description).toBe('Updated Description')
  })

  it('should toggle task completion', async () => {
    const task = new mTask('Test Task', 'Test Description', null)
    
    await act(async () => {
      await useTasksStore.getState().createTask(task)
    })
    
    const { tasks } = useTasksStore.getState()
    const taskToToggle = tasks[0]
    
    await act(async () => {
      await useTasksStore.getState().updateIsDone(taskToToggle, true)
    })
    
    const { tasks: updatedTasks } = useTasksStore.getState()
    expect(updatedTasks[0].isdone).toBe(true)
  })

  it('should remove task', async () => {
    const task = new mTask('Test Task', 'Test Description', null)
    
    await act(async () => {
      await useTasksStore.getState().createTask(task)
    })
    
    const { tasks } = useTasksStore.getState()
    const taskToRemove = tasks[0]
    
    await act(async () => {
      await useTasksStore.getState().removeTask(taskToRemove)
    })
    
    const { tasks: updatedTasks } = useTasksStore.getState()
    expect(updatedTasks).toHaveLength(0)
  })

  it('should clear all tasks', () => {
    const task = new mTask('Test Task', 'Test Description', null)
    
    act(() => {
      useTasksStore.getState().createTask(task)
      useTasksStore.getState().clearTasks()
    })
    
    const { tasks, userId, isOnline } = useTasksStore.getState()
    expect(tasks).toEqual([])
    expect(userId).toBeNull()
    expect(isOnline).toBe(false)
  })
}) 