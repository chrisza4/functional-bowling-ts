import * as BowlingType from './bowling.type'

enum FrameType {
  Strike,
  Spare,
  LastFrame,
  Score,
}

export function getScore(game: BowlingType.Game): number {
  return game.reduce((acc, currentFrame, i) => {
    return (
      acc +
      getFrameScore(currentFrame, {
        firstFrame: game[i + 1],
        secondFrame: game[i + 2],
      })
    )
  }, 0)
}

export function getFrameScore(
  frame: BowlingType.Frame,
  nextFrames: BowlingType.NextFrames
): number {
  const getFrameType = (frame: BowlingType.Frame): FrameType => {
    switch (true) {
      case 'third' in frame:
        return FrameType.LastFrame
      case frame.first === 10:
        return FrameType.Strike
      case frame.second + frame.first === 10:
        return FrameType.Spare
      default:
        return FrameType.Score
    }
  }
  const getNextRoll = () =>
    'third' in frame ? frame.third : nextFrames.firstFrame.first
  const getNextNextRoll = () => {
    if (nextFrames.firstFrame.second === null) {
      return nextFrames.secondFrame.first
    }
    return nextFrames.firstFrame.second
  }

  // Should be better with Pattern Matching
  // such as Elixir: def getScore(%{ first: 10, second: null }) do = Strike
  // such as Scala: We can declare case class for strike
  switch (getFrameType(frame)) {
    case FrameType.LastFrame:
      const lastFrame = frame as BowlingType.LastFrame // Should have better way
      return lastFrame.first + lastFrame.second + (lastFrame.third || 0)
    case FrameType.Score:
      return frame.first + frame.second
    case FrameType.Spare:
      return frame.first + frame.second + getNextRoll()
    case FrameType.Strike: {
      return frame.first + getNextRoll() + getNextNextRoll()
    }
  }
}
