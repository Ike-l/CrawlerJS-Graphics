export class World {
    static Materials = {
        "Default": {
            "Ambient": [0.05, 0.05, 0.2],
            "Diffuse": [0, 0, 1],
            "Specular": [0.5, 0.5, 0.5],
            "Shiny": 0.20,
            "Emissive": [0, 0, 0],
            "Opacity": 1.0,
        } 
    }
    static Lights = {
        "Default": {
            "Type": false,
        },
        "DefaultPoint": {
            "Type": "point",
            "Color": [1, 1, 1],
            "Intensity": 1.0,
        }
    }
}