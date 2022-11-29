const gameConfig = {

    window: {

        height: 720,
        width: 1280,

    },

    camera: {

        fov: 90,
        nearClip: 0.1,
        farClip: 10001,
        lookForward: 10,
        height: 10,
        xStart: 0,
        zStart: 20

    },

    colours: {

        player: '#009900', // Green
        enemy: '#990000', // Red
        active: '#EEEE00', // Yellow
        target: '#000099', // Blue

    },

    opacity: 0.33, // Hook up later in HTML and Grid

    players: {

        'Archer': {

            scale: {

                x: 0.02,
                y: 0.02,
                z: 0.02,

            },

            BaseStats: {

                Initiative: 30,
                ActionPoints: 5,
                Health: 500,
                Mana: 0,
                WeaponSkill: 60,
                BallisticSkill: 80,
                MagicSkill: 0,
                CriticalChance: 10,
                CriticalSize: 50,
                PhysicalOffense: 80,
                PhysicalDefense: 80,
                MagicalOffense: 0,
                MagicalDefense: 0,

            },

            startingGrid: {

                Row: 4,
                Hex: 6,

            },

        },

        'Warrior': {

            scale: {

                x: 0.025,
                y: 0.027,
                z: 0.025,

            },

            BaseStats: {

                Initiative: 25,
                ActionPoints: 4,
                Health: 500,
                Mana: 0,
                WeaponSkill: 60,
                BallisticSkill: 80,
                MagicSkill: 0,
                CriticalChance: 10,
                CriticalSize: 50,
                PhysicalOffense: 80,
                PhysicalDefense: 80,
                MagicalOffense: 0,
                MagicalDefense: 0,

            },

            startingGrid: {

                Row: 5,
                Hex: 7,

            },

        },

        'Cleric': {

            scale: {

                x: 0.022,
                y: 0.022,
                z: 0.022,

            },

            BaseStats: {

                Initiative: 35,
                ActionPoints: 3,
                Health: 500,
                Mana: 0,
                WeaponSkill: 60,
                BallisticSkill: 80,
                MagicSkill: 0,
                CriticalChance: 10,
                CriticalSize: 50,
                PhysicalOffense: 80,
                PhysicalDefense: 80,
                MagicalOffense: 0,
                MagicalDefense: 0,

            },

            startingGrid: {

                Row: 6,
                Hex: 8,

            },

        },

        'Mage': {

            scale: {

                x: 3.5,
                y: 3.5,
                z: 3.5,

            },

            BaseStats: {

                Initiative: 40,
                ActionPoints: 5,
                Health: 500,
                Mana: 0,
                WeaponSkill: 60,
                BallisticSkill: 80,
                MagicSkill: 0,
                CriticalChance: 10,
                CriticalSize: 50,
                PhysicalOffense: 80,
                PhysicalDefense: 80,
                MagicalOffense: 0,
                MagicalDefense: 0,

            },

            startingGrid: {

                Row: 7,
                Hex: 9,

            },

        },

    },

    enemies: {

        'Skeleton': {

            BaseStats: {

                Initiative: 40,
                ActionPoints: 5,
                Health: 1500,
                Mana: 0,
                WeaponSkill: 60,
                BallisticSkill: 0,
                MagicSkill: 0,
                CriticalChance: 10,
                CriticalSize: 50,
                PhysicalOffense: 80,
                PhysicalDefense: 80,
                MagicalOffense: 80,
                MagicalDefense: 80,

            },

        }

    },

    stats: {

        'Initiative': {

            displayName: 'Init',
            tooltip: 'Determines turn order',

        },
        'ActionPoints': {

            displayName: 'AP',
            tooltip: 'Determines actions that can be performed',

        },
        'Health': {

            displayName: 'Health',
            tooltip: 'Reach zero and die',

        },
        'Mana': {

            displayName: 'Mana',
            tooltip: 'Reach zero and lose ability to cast',

        },
        'WeaponSkill': {

            displayName: 'WS',
            tooltip: 'Determines impact and success of melee weapon attack',

        },
        'BallisticSkill': {

            displayName: 'BS',
            tooltip: 'Determines impact and success of ranged weapon attack',

        },
        'MagicSkill': {

            displayName: 'MS',
            tooltip: 'Determines impact and success of spell casting',

        },
        'CriticalChance': {

            displayName: 'Crit %',
            tooltip: 'Percentage change of criticality',

        },
        'CriticalSize': {

            displayName: 'Crit Size',
            tooltip: 'Determines the effect of criticality',

        },
        'PhysicalOffense': {

            displayName: 'Phy Off',
            tooltip: 'Determines physical damage applied in physical attack',

        },
        'PhysicalDefense': {

            displayName: 'Phy Def',
            tooltip: 'Determines physical damage mitigated in physical attack',

        },
        'MagicalOffense': {

            displayName: 'Mag Off',
            tooltip: 'Determines magical damage applied in magical attack',

        },
        'MagicalDefense': {

            displayName: 'Mag Def',
            tooltip: 'Determines magical damage mitigated in magical attack',

        },

    }

};

export default gameConfig;
