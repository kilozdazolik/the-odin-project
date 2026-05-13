import { describe, expect, test, vi } from "vitest"
import { ComputerPlayer, Player } from "../game/player"
import { Gameboard } from "../game/gameboard"

test("Player is created", () => {
    const player = new Player("Test Player")
    expect(player).toBeInstanceOf(Player)
    expect(player.name).toBe("Test Player")
    expect(player.gameboard).toBeInstanceOf(Gameboard)
})

test("computer shot is between 0 and 9", () => {
    const computer = new ComputerPlayer("Computer")
    const coordinates = computer.getRandomCoordinates()
    expect(coordinates[0]).toBeGreaterThanOrEqual(0)
    expect(coordinates[0]).toBeLessThanOrEqual(9)
    expect(coordinates[1]).toBeGreaterThanOrEqual(0)
    expect(coordinates[1]).toBeLessThanOrEqual(9)
})

test("computer turn skips already attacked cells", () => {
    const computer = new ComputerPlayer("Computer")
    const opponent = new Player("Opponent")

    opponent.gameboard.matrix[0][0] = "hit"

    const coordinateSpy = vi.spyOn(computer, "getRandomCoordinates")
        .mockReturnValueOnce([0, 0])
        .mockReturnValueOnce([2, 3])
    const attackSpy = vi.spyOn(opponent.gameboard, "receiveAttack").mockReturnValue("miss")

    const result = computer.takeTurn(opponent)

    expect(coordinateSpy).toHaveBeenCalledTimes(2)
    expect(attackSpy).toHaveBeenCalledWith(2, 3)
    expect(result).toBe({coordinates: [2, 3], result: "miss"})
})
