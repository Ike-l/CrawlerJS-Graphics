export class World {
    static Materials = {
        "Default": {
            "Ambient": [0.05, 0.05, 0.05],
            "Diffuse": [1, 0.5, 1],
            "Specular": [0.5, 0.5, 0.5],
            "Shiny": 16.0,
            "Emissive": [0, 0, 0],
            "Opacity": 1.0,
        },
        "BlueDefault": {
            "Ambient": [0.05, 0.05, 1.0],
            "Diffuse": [1.0, 0.0, 0.0],
            "Specular": [0.5, 0.5, 0.5],
            "Shiny": 128.0,
            "Emissive": [0, 0, 0],
            "Opacity": 1.0,
        },
        "Transparent": {
            "Ambient": [0.05, 0.05, 0.05],
            "Diffuse": [1, 0.5, 1],
            "Specular": [0.5, 0.5, 0.5],
            "Shiny": 16.0,
            "Emissive": [0, 0, 0],
            "Opacity": 0.1,
        },
        "Light": {
            "Ambient": [1.0, 1.0, 1.0],
            "Diffuse": [1, 0.5, 1],
            "Specular": [0.5, 0.5, 0.5],
            "Shiny": 16.0,
            "Emissive": [0, 0, 0],
            "Opacity": 1.0,
        },
    }
    static Lights = {
        "Default": {
            "Type": false,
        },
        "DefaultPoint": {
            "Type": "point",
            "Color": [1.0, 1.0, 1.0],
            "Intensity": 1,
            "Center": [0.0, 0.0, 0.0],
            "Constant": 1,
            "Linear": 0.009,
            "Quadratic": 0.0032,            
        },
        "redPoint": {
            "Type": "point",
            "Color": [1.0, 0.0, 0.0],
            "Intensity": 1,
            "Center": [0.0, 0.0, 0.0],
            "Constant": 1,
            "Linear": 0.009,
            "Quadratic": 0.0032,
        },
        "bluePoint": {
            "Type": "point",
            "Color": [0.0, 0.0, 1.0],
            "Intensity": 1,
            "Center": [0.0, 0.0, 0.0],
            "Constant": 1,
            "Linear": 0.009,
            "Quadratic": 0.0032,
        },
        "yellowPoint": {
            "Type": "point",
            "Color": [1.0, 1.0, 0.0],
            "Intensity": 1,
            "Center": [0.0, 0.0, 0.0],
            "Constant": 1,
            "Linear": 0.09,
            "Quadratic": 0.032,
        },
        "sunPoint": {
            "Type": "point",
            "Color": [1.0, 1.0, 0.0],
            "Intensity": 2.0,
            "Center": [0.0, 0.0, 0.0],
            "Constant": 1,
            "Linear": 0.00001,
            "Quadratic": 0.0,
        }
    }
}