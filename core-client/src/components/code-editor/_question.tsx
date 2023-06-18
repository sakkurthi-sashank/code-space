const question = {
  title: 'Two Sum',
  description: `Given an array of integers nums and an integer target, return indices of
  the two numbers such that they add up to target.
  <br /> You may assume that each input would have exactly one solution,
  and you may not use the same element twice.
  <br />
  You can return the answer in any order.`,
  examples: [
    {
      input: {
        nums: [2, 7, 11, 15],
        target: 9,
      },
      output: [0, 1],
      explanation: `Because nums[0] + nums[1] == 9, we return [0, 1].`,
    },
    {
      input: {
        nums: [3, 2, 4],
        target: 6,
      },
      output: [1, 2],
    },
    {
      input: {
        nums: [3, 3],
        target: 6,
      },
      output: [0, 1],
    },
  ],
}

export const Question = () => {
  return (
    <div className="w-full px-6">
      <h3>{question.title}</h3>
      <p>
        {question.description.split('<br />').map((line, i) => (
          <span key={i}>{line}</span>
        ))}
        <br />
      </p>
      {question.examples.map((example, i) => (
        <div key={i}>
          <h4>Example {i + 1}:</h4>
          <pre className="rounded-md bg-gray-100 px-4 py-3 font-mono text-sm text-gray-800">
            Input: nums = {JSON.stringify(example.input.nums)}, target ={' '}
            {example.input.target}
            <br />
            Output: {JSON.stringify(example.output)}
            {example.explanation && (
              <>
                <br />
                {example.explanation}
              </>
            )}
          </pre>
        </div>
      ))}
    </div>
  )
}
