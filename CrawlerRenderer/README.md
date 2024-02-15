# CrawlerRenderer

Conventions:
I use UpperCamelCase when defining "public" methods and properties
I use the namespace "CRAWLER_RENDERER"


DRAW:
Draw:
This is the function called to draw the scene, it accepts these arguments:
{i, iterations, iterationsPerSecond, before, after, objectFunction}
You should be using the loop function in the interface like this:
CRAWLER_INTERFACE.UTILITY.Utility.Loop(Draw, Infinity, false, before, after, perShape)
Where you specify:
The function, how many times, if you would like the fps to be passed into the before or after functions, then the before, after and function to be called per shape

GPU:
Canvas:
This is a "TAGCANVAS" object from crawlerInterface which the scene is renderer to.


LIGHTS:
This holds the classes for the light objects
All lights have extend a class with:
Parameters:
label, position, colour, intensity
Defaults:
"Unlabelled Light", [0, 0, 0], [1, 1, 1], 1
getters/setters:
Label:
takes a string as input
Position:
takes an array of length 3 [x, y, z]
Colour:
takes an array of length 3 [r, g, b]
Intensity:
takes a number
Methods:
Export:
console logs the properties
Translate:
takes an array of length 3 [x, y, z]
adds each corresponding element of the translation to the position

DIRECTIONAL:
DefaultDirectionalLight:
Parameters:
direction
Defaults:
[0, 1, 0]
getters/setters:
Direction:
takes an array of length 3 [x, y, z]
getters:
LightProperties:
returns an array of: [position, 0, colour, intensity, direction]

POINT:
DefaultPointLight:
Parameters:
attenuation
Defaults:
[1, 0.1, 0.01]
getters/setters:
Constant:
takes a number
Linear:
takes a number
Quadratic:
takes a number
Attenuation:
takes an array of length 3 [constant, linear, quadratic]
getters:
LightProperties:
returns an array of: [position, 0, colour, intensity, attenuation]

SPOT:
DefaultSpotLight:
Parameters:
direction, innerCone, outerCone
Defaults:
[0, 1, 0], 0.95, 0.99
getters/setters:
Direction:
takes an array of length 3 [x, y, z]
InnerCone:
takes a number
OuterCone:
takes a number
getters:
LightProperties:
returns an array of: [position, 0, colour, intensity, direction, innercone, outercone]

MATERIALS:
This holds the material class
Matieral:
Parameters:
ambience, diffusivity, specularity, shininess
Defaults:
[0, 0, 0], [0.1, 0.1, 0.1], [0.5, 0.5, 0.5], 1
getters/setters:
Ambience:
takes an array of length 3 [r, g, b]
Diffusivity:
takes an array of length 3 [r, g, b]
Specularity:
takes an array of length 3 [r, g, b]
Shininess:
takes a number

SHAPES:
This holds the classes for the shape objects
There are 2 parent classes for each shape:
RenderObject & Shape
RenderObject:
{ needs refactoring. Please look at other classes for how to extend this }
getters/setters:
Label:
takes a string, defaults: "Unlabelled Render Object"
takes an array of length 3
TranslationMatrix:
takes an array length 16
getters:
Position2:
The current translation vector
setters:
Translation:
Clears the current translation matrix, Position2 and translates to the given translation
methods:
Translate:
takes an array of length 3, translates Position2 and the translation matrix
Export:
console logs the model matrix
Destroy:
takes an array, splices the object out of the array and returns the index

