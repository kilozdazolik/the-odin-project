import { describe, expect, test } from "vitest"
import { Gameboard } from "../game/gameboard"
import {Ship} from "../game/ship"

test("Gameboard is created", () => {
  const gameboard = new Gameboard()

  expect(gameboard).toBeInstanceOf(Gameboard)
})

describe("placeShip tests", () => {
test("Ship can be placed on gameboard", () => {
  const gameboard = new Gameboard()
  const ship = new Ship(5);
  gameboard.placeShip(0, 0, ship, "horizontal");

  expect(gameboard.matrix[0][0]).toBe(ship)
  expect(gameboard.matrix[0][1]).toBe(ship)
  expect(gameboard.matrix[0][2]).toBe(ship)
  expect(gameboard.matrix[0][3]).toBe(ship)
  expect(gameboard.matrix[0][4]).toBe(ship)
})


test("placeShip returns false if ship is out of bounds", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5);
  
  const result = gameboard.placeShip(7, 0, ship, "horizontal");
  
  expect(result).toBe(false);
});

test("placeShip returns true if ship is within bounds", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5);
  const result = gameboard.placeShip(5, 0, ship, "horizontal");
  expect(result).toBe(true);
});

test("placeShip returns false if ship is out of bounds vertically", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5);
  const result = gameboard.placeShip(0, 7, ship, "vertical");
  expect(result).toBe(false);
});

test("placeShip returns true if ship is within bounds vertically", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5);
  const result = gameboard.placeShip(0, 5, ship, "vertical");
  expect(result).toBe(true);
}); 

test("placeShip returns false if there is a ship on the coordinates", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5);
  const secondShip = new Ship(3);

  gameboard.placeShip(0,0, ship, "horizontal")

  const result = gameboard.placeShip(1, 0, secondShip, "vertical");
    expect(result).toBe(false);
})

test("placeShip returns true if there is no ship on the coordinates", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5);
  const secondShip = new Ship(3);

  gameboard.placeShip(0,0, ship, "horizontal")

  const result = gameboard.placeShip(1, 1, secondShip, "vertical");
    expect(result).toBe(true);
})
})

describe("receiveAttack tests", () => {
test("receiveAttack registers a hit", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5);
  gameboard.placeShip(0,0, ship, "horizontal")
  const result = gameboard.receiveAttack(0, 0);
  expect(result).toBe("hit");
  expect(gameboard.matrix[0][0]).toBe("hit");
})

test("receiveAttack registers a miss", () => {
  const gameboard = new Gameboard();
  const result = gameboard.receiveAttack(0, 0);
  expect(result).toBe("miss");
  expect(gameboard.missedShots).toContainEqual([0, 0]);
})
})

describe("All ships sunk tests", () => {
test("allShipsSunk returns true if all ships are sunk", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  gameboard.placeShip(0,0, ship, "horizontal")
  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(1, 0);
  expect(gameboard.allShipsSunk()).toBe(true);
})

test("allShipsSunk returns false if not all ships are sunk", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  gameboard.placeShip(0,0, ship, "horizontal")
  gameboard.receiveAttack(0, 0);
  expect(gameboard.allShipsSunk()).toBe(false);
})
})
