"use strict";

import { UserInterface } from "../userInterface.js";
import { ComputerPlayer, Player } from "./player.js";
import { Ship } from "./ship.js";
import { ships } from "../constants.js";

const PHASES = {
  IDLE: "idle",
  PLACEMENT: "placement",
  BATTLE: "battle",
  HANDOFF: "handoff",
  FINISHED: "finished",
};

const ACTIONS = {
  P2_PLACEMENT: "p2-placement",
  START_PVP: "start-pvp",
  NEXT_TURN: "next-turn"
};

export class GameController {
  constructor() {
    this.ui = new UserInterface();
    this.playerOne = new Player("Player One");
    this.playerTwo = null;

    this.gameMode = "ai";
    this.phase = PHASES.IDLE;
    this.currentOrientation = "horizontal";
    this.currentShipIndex = 0;
    this.isPlayerOneTurn = true;
    this.isGameOver = false;

    this.grids = { playerOne: null, playerTwo: null };
    this.placementPlayer = null;
    this.activePlacementGrid = null;
    this.pendingAction = null;
  }

  init() {
    this.ui.initializeHUD({
      onModeChange: (val) => { this.gameMode = val; },
      onStart: () => this.startRound(),
      onContinue: () => this.handleContinue(),
      onReset: () => location.reload()
    });
  }

  startRound() {
    this.ui.lockMenu();
    this.ui.createBoard();
    this.grids = this.ui.getGridElements();

    this.playerTwo = this.gameMode === "ai" ? new ComputerPlayer("Computer") : new Player("Player Two");

    this.currentOrientation = "horizontal";
    this.currentShipIndex = 0;
    this.isPlayerOneTurn = true;
    this.isGameOver = false;
    this.pendingAction = null;

    this.ui.updateHUDText({
      instructions: "Place your ships by clicking on the grid. Right-click to rotate.",
      turnText: ""
    });

    this.ui.bindGridEvents({
      onMouseOver: (e, grid) => this.handleHover(e, grid),
      onMouseOut: (e, grid) => this.ui.clearShipHover(e.currentTarget),
      onClick: (e, grid) => this.handleClick(e, grid),
      onRightClick: (e, grid) => this.handleRightClick(e, grid)
    });

    if (this.gameMode === "ai") {
      this.playerTwo.placeRandomFleet(ships.map((s) => new Ship(s.length)));
    }

    this.setPlacementTarget(this.playerOne, this.grids.playerOne);
  }

  handleHover(event, grid) {
    if (this.phase !== PHASES.PLACEMENT || grid !== this.activePlacementGrid) return;
    if (this.currentShipIndex >= ships.length) return;

    this.ui.drawShipHover(
      this.ui.getCellCoordinates(event),
      ships[this.currentShipIndex].length,
      this.currentOrientation,
      event.currentTarget
    );
  }

  handleRightClick(event, grid) {
    if (this.phase !== PHASES.PLACEMENT || grid !== this.activePlacementGrid) return;
    event.preventDefault();

    this.ui.clearShipHover(event.currentTarget);
    this.currentOrientation = this.currentOrientation === "horizontal" ? "vertical" : "horizontal";

    if (this.currentShipIndex < ships.length) {
      this.ui.drawShipHover(
        this.ui.getCellCoordinates(event),
        ships[this.currentShipIndex].length,
        this.currentOrientation,
        event.currentTarget
      );
    }
  }

  handleClick(event, grid) {
    if (this.isGameOver) return;

    if (this.phase === PHASES.PLACEMENT) {
      this.processPlacementRound(event, grid);
    } else if (this.phase === PHASES.BATTLE) {
      this.processBattleRound(event, grid);
    }
  }

  processPlacementRound(event, grid) {
    if (grid !== this.activePlacementGrid || this.currentShipIndex >= ships.length) return;

    const coords = this.ui.getCellCoordinates(event);
    if (!coords) return;

    const ship = new Ship(ships[this.currentShipIndex].length);
    const placed = this.ui.placeShipOnGrid(
      this.placementPlayer, coords, ship, this.currentOrientation, event.currentTarget
    );

    if (!placed) return;

    this.currentShipIndex++;
    this.updateCurrentShipText();

    if (this.currentShipIndex >= ships.length) {
      this.finishPlacement();
    }
  }

  finishPlacement() {
    if (this.gameMode === "ai") {
      this.phase = PHASES.BATTLE;
      this.ui.updateHUDText({ shipText: "All ships placed!", turnText: "Your turn. Attack the enemy board." });
      this.ui.showBothGrids();
      this.ui.setGridPointers("none", "auto");
      this.updateViewVisibility();
      return;
    }

    if (this.placementPlayer === this.playerOne) {
      this.triggerHandoff(
        ACTIONS.P2_PLACEMENT,
        "Player One ships locked in.",
        "Next: Player Two ship placement. Pass the device and press Continue."
      );
    } else {
      this.triggerHandoff(
        ACTIONS.START_PVP,
        "All ships placed!",
        "Next turn: Player One. Pass the device and press Continue."
      );
    }
  }

  triggerHandoff(action, shipText, turnText) {
    this.phase = PHASES.HANDOFF;
    this.pendingAction = action;
    this.ui.updateHUDText({ shipText, turnText });
    this.ui.hideBothGrids();
    this.ui.toggleContinueButton(true);
  }

  processBattleRound(event, grid) {
    const coords = this.ui.getCellCoordinates(event);
    if (!coords) return;

    if (this.gameMode === "ai") {
      this.playAiTurn(coords, grid);
    } else {
      this.playPvPTurn(coords, grid);
    }
  }

