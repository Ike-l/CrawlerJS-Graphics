export default class Utilities {
    // constants
    static Colors = {
         "RED": [1, 0, 0],
         "GREEN": [0, 1, 0],
         "BLUE": [0, 0, 1],
         "PURPLE": [0.5, 0, 1],
         "ORANGE": [1, 0.5, 0],
         "YELLOW": [1, 1, 0],
         "BLACK": [0, 0, 0],
         "WHITE": [1, 1, 1]
    }
    // convert degrees to radians
    static ToRad(degree) {
        return degree / 180 * Math.PI
    }
    // convert radians to degrees
    static ToDegree(rad) {
        return rad / Math.PI * 180
    }
    // generate a random number between start (inclusive) and end (exclusive)
    static Random(startInclusive = 0, endExclusive = 1) {
        // if between 0 and 1 return a float
        if (startInclusive == 0 && endExclusive == 1) {
            return Math.random()
        }
        // order of start and end does not matter
        if (startInclusive > endExclusive) {
            return Math.floor(Math.random()*startInclusive)+endExclusive
        }
        return Math.floor(Math.random()*endExclusive)+startInclusive
    }
    static deepCopyObject(obj) {
        return JSON.parse(JSON.stringify(obj))
    }
}