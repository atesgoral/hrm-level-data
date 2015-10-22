# hrm-level-data
Human Resource Machine level data

## Usage

Install with: `npm install hrm-level-data`

Then:

```
var levels = require('hrm-level-data/index.json');
```

`levels` will be an array of level objects (Node.js will parse the JSON for you).

An excerpt:

```
[{
    number: 1,
    name: "Mail Room",
    floor: {},
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
    floor: { "9": 0 },
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
    floor: [ "A", "E", "I", "O", "U", 0 ],
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

Each level object has the following properties:

### number
_Number_. The level number, as it appears in the game. Note that the level numbers are not sequential because there are cutscenes that take up level numbers.

### name
_String_. The level name.

### floor
_Object_/_Array_. The floor setup. Tiles values can either be numbers (e.g. 5) or strings for letters (e.g. "E"). Numbers are never represented as strings (e.g. "3" won't appear).

For sparse setups, this can be an Object with keys as floor tile indices:

```
floor: { "0": "A", "10": 4 }
```

For setups where every tile is occupied, this can be an Array where indices are directly mapped to floor tiles:

```
floor: [ "A", "E", "I", "O", "U", 0 ]
```

### expect
_Array_. The expected input/output combinations for different runs. Each is object with the following properties:

#### inbox
_Array_.

#### outbox
_Array_.

### challenge
_Object. The criteria used for the game's size/speed challenges. Each is an object with the following properties:

#### size
_Number_.

#### speed
_Number_.

## Maintained by

* [@atesgoral](https://github.com/atesgoral) (Ates Goral)
* [@nrkn](https://github.com/nrkn) (Nik Coughlin)

## License

MIT
