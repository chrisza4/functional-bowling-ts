export type NumberScore = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type NoStrikeScope = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type StrikeFrame = { first: 10; second: null }
export type ScoreFrame = { first: NoStrikeScope; second: NumberScore }
export type NormalFrame = StrikeFrame | ScoreFrame
export type LastFrame = {
  first: NumberScore
  second: NumberScore
  third: NumberScore | null
}
export type NextFrames = {
  firstFrame?: Frame | null
  secondFrame?: Frame | null
}
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
