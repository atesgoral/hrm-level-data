# hrm-level-data

Human Resource Machine level data

## Usage

Install with: `npm install hrm-level-data`

Then:

```js
var levels = require("hrm-level-data");
```

`levels` will be an array of level objects.

An excerpt:

```js
[{
    number: 1,
    name: "Mail Room",
    floor: {},
    instructions: "Drag commands into this area to build a program.\n\nYour program should tell your worker to grab each thing from the INBOX, and drop it into the OUTBOX.",
    commands: [ "INBOX", "OUTBOX" ],
    expect: [{
        inbox: [ 1, 9, 4 ],
        outbox: [ 1, 9, 4 ]
    }],
    challenge: {
        size: 6,
        speed: 6
    }
}, {
    ...
}, {
    number: 20,
    name: "Multiplication Workshop",
    instructions: "For each two things in the INBOX, multiply them, and OUTBOX the result. Don't worry about negative numbers for now.\n\nYou got... LABELS! They can help you remember the purpose of each tile on the floor. Just tap any tile on the floor to edit.",
    commands: [ "INBOX", "OUTBOX", "COPYFROM", "COPYTO", "ADD", "SUB", "BUMPUP", "BUMPDN", "JUMP", "JUMPZ", "JUMPN" ],
    comments: true,
    labels: true,
    floor: {
        columns: 5,
        rows: 2,
        tiles: { "9": 0 }
    },
    expect: [{
        inbox: [ 9, 4, 1, 7, 7, 0, 0, 8, 4, 2 ],
        outbox: [ 36, 7, 0, 0, 8 ]
    }],
    challenge: {
        size: 15,
        speed: 109
    }
}, {
    ...
}, {
    number: 34,
    name: "Vowel Incinerator",
    instructions: "Send everything from the INBOX to the OUTBOX, except the vowels.",
    commands: [ "INBOX", "OUTBOX", "COPYFROM", "COPYTO", "ADD", "SUB", "BUMPUP", "BUMPDN", "JUMP", "JUMPZ", "JUMPN" ],
    dereferencing: true,
    comments: true,
    labels: true,
    floor: {
        columns: 5,
        rows: 2,
        tiles: [ "A", "E", "I", "O", "U", 0 ]
    },
    expect: [{
        inbox: [ "C", "O", "D", "E", "U", "P", "L", "A", "K", "E" ],
        outbox: [ "C", "D", "P", "L", "K" ]
    }],
    challenge: {
        size: 13,
        speed: 323
    }
}, {
    ...
}]
```

## Data Schema

The data is in the form of an array of level objects. Each level object has the following properties:

### number

_Number_. The level number, as it appears in the game. Note that the level numbers are not sequential because there are cutscenes that take up level numbers. The first level is 1. The first cutscene, Coffee Time, takes up level 5, and so on.

### name

_String_. The level name.

### instructions

_String_. The instructions for the level.

### commands

_Array_. The allowed commands for the program. Valid commands are `"INBOX"`, `"OUTBOX"`, `"COPYFROM"`, `"COPYTO"`, `"ADD"`, `"SUB"`, `"BUMPUP"`, `"BUMPDN"`, `"JUMP"`, `"JUMPZ"` and `"JUMPN"`.

### dereferencing

_Boolean_. _Optional_. `true` if the `[]` operator can be used in the commands `"COPYFROM"`, `"COPYTO"`, `"ADD"`, `"SUB"`, `"BUMPUP"` and `"BUMPDN"`. i.e. if floor tile values can be used to refer to indices for other floor tiles.

### comments

_Boolean_. _Optional_. `true` if comments are allowed to be used in the program.

### labels

_Boolean_. _Optional_. `true` if adding labels to floor tiles are allowed in the level.

### floor

_Object_. _Optional_. The floor setup. Not defined if the level doesn't make use of the floor. Has the following properties:

#### columns

_Number_. The number of columns of the floor grid.

#### rows

_Number_. The number of rows of the floor grid.

#### tiles

_Object_/_Array_. _Optional_. The initial floor contents. Tile values can either be numbers (e.g. 5), strings for letters (e.g. "E") or null. Numbers are never represented as strings (e.g. "3" won't appear).

For sparse setups, this can be an object with keys as floor tile indices:

```js
tiles: { "0": "A", "10": 4 } // "A" is on tile 0, 4 is on tile 10
```

For setups where every tile is occupied, this can be an array where indices are directly mapped to floor tiles:

```js
tiles: ["A", "E", "I", "O", "U", 0]; // "A" is on tile 0, "E" is on tile 1, etc.
```

For setups where almost every tile is occupied, the unoccupied tiles can be represented with nulls:

```js
tiles: ["N", "K", "A", "E", "R", "D", "O", "L", "Y", "J", null, null, 8];
```

### expect

_Array_. The expected input/output combinations for different runs. Each is object with the following properties:

#### inbox

_Array_. The program input as it appears in the "IN" conveyor belt. The first item appears as the first item that will be picked up from the conveyor belt. In other words, it's [FIFO](<https://en.wikipedia.org/wiki/FIFO_(computing_and_electronics)>).

#### outbox

_Array_. The expected program output as it will appear in the "OUT" conveyor belt. The first item needs to match what will be first placed on the conveyor belt. In other words, this is also FIFO.

### challenge

_Object_. The criteria used for the game's size/speed challenges. Each is an object with the following properties:

#### size

_Number_. The maximum program size to meet the size challenge.

#### speed

_Number_. The maximum program run steps to meet the speed challenge.

## Maintainers

- [@atesgoral](https://github.com/atesgoral) (Ates Goral)
- [@nrkn](https://github.com/nrkn) (Nik Coughlin)

## License

MIT
