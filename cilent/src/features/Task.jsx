import taskStore from '@/store/TasksStore'
import TaskOptionMenu from '@/features/TaskOptionMenu';
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import clsx from 'clsx';

const MAX_DESCRIPTION = 20;

export default function Task({ task }) {

  const [isDone, setIsDone] = useState(task.isdone);
  const checkboxName=`isDone-${task.id}`;
  const updateIsDone = taskStore((s)=> s.updateIsDone);
  function handleCheck(value){
    setIsDone(value);
    updateIsDone(task, value);
  }

  function shortDescription(longDescription){
    let result = longDescription;
    if(result.length > MAX_DESCRIPTION){
      result = result.slice(0,MAX_DESCRIPTION) + '...';
    }
    return result;
  }
  const description = shortDescription(task.description);

  return (
    <div className={clsx("p-2 prose rounded-md border",
      !task.isdone ? "bg-blue-50 border-blue-100" : "bg-green-50 border-green-100"
    )}>
      <div className="flex flex-1 items-start">
        <h2 className="font-bold antialiased">{task.name}</h2>
        <div className="flex-1 text-right">
          <TaskOptionMenu task={task} />
        </div>
      </div>
      <p className={
        clsx("text-xs text-gray-500 whitespace-pre-line line-clamp-3",
          description != '' && 'mb-2'
        )
      }>{description}</p>
      <div className="flex items-center gap-2">
        <Checkbox id={checkboxName} checked={isDone} onCheckedChange={handleCheck}  className='data-[state=checked]:bg-green-300 data-[state=checked]:border-green-100' />
        <Label htmlFor={checkboxName}>Mark as done</Label>
      </div>
    </div>
  );
}
