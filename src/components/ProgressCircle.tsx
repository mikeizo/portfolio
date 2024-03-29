import { useState, useEffect } from 'react'

type Props = {
  data: {
    percent: number
    name: string
  }
}

export default function ProgressCircle({ data }: Props) {
  const { percent, name } = data
  const [dashStyle, setDashStyle] = useState({
    strokeDashoffset: `290px`
  })

  useEffect(() => {
    const dashRatio = percent * 0.01 * 0.75
    const viewboxHeight = 100
    const strokeWidth = 8
    const pathRadius = viewboxHeight / 2 - strokeWidth / 2
    const diameter = Math.PI * 2 * pathRadius
    const gapLength = (1 - dashRatio) * diameter
    setDashStyle({
      strokeDashoffset: `${gapLength}px`
    })
  }, [percent])

  return (
    <>
      <svg
        className="CircularProgressbar "
        viewBox="0 0 100 100"
        data-test-id="CircularProgressbar"
      >
        <path
          className="CircularProgressbar-trail"
          d="M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92"
          strokeWidth="8"
          fillOpacity="0"
        ></path>
        <path
          className="CircularProgressbar-path"
          d=" M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92"
          strokeWidth="8"
          fillOpacity="0"
          style={dashStyle}
        ></path>
        <text className="CircularProgressbar-text" x="50" y="55">
          {percent}%
        </text>
      </svg>
      {name}
    </>
  )
}