Shape:
extends RenderObject
Parameters:
translation, rotation, stretch
rotation is an array of rotations, i.e [[[0, 1, 0], Math.PI], [[1, 0, 0], Math.PI]] rotates around the y and x axis pi radians
getters/setters:
Quality:
This defines the quality/resolution for spherical objects
takes a number, clamps it between 7 and 3000, defaults 40
Material:
takes an object of material, defaults to a default material
Mappings for material properties i.e Ambience
RotationMatrix:
takes an object and sets the current rotation matrix
ScakeMatrix:
takes an object and sets the current rotation matrix
getters:
Scale2:
The current scale vector
ModelMatrix:
returns the accumulation of the translation, rotation then scale. 
NormalMatrix:
returns the inverse of the modelMatrix, then transposes it
setters: 
Rotation:
takes an array of [axis, angle], resets the rotation matrix and then rotates by it.
Scale:
takes an array of [scaleX, scaleY, scaleZ], resets scale2, resets the scale matrix and then scales by it.
methods:
Rotate:
takes (axis, angle) and rotates the rotation matrix by that. Uses quaternions.
Stretch:
takes an array, adds to "Scale2" and scales the scaleMatrix
CreateBuffers:
returns an object containing :
{
            vertexPositionBuffer,
            vertexColourBuffer,
            vertexNormalBuffer,
            vertexIndicesBuffer,
            
            modelMatrixBuffer,
            normalMatrixBuffer,
            
            ambienceBuffer,
            diffusivityBuffer,
            specularityBuffer,
            shininessBuffer
        }
CreateBindGroups:
return [ObjectMatrixBindGroup, MaterialBindGroup]
UpdateStaticBuffers:
doesnt return anything, updates the vertex buffers:
Position, Colour, Indices and Normals
UpdateVariableBuffers:
updates the "variable" buffers:
modelMatrix, normalMatrix, ambience, diffusivity, specularitym shininess.
Draw:
Takes the pass, perspectiveBindGroup, LightbindGroup
Updates variable buffers
sets vertex buffers, index buffer
sets the bindgroups 
draws indexed.
THREED:
This holds the classes for the 3D shapes
Cube:
getters:
HitBoxCubeDimension:
returns the maximum scale * default radius (default radius is sqrt(2 * 0.5^2)
Methods:
CreateVertexPositions:
returns a float32array of the vertex positions
CreateVertexIndices:
returns a Uint32Array of indices
CreateVertexNormals:
returns a float32Array of normal directions
Cylinder:
HitBoxCubeDimension:
returns the maximum scale * default radius (default radius is sqrt(2 * 0.5^2)
CreateVertexInformation:
returns an object containing positions, normals and indices
Sphere:
HitBoxCubeDimension:
returns the maximum scale * default radius (default radius is sqrt(2 * 0.5^2)
CreateVertexInformation:
returns an object containing positions, normals and indices
TWOD:
This holds the classes for the 2D shapes
A2BLine:
takes a pointA and pointB
translates, rotates and scales to ensure the line fit the points.
getters/setters:
PointA:
sets the point and updates the matrices
PointB:
sets the point and updates the matrices
Methods:
AlignLine:
Sets the matrices based on the points
CreateVertexPositions, CreateVertexColours, CreateVertexIndices, CreateVertexNormals (same as previous)
Circle:
methods:
CreateVertexInformation
Line:
methods:
CreateVertexPositions, CreateVertexColours, CreateVertexIndices, CreateVertexNormals (same as previous)
Plane:
methods
CreateVertexPositions, CreateVertexColours, CreateVertexIndices, CreateVertexNormals (same as previous)
Ray:
parameters:
defaultDirection, Normalised, Direction, Length
getters/setters:
DefaultDirection:
sets the defaultDirection
Direction:
sets the direction, if normalised is true it auto normalises it
Length:
sets the length
Normalised:
sets the bool normalised
methods:
AlignRay:
creates a rotation and scale based on the values before, auto called when they are updated
CreateVertexPositions, CreateVertexColours, CreateVertexIndices, CreateVertexNormals (same as previous)

UTILITIES:
This holds the utilities class for the renderer
Utilities:
Colours:
Random:
ToDegree:
ToRad:

WORLD:
This holds the classes for the camera and controller
Camera:
Controller:


CONSTANTS:
LIGHTS:
Holds the arrays: "Directional", "Point", "Spot". To use add a light into the scene you need the light object in the correseponding array
LineListShapes:
Holds the objects that use a line list as the primitive. To use add a line into the scene you need the line object into this array
TriangleListShapes:
Holds the objects that use a triangle list as the primitive. To use add an object not a line into the scene you need the object into this array
TriangleListShapes2:
Used for conveniences
skyColour:
Used as the "Clear" colour for each render pass, this is the colour of the entire scene before everything is drawn

