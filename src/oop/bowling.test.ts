import * as Bowling from './bowling'

describe('ScoreFrame', () => {
  it('Should return score of frame', () => {
    const frame = new Bowling.ScoreFrame(5, 3)
    expect(frame.score()).toEqual(8)
  })
})

describe('SpareFrame', () => {
  it('Should return score of frame', () => {
    const frame = new Bowling.SpareFrame(5, 5, 5)
    expect(frame.score()).toEqual(15)
  })
})

describe('StrikeFrame', () => {
  it('Should return score of frame', () => {
    const frame = new Bowling.StrikeFrame(5, 5)
    expect(frame.score()).toEqual(20)
  })
})

describe('FrameScoreCalculatorFactory', () => {
  it('Should return StrikeFrame for strike', () => {
    const frame = Bowling.FrameFactory.getFrame([10, null], [null, null])
    expect(frame).toBeInstanceOf(Bowling.StrikeFrame)
  })

  it('Should return StrikeFrame with correct nextRolls for strike', () => {
    const frame = Bowling.FrameFactory.getFrame(
      [10, null],
      [
        [5, 5],
        [5, 5],
      ]
    )
    expect(frame.score()).toEqual(20)
  })

  it('Should return SpareFrame for a Spare', () => {
    const frame = Bowling.FrameFactory.getFrame([5, 5], [null, null])
    expect(frame).toBeInstanceOf(Bowling.SpareFrame)
  })

  it('Should return SpareFrame with correct calculation for a spare', () => {
    const frame = Bowling.FrameFactory.getFrame(
      [5, 5],
      [
        [5, 5],
        [5, 5],
      ]
    )
    expect(frame.score()).toEqual(15)
  })

  it('Should return ScoreFrame for a Score', () => {
    const frame = Bowling.FrameFactory.getFrame(
      [3, 5],
      [
        [3, 5],
        [3, 5],
      ]
    )
    expect(frame).toBeInstanceOf(Bowling.ScoreFrame)
    expect(frame.first).toEqual(3)
    expect(frame.second).toEqual(5)
    expect(frame.score()).toEqual(8)
  })

  it('Should return LastFrame for a last frame', () => {
    const frame = Bowling.FrameFactory.getFrame([3, 7, 10], [null, null])
    expect(frame).toBeInstanceOf(Bowling.LastFrame)
    expect(frame.first).toEqual(3)
    expect(frame.second).toEqual(7)
    expect(frame.score()).toEqual(20)
  })
})

describe('LastFrame', () => {
  it('Can calculate score for strike', () => {
    const frame = new Bowling.LastFrame(10, 8, 2)
    expect(frame.score()).toEqual(20)
  })

  it('Can calculate score for spare', () => {
    const frame = new Bowling.LastFrame(7, 3, 5)
    expect(frame.score()).toEqual(15)
  })

  it('Can calculate score for number', () => {
    const frame = new Bowling.LastFrame(3, 4, null)
    expect(frame.score()).toEqual(7)
  })
})

describe('BowlingGame', () => {
  it('Should be able to calculate score for all strike game', () => {
    const strike = () => [10, null]
    const first9Strikes = Array.from(new Array(9)).map(() => strike())
    const lastFrame = [10, 10, 10]
    const game = new Bowling.BowlingGame([...first9Strikes, lastFrame])

    expect(game.getScore()).toEqual(300)
  })

  it('Should be able to calculate score for all score game', () => {
    const simpleScore = () => [3, 6]
    const lastFrame = [3, 6, null]
    const first9Frames = Array.from(new Array(9)).map(() => simpleScore())
    const game = new Bowling.BowlingGame([...first9Frames, lastFrame])

    expect(game.getScore()).toEqual(90)
  })

  it('Can calculate all spare game score', () => {
    const simpleScore = () => [5, 5]
    const lastFrame = [5, 5, 5]
    const first9Frames = Array.from(new Array(9)).map(() => simpleScore())
    const game = new Bowling.BowlingGame([...first9Frames, lastFrame])

    expect(game.getScore()).toEqual(150)
  })
})
