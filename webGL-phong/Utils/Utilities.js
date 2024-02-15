import { Line } from "../Shapes/2D/Line.js"
export default class Util {
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
    static toRad(degree) {
        return degree / 180 * Math.PI
    }
    static toDegree(rad) {
        return rad / Math.PI * 180
    }
    static random(startInclusive = 0, endExclusive = 1) {
        if (startInclusive == 0 && endExclusive == 1) {
            return Math.random()
        }
        if (startInclusive > endExclusive) {
            return Math.floor(Math.random()*startInclusive)+endExclusive
        }
        return Math.floor(Math.random()*endExclusive)+startInclusive
    }
    static generateGrid(params = {}) {
        const center = params.center || {x: 0, y: 0, z:0}
        const offsetX = center.x||0
        const offsetY = center.y||0
        const offsetZ = center.z||0
        const length = params.length || 100
        const Grid = []
        for (let i=0;i<=length;i++) {
            Grid.push(new Line({length:length, center:[offsetX, offsetY, offsetZ+i-length/2]}))
            Grid.push(new Line({length:length, center:[offsetX+i-length/2, offsetY, offsetZ], rotation:{angle: Util.toRad(90), axis: [0, 1, 0]}}))
        }
        return Grid
    }
    // TODO
    static generateRandomObjects(params = {}) {
        const Objects = []
        return Objects
    }
    static deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj))
    }
}