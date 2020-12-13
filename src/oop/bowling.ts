type FrameData = number[]

export class BowlingGame {
  constructor(private game: FrameData[]) {}
  getScore(): number {
    let totalScore = 0
    for (const index in this.game) {
      const indexInt = parseInt(index)
      const thisFrame = this.game[index]
      const nextFrame = this.game[indexInt + 1]
      const nextNextFrame = this.game[indexInt + 2]
      totalScore += FrameFactory.getFrame(thisFrame, [
        nextFrame,
        nextNextFrame,
      ]).score()
    }
    return totalScore
  }
}

interface IFrame {
  score(): number
  first: number
  second: number | null
}

export class FrameFactory {
  static getFrame(
    frame: FrameData,
    nextTwoFrames: [FrameData | null, FrameData | null]
  ): IFrame {
    const firstNextFrame = nextTwoFrames[0] || [null, null]
    const secondNextFrame = nextTwoFrames[1] || [null, null]
    const nextRolls = [
      firstNextFrame[0],
      firstNextFrame[1],
      secondNextFrame[0],
      secondNextFrame[1],
    ].filter((p) => p !== null)
    if (frame.length === 3) {
      return new LastFrame(frame[0], frame[1], frame[2])
    }
    if (frame[0] === 10 && !frame[1]) {
      return new StrikeFrame(nextRolls[0], nextRolls[1])
    }
    if (frame[0] + frame[1] === 10) {
      return new SpareFrame(frame[0], frame[1], nextRolls[0])
    }
    return new ScoreFrame(frame[0], frame[1])
  }
}

export class StrikeFrame implements IFrame {
  constructor(private nextRoll: number, private nextNextRoll: number) {}
  score(): number {
    return this.first + this.nextRoll + this.nextNextRoll
  }
  get second(): number | null {
    return null
  }
  get first(): number | null {
    return 10
  }
}

export class SpareFrame implements IFrame {
  constructor(
    public first: number,
    public second: number,
    private nextRoll: number
  ) {}
  score(): number {
    return this.first + this.second + this.nextRoll
  }
}

export class ScoreFrame implements IFrame {
  constructor(public first: number, public second: number) {}
  score(): number {
    return this.first + this.second
  }
}

export class LastFrame implements IFrame {
  constructor(
    public first: number,
    public second: number,
    private third?: number
  ) {}

  score(): number {
    return this.first + this.second + this.third
  }
}
