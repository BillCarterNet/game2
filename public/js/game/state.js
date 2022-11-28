let GameState = {

    gameTime: 0,
    gameTimeDelta: 0,
    frame: 0,

    debug: false,

    state: {

        initialising: false,
        titleScreen: false,
        gameOver: false,
        gameplay: false,
        tutorial: false,

    },

    playerSelected: true,
    enemySelected: false,
    currentPlayer: 'Mage',
    currentEnemy: '',
    currentPickedGridId: '',
    currentTarget: '',
    currentTargetGridId: 'hexagon_r8_h8',

    turn: 1,

    enemies: {},

    players: {

        'Archer': {

            Name: 'Gargano',
            Class: 'Archer',

            Row: 4,
            Hex: 6,

            TurnPending: true,

        },

        'Warrior': {

            Name: 'Krogar',
            Class: 'Warrior',

            Row: 5,
            Hex: 7,

            TurnPending: true,

        },

        'Cleric': {

            Name: 'Paladina',
            Class: 'Cleric',

            Row: 6,
            Hex: 8,

            TurnPending: true,

        },

        'Mage': {

            Name: 'Gothmog',
            Class: 'Mage',

            Row: 7,
            Hex: 9,

            TurnPending: true,

        }

    },

}

export default GameState;