  playAiTurn(coords, grid) {
    if (grid !== this.grids.playerTwo || !this.isPlayerOneTurn) return;

    const result = this.playerTwo.gameboard.receiveAttack(coords[0], coords[1]);
    if (result === undefined) return;

    this.ui.drawAttackResult(coords, result, this.grids.playerTwo);
    this.playerTwo.gameboard.ships.forEach(ship => {
        if (ship.isSunk()) this.ui.drawSunkShip(ship, this.grids.playerTwo);
    });

    if (this.playerTwo.gameboard.allShipsSunk()) {
      return this.endGame("You Won!");
    }

    if (result === "miss") {
      this.isPlayerOneTurn = false;
      this.ui.updateHUDText({ turnText: "Computer turn..." });

      let computerResult;
      do {
        const attackData = this.playerTwo.takeTurn(this.playerOne);
        this.ui.drawAttackResult(attackData.coordinates, attackData.result, this.grids.playerOne);
        computerResult = attackData.result;
        this.playerOne.gameboard.ships.forEach(ship => {
        if (ship.isSunk()) this.ui.drawSunkShip(ship, this.grids.playerOne);
    });

        if (this.playerOne.gameboard.allShipsSunk()) {
          return this.endGame("You Lost!");
        }
      } while (computerResult === "hit");

      this.isPlayerOneTurn = true;
      this.ui.updateHUDText({ turnText: "Your turn. Attack the enemy board." });
      this.updateViewVisibility();
    }
  }

  playPvPTurn(coords, grid) {
    const attacker = this.isPlayerOneTurn ? this.playerOne : this.playerTwo;
    const defender = this.isPlayerOneTurn ? this.playerTwo : this.playerOne;
    const targetGrid = this.isPlayerOneTurn ? this.grids.playerTwo : this.grids.playerOne;

    if (grid !== targetGrid) return;

    const result = defender.gameboard.receiveAttack(coords[0], coords[1]);
    if (result === undefined) return;

    this.ui.drawAttackResult(coords, result, targetGrid);
    defender.gameboard.ships.forEach(ship => {
        if (ship.isSunk()) this.ui.drawSunkShip(ship, targetGrid);
    });

    if (defender.gameboard.allShipsSunk()) {
      return this.endGame(`${attacker.name} won!`);
    }

    this.isPlayerOneTurn = !this.isPlayerOneTurn;
    const nextPlayer = this.isPlayerOneTurn ? "Player One" : "Player Two";
    
    this.triggerHandoff(
      ACTIONS.NEXT_TURN,
      undefined,
      `Next turn: ${nextPlayer}. Pass the device and press Continue.`
    );
  }

  handleContinue() {
    const action = this.pendingAction;
    this.pendingAction = null;
    this.ui.toggleContinueButton(false);

    if (action === ACTIONS.P2_PLACEMENT) {
      return this.setPlacementTarget(this.playerTwo, this.grids.playerTwo);
    }

    if (action === ACTIONS.START_PVP || action === ACTIONS.NEXT_TURN) {
      this.phase = PHASES.BATTLE;
      this.ui.showBothGrids();
      
      const activePlayer = this.isPlayerOneTurn ? "Player One" : "Player Two";
      this.ui.updateHUDText({ turnText: `${activePlayer} turn. Attack the enemy board.` });
      
      this.ui.setGridPointers(
        this.isPlayerOneTurn ? "none" : "auto",
        this.isPlayerOneTurn ? "auto" : "none"
      );
      
      this.updateViewVisibility();
    }
  }

  setPlacementTarget(player, grid) {
    this.placementPlayer = player;
    this.activePlacementGrid = grid;
    this.currentShipIndex = 0;
    this.currentOrientation = "horizontal";
    this.phase = PHASES.PLACEMENT;

    this.ui.showBothGrids();
    this.ui.setGridPointers(
      grid === this.grids.playerOne ? "auto" : "none",
      grid === this.grids.playerTwo ? "auto" : "none"
    );

    this.updateViewVisibility();
    this.updateCurrentShipText();
    this.ui.updateHUDText({ turnText: `${player.name} is placing ships.` });
  }

  updateCurrentShipText() {
    const text = this.currentShipIndex < ships.length
      ? `Placing: ${ships[this.currentShipIndex].name} (length: ${ships[this.currentShipIndex].length})`
      : "All ships placed!";
    this.ui.updateHUDText({ shipText: text });
  }

  updateViewVisibility() {
    if (!this.playerTwo) return;

    const showP1 = this.phase === PHASES.PLACEMENT
      ? this.placementPlayer === this.playerOne
      : this.gameMode === "ai" || this.isPlayerOneTurn;

    const showP2 = this.phase === PHASES.PLACEMENT
      ? this.placementPlayer === this.playerTwo
      : this.gameMode !== "ai" && !this.isPlayerOneTurn;

    this.ui.syncPlacedShipClasses(this.playerOne.gameboard, this.grids.playerOne, showP1);
    this.ui.syncPlacedShipClasses(this.playerTwo.gameboard, this.grids.playerTwo, showP2);
  }

  endGame(message) {
    this.isGameOver = true;
    this.phase = PHASES.FINISHED;
    this.pendingAction = null;
    this.ui.toggleContinueButton(false);
    this.ui.showBothGrids();
    this.ui.syncPlacedShipClasses(this.playerOne.gameboard, this.grids.playerOne, true);
    this.ui.syncPlacedShipClasses(this.playerTwo.gameboard, this.grids.playerTwo, true);
    this.ui.updateHUDText({ turnText: message });
    this.ui.appendGameOverText();
  }
}
