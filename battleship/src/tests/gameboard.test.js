import { expect, test } from "vitest"
import { Gameboard } from "../game/gameboard"

test("Gameboard is created", () => {
  const gameboard = new Gameboard()

  expect(gameboard).toBeInstanceOf(Gameboard)
})