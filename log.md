Restarting after git error

# Good reference
Getting node running three
https://www.youtube.com/watch?v=J1TH9iCrVKk

# Initial aims
- get three.js installed via npm (/)
- get basic 3d scene running on page (/)
- Make sure its responsive (/)
- Upload to git

# Progress
- Sort out walls (via buffer geometry) (/)
- Implement picking a hexagon (/)
    - Implement target window (in progress)
    - Implement charcter window (in progress)
- Sort out torches for lighting
- Move model loading to module (/)
    - Load 2+ models (/)
    - Load 4 chars (mixamo) (/)
        - Archer (model needs fixing)
        - Paladin (/)
        - Cleric (/)
        - Mage (model needs fixing)
        - Skeleton (model needs fixing)
- Implement animation manager
    - Implement idle animation (/)
    - Implement walking/turning animation
    - Implement melee/casting attack
- Implement title screen / main menu screen
- Properly tie in loading screen to model/texture load progress
- Implement an in game console /log (useful for debug too)
- Fine tune text system 
    - Char names
        - Plus health bar
        - AP count / order indicator
    - Damage
    - Debug?
- Skybox
- More level components
    - Pit
    - Gate / Door / Stairs Up and Down
    - Torch
    - Font
    - Grate
    - Blocking boulders/rubble
    - Statue
    - Fire
    - Alter
    - Flags / Drapes / Banners
    - Bones
    - Treasure Chests
- Level editor
- Splash screen logo more like original (fix C's)
- Sort out shadows for point light
    - https://r105.threejsfundamentals.org/threejs/lessons/threejs-shadows.html
- Update picker so it disappears when on hex is covered (/)
- Make camera buttons so they can be clicked and held like keyboard
- Make camera movement tie into frame rate

# Next
- Enemy models
    - Skeleton (in progress)
- Player and enemy stats
    - Sort out class considerations
    - Tidy state vs config entries
    - Sort out flat stat and % alterations
- Turn order display
- Basic Action 
    - End Turn (to test game logic of character order), currently debug on 'G'
    - Update of active player display
- Target selection (/)
- Next Basic Actions
    - Walk
    - Attack

# Bugs
- Clicking camera cursor selects hex, maybe
    - Maybe get html windows and not do picking if mouse if over them
    - E.g. box containing camera cursor controls
- Camera needs to use clock.delta
- Are walls wrong way round?
    - Can maybe revert to single sided now player is surrounded by hex columns

# Resouces - Models
- https://sketchfab.com/
- https://www.turbosquid.com/
- gamedev reddit
- mixamo
- poly.google.com
- https://opengameart.org/
- turbosquid
- free3d

- Erika Aarcher
- Maria W
- Paladin Nostrom
- Caslte Guard
- Maynard

# Resources - Code

https://levelup.gitconnected.com/javascript-best-practices-classes-and-modules-9c11c8c84ae0 static vs this

https://github.com/simondevyoutube/ThreeJS_Tutorial_BasicWorld/blob/main/main.js - basic world
https://github.com/simondevyoutube/ThreeJS_Tutorial_LoadingModels/blob/master/main.js - Loading models

https://github.com/tamani-coding/threejs-character-controls-example/blob/main/src/index.ts - Animation (glb)

https://github.com/EnayetHossain/load-3d-model/blob/master/public/client.js - Load models (node)

https://threejs.org/manual/#en/custom-buffergeometry


