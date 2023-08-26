import { RunSampleTestCase } from './submit/RunSampleTestCase'
import { SubmitQuestion } from './submit/SubmitQuestion'

export function CompileAndSubmit() {
  return (
    <div className="flex justify-end w-full h-[50px] p-2 space-x-4 border">
      <RunSampleTestCase />
      <SubmitQuestion />
    </div>
  )
}
