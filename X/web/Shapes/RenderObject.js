export default class RenderObject {
    constructor(parameters = {}) {
        this.label = parameters.label || "Unlabelled Render Object"

        // vec3 position 
        this.Position2 = [0, 0, 0]
        this.translationMatrix = mat4.create()
        this.rotationMatrix = mat4.create()
        this.scaleMatrix = mat4.create()

        let property
        if (parameters.extendsSphere) {
            property = "Sphere"
        } else {
            property = this.constructor.name
        }
        this.device = CRAWLER_RENDERER.GPU.Device
        // there are a lot easier ways of doing this, i.e just having 1 and the same funcion (an interface) per shape which provides everything at once
        switch (property) {
            case "Sphere":
            case "Cylinder":
            case "Circle":
                this.Material = parameters.material
                this.Quality = parameters.quality || 40
                const VertexInformation = this.CreateVertexInformation()
                this.VertexPositions = VertexInformation.positions
                this.VertexColours = VertexInformation.colours
                this.VertexIndices = VertexInformation.indices
                this.VertexNormals = VertexInformation.normals
                break
            default:
                this.Material = parameters.material
                this.VertexPositions = this.CreateVertexPositions()
                this.VertexColours = this.CreateVertexColours()
                this.VertexIndices = this.CreateVertexIndices()
                this.VertexNormals = this.CreateVertexNormals()
        }
        this.Buffers = this.CreateBuffers()
        this.BindGroups = this.CreateBindGroups()
        this.UpdateStaticBuffers()
        this.UpdateVariableBuffers()
    }
    get Label() {
        return this.label 
    }
    set Label(label) {
        if (typeof label == "string") {
            this.label = label
        } 
    }
    get Position2() {
        return this.position2
    }
    set Position2(position) {
        if (typeof position == "object") {
            if (position.length == 3) {
                this.position2 = position
            }
        }
    }
    get TranslationMatrix() {
        return this.translationMatrix
    }
    set TranslationMatrix(translation) {
        if (typeof translation == "object") {
            if (translation.length == 16) {
                this.translationMatrix = translation
            }
        }
    }
    set Translation(translation) {
        if (typeof translation == "object") {
            this.translationMatrix = mat4.create()
            this.Position2 = vec3.create()
            this.Translate(translation)
        }
    }
    Translate(translation) {
        if (typeof translation == "object") {
            if (translation.length == 3) {
                vec3.add(this.Position2, this.Position2, translation)
                mat4.translate(this.TranslationMatrix, this.TranslationMatrix, translation)
            }
        }
    }
    Export() {
        console.log(this.ModelMatrix)
    }
    Destroy(array) {
        if (typeof array == "object") {
            const index = array.indexOf(this)
            if (index >= 0) {
                // since indexOf returns -1, it would splice the last element
                array.splice(index, 1)
            }
            return index
        }
    }
}