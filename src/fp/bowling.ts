import * as BowlingType from './bowling.type'

enum FrameType {
  Strike,
  Spare,
  LastFrame,
  Score,
}

export function getScore(game: BowlingType.Game): number {
  return game.reduce((acc, currentFrame, i) => {
    return acc + getFrameScore(currentFrame, [game[i + 1], game[i + 2]])
  }, 0)
}

export function getFrameScore(
  frame: BowlingType.Frame,
  nextFrames: BowlingType.NextFrames
): number {
  const getFrameType = (frame: BowlingType.Frame): FrameType => {
    switch (true) {
      case frame.length === 3:
        return FrameType.LastFrame
      case frame[0] === 10:
        return FrameType.Strike
      case frame[0] + frame[1] === 10:
        return FrameType.Spare
      default:
        return FrameType.Score
    }
  }
  const nextRolls = getNextRolls(nextFrames)

  // Should be better with Pattern Matching
  // such as Elixir: def getScore(%{ first: 10, second: null }) do = Strike
  // such as Scala: We can declare case class for strike
  switch (getFrameType(frame)) {
    case FrameType.LastFrame:
      return frame[0] + frame[1] + (frame[2] || 0)
    case FrameType.Score:
      return frame[0] + frame[1]
    case FrameType.Spare:
      return frame[0] + frame[1] + nextRolls[0]
    case FrameType.Strike: {
      return frame[0] + nextRolls[0] + nextRolls[1]
    }
  }
}

function getNextRolls(nextFrames: BowlingType.NextFrames): number[] {
  const nextFirstFrame = nextFrames[0] || []
  const nextSecoundFrame = nextFrames[1] || []
  return [...nextFirstFrame, ...nextSecoundFrame].filter((c) => c !== null)
}
