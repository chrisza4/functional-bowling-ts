export type NumberScore = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type NoStrikeScope = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type StrikeFrame = [10, null]
export type ScoreFrame = [number, number]
export type NormalFrame = StrikeFrame | ScoreFrame
export type LastFrame = [NumberScore, NumberScore, NumberScore | null]
export type NextFrames = Frame[]
export type Frame = NormalFrame | LastFrame
export type Game = [
  NormalFrame,
  NormalFrame,
  NormalFrame,
  NormalFrame,
  NormalFrame,
  NormalFrame,
  NormalFrame,
  NormalFrame,
  NormalFrame,
  LastFrame
]
