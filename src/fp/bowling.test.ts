import * as BowlingType from './bowling.type'
import { getScore, getFrameScore } from './bowling'

describe('getScore', () => {
  it('Can calculate all simple score game', () => {
    const simpleScore: () => BowlingType.NormalFrame = () => ({
      first: 3,
      second: 6,
    })
    const lastFrame: BowlingType.LastFrame = Object.assign(simpleScore(), {
      third: null,
    })
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
    const strike: () => BowlingType.NormalFrame = () => ({
      first: 10,
      second: null,
    })
    const lastFrame: BowlingType.LastFrame = {
      first: 10,
      second: 10,
      third: 10,
    }
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
    const spare: () => BowlingType.NormalFrame = () => ({
      first: 5,
      second: 5,
    })
    const lastFrame: BowlingType.LastFrame = {
      first: 5,
      second: 5,
      third: 5,
    }
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
    const simpleScore: () => BowlingType.NormalFrame = () => ({
      first: 3,
      second: 6,
    })
    const thisFrame = simpleScore()
    const nextFrames: BowlingType.NextFrames = {
      firstFrame: simpleScore(),
      secondFrame: simpleScore(),
    }
    expect(getFrameScore(thisFrame, nextFrames)).toEqual(9)
  })

  it('get score of spare frame and then number frame', () => {
    const simpleScore: () => BowlingType.NormalFrame = () => ({
      first: 3,
      second: 7,
    })
    const thisFrame = simpleScore()
    const nextFrames: BowlingType.NextFrames = {
      firstFrame: simpleScore(),
      secondFrame: simpleScore(),
    }
    // 3 (first) + 7 + 3(next) = 13
    expect(getFrameScore(thisFrame, nextFrames)).toEqual(13)
  })

  it('get score of spare frame and then spare frame', () => {
    const simpleScore: () => BowlingType.NormalFrame = () => ({
      first: 5,
      second: 5,
    })
    const thisFrame = simpleScore()
    const nextFrames: BowlingType.NextFrames = {
      firstFrame: simpleScore(),
      secondFrame: simpleScore(),
    }
    // 5 + 5 + 5
    expect(getFrameScore(thisFrame, nextFrames)).toEqual(15)
  })

  it('get score of spare frame and then strike', () => {
    const simpleScore: () => BowlingType.NormalFrame = () => ({
      first: 3,
      second: 7,
    })
    const thisFrame = simpleScore()
    const nextFrames: BowlingType.NextFrames = {
      firstFrame: { first: 10, second: null },
      secondFrame: simpleScore(),
    }
    // 3 + 7 + 10 = 20
    expect(getFrameScore(thisFrame, nextFrames)).toEqual(20)
  })

  it('get score of strike frame and then two number', () => {
    const strikeScore: () => BowlingType.NormalFrame = () => ({
      first: 10,
      second: null,
    })
    const simpleScore: () => BowlingType.NormalFrame = () => ({
      first: 3,
      second: 6,
    })
    const thisFrame = strikeScore()
    const nextFrames: BowlingType.NextFrames = {
      firstFrame: simpleScore(),
      secondFrame: simpleScore(),
    }
    // 10 (first) + 3 + 6(next) = 16
    expect(getFrameScore(thisFrame, nextFrames)).toEqual(19)
  })

  it('get score of strike frame and then score and then spare', () => {
    const strikeScore: () => BowlingType.NormalFrame = () => ({
      first: 10,
      second: null,
    })
    const thisFrame = strikeScore()
    const nextFrames: BowlingType.NextFrames = {
      firstFrame: { first: 6, second: 4 },
      secondFrame: { first: 3, second: 3 },
    }
    // 10 (first) + 6 + 4(next) = 20
    expect(getFrameScore(thisFrame, nextFrames)).toEqual(20)
  })

  it('get score of strike frame and then strike and then strike', () => {
    const strikeScore: () => BowlingType.NormalFrame = () => ({
      first: 10,
      second: null,
    })
    const thisFrame = strikeScore()
    const nextFrames: BowlingType.NextFrames = {
      firstFrame: strikeScore(),
      secondFrame: strikeScore(),
    }
    expect(getFrameScore(thisFrame, nextFrames)).toEqual(30)
  })

  it('get score of strike frame and then strike and then score', () => {
    const strikeScore: () => BowlingType.NormalFrame = () => ({
      first: 10,
      second: null,
    })
    const thisFrame = strikeScore()
    const nextFrames: BowlingType.NextFrames = {
      firstFrame: strikeScore(),
      secondFrame: { first: 3, second: 7 },
    }
    expect(getFrameScore(thisFrame, nextFrames)).toEqual(23)
  })

  it('get score of strike frame in the second last frame', () => {
    const strikeScore: () => BowlingType.NormalFrame = () => ({
      first: 10,
      second: null,
    })
    const thisFrame = strikeScore()
    const nextFrames1: BowlingType.NextFrames = {
      firstFrame: { first: 3, second: 6, third: null },
      secondFrame: null,
    }
    expect(getFrameScore(thisFrame, nextFrames1)).toEqual(19)

    const nextFrames2: BowlingType.NextFrames = {
      firstFrame: { first: 3, second: 7, third: null },
      secondFrame: null,
    }
    expect(getFrameScore(thisFrame, nextFrames2)).toEqual(20)

    const nextFrames3: BowlingType.NextFrames = {
      firstFrame: { first: 10, second: 10, third: 2 },
      secondFrame: null,
    }
    expect(getFrameScore(thisFrame, nextFrames3)).toEqual(30)
  })

  it('get score of last frame in spare case', () => {
    const thisFrame: BowlingType.LastFrame = {
      first: 7,
      second: 3,
      third: 5,
    }
    // 7 + 10 + 5
    expect(
      getFrameScore(thisFrame, { firstFrame: null, secondFrame: null })
    ).toEqual(15)
  })

  it('get score of last frame in strike case', () => {
    const thisFrame: BowlingType.LastFrame = {
      first: 10,
      second: 5,
      third: 5,
    }

    expect(
      getFrameScore(thisFrame, { firstFrame: null, secondFrame: null })
    ).toEqual(20)

    const thisFrame2: BowlingType.LastFrame = {
      first: 10,
      second: 10,
      third: 5,
    }
    expect(
      getFrameScore(thisFrame2, { firstFrame: null, secondFrame: null })
    ).toEqual(25)
  })

  it('get score of last frame in scre case', () => {
    const thisFrame: BowlingType.LastFrame = {
      first: 10,
      second: 5,
      third: null,
    }

    expect(
      getFrameScore(thisFrame, { firstFrame: null, secondFrame: null })
    ).toEqual(15)
  })
})
