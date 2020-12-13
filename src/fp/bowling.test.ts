import * as BowlingType from './bowling.type'
import { getScore, getFrameScore } from './bowling'

describe('getScore', () => {
  it('Can calculate all simple score game', () => {
    const simpleScore: () => BowlingType.NormalFrame = () => [3, 6]
    const lastFrame: BowlingType.LastFrame = [3, 6, 0]
    const game: BowlingType.Game = [
      simpleScore(),
      simpleScore(),
      simpleScore(),
      simpleScore(),
      simpleScore(),
      simpleScore(),
      simpleScore(),
      simpleScore(),
      simpleScore(),
      lastFrame,
    ]

    expect(getScore(game)).toEqual(90)
  })

  it('Can calculate perfect game score', () => {
    const strike: () => BowlingType.NormalFrame = () => [10, null]
    const lastFrame: BowlingType.LastFrame = [10, 10, 10]
    const game: BowlingType.Game = [
      strike(),
      strike(),
      strike(),
      strike(),
      strike(),
      strike(),
      strike(),
      strike(),
      strike(),
      lastFrame,
    ]

    expect(getScore(game)).toEqual(300)
  })

  it('Can calculate spare game score', () => {
    const spare: () => BowlingType.NormalFrame = () => [5, 5]
    const lastFrame: BowlingType.LastFrame = [5, 5, 5]
    const game: BowlingType.Game = [
      spare(),
      spare(),
      spare(),
      spare(),
      spare(),
      spare(),
      spare(),
      spare(),
      spare(),
      lastFrame,
    ]

    expect(getScore(game)).toEqual(150)
  })
})

describe('getFrameScore', () => {
  it('get score of normal frame', () => {
    const simpleScore: () => BowlingType.NormalFrame = () => [3, 6]
    const thisFrame = simpleScore()
    const nextFrames: BowlingType.NextFrames = [simpleScore(), simpleScore()]
    expect(getFrameScore(thisFrame, nextFrames)).toEqual(9)
  })

  it('get score of spare frame and then number frame', () => {
    const simpleScore: () => BowlingType.NormalFrame = () => [3, 7]
    const thisFrame = simpleScore()
    const nextFrames: BowlingType.NextFrames = [simpleScore(), simpleScore()]
    // 3 (first) + 7 + 3(next) = 13
    expect(getFrameScore(thisFrame, nextFrames)).toEqual(13)
  })

  it('get score of spare frame and then spare frame', () => {
    const simpleScore: () => BowlingType.NormalFrame = () => [5, 5]
    const thisFrame = simpleScore()
    const nextFrames: BowlingType.NextFrames = [simpleScore(), simpleScore()]
    // 5 + 5 + 5
    expect(getFrameScore(thisFrame, nextFrames)).toEqual(15)
  })

  it('get score of spare frame and then strike', () => {
    const simpleScore: () => BowlingType.NormalFrame = () => [3, 7]

    const thisFrame = simpleScore()
    const nextFrames: BowlingType.NextFrames = [[10, null], simpleScore()]
    // 3 + 7 + 10 = 20
    expect(getFrameScore(thisFrame, nextFrames)).toEqual(20)
  })

  it('get score of strike frame and then two number', () => {
    const strikeScore: () => BowlingType.NormalFrame = () => [10, null]
    const simpleScore: () => BowlingType.NormalFrame = () => [3, 6]
    const thisFrame = strikeScore()
    const nextFrames: BowlingType.NextFrames = [simpleScore(), simpleScore()]
    // 10 (first) + 3 + 6(next) = 16
    expect(getFrameScore(thisFrame, nextFrames)).toEqual(19)
  })

  it('get score of strike frame and then score and then spare', () => {
    const strikeScore: () => BowlingType.NormalFrame = () => [10, null]
    const thisFrame = strikeScore()
    const nextFrames: BowlingType.NextFrames = [
      [6, 4],
      [10, null],
    ]
    // 10 (first) + 6 + 4(next) = 20
    expect(getFrameScore(thisFrame, nextFrames)).toEqual(20)
  })

  it('get score of strike frame and then strike and then strike', () => {
    const strikeScore: () => BowlingType.NormalFrame = () => [10, null]
    const thisFrame = strikeScore()
    const nextFrames: BowlingType.NextFrames = [strikeScore(), strikeScore()]
    expect(getFrameScore(thisFrame, nextFrames)).toEqual(30)
  })

  it('get score of strike frame and then strike and then score', () => {
    const strikeScore: () => BowlingType.NormalFrame = () => [10, null]
    const thisFrame = strikeScore()
    const nextFrames: BowlingType.NextFrames = [
      [10, null],
      [3, 7],
    ]
    expect(getFrameScore(thisFrame, nextFrames)).toEqual(23)
  })

  it('get score of strike frame in the second last frame', () => {
    const strikeScore: () => BowlingType.NormalFrame = () => [10, null]
    const thisFrame = strikeScore()
    const nextFrames1: BowlingType.NextFrames = [[3, 6, null], null]
    expect(getFrameScore(thisFrame, nextFrames1)).toEqual(19)

    const nextFrames2: BowlingType.NextFrames = [[3, 7, null], null]
    expect(getFrameScore(thisFrame, nextFrames2)).toEqual(20)

    const nextFrames3: BowlingType.NextFrames = [[10, 10, 2], null]
    expect(getFrameScore(thisFrame, nextFrames3)).toEqual(30)
  })

  it('get score of last frame in spare case', () => {
    const thisFrame: BowlingType.LastFrame = [7, 3, 5]
    // 7 + 10 + 5
    expect(getFrameScore(thisFrame, [null, null])).toEqual(15)
  })

  it('get score of last frame in strike case', () => {
    const thisFrame: BowlingType.LastFrame = [10, 5, 5]

    expect(getFrameScore(thisFrame, [null, null])).toEqual(20)

    const thisFrame2: BowlingType.LastFrame = [10, 10, 5]
    expect(getFrameScore(thisFrame2, [null, null])).toEqual(25)
  })

  it('get score of last frame in scre case', () => {
    const thisFrame: BowlingType.LastFrame = [10, 5, null]
    expect(getFrameScore(thisFrame, [null, null])).toEqual(15)
  })
})
