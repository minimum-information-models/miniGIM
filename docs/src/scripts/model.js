
window.onload = function () {

    const canvas = document.getElementById("canvas");
    const hero = document.getElementsByClassName("hero")[0];
    const ctx = canvas.getContext("2d");

    const lodSlider = document.getElementById("lod-slider");
    const lodHeader = document.getElementById("lod-header");
    const lodDescription = document.getElementById("lod-description");
    const lodLegend = document.getElementById("lod-legend");
    const lodLeftButton = document.getElementById("lod-left-button");
    const lodRightButton = document.getElementById("lod-right-button");

    const colors = {
        white: hsla(46, 0, 100),
        blue: hsla(203, 98, 47),
        yellow: hsla(46, 100, 56),
        red: hsla(1, 97, 63),
        lightRed: hsla(1, 97, 85),
        darkRed: hsla(1, 97, 25),
        green: hsla(146, 43, 57),
        lightGreen: hsla(146, 43, 80),
        darkGreen: hsla(146, 43, 20),
        gray: hsla(1, 0, 70),
        lightGray: hsla(1, 0, 90),
        darkGray: hsla(1, 0, 50),
        black: hsla(1, 0, 0),
        darkLineColor: hsla(0, 0, 0, 0.20),
        lineColor: hsla(0, 0, 0, 0.10),
        fadedLineColor: hsla(0, 0, 0, 0.05),
        transparent: hsla(0, 0, 0, 0),
    };
    const fadeScalar = 10;

    // Water level
    const wLev = -2;
    const origin = vec3(146577.022, 0, 523316.148);

    const camera = {
        position: vec3(-250, 100, 250),
        target: vec3(0, 0, -10),
        up: vec3(0, 1, 0)
    };

    var width;
    var height;
    var lightVector = vec3(6, 24, 3).normalize();

    const startTime = Date.now();
    var elapsedTime = Date.now() - startTime;

    const properties = {
        grass: {
            opacity: { current: 0, target: 0 },
            fillColor: {
                real: colors.green,
                current: colors.transparent,
                target: colors.green,
            },
            strokeColor: {
                real: colors.lineColor,
                current: colors.transparent,
                target: colors.lineColor,
            }
        },
        terrain: {
            opacity: { current: 0, target: 0 },
            fillColor: {
                real: colors.green,
                current: colors.transparent,
                target: colors.green,
            },
            strokeColor: {
                real: colors.lineColor,
                current: colors.transparent,
                target: colors.lineColor,
            }
        },
        verge: {
            opacity: { current: 0, target: 0 },
            fillColor: {
                real: colors.green,
                current: colors.transparent,
                target: colors.green,
            },
            strokeColor: {
                real: colors.lineColor,
                current: colors.transparent,
                target: colors.lineColor,
            }
        },
        bridges: {
            opacity: { current: 0, target: 0 },
            fillColor: {
                real: hsla(0, 0, 100),
                current: colors.transparent,
                target: hsla(0, 0, 100),
            },
            strokeColor: {
                real: colors.lineColor,
                current: colors.transparent,
                target: colors.lineColor,
            }
        },
        roads: {
            opacity: { current: 0, target: 0 },
            fillColor: {
                real: hsla(0, 24, 43),
                current: colors.transparent,
                target: hsla(0, 24, 43),
            },
            strokeColor: {
                real: colors.lineColor,
                current: colors.transparent,
                target: colors.lineColor,
            }
        },
        cyclepaths: {
            opacity: { current: 0, target: 0 },
            fillColor: {
                real: hsla(0, 63, 52),
                current: colors.transparent,
                target: hsla(0, 63, 52),
            },
            strokeColor: {
                real: colors.lineColor,
                current: colors.transparent,
                target: colors.lineColor,
            }
        },
        sharedFootpath: {
            opacity: { current: 0, target: 0 },
            fillColor: {
                real: hsla(0, 0, 80),
                current: colors.transparent,
                target: hsla(0, 0, 80),
            },
            strokeColor: {
                real: colors.lineColor,
                current: colors.transparent,
                target: colors.lineColor,
            }
        },
        pavement: {
            opacity: { current: 0, target: 0 },
            fillColor: {
                real: hsla(0, 0, 80),
                current: colors.transparent,
                target: hsla(0, 0, 80),
            },
            strokeColor: {
                real: colors.lineColor,
                current: colors.transparent,
                target: colors.lineColor,
            }
        },
        kavels: {
            opacity: { current: 0, target: 0 },
            fillColor: {
                real: colors.green,
                current: colors.transparent,
                target: colors.green,
            },
            strokeColor: {
                real: colors.lineColor,
                current: colors.transparent,
                target: colors.lineColor,
            }
        },
        parkingArea: {
            opacity: { current: 0, target: 0 },
            fillColor: {
                real: hsla(0, 65, 22),
                current: colors.transparent,
                target: hsla(0, 65, 22),
            },
            strokeColor: {
                real: colors.lineColor,
                current: colors.transparent,
                target: colors.lineColor,
            }
        },
        parking: {
            opacity: { current: 0, target: 0 },
            fillColor: {
                real: hsla(0, 24, 43),
                current: colors.transparent,
                target: hsla(0, 24, 43),
            },
            strokeColor: {
                real: colors.lineColor,
                current: colors.transparent,
                target: colors.lineColor,
            }
        },
        houses: {
            opacity: { current: 0, target: 0 },
            fillColor: {
                real: hsla(0, 0, 91),
                current: colors.transparent,
                target: hsla(0, 0, 91),
            },
            strokeColor: {
                real: colors.lineColor,
                current: colors.transparent,
                target: colors.lineColor,
            }
        },
        trees: {
            opacity: { current: 0, target: 0 },
            fillColor: {
                real: hsla(133, 18, 25),
                current: colors.transparent,
                target: hsla(133, 18, 25),
            },
            strokeColor: {
                real: colors.darkLineColor,
                current: colors.transparent,
                target: colors.lineColor,
            }
        }
    };

    var zoom = 70;
    var cameraDistance = 180;
    var angleX = Math.PI * 0.6;
    var angleY = Math.PI * 0.1;
    var cameraX = camera.target.x + 60;
    var cameraZ = camera.target.z - 20;

    var targetZoom = zoom;
    var targetCameraDistance = cameraDistance;
    var targetAngleX = angleX;
    var targetAngleY = angleY;
    var targetX = cameraX;
    var targetZ = cameraZ;

    function clamp(min, max, value) {
        return value < min ? min : value > max ? max : value;
    }

    function zoomScale() {
        return zoom / cameraDistance * 2;
    }

    function project(proj, c) {
        return vec3(
            proj[0].x * c.x +
            proj[0].y * c.y +
            proj[0].z * c.z,
            proj[1].x * c.x +
            proj[1].y * c.y +
            proj[1].z * c.z,
            proj[2].x * c.x +
            proj[2].y * c.y +
            proj[2].z * c.z
        );
    }

    function vec3(x, y, z) {
        const self = {
            x, y, z,
            normalize: () => {
                const l = self.length();
                return vec3(self.x / l, self.y / l, self.z / l);
            },
            dot: (other) => self.x * other.x + self.y * other.y + self.z * other.z,
            crossproduct: (other) => {
                return vec3(
                    (self.y * other.z - self.z * other.y),
                    -(self.x * other.z - self.z * other.x),
                    (self.x * other.y - self.y * other.x)
                );
            },
            multiply: (scalar) => vec3(self.x * scalar, self.y * scalar, self.z * scalar),
            length: () => Math.sqrt(Math.pow(self.x, 2) + Math.pow(self.y, 2) + Math.pow(self.z, 2)),
            add: (other) => vec3(self.x + other.x, self.y + other.y, self.z + other.z),
            subtract: (other) => vec3(self.x - other.x, self.y - other.y, self.z - other.z),

        };
        return self;
    }

    const shapes = {
        tree: function() {
            return [
                vec3(-0.2,  0, -0.2),
                vec3(-0.2,  0,  0.2),
                vec3( 0.2,  0,  0.2),
                vec3( 0.2,  0, -0.2),
                vec3(-0.2,  2, -0.2),
                vec3(-0.2,  2,  0.2),
                vec3( 0.2,  2,  0.2),
                vec3( 0.2,  2, -0.2),
                vec3(-1.5,  3, -1.5),
                vec3(-1.5,  3,  1.5),
                vec3( 1.5,  3,  1.5),
                vec3( 1.5,  3, -1.5),
                vec3(-1.5, 8, -1.5),
                vec3(-1.5, 8,  1.5),
                vec3( 1.5, 8,  1.5),
                vec3( 1.5, 8, -1.5),
                vec3( 0, 12, 0),
                vec3( 0, 12, 0),
                vec3( 0, 12, 0),
                vec3( 0, 12, 0),
            ];
        }
    }

    var drawBuffer = [];
    var entities = [];

    function fromOrigin(input) {
        return vec3(input.x - origin.x, input.y - origin.y, origin.z - input.z);
    }

    function createEntities() {
        // Landscape
        createWater(vec3(50, wLev, -50), 70);
        createWater(vec3(50, wLev, -125), 60);
        createWater(vec3(150, wLev, -110), 50);
        createWater(vec3(50, wLev, -200), 70);
        createWater(vec3(150, wLev, -50), 60);

        createTerrain([
            fromOrigin(vec3(146587.540, 0, 523322.126)),
            fromOrigin(vec3(146587.540, wLev, 523322.126)),
            fromOrigin(vec3(146587.635, wLev, 523317.937)),
        ]);
        createTerrain([
            fromOrigin(vec3(146587.540, 0, 523322.126)),
            fromOrigin(vec3(146587.635, wLev, 523317.937)),
            fromOrigin(vec3(146746.543, wLev, 523344.723)),
        ]);
        createTerrain([
            fromOrigin(vec3(146587.540, 0, 523322.126)),
            fromOrigin(vec3(146746.543, wLev, 523344.723)),
            fromOrigin(vec3(146753.584, 0, 523348.882)),
        ]);
        createTerrain([
            fromOrigin(vec3(146753.584, 0, 523348.882)),
            fromOrigin(vec3(146746.543, wLev, 523344.723)),
            fromOrigin(vec3(146753.499, wLev, 523346.541)),
        ]);
        createTerrain([
            fromOrigin(vec3(146753.499, wLev * 0.9, 523346.541)),
            fromOrigin(vec3(146746.543, wLev, 523344.723)),
            fromOrigin(vec3(146753.789, wLev, 523345.958)),
        ]);

        createTerrain([
            fromOrigin(vec3(146587.351, wLev, 523330.503)),
            fromOrigin(vec3(146587.351, 0, 523330.503)),
            fromOrigin(vec3(146595.603, 0, 523331.930)),
        ]);
        createTerrain([
            fromOrigin(vec3(146587.351, wLev, 523330.503)),
            fromOrigin(vec3(146595.603, 0, 523331.930)),
            fromOrigin(vec3(146587.234, wLev, 523335.725)),
        ]);
        createTerrain([
            fromOrigin(vec3(146587.234, wLev, 523335.725)),
            fromOrigin(vec3(146595.603, 0, 523331.930)),
            fromOrigin(vec3(146592.259, 0, 523353.390)),
        ]);
        createTerrain([
            fromOrigin(vec3(146587.234, wLev, 523335.725)),
            fromOrigin(vec3(146592.259, 0, 523353.390)),
            fromOrigin(vec3(146585.322, wLev, 523420.505)),
        ]);
        createTerrain([
            fromOrigin(vec3(146592.259, 0, 523353.390)),
            fromOrigin(vec3(146590.993, 0, 523427.180)),
            fromOrigin(vec3(146585.322, wLev, 523420.505)),
        ]);
        createTerrain([
            fromOrigin(vec3(146585.171, wLev, 523427.180)),
            fromOrigin(vec3(146585.322, wLev, 523420.505)),
            fromOrigin(vec3(146590.993, 0, 523427.180)),
        ]);
        createTerrain([
            fromOrigin(vec3(146585.171, 0, 523427.180)),
            fromOrigin(vec3(146585.171, wLev, 523427.180)),
            fromOrigin(vec3(146590.993, 0, 523427.180)),
        ]);

        createTerrain([
            fromOrigin(vec3(146585.036, 0, 523433.177)),
            fromOrigin(vec3(146585.036, wLev, 523433.177)),
            fromOrigin(vec3(146585.171, wLev, 523427.180)),
            fromOrigin(vec3(146585.171, 0, 523427.180)),
        ]);

        createTerrain([
            fromOrigin(vec3(146584.857, wLev, 523441.121)),
            fromOrigin(vec3(146585.036, wLev, 523433.177)),
            fromOrigin(vec3(146590.890, 0, 523433.177)),
        ]);
        createTerrain([
            fromOrigin(vec3(146585.036, wLev, 523433.177)),
            fromOrigin(vec3(146585.036, 0, 523433.177)),
            fromOrigin(vec3(146590.890, 0, 523433.177)),
        ]);
        createTerrain([
            fromOrigin(vec3(146584.857, wLev, 523441.121)),
            fromOrigin(vec3(146590.890, 0, 523433.177)),
            fromOrigin(vec3(146589.056, 0, 523540.150)),
        ]);
        createTerrain([
            fromOrigin(vec3(146584.857, wLev, 523441.121)),
            fromOrigin(vec3(146589.056, 0, 523540.150)),
            fromOrigin(vec3(146582.506, wLev, 523545.382)),
        ]);
        createTerrain([
            fromOrigin(vec3(146584.541, wLev, 523551.413)),
            fromOrigin(vec3(146582.506, wLev, 523545.382)),
            fromOrigin(vec3(146589.056, 0, 523540.150)),
        ]);
        createTerrain([
            fromOrigin(vec3(146584.541, wLev, 523551.413)),
            fromOrigin(vec3(146589.056, 0, 523540.150)),
            fromOrigin(vec3(146589.832, wLev, 523546.900)),
        ]);
        createTerrain([
            fromOrigin(vec3(146589.832, wLev, 523546.900)),
            fromOrigin(vec3(146589.056, 0, 523540.150)),
            fromOrigin(vec3(146594.570, wLev, 523544.285)),
        ]);
        createTerrain([
            fromOrigin(vec3(146594.570, wLev, 523544.285)),
            fromOrigin(vec3(146589.056, 0, 523540.150)),
            fromOrigin(vec3(146595.548, 0, 523540.150)),
        ]);
        createTerrain([
            fromOrigin(vec3(146594.570, wLev, 523544.285)),
            fromOrigin(vec3(146595.548, 0, 523540.150)),
            fromOrigin(vec3(146595.480, 0, 523544.074)),
        ]);

        createTerrain([
            fromOrigin(vec3(146587.351, 0, 523330.503)),
            fromOrigin(vec3(146587.351, wLev, 523330.503)),
            fromOrigin(vec3(146587.540, wLev, 523322.126)),
            fromOrigin(vec3(146587.540, 0, 523322.126)),
        ]);

        createTerrain([
            fromOrigin(vec3(146746.899, 0, 523357.226)),
            fromOrigin(vec3(146753.302, 0, 523358.250)),
            fromOrigin(vec3(146753.081, wLev, 523365.565)),
        ]);
        createTerrain([
            fromOrigin(vec3(146746.899, 0, 523357.226)),
            fromOrigin(vec3(146753.081, wLev, 523365.565)),
            fromOrigin(vec3(146745.555, 0, 523435.715)),
        ]);
        createTerrain([
            fromOrigin(vec3(146745.555, 0, 523435.715)),
            fromOrigin(vec3(146753.081, wLev, 523365.565)),
            fromOrigin(vec3(146751.057, wLev, 523432.692)),
        ]);
        createTerrain([
            fromOrigin(vec3(146745.555, 0, 523435.715)),
            fromOrigin(vec3(146751.057, wLev, 523432.692)),
            fromOrigin(vec3(146750.199, wLev, 523440.483)),
        ]);
        createTerrain([
            fromOrigin(vec3(146745.555, 0, 523435.715)),
            fromOrigin(vec3(146750.199, wLev, 523440.483)),
            fromOrigin(vec3(146748.969, wLev, 523443.523)),
        ]);
        createTerrain([
            fromOrigin(vec3(146745.555, 0, 523435.715)),
            fromOrigin(vec3(146748.969, wLev, 523443.523)),
            fromOrigin(vec3(146746.994, wLev, 523444.964)),
        ]);
        createTerrain([
            fromOrigin(vec3(146745.555, 0, 523435.715)),
            fromOrigin(vec3(146746.994, wLev, 523444.964)),
            fromOrigin(vec3(146742.458, wLev, 523445.548)),
        ]);
        createTerrain([
            fromOrigin(vec3(146745.555, 0, 523435.715)),
            fromOrigin(vec3(146742.458, wLev, 523445.548)),
            fromOrigin(vec3(146732.052, wLev, 523444.314)),
        ]);
        createTerrain([
            fromOrigin(vec3(146732.052, wLev, 523444.314)),
            fromOrigin(vec3(146716.694, 0, 523435.221)),
            fromOrigin(vec3(146745.555, 0, 523435.715)),
        ]);
        createTerrain([
            fromOrigin(vec3(146732.052, wLev, 523444.314)),
            fromOrigin(vec3(146716.609, 0, 523440.213)),
            fromOrigin(vec3(146716.694, 0, 523435.221)),
        ]);
        createTerrain([
            fromOrigin(vec3(146732.052, wLev, 523444.314)),
            fromOrigin(vec3(146705.625, 0, 523440.025)),
            fromOrigin(vec3(146716.609, 0, 523440.213)),
        ]);
        createTerrain([
            fromOrigin(vec3(146705.625, 0, 523440.025)),
            fromOrigin(vec3(146732.052, wLev, 523444.314)),
            fromOrigin(vec3(146673.369, wLev, 523438.832)),
        ]);
        createTerrain([
            fromOrigin(vec3(146705.685, 0, 523436.530)),
            fromOrigin(vec3(146705.625, 0, 523440.025)),
            fromOrigin(vec3(146673.369, wLev, 523438.832)),
        ]);
        createTerrain([
            fromOrigin(vec3(146673.369, wLev, 523438.832)),
            fromOrigin(vec3(146668.958, 0, 523435.901)),
            fromOrigin(vec3(146705.685, 0, 523436.530)),
        ]);
        createTerrain([
            fromOrigin(vec3(146673.369, wLev, 523438.832)),
            fromOrigin(vec3(146668.915, 0, 523438.416)),
            fromOrigin(vec3(146668.958, 0, 523435.901)),
        ]);
        createTerrain([
            fromOrigin(vec3(146595.603, 0, 523331.930)),
            fromOrigin(vec3(146587.351, 0, 523330.503)),
            fromOrigin(vec3(146587.540, 0, 523322.126)),
            fromOrigin(vec3(146753.584, 0, 523348.882)),
            fromOrigin(vec3(146753.302, 0, 523358.250)),
            fromOrigin(vec3(146746.899, 0, 523357.226)),
            fromOrigin(vec3(146745.555, 0, 523435.715)),
            fromOrigin(vec3(146716.694, 0, 523435.221)),
            fromOrigin(vec3(146716.609, 0, 523440.213)),
            fromOrigin(vec3(146705.625, 0, 523440.025)),
            fromOrigin(vec3(146705.685, 0, 523436.530)),
            fromOrigin(vec3(146668.915, 0, 523438.416)),
            fromOrigin(vec3(146667.170, 0, 523540.115)),
            fromOrigin(vec3(146666.581, 0, 523541.408)),
            fromOrigin(vec3(146665.162, 0, 523542.860)),
            fromOrigin(vec3(146661.703, 0, 523543.562)),
            fromOrigin(vec3(146655.424, 0, 523542.981)),
            fromOrigin(vec3(146645.458, 0, 523541.673)),
            fromOrigin(vec3(146631.494, 0, 523540.645)),
            fromOrigin(vec3(146620.503, 0, 523540.896)),
            fromOrigin(vec3(146609.510, 0, 523541.330)),
            fromOrigin(vec3(146595.480, 0, 523544.074)),
            fromOrigin(vec3(146595.548, 0, 523540.150)),
            fromOrigin(vec3(146589.056, 0, 523540.150)),
            fromOrigin(vec3(146590.891, 0, 523433.177)),
            fromOrigin(vec3(146585.036, 0, 523433.177)),
            fromOrigin(vec3(146585.171, 0, 523427.186)),
            fromOrigin(vec3(146590.993, 0, 523427.180)),
            fromOrigin(vec3(146592.259, 0, 523353.390)),
        ]);

        createTree(fromOrigin(vec3(146586.286, wLev * 0.4, 523544.229))),
        createTree(fromOrigin(vec3(146590.216, 0, 523523.240))),
        createTree(fromOrigin(vec3(146652.368, 0, 523537.247))),
        createTree(fromOrigin(vec3(146653.743, 0, 523516.235))),
        createTree(fromOrigin(vec3(146653.912, 0, 523492.195))),
        createTree(fromOrigin(vec3(146655.283, 0, 523465.683))),
        createTree(fromOrigin(vec3(146657.217, 0, 523437.977))),
        createTree(fromOrigin(vec3(146588.631, wLev * 0.4, 523438.313))),
        createTree(fromOrigin(vec3(146588.254, wLev * 0.4, 523445.837))),
        createTree(fromOrigin(vec3(146587.773, wLev * 0.4, 523467.536))),
        createTree(fromOrigin(vec3(146587.386, wLev * 0.4, 523489.281))),
        createTree(fromOrigin(vec3(146587.077, wLev * 0.4, 523503.199))),
        createTree(fromOrigin(vec3(146598.245, 0, 523504.277))),
        createTree(fromOrigin(vec3(146644.271, 0, 523504.842))),
        createTree(fromOrigin(vec3(146622.583, 0, 523463.027))),
        createTree(fromOrigin(vec3(146634.064, 0, 523463.461))),
        createTree(fromOrigin(vec3(146645.795, 0, 523463.665))),
        createTree(fromOrigin(vec3(146622.772, 0, 523452.152))),
        createTree(fromOrigin(vec3(146634.254, 0, 523452.349))),
        createTree(fromOrigin(vec3(146645.986, 0, 523452.311))),
        createTree(fromOrigin(vec3(146696.909, wLev * 0.4, 523438.205))),
        createTree(fromOrigin(vec3(146702.600, wLev * 0.4, 523438.770))),
        createTree(fromOrigin(vec3(146720.971, wLev * 0.4, 523439.298))),
        createTree(fromOrigin(vec3(146739.649, wLev * 0.4, 523439.006))),
        createTree(fromOrigin(vec3(146744.383, wLev * 0.7, 523441.883))),
        createTree(fromOrigin(vec3(146749.079, wLev * 0.6, 523429.898))),
        createTree(fromOrigin(vec3(146748.945, wLev * 0.6, 523422.189))),
        createTree(fromOrigin(vec3(146737.283, 0, 523415.739))),
        createTree(fromOrigin(vec3(146750.257, wLev * 0.8, 523399.007))),
        createTree(fromOrigin(vec3(146750.390, wLev * 0.7, 523387.654))),
        createTree(fromOrigin(vec3(146752.071, wLev * 0.9, 523383.099))),
        createTree(fromOrigin(vec3(146749.324, wLev * 0.5, 523371.880))),
        createTree(fromOrigin(vec3(146749.324, wLev * 0.4, 523366.535))),
        createTree(fromOrigin(vec3(146720.466, 0, 523358.005))),
        createTree(fromOrigin(vec3(146589.100, wLev * 0.4, 523423.381))),
        createTree(fromOrigin(vec3(146588.006, wLev * 0.8, 523406.366))),
        createTree(fromOrigin(vec3(146590.216, wLev * 0.3, 523399.377))),
        createTree(fromOrigin(vec3(146590.399, wLev * 0.4, 523375.056))),
        createTree(fromOrigin(vec3(146590.216, wLev * 0.4, 523366.818))),
        createTree(fromOrigin(vec3(146657.217, 0, 523421.759))),
        createTree(fromOrigin(vec3(146657.217, 0, 523405.770))),
        createTree(fromOrigin(vec3(146657.237, 0, 523385.922))),
        createTree(fromOrigin(vec3(146657.354, 0, 523379.800))),
        createTree(fromOrigin(vec3(146659.410, 0, 523360.802))),
        createTree(fromOrigin(vec3(146671.013, 0, 523366.781))),
        createTree(fromOrigin(vec3(146682.682, 0, 523364.784))),
        createTree(fromOrigin(vec3(146685.754, 0, 523369.330))),
        createTree(fromOrigin(vec3(146700.594, 0, 523371.704))),
        createTree(fromOrigin(vec3(146705.504, 0, 523368.434))),
        createTree(fromOrigin(vec3(146661.196, 0, 523349.799))),
        createTree(fromOrigin(vec3(146664.687, 0, 523346.577))),
        createTree(fromOrigin(vec3(146674.660, 0, 523348.134))),
        createTree(fromOrigin(vec3(146684.546, 0, 523349.694))),
        createTree(fromOrigin(vec3(146694.466, 0, 523351.263))),
        createTree(fromOrigin(vec3(146684.483, 0, 523353.525))),
        createTree(fromOrigin(vec3(146707.305, 0, 523357.174))),
        createTree(fromOrigin(vec3(146704.353, 0, 523352.825))),
        createTree(fromOrigin(vec3(146592.472, wLev * 0.8, 523340.454))),

        createTree(fromOrigin(vec3(146600.479, 0, 523351.380))),
        createTree(fromOrigin(vec3(146602.454, 0, 523359.002))),
        createTree(fromOrigin(vec3(146611.575, 0, 523356.857))),
        createTree(fromOrigin(vec3(146617.865, 0, 523359.694))),
        createTree(fromOrigin(vec3(146623.084, 0, 523355.009))),
        createTree(fromOrigin(vec3(146626.316, 0, 523359.405))),
        createTree(fromOrigin(vec3(146641.155, 0, 523361.781))),
        createTree(fromOrigin(vec3(146646.668, 0, 523358.784))),
        createTree(fromOrigin(vec3(146602.296, 0, 523340.136))),
        createTree(fromOrigin(vec3(146607.080, 0, 523337.101))),
        createTree(fromOrigin(vec3(146617.031, 0, 523338.912))),
        createTree(fromOrigin(vec3(146625.018, 0, 523343.988))),
        createTree(fromOrigin(vec3(146626.786, 0, 523340.237))),
        createTree(fromOrigin(vec3(146636.709, 0, 523341.807))),
        createTree(fromOrigin(vec3(146646.728, 0, 523343.607))),
        createTree(fromOrigin(vec3(146648.471, 0, 523347.763))),

        // Roads & Bridges

        // A
        createRoad([
            fromOrigin(vec3(146587.540, 0, 523322.125)),
            fromOrigin(vec3(146753.584, 0, 523348.882)),
            fromOrigin(vec3(146753.408, 0, 523354.728)),
            fromOrigin(vec3(146743.475, 0, 523353.137)),
            fromOrigin(vec3(146716.124, 0, 523348.755)),
            fromOrigin(vec3(146710.699, 0, 523347.886)),
            fromOrigin(vec3(146660.189, 0, 523339.794)),
            fromOrigin(vec3(146654.772, 0, 523338.884)),
            fromOrigin(vec3(146599.947, 0, 523330.107)),
            fromOrigin(vec3(146595.987, 0, 523329.463)),
            fromOrigin(vec3(146587.407, 0, 523327.965)),
        ]);

        // B
        createRoad([
            fromOrigin(vec3(146595.987, 0, 523329.463)),
            fromOrigin(vec3(146599.947, 0, 523330.107)),
            fromOrigin(vec3(146598.004, 0, 523342.575)),
            fromOrigin(vec3(146597.082, 0, 523348.495)),
            fromOrigin(vec3(146596.247, 0, 523353.855)),
            fromOrigin(vec3(146594.947, 0, 523429.639)),
            fromOrigin(vec3(146594.887, 0, 523433.134)),
            fromOrigin(vec3(146593.649, 0, 523505.281)),
            fromOrigin(vec3(146596.145, 0, 523505.323)),
            fromOrigin(vec3(146646.066, 0, 523506.179)),
            fromOrigin(vec3(146648.562, 0, 523506.222)),
            fromOrigin(vec3(146649.796, 0, 523434.075)),
            fromOrigin(vec3(146653.766, 0, 523435.641)),
            fromOrigin(vec3(146652.168, 0, 523528.984)),
            fromOrigin(vec3(146648.173, 0, 523528.914)),
            fromOrigin(vec3(146648.494, 0, 523510.215)),
            fromOrigin(vec3(146589.587, 0, 523509.206)),
            fromOrigin(vec3(146590.891, 0, 523433.177)),
            fromOrigin(vec3(146590.952, 0, 523429.611)),
            fromOrigin(vec3(146592.259, 0, 523353.390)),
        ]);

        // C
        createRoad([
            fromOrigin(vec3(146654.772, 0, 523338.884)),
            fromOrigin(vec3(146660.189, 0, 523339.794)),
            fromOrigin(vec3(146658.231, 0, 523352.216)),
            fromOrigin(vec3(146657.299, 0, 523358.123)),
            fromOrigin(vec3(146656.506, 0, 523363.156)),
            fromOrigin(vec3(146655.349, 0, 523430.674)),
            fromOrigin(vec3(146705.771, 0, 523431.538)),
            fromOrigin(vec3(146705.814, 0, 523429.041)),
            fromOrigin(vec3(146716.796, 0, 523429.230)),
            fromOrigin(vec3(146716.609, 0, 523440.213)),
            fromOrigin(vec3(146705.625, 0, 523440.025)),
            fromOrigin(vec3(146705.685, 0, 523436.530)),
            fromOrigin(vec3(146653.766, 0, 523435.641)),
            fromOrigin(vec3(146649.796, 0, 523434.075)),
            fromOrigin(vec3(146649.856, 0, 523430.580 )),
            fromOrigin(vec3(146651.024, 0, 523362.312)),
            fromOrigin(vec3(146651.833, 0, 523357.256)),
            fromOrigin(vec3(146652.774, 0, 523351.371)),
        ]);

        // D
        createRoad([
            fromOrigin(vec3(146710.699, 0, 523347.886)),
            fromOrigin(vec3(146716.124, 0, 523348.755)),
            fromOrigin(vec3(146713.191, 0, 523367.071)),
            fromOrigin(vec3(146712.675, 0, 523397.223)),
            fromOrigin(vec3(146740.215, 0, 523397.706)),
            fromOrigin(vec3(146740.112, 0, 523403.689)),
            fromOrigin(vec3(146706.258, 0, 523403.112)),
            fromOrigin(vec3(146707.730, 0, 523366.197)),
            fromOrigin(vec3(146708.715, 0, 523360.284)),
        ]);

        // E
        createRoad([
            fromOrigin(vec3(146598.004, 0, 523342.575)),
            fromOrigin(vec3(146652.774, 0, 523351.371)),
            fromOrigin(vec3(146651.833, 0, 523357.256)),
            fromOrigin(vec3(146597.082, 0, 523348.495)),
        ]);

        // F
        createRoad([
            fromOrigin(vec3(146658.231, 0, 523352.216)),
            fromOrigin(vec3(146708.715, 0, 523360.284)),
            fromOrigin(vec3(146707.730, 0, 523366.197)),
            fromOrigin(vec3(146657.299, 0, 523358.123)),
        ]);

        createCyclepath([
            fromOrigin(vec3(146590.952, 0, 523429.611)),
            fromOrigin(vec3(146590.891, 0, 523433.177)),
            fromOrigin(vec3(146585.036, 0, 523433.177)),
            fromOrigin(vec3(146585.117, 0, 523429.570)),
        ]);

        createCyclepath([
            fromOrigin(vec3(146594.947, 0, 523429.639)),
            fromOrigin(vec3(146649.856, 0, 523430.580)),
            fromOrigin(vec3(146649.796, 0, 523434.075)),
            fromOrigin(vec3(146594.887, 0, 523433.134)),
        ]);

        createCyclepath([
            fromOrigin(vec3(146753.408, 0, 523354.728)),
            fromOrigin(vec3(146753.302, 0, 523358.250)),
            fromOrigin(vec3(146746.899, 0, 523357.226)),
            fromOrigin(vec3(146745.555, 0, 523435.715)),
            fromOrigin(vec3(146716.694, 0, 523435.221)),
            fromOrigin(vec3(146716.754, 0, 523431.726)),
            fromOrigin(vec3(146742.121, 0, 523432.161)),
            fromOrigin(vec3(146743.475, 0, 523353.137)),
        ]);

        createPavement([
            fromOrigin(vec3(146587.351, 0, 523330.503)),
            fromOrigin(vec3(146587.408, 0, 523327.979)),
            fromOrigin(vec3(146595.988, 0, 523329.463)),
            fromOrigin(vec3(146595.603, 0, 523331.930)),
        ]);
        createBridge([
            fromOrigin(vec3(146576.795, 0, 523328.802)),
            fromOrigin(vec3(146576.945, 0, 523320.419)),
            fromOrigin(vec3(146587.540, 0, 523322.126)),
            fromOrigin(vec3(146587.351, 0, 523330.503)),
        ]);

        createPavement([
            fromOrigin(vec3(146585.117, 0, 523429.570)),
            fromOrigin(vec3(146585.171, 0, 523427.179)),
            fromOrigin(vec3(146590.993, 0, 523427.180)),
            fromOrigin(vec3(146590.952, 0, 523429.611)),
        ]);
        createBridge([
            fromOrigin(vec3(146575.396, 0, 523433.177)),
            fromOrigin(vec3(146575.456, 0, 523427.186)),
            fromOrigin(vec3(146585.171, 0, 523427.180)),
            fromOrigin(vec3(146585.036, 0, 523433.177)),
        ]);

        createBridge([
            fromOrigin(vec3(146753.302, 0, 523358.250)),
            fromOrigin(vec3(146753.584, 0, 523348.882)),
            fromOrigin(vec3(146761.114, 0, 523350.095)),
            fromOrigin(vec3(146760.509, 0, 523359.412)),
        ]);

        // Block 1

        createPavement([
            fromOrigin(vec3(146589.587, 0, 523509,206)),
            fromOrigin(vec3(146648.494, 0, 523510.215)),
            fromOrigin(vec3(146648.173, 0, 523528.915)),
            fromOrigin(vec3(146652.168, 0, 523528.984)),
            fromOrigin(vec3(146651.936, 0, 523542.523)),
            fromOrigin(vec3(146645.458, 0, 523541.673)),
            fromOrigin(vec3(146645.956, 0, 523512.668)),
            fromOrigin(vec3(146596.033, 0, 523511.814)),
            fromOrigin(vec3(146595.548, 0, 523540.150)),
            fromOrigin(vec3(146589.056, 0, 523540.150)),
        ]);

        createKavel([
            fromOrigin(vec3(146595.480, 0, 523544.074)),
            fromOrigin(vec3(146596.033, 0, 523511.814)),
            fromOrigin(vec3(146610.012, 0, 523512.053)),
            fromOrigin(vec3(146609.510, 0, 523541.330)),
        ]);
        createHouse([
            fromOrigin(vec3(146597.950, 0, 523516.598)),
            fromOrigin(vec3(146603.949, 0, 523516.702)),
            fromOrigin(vec3(146603.776, 0, 523526.700)),
            fromOrigin(vec3(146597.777, 0, 523526.596)),
        ]);

        createKavel([
            fromOrigin(vec3(146609.510, 0, 523541.330)),
            fromOrigin(vec3(146610.012, 0, 523512.053)),
            fromOrigin(vec3(146620.994, 0, 523512.241)),
            fromOrigin(vec3(146620.503, 0, 523540.896)),
        ]);
        createHouse([
            fromOrigin(vec3(146620.910, 0, 523517.139)),
            fromOrigin(vec3(146620.755, 0, 523526.137)),
            fromOrigin(vec3(146614.556, 0, 523526.030)),
            fromOrigin(vec3(146614.711, 0, 523517.031)),
        ]);

        createKavel([
            fromOrigin(vec3(146620.503, 0, 523540.896)),
            fromOrigin(vec3(146620.994, 0, 523512.241)),
            fromOrigin(vec3(146631.977, 0, 523512.429)),
            fromOrigin(vec3(146631.494, 0, 523540.645)),
        ]);
        createHouse([
            fromOrigin(vec3(146627.109, 0, 523517.246)),
            fromOrigin(vec3(146626.954, 0, 523526.245)),
            fromOrigin(vec3(146620.755, 0, 523526.137)),
            fromOrigin(vec3(146620.910, 0, 523517.139)),
        ]);

        createKavel([
            fromOrigin(vec3(146631.494, 0, 523540.645)),
            fromOrigin(vec3(146631.977, 0, 523512.429)),
            fromOrigin(vec3(146645.956, 0, 523512.668)),
            fromOrigin(vec3(146645.458, 0, 523541.673)),
        ]);
        createHouse([
            fromOrigin(vec3(146637.889, 0, 523517.267)),
            fromOrigin(vec3(146643.887, 0, 523517.370)),
            fromOrigin(vec3(146643.714, 0, 523527.369)),
            fromOrigin(vec3(146637.715, 0, 523527.265)),
        ]);

        // Block 2

        createVerge([
            fromOrigin(vec3(146655.424, 0, 523542.981)),
            fromOrigin(vec3(146651.936, 0, 523542.523)),
            fromOrigin(vec3(146653.766, 0, 523435.641)),
            fromOrigin(vec3(146668.958, 0, 523435.901)),
            fromOrigin(vec3(146668.915, 0, 523438.416)),
            fromOrigin(vec3(146657.218, 0, 523438.215)),
        ], [false, true, true, false, true, true]);

        createKavel([
            fromOrigin(vec3(146668.915, 0, 523438.416)),
            fromOrigin(vec3(146668.498, 0, 523462.722)),
            fromOrigin(vec3(146656.801, 0, 523462.521)),
            fromOrigin(vec3(146657.218, 0, 523438.215)),
        ]);
        createHouse([
            fromOrigin(vec3(146659.995, 0, 523445.500)),
            fromOrigin(vec3(146665.994, 0, 523445.604)),
            fromOrigin(vec3(146665.821, 0, 523455.603)),
            fromOrigin(vec3(146659.822, 0, 523455.499)),
        ]);

        createKavel([
            fromOrigin(vec3(146656.801, 0, 523462.521)),
            fromOrigin(vec3(146668.498, 0, 523462.722)),
            fromOrigin(vec3(146668.036, 0, 523489.679)),
            fromOrigin(vec3(146656.340, 0, 523489.479)),
        ]);
        createHouse([
            fromOrigin(vec3(146659.534, 0, 523472.465)),
            fromOrigin(vec3(146665.533, 0, 523472.569)),
            fromOrigin(vec3(146665.360, 0, 523482.568)),
            fromOrigin(vec3(146659.361, 0, 523482.464)),
        ]);

        createKavel([
            fromOrigin(vec3(146656.340, 0, 523489.479)),
            fromOrigin(vec3(146668.036, 0, 523489.679)),
            fromOrigin(vec3(146667.573, 0, 523516.638)),
            fromOrigin(vec3(146655.878, 0, 523516.437)),
        ]);
        createHouse([
            fromOrigin(vec3(146659.189, 0, 523499.455)),
            fromOrigin(vec3(146665.188, 0, 523499.558)),
            fromOrigin(vec3(146665.015, 0, 523509.557)),
            fromOrigin(vec3(146659.015, 0, 523509.453)),
        ]);

        createKavel([
            fromOrigin(vec3(146655.878, 0, 523516.437)),
            fromOrigin(vec3(146667.573, 0, 523516.638)),
            fromOrigin(vec3(146667.119, 0, 523542.779)),
            fromOrigin(vec3(146655.424, 0, 523542.981)),
        ]);
        createHouse([
            fromOrigin(vec3(146658.727, 0, 523526.099)),
            fromOrigin(vec3(146664.726, 0, 523526.203)),
            fromOrigin(vec3(146664.553, 0, 523536.201)),
            fromOrigin(vec3(146658.554, 0, 523536.098)),
        ]);

        // Block 3

        createPavement([
            fromOrigin(vec3(146594.887, 0, 523433.134)),
            fromOrigin(vec3(146597.378, 0, 523433.177)),
            fromOrigin(vec3(146596.145, 0, 523505.323)),
            fromOrigin(vec3(146593.649, 0, 523505.281)),
        ]);
        createPavement([
            fromOrigin(vec3(146647.302, 0, 523434.032)),
            fromOrigin(vec3(146649.796, 0, 523434.075)),
            fromOrigin(vec3(146648.562, 0, 523506.222)),
            fromOrigin(vec3(146646.066, 0, 523506.179)),
        ]);
        createSharedFootpath([
            fromOrigin(vec3(146620.570, 0, 523449.554)),
            fromOrigin(vec3(146622.068, 0, 523449.579)),
            fromOrigin(vec3(146621.574, 0, 523478.334)),
            fromOrigin(vec3(146620.077, 0, 523478.308)),
        ]);

        createRoad([
            fromOrigin(vec3(146621.878, 0, 523460.691)),
            fromOrigin(vec3(146621.981, 0, 523454.702)),
            fromOrigin(vec3(146646.941, 0, 523455.128)),
            fromOrigin(vec3(146646.838, 0, 523461.128)),
        ]);

        createParkingArea([
            fromOrigin(vec3(146621.790, 0, 523465.814)),
            fromOrigin(vec3(146621.878, 0, 523460.691)),
            fromOrigin(vec3(146646.838, 0, 523461.128)),
            fromOrigin(vec3(146646.751, 0, 523466.241)),
        ]);
        createParking([
            fromOrigin(vec3(146623.589, 0, 523465.561)),
            fromOrigin(vec3(146623.666, 0, 523461.031)),
            fromOrigin(vec3(146625.566, 0, 523461.064)),
            fromOrigin(vec3(146625.489, 0, 523465.593)),
        ]);
        createParking([
            fromOrigin(vec3(146626.089, 0, 523465.603)),
            fromOrigin(vec3(146626.166, 0, 523461.074)),
            fromOrigin(vec3(146628.066, 0, 523461.106)),
            fromOrigin(vec3(146627.988, 0, 523465.636)),
        ]);
        createParking([
            fromOrigin(vec3(146628.588, 0, 523465.646)),
            fromOrigin(vec3(146628.666, 0, 523461.117)),
            fromOrigin(vec3(146630.565, 0, 523461.149)),
            fromOrigin(vec3(146630.488, 0, 523465.678)),
        ]);
        createParking([
            fromOrigin(vec3(146631.088, 0, 523465.689)),
            fromOrigin(vec3(146631.165, 0, 523461.159)),
            fromOrigin(vec3(146633.065, 0, 523461.192)),
            fromOrigin(vec3(146632.988, 0, 523465.721)),
        ]);
        createParking([
            fromOrigin(vec3(146635.074, 0, 523465.757)),
            fromOrigin(vec3(146635.151, 0, 523461.228)),
            fromOrigin(vec3(146637.051, 0, 523461.261)),
            fromOrigin(vec3(146636.974, 0, 523465.790)),
        ]);
        createParking([
            fromOrigin(vec3(146637.574, 0, 523465.800)),
            fromOrigin(vec3(146637.651, 0, 523461.271)),
            fromOrigin(vec3(146639.551, 0, 523461.303)),
            fromOrigin(vec3(146639.473, 0, 523465.833)),
        ]);
        createParking([
            fromOrigin(vec3(146640.073, 0, 523465.843)),
            fromOrigin(vec3(146640.151, 0, 523461.313)),
            fromOrigin(vec3(146642.050, 0, 523461.346)),
            fromOrigin(vec3(146641.973, 0, 523465.875)),
        ]);
        createParking([
            fromOrigin(vec3(146642.573, 0, 523465.885)),
            fromOrigin(vec3(146642.650, 0, 523461.356)),
            fromOrigin(vec3(146644.550, 0, 523461.389)),
            fromOrigin(vec3(146644.473, 0, 523465.918)),
        ]);


        createParkingArea([
            fromOrigin(vec3(146621.981, 0, 523454.702)),
            fromOrigin(vec3(146622.068, 0, 523449.580)),
            fromOrigin(vec3(146647.029, 0, 523450.007)),
            fromOrigin(vec3(146646.941, 0, 523455.128)),
        ]);
        createParking([
            fromOrigin(vec3(146623.779, 0, 523454.432)),
            fromOrigin(vec3(146623.856, 0, 523449.903)),
            fromOrigin(vec3(146625.756, 0, 523449.935)),
            fromOrigin(vec3(146625.679, 0, 523454.465)),
        ]);
        createParking([
            fromOrigin(vec3(146626.279, 0, 523454.475)),
            fromOrigin(vec3(146626.356, 0, 523449.946)),
            fromOrigin(vec3(146628.256, 0, 523449.978)),
            fromOrigin(vec3(146628.178, 0, 523454.507)),
        ]);
        createParking([
            fromOrigin(vec3(146628.778, 0, 523454.518)),
            fromOrigin(vec3(146628.856, 0, 523449.988)),
            fromOrigin(vec3(146630.755, 0, 523450.021)),
            fromOrigin(vec3(146630.678, 0, 523454.550)),
        ]);
        createParking([
            fromOrigin(vec3(146631.278, 0, 523454.560)),
            fromOrigin(vec3(146631.355, 0, 523450.031)),
            fromOrigin(vec3(146633.255, 0, 523450.063)),
            fromOrigin(vec3(146633.178, 0, 523454.593)),
        ]);
        createParking([
            fromOrigin(vec3(146635.264, 0, 523454.629)),
            fromOrigin(vec3(146635.341, 0, 523450.100)),
            fromOrigin(vec3(146637.241, 0, 523450.132)),
            fromOrigin(vec3(146637.164, 0, 523454.662)),
        ]);
        createParking([
            fromOrigin(vec3(146637.764, 0, 523454.672)),
            fromOrigin(vec3(146637.841, 0, 523450.142)),
            fromOrigin(vec3(146639.741, 0, 523450.175)),
            fromOrigin(vec3(146639.663, 0, 523454.704)),
        ]);
        createParking([
            fromOrigin(vec3(146640.263, 0, 523454.714)),
            fromOrigin(vec3(146640.341, 0, 523450.185)),
            fromOrigin(vec3(146642.240, 0, 523450.218)),
            fromOrigin(vec3(146642.163, 0, 523454.747)),
        ]);
        createParking([
            fromOrigin(vec3(146642.763, 0, 523454.757)),
            fromOrigin(vec3(146642.840, 0, 523450.228)),
            fromOrigin(vec3(146644.740, 0, 523450.260)),
            fromOrigin(vec3(146644.663, 0, 523454.790)),
        ]);

        createParkingArea([
            fromOrigin(vec3(146646.101, 0, 523504.183)),
            fromOrigin(vec3(146646.066, 0, 523506.179)),
            fromOrigin(vec3(146596.145, 0, 523505.323)),
            fromOrigin(vec3(146596.179, 0, 523503.327)),
        ]);
        createParking([
            fromOrigin(vec3(146598.669, 0, 523505.067)),
            fromOrigin(vec3(146598.693, 0, 523503.667)),
            fromOrigin(vec3(146604.342, 0, 523503.764)),
            fromOrigin(vec3(146604.318, 0, 523505.164)),
        ]);
        createParking([
            fromOrigin(vec3(146604.918, 0, 523505.164)),
            fromOrigin(vec3(146604.942, 0, 523503.774)),
            fromOrigin(vec3(146610.591, 0, 523503.871)),
            fromOrigin(vec3(146610.567, 0, 523505.271)),
        ]);
        createParking([
            fromOrigin(vec3(146611.167, 0, 523505.281)),
            fromOrigin(vec3(146611.191, 0, 523503.881)),
            fromOrigin(vec3(146616.840, 0, 523503.978)),
            fromOrigin(vec3(146616.816, 0, 523505.378)),
        ]);
        createParking([
            fromOrigin(vec3(146617.416, 0, 523505.388)),
            fromOrigin(vec3(146617.440, 0, 523503.988)),
            fromOrigin(vec3(146623.089, 0, 523504.085)),
            fromOrigin(vec3(146623.065, 0, 523505.485)),
        ]);
        createParking([
            fromOrigin(vec3(146623.665, 0, 523505.495)),
            fromOrigin(vec3(146623.689, 0, 523504.096)),
            fromOrigin(vec3(146629.338, 0, 523504.192)),
            fromOrigin(vec3(146629.314, 0, 523505.592)),
        ]);
        createParking([
            fromOrigin(vec3(146629.914, 0, 523505.602)),
            fromOrigin(vec3(146629.938, 0, 523504.203)),
            fromOrigin(vec3(146635.587, 0, 523504.300)),
            fromOrigin(vec3(146635.563, 0, 523505.699)),
        ]);
        createParking([
            fromOrigin(vec3(146636.163, 0, 523505.710)),
            fromOrigin(vec3(146636.187, 0, 523504.310)),
            fromOrigin(vec3(146641.836, 0, 523504.407)),
            fromOrigin(vec3(146641.812, 0, 523505.805)),
        ]);

        createKavel([
            fromOrigin(vec3(146596.179, 0, 523503.327)),
            fromOrigin(vec3(146596.470, 0, 523486.293)),
            fromOrigin(vec3(146621.431, 0, 523486.721)),
            fromOrigin(vec3(146621.139, 0, 523503.755)),
        ]);
        createHouse([
            fromOrigin(vec3(146600.974, 0, 523500.309)),
            fromOrigin(vec3(146601.078, 0, 523494.311)),
            fromOrigin(vec3(146611.076, 0, 523494.484)),
            fromOrigin(vec3(146610.972, 0, 523500.483)),
        ]);

        createKavel([
            fromOrigin(vec3(146596.470, 0, 523486.293)),
            fromOrigin(vec3(146596.615, 0, 523477.907)),
            fromOrigin(vec3(146621.574, 0, 523478.334)),
            fromOrigin(vec3(146621.431, 0, 523486.721)),
        ]);
        createHouse([
            fromOrigin(vec3(146608.514, 0, 523483.611)),
            fromOrigin(vec3(146599.515, 0, 523483.457)),
            fromOrigin(vec3(146599.609, 0, 523477.958)),
            fromOrigin(vec3(146608.608, 0, 523478.112)),
        ]);

        createKavel([
            fromOrigin(vec3(146596.615, 0, 523477.907)),
            fromOrigin(vec3(146596.702, 0, 523472.815)),
            fromOrigin(vec3(146620.164, 0, 523473.216)),
            fromOrigin(vec3(146620.077, 0, 523478.308)),
        ]);
        createHouse([
            fromOrigin(vec3(146608.608, 0, 523478.112)),
            fromOrigin(vec3(146599.609, 0, 523477.958)),
            fromOrigin(vec3(146599.697, 0, 523472.859)),
            fromOrigin(vec3(146608.695, 0, 523473.013)),
        ]);

        createKavel([
            fromOrigin(vec3(146596.702, 0, 523472.815)),
            fromOrigin(vec3(146596.789, 0, 523467.723)),
            fromOrigin(vec3(146620.252, 0, 523468.124)),
            fromOrigin(vec3(146620.164, 0, 523473.216)),
        ]);
        createHouse([
            fromOrigin(vec3(146608.695, 0, 523473.013)),
            fromOrigin(vec3(146599.697, 0, 523472.859)),
            fromOrigin(vec3(146599.784, 0, 523467.759)),
            fromOrigin(vec3(146608.783, 0, 523467.914)),
        ]);

        createKavel([
            fromOrigin(vec3(146596.789, 0, 523467.723)),
            fromOrigin(vec3(146596.876, 0, 523462.630)),
            fromOrigin(vec3(146620.339, 0, 523463.032)),
            fromOrigin(vec3(146620.252, 0, 523468.124)),
        ]);
        createHouse([
            fromOrigin(vec3(146608.783, 0, 523467.914)),
            fromOrigin(vec3(146599.784, 0, 523467.759)),
            fromOrigin(vec3(146599.872, 0, 523462.660)),
            fromOrigin(vec3(146608.870, 0, 523462.814)),
        ]);

        createKavel([
            fromOrigin(vec3(146596.876, 0, 523462.630)),
            fromOrigin(vec3(146596.964, 0, 523457.538)),
            fromOrigin(vec3(146620.426, 0, 523457.940)),
            fromOrigin(vec3(146620.339, 0, 523463.032)),
        ]);
        createHouse([
            fromOrigin(vec3(146608.870, 0, 523462.814)),
            fromOrigin(vec3(146599.872, 0, 523462.660)),
            fromOrigin(vec3(146599.959, 0, 523457.561)),
            fromOrigin(vec3(146608.958, 0, 523457.715)),
        ]);

        createKavel([
            fromOrigin(vec3(146596.964, 0, 523457.538)),
            fromOrigin(vec3(146597.107, 0, 523449.152)),
            fromOrigin(vec3(146620.570, 0, 523449.554)),
            fromOrigin(vec3(146620.426, 0, 523457.940)),
        ]);
        createHouse([
            fromOrigin(vec3(146608.958, 0, 523457.715)),
            fromOrigin(vec3(146599.959, 0, 523457.561)),
            fromOrigin(vec3(146600.053, 0, 523452.062)),
            fromOrigin(vec3(146609.052, 0, 523452.216)),
        ]);

        createKavel([
            fromOrigin(vec3(146597.107, 0, 523449.152)),
            fromOrigin(vec3(146597.378, 0, 523433.177)),
            fromOrigin(vec3(146622.341, 0, 523433.605)),
            fromOrigin(vec3(146622.068, 0, 523449.579)),
        ]);
        createHouse([
            fromOrigin(vec3(146601.370, 0, 523441.073)),
            fromOrigin(vec3(146601.474, 0, 523435.074)),
            fromOrigin(vec3(146611.473, 0, 523435.247)),
            fromOrigin(vec3(146611.369, 0, 523441.246)),
        ]);

        createKavel([
            fromOrigin(vec3(146621.139, 0, 523503.755)),
            fromOrigin(vec3(146621.413, 0, 523487.779)),
            fromOrigin(vec3(146646.374, 0, 523488,206)),
            fromOrigin(vec3(146646.101, 0, 523504.182)),
        ]);
        createHouse([
            fromOrigin(vec3(146631.412, 0, 523500.829)),
            fromOrigin(vec3(146631.516, 0, 523494.830)),
            fromOrigin(vec3(146641.514, 0, 523495.003)),
            fromOrigin(vec3(146641.410, 0, 523501.002)),
        ]);

        createKavel([
            fromOrigin(vec3(146621.413, 0, 523487.779)),
            fromOrigin(vec3(146621.601, 0, 523476.797)),
            fromOrigin(vec3(146646.562, 0, 523477.224)),
            fromOrigin(vec3(146646.374, 0, 523488.206)),
        ]);
        createHouse([
            fromOrigin(vec3(146643.111, 0, 523483.366)),
            fromOrigin(vec3(146634.112, 0, 523483.210)),
            fromOrigin(vec3(146634.220, 0, 523477.011)),
            fromOrigin(vec3(146643.218, 0, 523477.167)),
        ]);

        createKavel([
            fromOrigin(vec3(146621.601, 0, 523476.797)),
            fromOrigin(vec3(146621.790, 0, 523465.814)),
            fromOrigin(vec3(146646.751, 0, 523466.241)),
            fromOrigin(vec3(146646.562, 0, 523477.224)),
        ]);
        createHouse([
            fromOrigin(vec3(146643.218, 0, 523477.167)),
            fromOrigin(vec3(146634.220, 0, 523477.011)),
            fromOrigin(vec3(146634.327, 0, 523470.812)),
            fromOrigin(vec3(146643.326, 0, 523470.968)),
        ]);

        createKavel([
            fromOrigin(vec3(146622.068, 0, 523449.579)),
            fromOrigin(vec3(146622.341, 0, 523433.605)),
            fromOrigin(vec3(146647.302, 0, 523434.032)),
            fromOrigin(vec3(146647.029, 0, 523450.007)),
        ]);
        createHouse([
            fromOrigin(vec3(146633.029, 0, 523441.614)),
            fromOrigin(vec3(146633.133, 0, 523435.615)),
            fromOrigin(vec3(146643.131, 0, 523435.788)),
            fromOrigin(vec3(146643.027, 0, 523441.787)),
        ]);

        // Block 4

        createParkingArea([
            fromOrigin(vec3(146601.721, 0, 523354.432)),
            fromOrigin(vec3(146602.531, 0, 523349.367)),
            fromOrigin(vec3(146622.253, 0, 523352.522)),
            fromOrigin(vec3(146621.443, 0, 523357.583)),
        ]);
        createParking([
            fromOrigin(vec3(146602.064, 0, 523354.183)),
            fromOrigin(vec3(146602.780, 0, 523349.710)),
            fromOrigin(vec3(146604.656, 0, 523350.011)),
            fromOrigin(vec3(146603.940, 0, 523354.484)),
        ]);
        createParking([
            fromOrigin(vec3(146604.533, 0, 523354.579)),
            fromOrigin(vec3(146605.249, 0, 523350.106)),
            fromOrigin(vec3(146607.125, 0, 523350.406)),
            fromOrigin(vec3(146606.409, 0, 523354.879)),
        ]);
        createParking([
            fromOrigin(vec3(146607.001, 0, 523354.974)),
            fromOrigin(vec3(146607.717, 0, 523350.501)),
            fromOrigin(vec3(146609.593, 0, 523350.801)),
            fromOrigin(vec3(146608.877, 0, 523355.274)),
        ]);
        createParking([
            fromOrigin(vec3(146609.470, 0, 523355.369)),
            fromOrigin(vec3(146610.186, 0, 523350.896)),
            fromOrigin(vec3(146612.062, 0, 523351.197)),
            fromOrigin(vec3(146611.346, 0, 523355.670)),
        ]);
        createParking([
            fromOrigin(vec3(146611.938, 0, 523355.764)),
            fromOrigin(vec3(146612.654, 0, 523351.291)),
            fromOrigin(vec3(146614.531, 0, 523351.592)),
            fromOrigin(vec3(146613.814, 0, 523356.065)),
        ]);
        createParking([
            fromOrigin(vec3(146614.407, 0, 523356.160)),
            fromOrigin(vec3(146615.123, 0, 523351.687)),
            fromOrigin(vec3(146617.000, 0, 523351.987)),
            fromOrigin(vec3(146616.283, 0, 523356.460)),
        ]);
        createParking([
            fromOrigin(vec3(146616.875, 0, 523356.555)),
            fromOrigin(vec3(146617.592, 0, 523352.082)),
            fromOrigin(vec3(146619.468, 0, 523352.382)),
            fromOrigin(vec3(146618.751, 0, 523356.855)),
        ]);
        createParking([
            fromOrigin(vec3(146619.344, 0, 523356.950)),
            fromOrigin(vec3(146620.060, 0, 523352.477)),
            fromOrigin(vec3(146621.936, 0, 523352.778)),
            fromOrigin(vec3(146621.220, 0, 523357.251)),
        ]);

        createParkingArea([
            fromOrigin(vec3(146623.907, 0, 523357.977)),
            fromOrigin(vec3(146624.717, 0, 523352.917)),
            fromOrigin(vec3(146644.439, 0, 523356.072)),
            fromOrigin(vec3(146643.629, 0, 523361.129)),
        ]);
        createParking([
            fromOrigin(vec3(146624.280, 0, 523357.717)),
            fromOrigin(vec3(146624.997, 0, 523353.244)),
            fromOrigin(vec3(146626.873, 0, 523353.544)),
            fromOrigin(vec3(146626.156, 0, 523358.017)),
        ]);
        createParking([
            fromOrigin(vec3(146626.749, 0, 523358.112)),
            fromOrigin(vec3(146627.465, 0, 523353.639)),
            fromOrigin(vec3(146629.341, 0, 523353.939)),
            fromOrigin(vec3(146628.625, 0, 523358.412)),
        ]);
        createParking([
            fromOrigin(vec3(146629.217, 0, 523358.507)),
            fromOrigin(vec3(146629.934, 0, 523354.034)),
            fromOrigin(vec3(146631.810, 0, 523354.335)),
            fromOrigin(vec3(146631.094, 0, 523358.808)),
        ]);
        createParking([
            fromOrigin(vec3(146631.686, 0, 523358.903)),
            fromOrigin(vec3(146632.402, 0, 523354.425)),
            fromOrigin(vec3(146634.278, 0, 523354.730)),
            fromOrigin(vec3(146633.562, 0, 523359.203)),
        ]);
        createParking([
            fromOrigin(vec3(146634.155, 0, 523359.298)),
            fromOrigin(vec3(146634.871, 0, 523354.825)),
            fromOrigin(vec3(146636.747, 0, 523355.125)),
            fromOrigin(vec3(146636.031, 0, 523359.598)),
        ]);
        createParking([
            fromOrigin(vec3(146636.623, 0, 523359.693)),
            fromOrigin(vec3(146637.339, 0, 523355.220)),
            fromOrigin(vec3(146639.215, 0, 523355.520)),
            fromOrigin(vec3(146638.499, 0, 523359.993)),
        ]);
        createParking([
            fromOrigin(vec3(146639.092, 0, 523360.088)),
            fromOrigin(vec3(146639.808, 0, 523355.615)),
            fromOrigin(vec3(146641.684, 0, 523355.916)),
            fromOrigin(vec3(146640.968, 0, 523360.389)),
        ]);
        createParking([
            fromOrigin(vec3(146641.560, 0, 523360.484)),
            fromOrigin(vec3(146642.276, 0, 523356.011)),
            fromOrigin(vec3(146644.153, 0, 523356.311)),
            fromOrigin(vec3(146643.436, 0, 523360.784)),
        ]);

        createParkingArea([
            fromOrigin(vec3(146603.476, 0, 523343.454)),
            fromOrigin(vec3(146604.287, 0, 523338.393)),
            fromOrigin(vec3(146624.009, 0, 523341.550)),
            fromOrigin(vec3(146623.197, 0, 523346.621)),
        ]);
        createParking([
            fromOrigin(vec3(146603.793, 0, 523343.210)),
            fromOrigin(vec3(146604.509, 0, 523338.737)),
            fromOrigin(vec3(146606.385, 0, 523339.037)),
            fromOrigin(vec3(146605.669, 0, 523343.510)),
        ]);
        createParking([
            fromOrigin(vec3(146606.261, 0, 523343.605)),
            fromOrigin(vec3(146606.977, 0, 523339.132)),
            fromOrigin(vec3(146608.854, 0, 523339.433)),
            fromOrigin(vec3(146608.137, 0, 523343.906)),
        ]);
        createParking([
            fromOrigin(vec3(146608.730, 0, 523344.000)),
            fromOrigin(vec3(146609.446, 0, 523339.527)),
            fromOrigin(vec3(146611.322, 0, 523339.828)),
            fromOrigin(vec3(146610.606, 0, 523344.301)),
        ]);
        createParking([
            fromOrigin(vec3(146611.198, 0, 523344.396)),
            fromOrigin(vec3(146611.915, 0, 523339.923)),
            fromOrigin(vec3(146613.791, 0, 523340.223)),
            fromOrigin(vec3(146613.074, 0, 523344.696)),
        ]);
        createParking([
            fromOrigin(vec3(146613.667, 0, 523344.791)),
            fromOrigin(vec3(146614.383, 0, 523340.318)),
            fromOrigin(vec3(146616.259, 0, 523340.618)),
            fromOrigin(vec3(146615.543, 0, 523345.091)),
        ]);
        createParking([
            fromOrigin(vec3(146616.135, 0, 523345.186)),
            fromOrigin(vec3(146616.852, 0, 523340.713)),
            fromOrigin(vec3(146618.728, 0, 523341.014)),
            fromOrigin(vec3(146618.012, 0, 523345.487)),
        ]);
        createParking([
            fromOrigin(vec3(146618.604, 0, 523345.582)),
            fromOrigin(vec3(146619.320, 0, 523341.109)),
            fromOrigin(vec3(146621.196, 0, 523341.409)),
            fromOrigin(vec3(146620.480, 0, 523345.882)),
        ]);
        createParking([
            fromOrigin(vec3(146621.072, 0, 523345.977)),
            fromOrigin(vec3(146621.789, 0, 523341.504)),
            fromOrigin(vec3(146623.665, 0, 523341.804)),
            fromOrigin(vec3(146622.949, 0, 523346.277)),
        ]);

        createParkingArea([
            fromOrigin(vec3(146625.661, 0, 523347.017)),
            fromOrigin(vec3(146626.473, 0, 523341.939)),
            fromOrigin(vec3(146646.195, 0, 523345.097)),
            fromOrigin(vec3(146645.380, 0, 523350.183)),
        ]);
        createParking([
            fromOrigin(vec3(146625.975, 0, 523346.772)),
            fromOrigin(vec3(146626.692, 0, 523342.299)),
            fromOrigin(vec3(146628.568, 0, 523342.600)),
            fromOrigin(vec3(146627.852, 0, 523347.073)),
        ]);
        createParking([
            fromOrigin(vec3(146628.444, 0, 523347.168)),
            fromOrigin(vec3(146629.160, 0, 523342.695)),
            fromOrigin(vec3(146631.036, 0, 523342.995)),
            fromOrigin(vec3(146630.320, 0, 523347.468)),
        ]);
        createParking([
            fromOrigin(vec3(146630.913, 0, 523347.563)),
            fromOrigin(vec3(146631.629, 0, 523343.090)),
            fromOrigin(vec3(146633.505, 0, 523343.390)),
            fromOrigin(vec3(146632.789, 0, 523347.863)),
        ]);
        createParking([
            fromOrigin(vec3(146633.381, 0, 523347.958)),
            fromOrigin(vec3(146634.097, 0, 523343.485)),
            fromOrigin(vec3(146635.973, 0, 523343.786)),
            fromOrigin(vec3(146635.257, 0, 523348.259)),
        ]);
        createParking([
            fromOrigin(vec3(146635.850, 0, 523348.353)),
            fromOrigin(vec3(146636.566, 0, 523343.881)),
            fromOrigin(vec3(146638.442, 0, 523344.181)),
            fromOrigin(vec3(146637.726, 0, 523348.654)),
        ]);
        createParking([
            fromOrigin(vec3(146638.318, 0, 523348.749)),
            fromOrigin(vec3(146639.034, 0, 523344.276)),
            fromOrigin(vec3(146640.911, 0, 523344.276)),
            fromOrigin(vec3(146640.194, 0, 523349.049)),
        ]);
        createParking([
            fromOrigin(vec3(146640.787, 0, 523349.144)),
            fromOrigin(vec3(146641.503, 0, 523344.671)),
            fromOrigin(vec3(146643.379, 0, 523344.972)),
            fromOrigin(vec3(146642.663, 0, 523349.444)),
        ]);
        createParking([
            fromOrigin(vec3(146643.255, 0, 523349.539)),
            fromOrigin(vec3(146643.972, 0, 523345.066)),
            fromOrigin(vec3(146645.848, 0, 523345.367)),
            fromOrigin(vec3(146645.131, 0, 523349.840)),
        ]);

        createParkingArea([
            fromOrigin(vec3(146599.639, 0, 523332.0087)),
            fromOrigin(vec3(146599.947, 0, 523330.107)),
            fromOrigin(vec3(146654.772, 0, 523338.884)),
            fromOrigin(vec3(146654.456, 0, 523340.856)),
        ]);
        createParking([
            fromOrigin(vec3(146604.112, 0, 523332.502)),
            fromOrigin(vec3(146604.333, 0, 523331.120)),
            fromOrigin(vec3(146609.912, 0, 523332.012)),
            fromOrigin(vec3(146609.691, 0, 523333.395)),
        ]);
        createParking([
            fromOrigin(vec3(146610.283, 0, 523333.489)),
            fromOrigin(vec3(146610.505, 0, 523332.107)),
            fromOrigin(vec3(146616.084, 0, 523333.000)),
            fromOrigin(vec3(146615.862, 0, 523334.382)),
        ]);
        createParking([
            fromOrigin(vec3(146616.455, 0, 523334.477)),
            fromOrigin(vec3(146616.676, 0, 523333.094)),
            fromOrigin(vec3(146622.255, 0, 523333.987)),
            fromOrigin(vec3(146622.034, 0, 523335.369)),
        ]);
        createParking([
            fromOrigin(vec3(146622.626, 0, 523335.464)),
            fromOrigin(vec3(146622.848, 0, 523334.082)),
            fromOrigin(vec3(146628.427, 0, 523334.974)),
            fromOrigin(vec3(146628.206, 0, 523336.357)),
        ]);
        createParking([
            fromOrigin(vec3(146628.798, 0, 523336.452)),
            fromOrigin(vec3(146629.019, 0, 523335.069)),
            fromOrigin(vec3(146634.598, 0, 523335.962)),
            fromOrigin(vec3(146634.377, 0, 523337.344)),
        ]);
        createParking([
            fromOrigin(vec3(146634.969, 0, 523337.439)),
            fromOrigin(vec3(146635.190, 0, 523336.057)),
            fromOrigin(vec3(146640.770, 0, 523336.949)),
            fromOrigin(vec3(146640.549, 0, 523338.332)),
        ]);
        createParking([
            fromOrigin(vec3(146641.141, 0, 523338.426)),
            fromOrigin(vec3(146641.362, 0, 523337.044)),
            fromOrigin(vec3(146646.941, 0, 523337.937)),
            fromOrigin(vec3(146646.720, 0, 523339.319)),
        ]);

        createPavement([
            fromOrigin(vec3(146594.947, 0, 523429.639)),
            fromOrigin(vec3(146596.247, 0, 523353.855)),
            fromOrigin(vec3(146597.082, 0, 523348.495)),
            fromOrigin(vec3(146599.569, 0, 523348.892)),
            fromOrigin(vec3(146598.739, 0, 523354.075)),
            fromOrigin(vec3(146598.567, 0, 523364.110)),
            fromOrigin(vec3(146648.486, 0, 523364.965)),
            fromOrigin(vec3(146648.642, 0, 523361.304)),
            fromOrigin(vec3(146649.411, 0, 523356.868)),
            fromOrigin(vec3(146651.833, 0, 523357.256)),
            fromOrigin(vec3(146651.024, 0, 523362.311)),
            fromOrigin(vec3(146649.856, 0, 523430.580)),
            fromOrigin(vec3(146594.947, 0, 523429.639)),
            fromOrigin(vec3(146597.483, 0, 523427.186)),
            fromOrigin(vec3(146647.405, 0, 523428.041)),
            fromOrigin(vec3(146648.443, 0, 523367.461)),
            fromOrigin(vec3(146598.523, 0, 523366.607)),
            fromOrigin(vec3(146597.483, 0, 523427.186)),
        ], [ true, true, true, true, true, true, true, true, true, true, true, true, false, true, true, true, true, false ]);

        createSharedFootpath([
            fromOrigin(vec3(146622.444, 0, 523427.614)),
            fromOrigin(vec3(146622.973, 0, 523396.762)),
            fromOrigin(vec3(146624.471, 0, 523396.788)),
            fromOrigin(vec3(146623.941, 0, 523427.639)),
        ]);

        createPavement([
            fromOrigin(vec3(146598.567, 0, 523364.110)),
            fromOrigin(vec3(146598.739, 0, 523354.075)),
            fromOrigin(vec3(146599.569, 0, 523348.892)),
            fromOrigin(vec3(146649.411, 0, 523356.868)),
            fromOrigin(vec3(146648.642, 0, 523361.304)),
            fromOrigin(vec3(146648.486, 0, 523364.965)),
        ]);

        createPavement([
            fromOrigin(vec3(146598.004, 0, 523342.575)),
            fromOrigin(vec3(146599.947, 0, 523330.107)),
            fromOrigin(vec3(146654.772, 0, 523338.884)),
            fromOrigin(vec3(146652.774, 0, 523351.371)),
            fromOrigin(vec3(146650.303, 0, 523350.974)),
            fromOrigin(vec3(146651.598, 0, 523342.927)),
            fromOrigin(vec3(146601.800, 0, 523334.955)),
            fromOrigin(vec3(146600.518, 0, 523342.979)),
        ]);

        createVerge([
            fromOrigin(vec3(146600.518, 0, 523342.979)),
            fromOrigin(vec3(146601.800, 0, 523334.955)),
            fromOrigin(vec3(146651.598, 0, 523342.927)),
            fromOrigin(vec3(146650.303, 0, 523350.974)),
        ]);

        createKavel([
            fromOrigin(vec3(146597.483, 0, 523427.186)),
            fromOrigin(vec3(146597.648, 0, 523417.552)),
            fromOrigin(vec3(146622.609, 0, 523417.979)),
            fromOrigin(vec3(146622.444, 0, 523427.614)),
        ]);
        createHouse([
            fromOrigin(vec3(146611.282, 0, 523423.988)),
            fromOrigin(vec3(146602.283, 0, 523423.832)),
            fromOrigin(vec3(146602.390, 0, 523417.633)),
            fromOrigin(vec3(146611.389, 0, 523417.789)),
        ]);

        createKavel([
            fromOrigin(vec3(146622.609, 0, 523417.979)),
            fromOrigin(vec3(146597.648, 0, 523417.552)),
            fromOrigin(vec3(146597.814, 0, 523407.916)),
            fromOrigin(vec3(146622.774, 0, 523408.343)),
        ]);
        createHouse([
            fromOrigin(vec3(146611.389, 0, 523417.789)),
            fromOrigin(vec3(146602.390, 0, 523417.633)),
            fromOrigin(vec3(146602.497, 0, 523411.434)),
            fromOrigin(vec3(146611.496, 0, 523411.589)),
        ]);

        createKavel([
            fromOrigin(vec3(146622.774, 0, 523408.343)),
            fromOrigin(vec3(146597.814, 0, 523407.916)),
            fromOrigin(vec3(146597.979, 0, 523398.281)),
            fromOrigin(vec3(146622.939, 0, 523398.709)),
        ]);
        createHouse([
            fromOrigin(vec3(146611.611, 0, 523404.717)),
            fromOrigin(vec3(146602.613, 0, 523404.561)),
            fromOrigin(vec3(146602.720, 0, 523398.362)),
            fromOrigin(vec3(146611.719, 0, 523398.518)),
        ]);

        createKavel([
            fromOrigin(vec3(146622.939, 0, 523398.709)),
            fromOrigin(vec3(146597.979, 0, 523398.281)),
            fromOrigin(vec3(146598.145, 0, 523388.647)),
            fromOrigin(vec3(146623.105, 0, 523389.074)),
        ]);
        createHouse([
            fromOrigin(vec3(146611.719, 0, 523398.518)),
            fromOrigin(vec3(146602.720, 0, 523398.362)),
            fromOrigin(vec3(146602.827, 0, 523392.163)),
            fromOrigin(vec3(146611.826, 0, 523392.319)),
        ]);



        createKavel([
            fromOrigin(vec3(146598.145, 0, 523388.647)),
            fromOrigin(vec3(146598.523, 0, 523366.607)),
            fromOrigin(vec3(146605.660, 0, 523366.729)),
            fromOrigin(vec3(146605.282, 0, 523388.769)),
        ]);
        createHouse([
            fromOrigin(vec3(146599.964, 0, 523377.618)),
            fromOrigin(vec3(146600.127, 0, 523368.620)),
            fromOrigin(vec3(146605.626, 0, 523368.720)),
            fromOrigin(vec3(146605.463, 0, 523377.718)),
        ]);

        createKavel([
            fromOrigin(vec3(146605.282, 0, 523388.769)),
            fromOrigin(vec3(146605.660, 0, 523366.729)),
            fromOrigin(vec3(146610.752, 0, 523366.816)),
            fromOrigin(vec3(146610.374, 0, 523388.856)),
        ]);
        createHouse([
            fromOrigin(vec3(146605.463, 0, 523377.718)),
            fromOrigin(vec3(146605.626, 0, 523368.720)),
            fromOrigin(vec3(146610.725, 0, 523368.812)),
            fromOrigin(vec3(146610.562, 0, 523377.811)),
        ]);

        createKavel([
            fromOrigin(vec3(146610.374, 0, 523388.856)),
            fromOrigin(vec3(146610.752, 0, 523366.816)),
            fromOrigin(vec3(146615.843, 0, 523366.903)),
            fromOrigin(vec3(146615.466, 0, 523388.943)),
        ]);
        createHouse([
            fromOrigin(vec3(146610.562, 0, 523377.811)),
            fromOrigin(vec3(146610.725, 0, 523368.812)),
            fromOrigin(vec3(146615.825, 0, 523368.904)),
            fromOrigin(vec3(146615.662, 0, 523377.903)),
        ]);

        createKavel([
            fromOrigin(vec3(146615.466, 0, 523388.943)),
            fromOrigin(vec3(146615.843, 0, 523366.903)),
            fromOrigin(vec3(146620.936, 0, 523366.990)),
            fromOrigin(vec3(146620.558, 0, 523389.030)),
        ]);
        createHouse([
            fromOrigin(vec3(146615.662, 0, 523377.903)),
            fromOrigin(vec3(146615.825, 0, 523368.904)),
            fromOrigin(vec3(146620.924, 0, 523368.997)),
            fromOrigin(vec3(146620.761, 0, 523377.995)),
        ]);

        createKavel([
            fromOrigin(vec3(146620.558, 0, 523389.030)),
            fromOrigin(vec3(146620.936, 0, 523366.990)),
            fromOrigin(vec3(146626.028, 0, 523367.078)),
            fromOrigin(vec3(146625.635, 0, 523390.042)),
            fromOrigin(vec3(146623.089, 0, 523389.998)),
            fromOrigin(vec3(146623.105, 0, 523389.074)),
        ]);
        createHouse([
            fromOrigin(vec3(146620.761, 0, 523377.995)),
            fromOrigin(vec3(146620.924, 0, 523368.997)),
            fromOrigin(vec3(146626.023, 0, 523369.089)),
            fromOrigin(vec3(146625.860, 0, 523378.088)),
        ]);

        createKavel([
            fromOrigin(vec3(146625.635, 0, 523390.042)),
            fromOrigin(vec3(146626.028, 0, 523367.078)),
            fromOrigin(vec3(146631.120, 0, 523367.165)),
            fromOrigin(vec3(146630.727, 0, 523390.129)),
        ]);
        createHouse([
            fromOrigin(vec3(146625.860, 0, 523378.088)),
            fromOrigin(vec3(146626.023, 0, 523369.089)),
            fromOrigin(vec3(146631.122, 0, 523369.182)),
            fromOrigin(vec3(146630.959, 0, 523378.180)),
        ]);

        createKavel([
            fromOrigin(vec3(146630.727, 0, 523390.129)),
            fromOrigin(vec3(146631.120, 0, 523367.165)),
            fromOrigin(vec3(146636.212, 0, 523367.252)),
            fromOrigin(vec3(146635.818, 0, 523390.216)),
        ]);
        createHouse([
            fromOrigin(vec3(146630.959, 0, 523378.180)),
            fromOrigin(vec3(146631.122, 0, 523369.182)),
            fromOrigin(vec3(146636.221, 0, 523369.274)),
            fromOrigin(vec3(146636.058, 0, 523378.273)),
        ]);

        createKavel([
            fromOrigin(vec3(146635.818, 0, 523390.216)),
            fromOrigin(vec3(146636.212, 0, 523367.252)),
            fromOrigin(vec3(146641.304, 0, 523367.339)),
            fromOrigin(vec3(146640.910, 0, 523390.303)),
        ]);
        createHouse([
            fromOrigin(vec3(146636.058, 0, 523378.273)),
            fromOrigin(vec3(146636.221, 0, 523369.274)),
            fromOrigin(vec3(146641.320, 0, 523369.366)),
            fromOrigin(vec3(146641.157, 0, 523378.365)),
        ]);

        createKavel([
            fromOrigin(vec3(146640.910, 0, 523390.303)),
            fromOrigin(vec3(146641.304, 0, 523367.339)),
            fromOrigin(vec3(146648.443, 0, 523367.461)),
            fromOrigin(vec3(146648.050, 0, 523390.425)),
        ]);
        createHouse([
            fromOrigin(vec3(146641.157, 0, 523378.365)),
            fromOrigin(vec3(146641.320, 0, 523369.366)),
            fromOrigin(vec3(146646.820, 0, 523369.466)),
            fromOrigin(vec3(146646.656, 0, 523378.465)),
        ]);



        createKavel([
            fromOrigin(vec3(146647.405, 0, 523428.041)),
            fromOrigin(vec3(146623.941, 0, 523427.639)),
            fromOrigin(vec3(146624.034, 0, 523422.248)),
            fromOrigin(vec3(146647.498, 0, 523422.650)),
        ]);
        createHouse([
            fromOrigin(vec3(146644.408, 0, 523428.098)),
            fromOrigin(vec3(146635.410, 0, 523427.944)),
            fromOrigin(vec3(146635.504, 0, 523422.444)),
            fromOrigin(vec3(146644.502, 0, 523422.599)),
        ]);

        createKavel([
            fromOrigin(vec3(146647.498, 0, 523422.650)),
            fromOrigin(vec3(146624.034, 0, 523422.248)),
            fromOrigin(vec3(146624.121, 0, 523417.156)),
            fromOrigin(vec3(146647.585, 0, 523417.558)),
        ]);
        createHouse([
            fromOrigin(vec3(146644.502, 0, 523422.599)),
            fromOrigin(vec3(146635.504, 0, 523422.444)),
            fromOrigin(vec3(146635.591, 0, 523417.345)),
            fromOrigin(vec3(146644.590, 0, 523417.499)),
        ]);

        createKavel([
            fromOrigin(vec3(146647.585, 0, 523417.558)),
            fromOrigin(vec3(146624.121, 0, 523417.156)),
            fromOrigin(vec3(146624.209, 0, 523412.064)),
            fromOrigin(vec3(146647.672, 0, 523412.466)),
        ]);
        createHouse([
            fromOrigin(vec3(146644.590, 0, 523417.499)),
            fromOrigin(vec3(146635.591, 0, 523417.345)),
            fromOrigin(vec3(146635.678, 0, 523412.246)),
            fromOrigin(vec3(146644.677, 0, 523412.400)),
        ]);

        createKavel([
            fromOrigin(vec3(146647.672, 0, 523412.466)),
            fromOrigin(vec3(146624.209, 0, 523412.064)),
            fromOrigin(vec3(146624.296, 0, 523406.972)),
            fromOrigin(vec3(146647.760, 0, 523407.373)),
        ]);
        createHouse([
            fromOrigin(vec3(146644.677, 0, 523412.400)),
            fromOrigin(vec3(146635.678, 0, 523412.246)),
            fromOrigin(vec3(146635.766, 0, 523407.147)),
            fromOrigin(vec3(146644.764, 0, 523407.301)),
        ]);

        createKavel([
            fromOrigin(vec3(146647.760, 0, 523407.373)),
            fromOrigin(vec3(146624.296, 0, 523406.972)),
            fromOrigin(vec3(146624.383, 0, 523401.880)),
            fromOrigin(vec3(146647.847, 0, 523402.281)),
        ]);
        createHouse([
            fromOrigin(vec3(146644.764, 0, 523407.301)),
            fromOrigin(vec3(146635.766, 0, 523407.147)),
            fromOrigin(vec3(146635.853, 0, 523402.047)),
            fromOrigin(vec3(146644.852, 0, 523402.202)),
        ]);

        createKavel([
            fromOrigin(vec3(146647.847, 0, 523402.281)),
            fromOrigin(vec3(146624.383, 0, 523401.880)),
            fromOrigin(vec3(146624.471, 0, 523396.788)),
            fromOrigin(vec3(146647.934, 0, 523397.189)),
        ]);
        createHouse([
            fromOrigin(vec3(146644.852, 0, 523402.202)),
            fromOrigin(vec3(146635.853, 0, 523402.047)),
            fromOrigin(vec3(146635.941, 0, 523396.948)),
            fromOrigin(vec3(146644.932, 0, 523397.102)),
        ]);

        createKavel([
            fromOrigin(vec3(146647.934, 0, 523397.189)),
            fromOrigin(vec3(146624.471, 0, 523396.788)),
            fromOrigin(vec3(146622.973, 0, 523396.762)),
            fromOrigin(vec3(146623.089, 0, 523389.998)),
            fromOrigin(vec3(146648.050, 0, 523390.425)),
        ]);
        createHouse([
            fromOrigin(vec3(146644.932, 0, 523397.102)),
            fromOrigin(vec3(146635.941, 0, 523396.948)),
            fromOrigin(vec3(146636.028, 0, 523391.449)),
            fromOrigin(vec3(146645.027, 0, 523391.603)),
        ]);

        // Block 5

        createPavement([
            fromOrigin(vec3(146655.350, 0, 523430.674)),
            fromOrigin(vec3(146655.392, 0, 523428.178)),
            fromOrigin(vec3(146705.814, 0, 523429.041)),
            fromOrigin(vec3(146705.771, 0, 523431.538)),
        ]);

        createPavement([
            fromOrigin(vec3(146656.411, 0, 523368.735)),
            fromOrigin(vec3(146656.454, 0, 523366.215)),
            fromOrigin(vec3(146707.395, 0, 523374.363)),
            fromOrigin(vec3(146707.293, 0, 523376.876)),
        ]);

        createPavement([
            fromOrigin(vec3(146659.496, 0, 523344.192)),
            fromOrigin(vec3(146660.189, 0, 523339.794)),
            fromOrigin(vec3(146710.699, 0, 523347.886)),
            fromOrigin(vec3(146709.997, 0, 523352.276)),
        ]);

        createPavement([
            fromOrigin(vec3(146716.330, 0, 523363.204)),
            fromOrigin(vec3(146717.867, 0, 523353.596)),
            fromOrigin(vec3(146740.907, 0, 523357.281)),
            fromOrigin(vec3(146740.337, 0, 523390.581)),
            fromOrigin(vec3(146735.295, 0, 523390.494)),
            fromOrigin(vec3(146735.758, 0, 523363.536)),
        ]);

        createPavement([
            fromOrigin(vec3(146712.675, 0, 523397.223)),
            fromOrigin(vec3(146712.763, 0, 523392.107)),
            fromOrigin(vec3(146740.302, 0, 523392.577)),
            fromOrigin(vec3(146740.215, 0, 523397.706)),
        ]);

        createPavement([
            fromOrigin(vec3(146706.170, 0, 523408.233)),
            fromOrigin(vec3(146706.258, 0, 523403.112)),
            fromOrigin(vec3(146740.112, 0, 523403.689)),
            fromOrigin(vec3(146739.668, 0, 523429.622)),
            fromOrigin(vec3(146734.626, 0, 523429.535)),
            fromOrigin(vec3(146734.983, 0, 523408.726)),
        ]);

        createSharedFootpath([
            fromOrigin(vec3(146659.474, 0, 523394.003)),
            fromOrigin(vec3(146659.500, 0, 523392.490)),
            fromOrigin(vec3(146698.340, 0, 523398.704)),
            fromOrigin(vec3(146698.104, 0, 523400.182)),
        ]);

        createParkingArea([
            fromOrigin(vec3(146706.170, 0, 523408.233)),
            fromOrigin(vec3(146706.258, 0, 523403.112)),
            fromOrigin(vec3(146732.574, 0, 523403.561)),
            fromOrigin(vec3(146732.487, 0, 523408.683)),
        ]);
        createParking([
            fromOrigin(vec3(146707.831, 0, 523407.969)),
            fromOrigin(vec3(146707.908, 0, 523403.440)),
            fromOrigin(vec3(146709.808, 0, 523403.472)),
            fromOrigin(vec3(146709.731, 0, 523408.002)),
        ]);
        createParking([
            fromOrigin(vec3(146710.331, 0, 523408.012)),
            fromOrigin(vec3(146710.408, 0, 523403.482)),
            fromOrigin(vec3(146712.308, 0, 523403.515)),
            fromOrigin(vec3(146712.230, 0, 523408.044)),
        ]);
        createParking([
            fromOrigin(vec3(146712.830, 0, 523408.054)),
            fromOrigin(vec3(146712.908, 0, 523403.525)),
            fromOrigin(vec3(146714.807, 0, 523403.558)),
            fromOrigin(vec3(146714.730, 0, 523408.087)),
        ]);
        createParking([
            fromOrigin(vec3(146715.330, 0, 523408.097)),
            fromOrigin(vec3(146715.407, 0, 523403.568)),
            fromOrigin(vec3(146717.307, 0, 523403.600)),
            fromOrigin(vec3(146717.230, 0, 523408.130)),
        ]);
        createParking([
            fromOrigin(vec3(146717.829, 0, 523408.140)),
            fromOrigin(vec3(146717.907, 0, 523403.610)),
            fromOrigin(vec3(146719.806, 0, 523403.643)),
            fromOrigin(vec3(146719.729, 0, 523408.172)),
        ]);
        createParking([
            fromOrigin(vec3(146720.329, 0, 523408.182)),
            fromOrigin(vec3(146720.406, 0, 523403.653)),
            fromOrigin(vec3(146722.306, 0, 523403.686)),
            fromOrigin(vec3(146722.229, 0, 523408.215)),
        ]);
        createParking([
            fromOrigin(vec3(146722.829, 0, 523408.225)),
            fromOrigin(vec3(146722.906, 0, 523403.696)),
            fromOrigin(vec3(146724.806, 0, 523403.728)),
            fromOrigin(vec3(146724.728, 0, 523408.258)),
        ]);
        createParking([
            fromOrigin(vec3(146725.328, 0, 523408.268)),
            fromOrigin(vec3(146725.406, 0, 523403.738)),
            fromOrigin(vec3(146727.305, 0, 523403.771)),
            fromOrigin(vec3(146727.228, 0, 523408.300)),
        ]);
        createParking([
            fromOrigin(vec3(146727.828, 0, 523408.310)),
            fromOrigin(vec3(146727.905, 0, 523403.781)),
            fromOrigin(vec3(146729.805, 0, 523403.814)),
            fromOrigin(vec3(146729.728, 0, 523408.343)),
        ]);
        createParking([
            fromOrigin(vec3(146730.328, 0, 523408.353)),
            fromOrigin(vec3(146730.405, 0, 523403.824)),
            fromOrigin(vec3(146732.305, 0, 523403.856)),
            fromOrigin(vec3(146732.227, 0, 523408.386)),
        ]);

        createParkingArea([
            fromOrigin(vec3(146717.701, 0, 523397.311)),
            fromOrigin(vec3(146717.789, 0, 523392.193)),
            fromOrigin(vec3(146732.764, 0, 523392.448)),
            fromOrigin(vec3(146732.677, 0, 523397.573)),
        ]);
        createParking([
            fromOrigin(vec3(146718.006, 0, 523397.016)),
            fromOrigin(vec3(146718.084, 0, 523392.487)),
            fromOrigin(vec3(146719.983, 0, 523392.519)),
            fromOrigin(vec3(146719.906, 0, 523397.048)),
        ]);
        createParking([
            fromOrigin(vec3(146720.506, 0, 523397.059)),
            fromOrigin(vec3(146720.583, 0, 523392.529)),
            fromOrigin(vec3(146722.483, 0, 523392.562)),
            fromOrigin(vec3(146722.406, 0, 523397.091)),
        ]);
        createParking([
            fromOrigin(vec3(146723.006, 0, 523397.101)),
            fromOrigin(vec3(146723.083, 0, 523392.572)),
            fromOrigin(vec3(146724.983, 0, 523392.604)),
            fromOrigin(vec3(146724.905, 0, 523397.134)),
        ]);
        createParking([
            fromOrigin(vec3(146725.505, 0, 523397.144)),
            fromOrigin(vec3(146725.583, 0, 523392.615)),
            fromOrigin(vec3(146727.482, 0, 523392.647)),
            fromOrigin(vec3(146727.405, 0, 523397.176)),
        ]);
        createParking([
            fromOrigin(vec3(146728.005, 0, 523397.187)),
            fromOrigin(vec3(146728.082, 0, 523392.657)),
            fromOrigin(vec3(146729.982, 0, 523392.690)),
            fromOrigin(vec3(146729.905, 0, 523397.219)),
        ]);
        createParking([
            fromOrigin(vec3(146730.504, 0, 523397.229)),
            fromOrigin(vec3(146730.582, 0, 523392.700)),
            fromOrigin(vec3(146732.481, 0, 523392.732)),
            fromOrigin(vec3(146732.404, 0, 523397.262)),
        ]);

        createParkingArea([
            fromOrigin(vec3(146715.807, 0, 523350.735)),
            fromOrigin(vec3(146716.124, 0, 523348.755)),
            fromOrigin(vec3(146743.475, 0, 523353.137)),
            fromOrigin(vec3(146743.440, 0, 523355.154)),
        ]);
        createParking([
            fromOrigin(vec3(146720.244, 0, 523351.139)),
            fromOrigin(vec3(146720.465, 0, 523349.757)),
            fromOrigin(vec3(146726.044, 0, 523350.649)),
            fromOrigin(vec3(146725.823, 0, 523352.032)),
        ]);
        createParking([
            fromOrigin(vec3(146726.416, 0, 523352.127)),
            fromOrigin(vec3(146726.637, 0, 523350.744)),
            fromOrigin(vec3(146732.216, 0, 523351.637)),
            fromOrigin(vec3(146731.995, 0, 523353.019)),
        ]);
        createParking([
            fromOrigin(vec3(146732.587, 0, 523353.114)),
            fromOrigin(vec3(146732.808, 0, 523351.732)),
            fromOrigin(vec3(146738.387, 0, 523352.624)),
            fromOrigin(vec3(146738.166, 0, 523354.007)),
        ]);

        createParkingArea([
            fromOrigin(vec3(146661.376, 0, 523363.975)),
            fromOrigin(vec3(146662.187, 0, 523358.906)),
            fromOrigin(vec3(146681.909, 0, 523362.063)),
            fromOrigin(vec3(146681.098, 0, 523367.127)),
        ]);
        createParking([
            fromOrigin(vec3(146661.720, 0, 523363.714)),
            fromOrigin(vec3(146662.436, 0, 523359.241)),
            fromOrigin(vec3(146664.312, 0, 523359.541)),
            fromOrigin(vec3(146663.596, 0, 523364.014)),
        ]);
        createParking([
            fromOrigin(vec3(146664.188, 0, 523364.109)),
            fromOrigin(vec3(146664.905, 0, 523359.636)),
            fromOrigin(vec3(146666.781, 0, 523359.936)),
            fromOrigin(vec3(146666.064, 0, 523364.409)),
        ]);
        createParking([
            fromOrigin(vec3(146666.657, 0, 523364.504)),
            fromOrigin(vec3(146667.373, 0, 523360.031)),
            fromOrigin(vec3(146669.249, 0, 523360.332)),
            fromOrigin(vec3(146668.533, 0, 523364.805)),
        ]);
        createParking([
            fromOrigin(vec3(146669.125, 0, 523364.900)),
            fromOrigin(vec3(146669.842, 0, 523360.427)),
            fromOrigin(vec3(146671.718, 0, 523360.727)),
            fromOrigin(vec3(146671.001, 0, 523365.200)),
        ]);
        createParking([
            fromOrigin(vec3(146671.594, 0, 523365.295)),
            fromOrigin(vec3(146672.310, 0, 523360.822)),
            fromOrigin(vec3(146674.186, 0, 523361.122)),
            fromOrigin(vec3(146673.470, 0, 523365.595)),
        ]);
        createParking([
            fromOrigin(vec3(146674.062, 0, 523365.690)),
            fromOrigin(vec3(146674.779, 0, 523361.217)),
            fromOrigin(vec3(146676.655, 0, 523361.518)),
            fromOrigin(vec3(146675.939, 0, 523365.991)),
        ]);
        createParking([
            fromOrigin(vec3(146676.531, 0, 523366.086)),
            fromOrigin(vec3(146677.247, 0, 523361.613)),
            fromOrigin(vec3(146679.123, 0, 523361.913)),
            fromOrigin(vec3(146678.407, 0, 523366.386)),
        ]);
        createParking([
            fromOrigin(vec3(146678.999, 0, 523366.484)),
            fromOrigin(vec3(146679.661, 0, 523361.992)),
            fromOrigin(vec3(146681.566, 0, 523362.302)),
            fromOrigin(vec3(146680.841, 0, 523366.774)),
        ]);

        createParkingArea([
            fromOrigin(vec3(146683.532, 0, 523367.499)),
            fromOrigin(vec3(146684.368, 0, 523362.487)),
            fromOrigin(vec3(146704.095, 0, 523365.615)),
            fromOrigin(vec3(146703.285, 0, 523370.673)),
        ]);
        createParking([
            fromOrigin(vec3(146683.907, 0, 523367.259)),
            fromOrigin(vec3(146684.623, 0, 523362.787)),
            fromOrigin(vec3(146686.499, 0, 523363.087)),
            fromOrigin(vec3(146685.783, 0, 523367.560)),
        ]);
        createParking([
            fromOrigin(vec3(146686.375, 0, 523367.655)),
            fromOrigin(vec3(146687.092, 0, 523363.182)),
            fromOrigin(vec3(146688.968, 0, 523363.482)),
            fromOrigin(vec3(146688.251, 0, 523367.955)),
        ]);
        createParking([
            fromOrigin(vec3(146688.844, 0, 523368.050)),
            fromOrigin(vec3(146689.560, 0, 523363.577)),
            fromOrigin(vec3(146691.436, 0, 523363.877)),
            fromOrigin(vec3(146690.720, 0, 523368.350)),
        ]);
        createParking([
            fromOrigin(vec3(146691.312, 0, 523368.445)),
            fromOrigin(vec3(146692.029, 0, 523363.972)),
            fromOrigin(vec3(146693.905, 0, 523364.273)),
            fromOrigin(vec3(146693.189, 0, 523368.746)),
        ]);
        createParking([
            fromOrigin(vec3(146693.781, 0, 523368.841)),
            fromOrigin(vec3(146694.497, 0, 523364.368)),
            fromOrigin(vec3(146696.373, 0, 523364.668)),
            fromOrigin(vec3(146695.657, 0, 523369.141)),
        ]);
        createParking([
            fromOrigin(vec3(146696.250, 0, 523369.236)),
            fromOrigin(vec3(146696.966, 0, 523364.763)),
            fromOrigin(vec3(146698.842, 0, 523365.063)),
            fromOrigin(vec3(146698.126, 0, 523369.536)),
        ]);
        createParking([
            fromOrigin(vec3(146698.718, 0, 523369.631)),
            fromOrigin(vec3(146699.434, 0, 523365.158)),
            fromOrigin(vec3(146701.310, 0, 523365.459)),
            fromOrigin(vec3(146700.594, 0, 523369.931)),
        ]);
        createParking([
            fromOrigin(vec3(146701.187, 0, 523370.026)),
            fromOrigin(vec3(146701.903, 0, 523365.553)),
            fromOrigin(vec3(146703.779, 0, 523365.854)),
            fromOrigin(vec3(146703.063, 0, 523370.327)),
        ]);

        createParkingArea([
            fromOrigin(vec3(146663.132, 0, 523353.000)),
            fromOrigin(vec3(146663.943, 0, 523347.933)),
            fromOrigin(vec3(146683.664, 0, 523351.091)),
            fromOrigin(vec3(146682.853, 0, 523356.151)),
        ]);
        createParking([
            fromOrigin(vec3(146663.448, 0, 523352.740)),
            fromOrigin(vec3(146664.165, 0, 523348.267)),
            fromOrigin(vec3(146666.041, 0, 523348.568)),
            fromOrigin(vec3(146665.324, 0, 523353.041)),
        ]);
        createParking([
            fromOrigin(vec3(146665.917, 0, 523353.136)),
            fromOrigin(vec3(146666.633, 0, 523348.663)),
            fromOrigin(vec3(146668.509, 0, 523348.963)),
            fromOrigin(vec3(146667.793, 0, 523353.436)),
        ]);
        createParking([
            fromOrigin(vec3(146668.385, 0, 523353.531)),
            fromOrigin(vec3(146669.102, 0, 523349.058)),
            fromOrigin(vec3(146670.978, 0, 523349.358)),
            fromOrigin(vec3(146670.262, 0, 523353.831)),
        ]);
        createParking([
            fromOrigin(vec3(146670.854, 0, 523353.926)),
            fromOrigin(vec3(146671.570, 0, 523349.453)),
            fromOrigin(vec3(146673.446, 0, 523349.754)),
            fromOrigin(vec3(146672.730, 0, 523354.227)),
        ]);
        createParking([
            fromOrigin(vec3(146673.323, 0, 523354.321)),
            fromOrigin(vec3(146674.039, 0, 523349.848)),
            fromOrigin(vec3(146675.915, 0, 523350.149)),
            fromOrigin(vec3(146675.199, 0, 523354.622)),
        ]);
        createParking([
            fromOrigin(vec3(146675.791, 0, 523354.717)),
            fromOrigin(vec3(146676.507, 0, 523350.244)),
            fromOrigin(vec3(146678.383, 0, 523350.544)),
            fromOrigin(vec3(146677.667, 0, 523355.017)),
        ]);
        createParking([
            fromOrigin(vec3(146678.260, 0, 523355.112)),
            fromOrigin(vec3(146678.976, 0, 523350.639)),
            fromOrigin(vec3(146680.852, 0, 523350.939)),
            fromOrigin(vec3(146680.136, 0, 523355.412)),
        ]);
        createParking([
            fromOrigin(vec3(146680.728, 0, 523355.507)),
            fromOrigin(vec3(146681.444, 0, 523351.034)),
            fromOrigin(vec3(146683.321, 0, 523351.335)),
            fromOrigin(vec3(146682.604, 0, 523355.808)),
        ]);

        createParkingArea([
            fromOrigin(vec3(146685.319, 0, 523356.546)),
            fromOrigin(vec3(146686.129, 0, 523351.485)),
            fromOrigin(vec3(146705.850, 0, 523354.643)),
            fromOrigin(vec3(146705.040, 0, 523359.697)),
        ]);
        createParking([
            fromOrigin(vec3(146685.635, 0, 523356.286)),
            fromOrigin(vec3(146686.352, 0, 523351.813)),
            fromOrigin(vec3(146688.228, 0, 523352.113)),
            fromOrigin(vec3(146687.512, 0, 523356.586)),
        ]);
        createParking([
            fromOrigin(vec3(146688.104, 0, 523356.681)),
            fromOrigin(vec3(146688.820, 0, 523352.208)),
            fromOrigin(vec3(146690.696, 0, 523352.509)),
            fromOrigin(vec3(146689.980, 0, 523356.982)),
        ]);
        createParking([
            fromOrigin(vec3(146690.573, 0, 523357.077)),
            fromOrigin(vec3(146691.289, 0, 523352.604)),
            fromOrigin(vec3(146693.165, 0, 523352.904)),
            fromOrigin(vec3(146692.449, 0, 523357.377)),
        ]);
        createParking([
            fromOrigin(vec3(146693.041, 0, 523357.472)),
            fromOrigin(vec3(146693.757, 0, 523352.999)),
            fromOrigin(vec3(146695.633, 0, 523353.299)),
            fromOrigin(vec3(146694.917, 0, 523357.772)),
        ]);
        createParking([
            fromOrigin(vec3(146695.510, 0, 523357.867)),
            fromOrigin(vec3(146696.226, 0, 523353.394)),
            fromOrigin(vec3(146698.102, 0, 523353.695)),
            fromOrigin(vec3(146697.386, 0, 523358.168)),
        ]);
        createParking([
            fromOrigin(vec3(146697.978, 0, 523358.262)),
            fromOrigin(vec3(146698.694, 0, 523353.789)),
            fromOrigin(vec3(146700.571, 0, 523354.090)),
            fromOrigin(vec3(146699.854, 0, 523358.56)),
        ]);
        createParking([
            fromOrigin(vec3(146700.447, 0, 523358.658)),
            fromOrigin(vec3(146701.163, 0, 523354.185)),
            fromOrigin(vec3(146703.039, 0, 523354.485)),
            fromOrigin(vec3(146702.323, 0, 523358.958)),
        ]);
        createParking([
            fromOrigin(vec3(146702.915, 0, 523359.053)),
            fromOrigin(vec3(146703.632, 0, 523354.580)),
            fromOrigin(vec3(146705.508, 0, 523354.880)),
            fromOrigin(vec3(146704.791, 0, 523359.353)),
        ]);

        createParkingArea([
            fromOrigin(vec3(146659.875, 0, 523341.787)),
            fromOrigin(vec3(146660.189, 0, 523339.794)),
            fromOrigin(vec3(146710.699, 0, 523347.886)),
            fromOrigin(vec3(146710.382, 0, 523349.868)),
        ]);
        createParking([
            fromOrigin(vec3(146666.187, 0, 523342.496)),
            fromOrigin(vec3(146666.408, 0, 523341.114)),
            fromOrigin(vec3(146671.987, 0, 523342.006)),
            fromOrigin(vec3(146671.766, 0, 523343.389)),
        ]);
        createParking([
            fromOrigin(vec3(146672.358, 0, 523343.484)),
            fromOrigin(vec3(146672.579, 0, 523342.101)),
            fromOrigin(vec3(146678.159, 0, 523342.994)),
            fromOrigin(vec3(146677.937, 0, 523344.376)),
        ]);
        createParking([
            fromOrigin(vec3(146678.530, 0, 523344.471)),
            fromOrigin(vec3(146678.751, 0, 523343.089)),
            fromOrigin(vec3(146684.330, 0, 523343.981)),
            fromOrigin(vec3(146684.109, 0, 523345.364)),
        ]);
        createParking([
            fromOrigin(vec3(146684.701, 0, 523345.458)),
            fromOrigin(vec3(146684.922, 0, 523344.076)),
            fromOrigin(vec3(146690.502, 0, 523344.969)),
            fromOrigin(vec3(146690.280, 0, 523346.351)),
        ]);
        createParking([
            fromOrigin(vec3(146690.873, 0, 523346.446)),
            fromOrigin(vec3(146691.094, 0, 523345.063)),
            fromOrigin(vec3(146696.673, 0, 523345.956)),
            fromOrigin(vec3(146696.452, 0, 523347.338)),
        ]);
        createParking([
            fromOrigin(vec3(146697.044, 0, 523347.433)),
            fromOrigin(vec3(146697.266, 0, 523346.051)),
            fromOrigin(vec3(146702.845, 0, 523346.943)),
            fromOrigin(vec3(146702.623, 0, 523348.326)),
        ]);

        createPavement([
            fromOrigin(vec3(146716.754, 0, 523431.726)),
            fromOrigin(vec3(146716.796, 0, 523429.230)),
            fromOrigin(vec3(146739.668, 0, 523429.622)),
            fromOrigin(vec3(146740.302, 0, 523392.577)),
            fromOrigin(vec3(146740.337, 0, 523390.580)),
            fromOrigin(vec3(146740.907, 0, 523357.281)),
            fromOrigin(vec3(146717.867, 0, 523353.596)),
            fromOrigin(vec3(146716.330, 0, 523363.204)),
            fromOrigin(vec3(146715.788, 0, 523363.195)),
            fromOrigin(vec3(146715.326, 0, 523390.152)),
            fromOrigin(vec3(146740.337, 0, 523390.580)),
            fromOrigin(vec3(146740.302, 0, 523392.577)),
            fromOrigin(vec3(146712.763, 0, 523392.107)),
            fromOrigin(vec3(146713.191, 0, 523367.072)),
            fromOrigin(vec3(146716.124, 0, 523348.755)),
            fromOrigin(vec3(146743.475, 0, 523353.137)),
            fromOrigin(vec3(146742.121, 0, 523432.161)),
        ], [true, true, true, false, true, true, true, true, true, true, false, true, true, true, true, true, true]);

        createVerge([
            fromOrigin(vec3(146655.392, 0, 523428.178)),
            fromOrigin(vec3(146656.411, 0, 523368.735)),
            fromOrigin(vec3(146659.897, 0, 523369.293)),
            fromOrigin(vec3(146658.888, 0, 523428.238)),
        ]);

        createGrass([
            fromOrigin(vec3(146715.326, 0, 523390.152)),
            fromOrigin(vec3(146715.788, 0, 523363.195)),
            fromOrigin(vec3(146735.758, 0, 523363.536)),
            fromOrigin(vec3(146735.295, 0, 523390.494)),
        ]);

        createVerge([
            fromOrigin(vec3(146656.454, 0, 523366.215)),
            fromOrigin(vec3(146656.506, 0, 523363.156)),
            fromOrigin(vec3(146657.299, 0, 523358.123)),
            fromOrigin(vec3(146707.730, 0, 523366.197)),
            fromOrigin(vec3(146707.395, 0, 523374.363)),
        ]);

        createVerge([
            fromOrigin(vec3(146658.231, 0, 523352.217)),
            fromOrigin(vec3(146659.496, 0, 523344.192)),
            fromOrigin(vec3(146709.997, 0, 523352.276)),
            fromOrigin(vec3(146708.715, 0, 523360.284)),
        ]);

        createKavel([
            fromOrigin(vec3(146683.848, 0, 523428.665)),
            fromOrigin(vec3(146658.888, 0, 523428.238)),
            fromOrigin(vec3(146659.106, 0, 523415.512)),
            fromOrigin(vec3(146684.065, 0, 523415.939)),
        ]);
        createHouse([
            fromOrigin(vec3(146663.668, 0, 523425.226)),
            fromOrigin(vec3(146663.772, 0, 523419.227)),
            fromOrigin(vec3(146673.770, 0, 523419.400)),
            fromOrigin(vec3(146673.666, 0, 523425.399)),
        ]);

        createKavel([
            fromOrigin(vec3(146684.065, 0, 523415.939)),
            fromOrigin(vec3(146659.106, 0, 523415.512)),
            fromOrigin(vec3(146659.271, 0, 523405.877)),
            fromOrigin(vec3(146684.229, 0, 523406.305)),
        ]);
        createHouse([
            fromOrigin(vec3(146672.903, 0, 523412.313)),
            fromOrigin(vec3(146663.904, 0, 523412.157)),
            fromOrigin(vec3(146664.012, 0, 523405.958)),
            fromOrigin(vec3(146673.010, 0, 523406.114)),
        ]);

        createKavel([
            fromOrigin(vec3(146684.229, 0, 523406.305)),
            fromOrigin(vec3(146659.271, 0, 523405.877)),
            fromOrigin(vec3(146659.474, 0, 523394.003)),
            fromOrigin(vec3(146684.371, 0, 523397.986)),
        ]);
        createHouse([
            fromOrigin(vec3(146673.010, 0, 523406.114)),
            fromOrigin(vec3(146664.012, 0, 523405.958)),
            fromOrigin(vec3(146664.119, 0, 523399.759)),
            fromOrigin(vec3(146673.118, 0, 523399.915)),
        ]);


        createKavel([
            fromOrigin(vec3(146659.500, 0, 523392.490)),
            fromOrigin(vec3(146659.897, 0, 523369.293)),
            fromOrigin(vec3(146666.766, 0, 523370.392)),
            fromOrigin(vec3(146663.138, 0, 523393.071)),
        ]);
        createHouse([
            fromOrigin(vec3(146659.598, 0, 523380.384)),
            fromOrigin(vec3(146661.020, 0, 523371.497)),
            fromOrigin(vec3(146666.451, 0, 523372.365)),
            fromOrigin(vec3(146665.029, 0, 523381.252)),
        ]);

        createKavel([
            fromOrigin(vec3(146663.138, 0, 523393.071)),
            fromOrigin(vec3(146666.766, 0, 523370.392)),
            fromOrigin(vec3(146671.796, 0, 523371.197)),
            fromOrigin(vec3(146668.167, 0, 523393.876)),
        ]);
        createHouse([
            fromOrigin(vec3(146665.029, 0, 523381.252)),
            fromOrigin(vec3(146666.451, 0, 523372.365)),
            fromOrigin(vec3(146671.487, 0, 523373.170)),
            fromOrigin(vec3(146670.065, 0, 523382.058)),
        ]);

        createKavel([
            fromOrigin(vec3(146668.167, 0, 523393.876)),
            fromOrigin(vec3(146671.796, 0, 523371.197)),
            fromOrigin(vec3(146676.825, 0, 523372.001)),
            fromOrigin(vec3(146673.197, 0, 523394.680)),
        ]);
        createHouse([
            fromOrigin(vec3(146670.065, 0, 523382.058)),
            fromOrigin(vec3(146671.487, 0, 523373.170)),
            fromOrigin(vec3(146676.523, 0, 523373.976)),
            fromOrigin(vec3(146675.101, 0, 523382.863)),
        ]);

        createKavel([
            fromOrigin(vec3(146673.197, 0, 523394.680)),
            fromOrigin(vec3(146676.825, 0, 523372.001)),
            fromOrigin(vec3(146681.853, 0, 523372.806)),
            fromOrigin(vec3(146678.225, 0, 523395.485)),
        ]);
        createHouse([
            fromOrigin(vec3(146675.101, 0, 523382.863)),
            fromOrigin(vec3(146676.523, 0, 523373.976)),
            fromOrigin(vec3(146681.559, 0, 523374.781)),
            fromOrigin(vec3(146680.137, 0, 523383.668)),
        ]);

        createKavel([
            fromOrigin(vec3(146678.225, 0, 523395.485)),
            fromOrigin(vec3(146681.853, 0, 523372.806)),
            fromOrigin(vec3(146686.882, 0, 523373.610)),
            fromOrigin(vec3(146683.254, 0, 523396.289)),
        ]);
        createHouse([
            fromOrigin(vec3(146680.137, 0, 523383.668)),
            fromOrigin(vec3(146681.559, 0, 523374.781)),
            fromOrigin(vec3(146686.595, 0, 523375.586)),
            fromOrigin(vec3(146685.173, 0, 523384.473)),
        ]);

        createKavel([
            fromOrigin(vec3(146683.254, 0, 523396.289)),
            fromOrigin(vec3(146686.882, 0, 523373.610)),
            fromOrigin(vec3(146691.911, 0, 523374.415)),
            fromOrigin(vec3(146688.283, 0, 523397.094)),
        ]);
        createHouse([
            fromOrigin(vec3(146685.173, 0, 523384.473)),
            fromOrigin(vec3(146686.595, 0, 523375.586)),
            fromOrigin(vec3(146691.631, 0, 523376.392)),
            fromOrigin(vec3(146690.209, 0, 523385.279)),
        ]);

        createKavel([
            fromOrigin(vec3(146688.283, 0, 523397.094)),
            fromOrigin(vec3(146691.911, 0, 523374.415)),
            fromOrigin(vec3(146696.939, 0, 523375.219)),
            fromOrigin(vec3(146693.311, 0, 523397.898)),
        ]);
        createHouse([
            fromOrigin(vec3(146690.209, 0, 523385.279)),
            fromOrigin(vec3(146691.631, 0, 523376.392)),
            fromOrigin(vec3(146696.667, 0, 523377.197)),
            fromOrigin(vec3(146695.245, 0, 523386.084)),
        ]);

        createKavel([
            fromOrigin(vec3(146693.311, 0, 523397.898)),
            fromOrigin(vec3(146696.939, 0, 523375.219)),
            fromOrigin(vec3(146701.969, 0, 523376.024)),
            fromOrigin(vec3(146698.340, 0, 523398.704)),
        ]);
        createHouse([
            fromOrigin(vec3(146695.245, 0, 523386.084)),
            fromOrigin(vec3(146696.667, 0, 523377.197)),
            fromOrigin(vec3(146701.703, 0, 523378.002)),
            fromOrigin(vec3(146700.282, 0, 523386.889)),
        ]);

        createKavel([
            fromOrigin(vec3(146698.104, 0, 523400.182)),
            fromOrigin(vec3(146698.340, 0, 523398.704)),
            fromOrigin(vec3(146701.969, 0, 523376.024)),
            fromOrigin(vec3(146707.293, 0, 523376.876)),
            fromOrigin(vec3(146706.285, 0, 523401.491)),
        ]);
        createHouse([
            fromOrigin(vec3(146700.282, 0, 523386.889)),
            fromOrigin(vec3(146701.703, 0, 523378.002)),
            fromOrigin(vec3(146707.134, 0, 523378.871)),
            fromOrigin(vec3(146705.713, 0, 523387.758)),
        ]);




        createKavel([
            fromOrigin(vec3(146683.848, 0, 523428.665)),
            fromOrigin(vec3(146684.371, 0, 523397.986)),
            fromOrigin(vec3(146695.329, 0, 523399.738)),
            fromOrigin(vec3(146694.831, 0, 523428.853)),
        ]);
        createHouse([
            fromOrigin(vec3(146688.690, 0, 523425.354)),
            fromOrigin(vec3(146688.846, 0, 523416.355)),
            fromOrigin(vec3(146695.045, 0, 523416.462)),
            fromOrigin(vec3(146694.889, 0, 523425.461)),
        ]);

        createKavel([
            fromOrigin(vec3(146694.831, 0, 523428.853)),
            fromOrigin(vec3(146695.329, 0, 523399.738)),
            fromOrigin(vec3(146706.285, 0, 523401.491)),
            fromOrigin(vec3(146706.170, 0, 523408.233)),
            fromOrigin(vec3(146705.814, 0, 523429.041)),
        ]);
        createHouse([
            fromOrigin(vec3(146694.889, 0, 523425.461)),
            fromOrigin(vec3(146695.045, 0, 523416.462)),
            fromOrigin(vec3(146701.244, 0, 523416.570)),
            fromOrigin(vec3(146701.088, 0, 523425.568)),
        ]);

        createKavel([
            fromOrigin(vec3(146705.814, 0, 523429.041)),
            fromOrigin(vec3(146706.170, 0, 523408.233)),
            fromOrigin(vec3(146734.983, 0, 523408.726)),
            fromOrigin(vec3(146734.626, 0, 523429.535)),
        ]);
        createHouse([
            fromOrigin(vec3(146721.399, 0, 523426.150)),
            fromOrigin(vec3(146715.400, 0, 523426.046)),
            fromOrigin(vec3(146715.573, 0, 523416.048)),
            fromOrigin(vec3(146721.572, 0, 523416.152)),
        ]);
    }

    createEntities();

    function normal(coords) {
        const a = coords[0].subtract(coords[1]);
        const b = coords[0].subtract(coords[2]);
        return a.crossproduct(b);
    }

    function getViewMatrix() {
        const zAxis = camera.position.subtract(camera.target).normalize(); // camera "forward"
        const xAxis = camera.up.crossproduct(zAxis).normalize();           // camera "right"
        const yAxis = zAxis.crossproduct(xAxis);                           // camera "up"

        return {
            xAxis,
            yAxis,
            zAxis,
            position: camera.position
        };
    }

    function rotateX(angle) {
        return [
            vec3(1, 0, 0),
            vec3(0, Math.cos(angle), -Math.sin(angle)),
            vec3(0, Math.sin(angle), Math.cos(angle))
        ];
    }

    function rotateY(angle) {
        return [
            vec3(Math.cos(angle), 0, Math.sin(angle)),
            vec3(0, 1, 0),
            vec3(-Math.sin(angle), 0, Math.cos(angle))
        ];
    }

    function rotateZ(angle) {
        return [
            vec3(Math.cos(angle), -Math.sin(angle), 0),
            vec3(Math.sin(angle), Math.cos(angle), 0),
            vec3(0, 0, 1)
        ];
    }

    function toScreenX(coord) {
        return coord.x * 10.0 + (width / 2);
    }

    function toScreenY(coord) {
        return coord.y * -10.0 + (height / 2);
    }

    function drawFace(coords) {
        const center = avg(coords);
        const cameraDist = camera.position.subtract(center).length();

        const fillStyle = ctx.fillStyle;
        const fillReflectivity = ctx.fillReflectivity;

        drawBuffer.push({
            dist: cameraDist,
            priority: 0,
            draw: () => {
                const nv = normal(coords).normalize();
                const cameraVector = camera.position.subtract(center).normalize();

                const dot = nv.dot(cameraVector);
                if (dot > -0.5) {
                    ctx.fillStyle = fillStyle;
                    ctx.fillReflectivity = fillReflectivity;

                    // if (ctx.fillReflectivity > 0) {
                    //     const lumVector = nv.dot(lightVector);
                    //     if (lumVector < 0) {
                    //         ctx.fillStyle = "color-mix(in srgb, #000000 " + Math.ceil(lumVector * -100 * ctx.fillReflectivity) + "%, " + fillStyle + ")";
                    //     }
                    //     else {
                    //         ctx.fillStyle = "color-mix(in srgb, #ffffff " + Math.ceil(lumVector * 100 * ctx.fillReflectivity) + "%, " + fillStyle + ")";
                    //     }
                    // }

                    fillPolygon(coords);
                }
            }
        });
    }

    function drawOutline(coords, edges) {
        const center = avg(coords);
        const cameraDist = camera.position.subtract(center).length();

        const lineWidth = ctx.lineWidth;
        const strokeStyle = ctx.strokeStyle;
        const strokeReflectivity = ctx.strokeReflectivity;

        drawBuffer.push({
            dist: cameraDist,
            priority: 1,
            draw: () => {
                const nv = normal(coords).normalize();
                const cameraVector = camera.position.subtract(center).normalize();

                const dot = nv.dot(cameraVector);
                if (dot > -0.5) {
                    ctx.lineWidth = lineWidth;
                    ctx.strokeStyle = strokeStyle;
                    ctx.strokeReflectivity = strokeReflectivity;

                    if (ctx.strokeReflectivity > 0) {
                        const lumVector = nv.dot(lightVector);
                        if (lumVector < 0) {
                            ctx.strokeStyle = "color-mix(in srgb, #000000 " + Math.ceil(lumVector * -100 * ctx.strokeReflectivity) + "%, " + strokeStyle + ")";
                        }
                        else {
                            ctx.strokeStyle = "color-mix(in srgb, #ffffff " + Math.ceil(lumVector * 50 * ctx.strokeReflectivity) + "%, " + strokeStyle + ")";
                        }
                    }

                    drawPolygon(coords, edges);
                }
            }
        });
    }

    function drawLine(a, b, c = '#ff0000') {
        a = projectCamera(a);
        b = projectCamera(b);

        const prevStrokeStyle = ctx.strokeStyle;
        ctx.beginPath();
        ctx.strokeStyle = c;
        ctx.moveTo(toScreenX(a), toScreenY(a));
        ctx.lineTo(toScreenX(b), toScreenY(b));
        ctx.stroke();
        ctx.closePath();
        ctx.strokeStyle = prevStrokeStyle;
    }

    function avg(coords) {
        const count = coords.length;
        return vec3(
            coords.map(c => c.x).reduce((l, r) => l + r, 0) / count,
            coords.map(c => c.y).reduce((l, r) => l + r, 0) / count,
            coords.map(c => c.z).reduce((l, r) => l + r, 0) / count
        );
    }

    function fillPolygon(coords) {
        ctx.beginPath();
        for (var i = 0; i <= coords.length; i++) {
            var c = coords[i % coords.length];
            c = projectCamera(c);

            if (i === 0) {
                ctx.moveTo(toScreenX(c), toScreenY(c));
            }
            else {
                ctx.lineTo(toScreenX(c), toScreenY(c));
            }
        }
        ctx.fill();
        ctx.closePath();
    }

    function drawPolygon(coords, edges) {
        ctx.beginPath();
        for (var i = 0; i <= coords.length; i++) {
            var c = coords[i % coords.length];
            c = projectCamera(c);

            if (i === 0) {
                ctx.moveTo(toScreenX(c), toScreenY(c));
            }
            else if (edges === true) {
                ctx.lineTo(toScreenX(c), toScreenY(c));
            }
            else if (edges === false || !edges[i - 1]) {
                ctx.moveTo(toScreenX(c), toScreenY(c));
            }
            else {
                ctx.lineTo(toScreenX(c), toScreenY(c));
            }
        }
        ctx.stroke();
        ctx.closePath();
    }

    function projectCamera(point) {
        const view = getViewMatrix(camera);

        // Transform world point to camera space
        const p = point.subtract(view.position);

        const cameraX = view.xAxis.dot(p);
        const cameraY = view.yAxis.dot(p);
        const cameraZ = view.zAxis.dot(p);

        // Perspective projection
        const scale = (zoom) / -((zoom) + cameraZ);

        // Orthogonal projection
        // const scale = zoomScale();

        return vec3(cameraX * scale, cameraY * scale, cameraZ);
    }

    function createHouse(coords) {
        const c = [
            ...coords,
            ...coords.map(v => vec3(v.x, v.y + 6, v.z)),
            vec3((coords[0].x + coords[1].x) / 2, (coords[0].y + coords[1].y) / 2 + 8.5, (coords[0].z + coords[1].z) / 2),
            vec3((coords[2].x + coords[3].x) / 2, (coords[2].y + coords[3].y) / 2 + 8.5, (coords[2].z + coords[3].z) / 2),
        ];

        var self = {
            type: 'house',
            draw: function() {
                const fillColor = properties.houses.fillColor.current;
                const strokeColor = properties.houses.strokeColor.current;
                const opacity = properties.houses.opacity.current;

                ctx.lineWidth = zoomScale() * 1;
                ctx.fillStyle = fillColor.withAlpha(opacity).toString();
                ctx.strokeStyle = strokeColor.withAlpha(opacity).toString();
                ctx.strokeReflectivity = opacity * 0.0;
                ctx.fillReflectivity = opacity * 1.0;

                drawFace([c[2], c[3], c[7], c[9], c[6]]); // Front
                drawFace([c[3], c[0], c[4], c[7]]); // Left
                drawFace([c[1], c[2], c[6], c[5]]); // Right
                drawFace([c[7], c[4], c[8], c[9]]); // Roof left
                drawFace([c[9], c[8], c[5], c[6]]); // Roof right
                drawFace([c[0], c[1], c[5], c[8], c[4]]); // Back

                drawOutline([c[2], c[3], c[7], c[9], c[6]], true); // Front
                drawOutline([c[3], c[0], c[4], c[7]], true); // Left
                drawOutline([c[1], c[2], c[6], c[5]], true); // Right
                drawOutline([c[7], c[4], c[8], c[9]], true); // Roof left
                drawOutline([c[9], c[8], c[5], c[6]], true); // Roof right
                drawOutline([c[0], c[1], c[5], c[8], c[4]], true); // Back
            }
        }
        entities.push(self);
        return self;
    }


    function createParking(coords, edges = coords.map(x => false)) {
        var self = {
            type: 'parking',
            draw: function() {
                const fillColor = properties.parking.fillColor.current;
                const strokeColor = properties.parking.strokeColor.current;
                const opacity = properties.parking.opacity.current;

                ctx.lineWidth = zoomScale() * 1;
                ctx.fillStyle = fillColor.withAlpha(opacity).toString();
                ctx.strokeStyle = strokeColor.withAlpha(opacity).toString();
                ctx.fillReflectivity = opacity * 0.0;
                ctx.strokeReflectivity = opacity * 0.0;

                drawFace(coords);
                drawOutline(coords, edges);
            }
        }
        entities.push(self);
        return self;
    }

    function createParkingArea(coords, edges = coords.map(x => true)) {
        var self = {
            type: 'parkingArea',
            draw: function() {
                const fillColor = properties.parkingArea.fillColor.current;
                const strokeColor = properties.parkingArea.strokeColor.current;
                const opacity = properties.parkingArea.opacity.current;

                ctx.lineWidth = zoomScale() * 1;
                ctx.fillStyle = fillColor.withAlpha(opacity).toString();
                ctx.strokeStyle = strokeColor.withAlpha(opacity).toString();
                ctx.fillReflectivity = opacity * 0.0;
                ctx.strokeReflectivity = opacity * 0.0;

                drawFace(coords);
                drawOutline(coords, edges);
            }
        }
        entities.push(self);
        return self;
    }

    function createVerge(coords, edges = coords.map(x => true)) {
        var self = {
            type: 'verge',
            draw: function() {
                const fillColor = properties.verge.fillColor.current;
                const strokeColor = properties.verge.strokeColor.current;
                const opacity = properties.verge.opacity.current;

                ctx.lineWidth = zoomScale() * 1;
                ctx.fillStyle = fillColor.withAlpha(opacity).toString();
                ctx.strokeStyle = strokeColor.withAlpha(opacity).toString();
                ctx.fillReflectivity = opacity * 0.3;
                ctx.strokeReflectivity = opacity * 0.0;

                drawFace(coords);
                drawOutline(coords, edges);
            }
        }
        entities.push(self);
        return self;
    }

    function createTerrain(coords, edges = coords.map(x => true)) {
        var self = {
            type: 'terrain',
            draw: function() {
                const fillColor = properties.terrain.fillColor.current;
                const strokeColor = properties.terrain.strokeColor.current;
                const opacity = properties.terrain.opacity.current;

                ctx.lineWidth = zoomScale() * 1;
                ctx.fillStyle = fillColor.withAlpha(opacity).toString();
                ctx.strokeStyle = strokeColor.withAlpha(opacity).toString();
                ctx.fillReflectivity = opacity * 0.3;
                ctx.strokeReflectivity = opacity * 0.0;

                drawFace(coords);
                drawOutline(coords, edges);
            }
        }
        entities.push(self);
        return self;
    }

    function createGrass(coords, edges = coords.map(x => true)) {
        var self = {
            type: 'grass',
            draw: function() {
                const fillColor = properties.grass.fillColor.current;
                const strokeColor = properties.grass.strokeColor.current;
                const opacity = properties.grass.opacity.current;

                ctx.lineWidth = zoomScale() * 1;
                ctx.fillStyle = fillColor.withAlpha(opacity).toString();
                ctx.strokeStyle = strokeColor.withAlpha(opacity).toString();
                ctx.fillReflectivity = opacity * 0.3;
                ctx.strokeReflectivity = opacity * 0.0;

                drawFace(coords);
                drawOutline(coords, edges);
            }
        }
        entities.push(self);
        return self;
    }

    function createWater(position, radius) {
        const coords = [];
        for (var i = 0; i < 360; i++) {
            coords.push(vec3(
                position.x + Math.sin((i / 360) * Math.PI * 2) * radius,
                position.y,
                position.z + Math.cos((i / 360) * Math.PI * 2) * radius));
        }

        var self = {
            type: 'water',
            draw: function() {
                const gradient = ctx.createLinearGradient(0, height, 0, 0);
                gradient.addColorStop(0, hsla(204, 100, 79).toString());
                gradient.addColorStop(1, hsla(198, 76, 89).toString());

                ctx.lineWidth = zoomScale() * 1;
                ctx.fillStyle = gradient;
                ctx.strokeStyle = gradient;
                ctx.fillReflectivity = 0.6;
                ctx.strokeReflectivity = 0.0;

                drawFace(coords);
            }
        }
        entities.push(self);
        return self;
    }

    function createBridge(coords, edges = coords.map(x => false)) {
        var self = {
            type: 'bridge',
            draw: function() {
                const fillColor = properties.bridges.fillColor.current;
                const strokeColor = properties.bridges.strokeColor.current;
                const opacity = properties.bridges.opacity.current;

                ctx.lineWidth = zoomScale() * 1;
                ctx.fillStyle = fillColor.withAlpha(opacity).toString();
                ctx.strokeStyle = strokeColor.withAlpha(opacity).toString();
                ctx.fillReflectivity = 0.0;
                ctx.strokeReflectivity = 0.0;

                drawFace(coords);
                drawOutline(coords, edges);
            }
        }
        entities.push(self);

        createBridgeShadow(coords);

        return self;
    }

    function createBridgeShadow(coords) {
        var self = {
            type: 'bridge-shadow',
            draw: function() {
                ctx.lineWidth = zoomScale() * 1;
                ctx.strokeStyle = colors.transparent;
                ctx.fillStyle = colors.lineColor.withAlpha(properties.bridges.opacity.current).toString();
                ctx.strokeReflectivity = 0.0;

                drawFace(coords.map(x => vec3(x.x, wLev, x.z)));
            }
        }
        entities.push(self);
        return self;
    }

    function createRoad(coords, edges = coords.map(x => false)) {
        var self = {
            type: 'road',
            draw: function() {
                const fillColor = properties.roads.fillColor.current;
                const strokeColor = properties.roads.strokeColor.current;
                const opacity = properties.roads.opacity.current;

                ctx.lineWidth = zoomScale() * 1;
                ctx.fillStyle = fillColor.withAlpha(opacity).toString();
                ctx.strokeStyle = strokeColor.withAlpha(opacity).toString();
                ctx.fillReflectivity = opacity * 0.0;
                ctx.strokeReflectivity = opacity * 0.0;

                drawFace(coords);
                drawOutline(coords, edges);
            }
        }
        entities.push(self);
        return self;
    }

    function createSharedFootpath(coords, edges = coords.map(x => true)) {
        var self = {
            type: 'sharedFootpath',
            draw: function() {
                const fillColor = properties.sharedFootpath.fillColor.current;
                const strokeColor = properties.sharedFootpath.strokeColor.current;
                const opacity = properties.sharedFootpath.opacity.current;
                if (opacity === 0) {
                    return;
                }

                ctx.lineWidth = zoomScale() * 1;
                ctx.fillStyle = fillColor.withAlpha(opacity).toString();
                ctx.strokeStyle = strokeColor.withAlpha(opacity).toString();
                ctx.fillReflectivity = opacity * 0.0;
                ctx.strokeReflectivity = opacity * 0.0;

                drawFace(coords);
                drawOutline(coords, edges);
            }
        }
        entities.push(self);
        return self;
    }

    function createPavement(coords, edges = coords.map(x => true)) {
        var self = {
            type: 'pavement',
            draw: function() {
                const fillColor = properties.pavement.fillColor.current;
                const strokeColor = properties.pavement.strokeColor.current;
                const opacity = properties.pavement.opacity.current;
                if (opacity === 0) {
                    return;
                }

                ctx.lineWidth = zoomScale() * 1;
                ctx.fillStyle = fillColor.withAlpha(opacity).toString();
                ctx.strokeStyle = strokeColor.withAlpha(opacity).toString();
                ctx.fillReflectivity = opacity * 0.0;
                ctx.strokeReflectivity = opacity * 0.0;

                drawFace(coords);
                drawOutline(coords, edges);
            }
        }
        entities.push(self);
        return self;
    }

    function createCyclepath(coords, edges = coords.map(x => false)) {
        var self = {
            type: 'cyclepath',
            draw: function() {
                const fillColor = properties.cyclepaths.fillColor.current;
                const strokeColor = properties.cyclepaths.strokeColor.current;
                const opacity = properties.cyclepaths.opacity.current;

                ctx.lineWidth = zoomScale() * 1;
                ctx.fillStyle = fillColor.withAlpha(opacity).toString();
                ctx.strokeStyle = strokeColor.withAlpha(opacity).toString();
                ctx.fillReflectivity = opacity * 0.0;
                ctx.strokeReflectivity = opacity * 0.0;

                drawFace(coords);
                drawOutline(coords, edges);
            }
        }
        entities.push(self);
        return self;
    }

    function createKavel(coords, edges = coords.map(x => true)) {
        const id = entities.filter(x => x.type === 'kavel').length;
        var self = {
            type: 'kavel',
            draw: function() {
                const fillColor = properties.kavels.fillColor.current;
                const strokeColor = properties.kavels.strokeColor.current;
                const opacity = properties.kavels.opacity.current;

                ctx.lineWidth = zoomScale() * 1;
                ctx.fillStyle = fillColor.withAlpha(opacity).toString();
                ctx.strokeStyle = strokeColor.withAlpha(opacity).toString();
                ctx.fillReflectivity = opacity * 0.0;
                ctx.strokeReflectivity = opacity * 0.0;

                drawFace(coords);
                drawOutline(coords, edges);
            }
        }
        entities.push(self);
        return self;
    }

    function createTree(position) {
        const rotation = Math.random() * 2 * Math.PI;
        const c = shapes.tree().map(v => {
            var projected = v;

            projected = project(rotateY(rotation), v);

            // Apply translation
            projected = vec3(projected.x + position.x, projected.y + position.y, projected.z + position.z);

            return projected;
        });

        var self = {
            type: 'tree',
            draw: function() {
                const fillColor = properties.trees.fillColor.current;
                const strokeColor = properties.trees.strokeColor.current;
                const opacity = properties.trees.opacity.current;

                ctx.lineWidth = zoomScale() * 1;
                ctx.fillStyle = fillColor.withAlpha(opacity).toString();
                ctx.strokeStyle = strokeColor.withAlpha(opacity).toString();
                ctx.fillReflectivity = opacity * 0.3;
                ctx.strokeReflectivity = opacity * 0.2;

                for (var i = 0; i < 4; i++) {
                    drawFace([c[2 + i * 4], c[3 + i * 4], c[7 + i * 4], c[6 + i * 4]]); // Front
                    drawFace([c[3 + i * 4], c[0 + i * 4], c[4 + i * 4], c[7 + i * 4]]); // Left
                    drawFace([c[1 + i * 4], c[2 + i * 4], c[6 + i * 4], c[5 + i * 4]]); // Right
                    drawFace([c[0 + i * 4], c[1 + i * 4], c[5 + i * 4], c[4 + i * 4]]); // Back
                    drawOutline([c[2 + i * 4], c[3 + i * 4], c[7 + i * 4], c[6 + i * 4]], true); // Front
                    drawOutline([c[3 + i * 4], c[0 + i * 4], c[4 + i * 4], c[7 + i * 4]], true); // Left
                    drawOutline([c[1 + i * 4], c[2 + i * 4], c[6 + i * 4], c[5 + i * 4]], true); // Right
                    drawOutline([c[0 + i * 4], c[1 + i * 4], c[5 + i * 4], c[4 + i * 4]], true); // Back
                }
            }
        }
        entities.push(self);
        return self;
    }

    function hsla(h, s, l, a = 1.0) {
        return {
            h, s, l, a,
            toString: () => "hsla(" + h + ", " + s + "%, " + l + "%, " + a + ")",
            withSaturation: newSaturation => hsla(h, s * newSaturation, l, a),
            withAlpha: newAlpha => hsla(h, s, l, a * newAlpha),
            fadeTo: other => {
                return hsla(
                    (fadeScalar * h + other.h) / (fadeScalar + 1),
                    (fadeScalar * s + other.s) / (fadeScalar + 1),
                    (fadeScalar * l + other.l) / (fadeScalar + 1),
                    (fadeScalar * a + other.a) / (fadeScalar + 1),
                )
            }
        };
    }

    const typesByPriority = [
        ['water'],
        ['bridge-shadow'],
        ['terrain', 'verge'],
        ['grass','bridge'],
        ['cyclepath', 'road'],
        ['pavement', 'sharedFootpath'],
        ['parkingArea'],
        ['parking'],
        ['kavel'],
        ['house', 'tree'],
    ];

    let index = -1;
    setOpacitiesAndColors();

    function setOpacitiesAndColors() {
        const prevIndex = index;
        index = parseInt(lodSlider.value);
        if (index === prevIndex) {
            return;
        }

        properties.grass.opacity.target = 1;
        properties.terrain.opacity.target = 1;
        properties.verge.opacity.target = 1;
        properties.bridges.opacity.target = 1;
        properties.roads.opacity.target = 1;
        properties.cyclepaths.opacity.target = 1;
        properties.pavement.opacity.target = 1;
        properties.sharedFootpath.opacity.target = 1;
        properties.kavels.opacity.target = 1;
        properties.parkingArea.opacity.target = 1;
        properties.parking.opacity.target = 1;
        properties.houses.opacity.target = 1;
        properties.trees.opacity.target = 1;

        properties.grass.fillColor.target = colors.transparent;
        properties.terrain.fillColor.target = colors.transparent;
        properties.verge.fillColor.target = colors.transparent;
        properties.bridges.fillColor.target = colors.transparent;
        properties.roads.fillColor.target = colors.transparent;
        properties.cyclepaths.fillColor.target = colors.transparent;
        properties.pavement.fillColor.target = colors.transparent;
        properties.sharedFootpath.fillColor.target = colors.transparent;
        properties.kavels.fillColor.target = colors.transparent;
        properties.parkingArea.fillColor.target = colors.transparent;
        properties.parking.fillColor.target = colors.transparent;
        properties.houses.fillColor.target = colors.transparent;
        properties.trees.fillColor.target = colors.transparent;

        properties.grass.strokeColor.target = colors.lineColor;
        properties.terrain.strokeColor.target = colors.lineColor;
        properties.verge.strokeColor.target = colors.lineColor;
        properties.bridges.strokeColor.target = colors.lineColor;
        properties.roads.strokeColor.target = colors.lineColor;
        properties.cyclepaths.strokeColor.target = colors.lineColor;
        properties.pavement.strokeColor.target = colors.lineColor;
        properties.sharedFootpath.strokeColor.target = colors.lineColor;
        properties.kavels.strokeColor.target = colors.lineColor;
        properties.parkingArea.strokeColor.target = colors.lineColor;
        properties.parking.strokeColor.target = colors.lineColor;
        properties.houses.strokeColor.target = colors.lineColor;
        properties.trees.strokeColor.target = colors.lineColor;

        lodLeftButton.disabled = index === 0;
        lodRightButton.disabled = index === 5;

        switch (index) {
            case 0: {
                // Base
                lodHeader.innerText = "De casus Nijevoert";
                lodDescription.innerHTML = "Met MiniGIM van gebiedsanalyse tot vastgestelde stedenbouwkundige ontwikkeling.<br/><br/><p class=\"muted\" style=\"text-align: center\">Gebruik de knoppen aan weerszijde om de verschillende fases te bekijken</p>";

                properties.terrain.fillColor.target = colors.lightGreen;
                properties.verge.fillColor.target = colors.lightGreen;
                properties.verge.strokeColor.target = colors.transparent;

                properties.bridges.opacity.target = 0;
                properties.kavels.opacity.target = 0;
                properties.grass.opacity.target = 0;
                properties.roads.opacity.target = 0;
                properties.cyclepaths.opacity.target = 0;
                properties.pavement.opacity.target = 0;
                properties.sharedFootpath.opacity.target = 0;
                properties.parkingArea.opacity.target = 0;
                properties.parking.opacity.target = 0;
                properties.houses.opacity.target = 0;
                properties.trees.opacity.target = 0;

                setLegend([]);
                break;
            }
            case 1: {
                // Detailniveau 0
                lodHeader.innerText = "Detailniveau 0";
                lodDescription.innerText = "Dit is een eerste opdeling van het gebied in openbaar en uitgeefbaar terrein.";

                properties.bridges.fillColor.target = colors.white;
                properties.kavels.fillColor.target = colors.yellow;
                properties.kavels.strokeColor.target = colors.transparent;
                properties.sharedFootpath.fillColor.target = colors.yellow;
                properties.terrain.fillColor.target = colors.green;
                properties.verge.fillColor.target = colors.green;
                properties.verge.strokeColor.target = colors.transparent;

                properties.grass.opacity.target = 0;
                properties.roads.opacity.target = 0;
                properties.cyclepaths.opacity.target = 0;
                properties.pavement.opacity.target = 0;
                properties.parkingArea.opacity.target = 0;
                properties.parking.opacity.target = 0;
                properties.houses.opacity.target = 0;
                properties.trees.opacity.target = 0;

                setLegend([
                    { color: colors.yellow, name: "Uitgeefbaar" },
                    { color: colors.green, name: "Openbaar" },
                ]);
                break;
            }
            case 2: {
                // Detailniveau 1
                lodHeader.innerText = "Detailniveau 1";
                lodDescription.innerText = "Op dit niveau delen we het openbare terrein verder op in groene gebieden, verharde gebieden, en water gebieden.";

                properties.bridges.fillColor.target = colors.white;
                properties.kavels.fillColor.target = colors.yellow;
                properties.terrain.fillColor.target = colors.green;
                properties.verge.fillColor.target = colors.green;
                properties.grass.fillColor.target = colors.green;
                properties.roads.fillColor.target = colors.gray;
                properties.cyclepaths.fillColor.target = colors.gray;
                properties.pavement.fillColor.target = colors.gray;
                properties.sharedFootpath.fillColor.target = colors.yellow;
                properties.parkingArea.fillColor.target = colors.gray;
                properties.parking.fillColor.target = colors.gray;

                properties.kavels.strokeColor.target = colors.transparent;
                properties.roads.strokeColor.target = colors.transparent;
                properties.cyclepaths.strokeColor.target = colors.transparent;
                properties.pavement.strokeColor.target = colors.transparent;
                properties.sharedFootpath.strokeColor.target = colors.transparent;
                properties.parkingArea.strokeColor.target = colors.transparent;
                properties.parking.strokeColor.target = colors.transparent;

                properties.houses.opacity.target = 0;
                properties.trees.opacity.target = 0;

                setLegend([
                    { color: colors.yellow, name: "Uitgeefbaar" },
                    { color: colors.gray, name: "Verhard" },
                    { color: colors.green, name: "Groen" },
                    { color: colors.white, name: "Water" },
                ]);
                break;
            }
            case 3: {
                // Detailniveau 2
                lodHeader.innerText = "Detailniveau 2";
                lodDescription.innerText = "Een volgende stap is om het openbare terrein nog verder in detail op te delen en uitgeefbaar terrein op te splitsen in percelen en mandelig terrein.";

                properties.bridges.fillColor.target = colors.white;
                properties.kavels.fillColor.target = colors.yellow;
                properties.terrain.fillColor.target = colors.green;
                properties.verge.fillColor.target = colors.green;
                properties.grass.fillColor.target = colors.lightGreen;
                properties.roads.fillColor.target = colors.gray;
                properties.cyclepaths.fillColor.target = colors.darkRed;
                properties.pavement.fillColor.target = colors.lightGray;
                properties.sharedFootpath.fillColor.target = colors.blue;
                properties.parkingArea.fillColor.target = colors.red;
                properties.parking.fillColor.target = colors.red;

                properties.kavels.strokeColor.target = colors.transparent;
                properties.roads.strokeColor.target = colors.transparent;
                properties.cyclepaths.strokeColor.target = colors.transparent;
                properties.pavement.strokeColor.target = colors.transparent;
                properties.sharedFootpath.strokeColor.target = colors.transparent;
                properties.parkingArea.strokeColor.target = colors.transparent;
                properties.parking.strokeColor.target = colors.transparent;

                properties.houses.opacity.target = 0;
                properties.trees.opacity.target = 0;

                setLegend([
                    { color: colors.yellow, name: "Percelen" },
                    { color: colors.blue, name: "Mandelig" },
                    { color: colors.gray, name: "Wegen" },
                    { color: colors.darkRed, name: "Fietspaden" },
                    { color: colors.lightGray, name: "Voetpaden" },
                    { color: colors.red, name: "Parkeervakken" },
                    { color: colors.green, name: "Bermen" },
                    { color: colors.lightGreen, name: "Parken" },
                    { color: colors.white, name: "Bruggen" },
                ]);
                break;
            }
            case 4: {
                // Detailniveau 3
                lodHeader.innerText = "Detailniveau 3";
                lodDescription.innerText = "Ten slotte, in het meest gedetailleerde niveau van MiniGIM specificeren we van alles wat voor type het betreft (wegen, paden, parkeervakken, etc).";

                properties.bridges.fillColor.target = colors.white;
                properties.kavels.fillColor.target = colors.yellow;
                properties.terrain.fillColor.target = colors.green;
                properties.verge.fillColor.target = colors.green;
                properties.grass.fillColor.target = colors.lightGreen;
                properties.roads.fillColor.target = colors.gray;
                properties.cyclepaths.fillColor.target = colors.darkRed;
                properties.pavement.fillColor.target = colors.lightGray;
                properties.sharedFootpath.fillColor.target = colors.blue;
                properties.parkingArea.fillColor.target = colors.red;
                properties.parking.fillColor.target = colors.lightRed;
                properties.houses.fillColor.target = colors.white;
                properties.trees.fillColor.target = colors.darkGreen;

                setLegend([
                    { color: colors.white, name: "Bebouwd" },
                    { color: colors.yellow, name: "Tuin" },
                    { color: colors.blue, name: "Mandelig voetpad" },
                    { color: colors.gray, name: "Wegen (Type I)" },
                    { color: colors.darkRed, name: "Fietspaden (Type I)" },
                    { color: colors.lightGray, name: "Voetpaden (Type I)" },
                    { color: colors.red, name: "Openbare parkeervakken" },
                    { color: colors.green, name: "Bermen" },
                    { color: colors.lightGreen, name: "Parken" },
                    { color: colors.darkGreen, name: "Bomen" },
                    { color: colors.white, name: "Bruggen" },
                ]);
                break;
            }
            case 5: {
                // Real colors
                lodHeader.innerText = "Het eindresultaat van deze fase";
                lodDescription.innerText = "Een compleet gebieds informatie model met de MINIMALE relevante informatie die een brede informatiebehoefte kan beantwoorden, en klaar is voor verdere analyses en vergunningsaanvragen (MiniBIM).";

                properties.grass.opacity.target = 1;
                properties.terrain.opacity.target = 1;
                properties.verge.opacity.target = 1;
                properties.bridges.opacity.target = 1;
                properties.roads.opacity.target = 1;
                properties.cyclepaths.opacity.target = 1;
                properties.pavement.opacity.target = 1;
                properties.sharedFootpath.opacity.target = 1;
                properties.kavels.opacity.target = 1;
                properties.parkingArea.opacity.target = 1;
                properties.parking.opacity.target = 1;
                properties.houses.opacity.target = 1;
                properties.trees.opacity.target = 1;

                properties.grass.fillColor.target = properties.grass.fillColor.real;
                properties.terrain.fillColor.target = properties.terrain.fillColor.real;
                properties.verge.fillColor.target = properties.verge.fillColor.real;
                properties.bridges.fillColor.target = properties.bridges.fillColor.real;
                properties.roads.fillColor.target = properties.roads.fillColor.real;
                properties.cyclepaths.fillColor.target = properties.cyclepaths.fillColor.real;
                properties.pavement.fillColor.target = properties.pavement.fillColor.real;
                properties.sharedFootpath.fillColor.target = properties.sharedFootpath.fillColor.real;
                properties.kavels.fillColor.target = properties.kavels.fillColor.real;
                properties.parkingArea.fillColor.target = properties.parkingArea.fillColor.real;
                properties.parking.fillColor.target = properties.parking.fillColor.real;
                properties.houses.fillColor.target = properties.houses.fillColor.real;
                properties.trees.fillColor.target = properties.trees.fillColor.real;

                properties.grass.strokeColor.target = properties.grass.strokeColor.real;
                properties.terrain.strokeColor.target = properties.terrain.strokeColor.real;
                properties.verge.strokeColor.target = properties.verge.strokeColor.real;
                properties.bridges.strokeColor.target = properties.bridges.strokeColor.real;
                properties.roads.strokeColor.target = properties.roads.strokeColor.real;
                properties.cyclepaths.strokeColor.target = properties.cyclepaths.strokeColor.real;
                properties.pavement.strokeColor.target = properties.pavement.strokeColor.real;
                properties.sharedFootpath.strokeColor.target = properties.sharedFootpath.strokeColor.real;
                properties.kavels.strokeColor.target = properties.kavels.strokeColor.real;
                properties.parkingArea.strokeColor.target = properties.parkingArea.strokeColor.real;
                properties.parking.strokeColor.target = properties.parking.strokeColor.real;
                properties.houses.strokeColor.target = properties.houses.strokeColor.real;
                properties.trees.strokeColor.target = properties.trees.strokeColor.real;

                setLegend([]);
                break;
            }
        }
    }

    function setLegend(entries) {
        lodLegend.innerHTML = null;

        if (entries.length) {
            entries.forEach(entry => appendLegendEntry(entry.color, entry.name));
            lodLegend.style.display = "flex";
        }
        else {
            lodLegend.style.display = "none";
        }
    }

    function appendLegendEntry(color, name) {
        const container = document.createElement("div");
        container.setAttribute("style", "display: flex; flex-direction: row; gap: 0.25rem; align-items: center;");

        const swatch = document.createElement("div");
        swatch.setAttribute("style", "width: 0.8rem; height: 0.8rem; border-radius: 3px; border: 1px solid var(--gray-dark); background-color: " + color);
        container.append(swatch);

        const text = document.createElement("div");
        text.setAttribute("style", "font-size: 0.7rem; color: var(--gray);");
        text.innerText = name;
        container.append(text);

        lodLegend.append(container);
    }

    function draw() {
        const style = window.getComputedStyle(canvas);
        if (style.display === "none") {
            requestAnimationFrame(draw);
            return;
        }

        const ratio = window.devicePixelRatio || 1;
        ctx.scale(ratio, ratio);

        // Update the width and height variables.
        const rect = canvas.getBoundingClientRect();
        width = rect.width * 2;
        height = rect.height * 2;

        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);

        elapsedTime = Date.now() - startTime;

        setOpacitiesAndColors();

        properties.grass.opacity.current = (fadeScalar * properties.grass.opacity.current + properties.grass.opacity.target) / (fadeScalar + 1);
        properties.terrain.opacity.current = (fadeScalar * properties.terrain.opacity.current + properties.terrain.opacity.target) / (fadeScalar + 1);
        properties.verge.opacity.current = (fadeScalar * properties.verge.opacity.current + properties.verge.opacity.target) / (fadeScalar + 1);
        properties.bridges.opacity.current = (fadeScalar * properties.bridges.opacity.current + properties.bridges.opacity.target) / (fadeScalar + 1);
        properties.roads.opacity.current = (fadeScalar * properties.roads.opacity.current + properties.roads.opacity.target) / (fadeScalar + 1);
        properties.cyclepaths.opacity.current = (fadeScalar * properties.cyclepaths.opacity.current + properties.cyclepaths.opacity.target) / (fadeScalar + 1);
        properties.pavement.opacity.current = (fadeScalar * properties.pavement.opacity.current + properties.pavement.opacity.target) / (fadeScalar + 1);
        properties.sharedFootpath.opacity.current = (fadeScalar * properties.sharedFootpath.opacity.current + properties.sharedFootpath.opacity.target) / (fadeScalar + 1);
        properties.kavels.opacity.current = (fadeScalar * properties.kavels.opacity.current + properties.kavels.opacity.target) / (fadeScalar + 1);
        properties.parkingArea.opacity.current = (fadeScalar * properties.parkingArea.opacity.current + properties.parkingArea.opacity.target) / (fadeScalar + 1);
        properties.parking.opacity.current = (fadeScalar * properties.parking.opacity.current + properties.parking.opacity.target) / (fadeScalar + 1);
        properties.houses.opacity.current = (fadeScalar * properties.houses.opacity.current + properties.houses.opacity.target) / (fadeScalar + 1);
        properties.trees.opacity.current = (fadeScalar * properties.trees.opacity.current + properties.trees.opacity.target) / (fadeScalar + 1);

        properties.grass.fillColor.current = properties.grass.fillColor.current.fadeTo(properties.grass.fillColor.target);
        properties.terrain.fillColor.current = properties.terrain.fillColor.current.fadeTo(properties.terrain.fillColor.target);
        properties.verge.fillColor.current = properties.verge.fillColor.current.fadeTo(properties.verge.fillColor.target);
        properties.bridges.fillColor.current = properties.bridges.fillColor.current.fadeTo(properties.bridges.fillColor.target);
        properties.roads.fillColor.current = properties.roads.fillColor.current.fadeTo(properties.roads.fillColor.target);
        properties.cyclepaths.fillColor.current = properties.cyclepaths.fillColor.current.fadeTo(properties.cyclepaths.fillColor.target);
        properties.pavement.fillColor.current = properties.pavement.fillColor.current.fadeTo(properties.pavement.fillColor.target);
        properties.sharedFootpath.fillColor.current = properties.sharedFootpath.fillColor.current.fadeTo(properties.sharedFootpath.fillColor.target);
        properties.kavels.fillColor.current = properties.kavels.fillColor.current.fadeTo(properties.kavels.fillColor.target);
        properties.parkingArea.fillColor.current = properties.parkingArea.fillColor.current.fadeTo(properties.parkingArea.fillColor.target);
        properties.parking.fillColor.current = properties.parking.fillColor.current.fadeTo(properties.parking.fillColor.target);
        properties.houses.fillColor.current = properties.houses.fillColor.current.fadeTo(properties.houses.fillColor.target);
        properties.trees.fillColor.current = properties.trees.fillColor.current.fadeTo(properties.trees.fillColor.target);

        properties.grass.strokeColor.current = properties.grass.strokeColor.current.fadeTo(properties.grass.strokeColor.target);
        properties.terrain.strokeColor.current = properties.terrain.strokeColor.current.fadeTo(properties.terrain.strokeColor.target);
        properties.verge.strokeColor.current = properties.verge.strokeColor.current.fadeTo(properties.verge.strokeColor.target);
        properties.bridges.strokeColor.current = properties.bridges.strokeColor.current.fadeTo(properties.bridges.strokeColor.target);
        properties.roads.strokeColor.current = properties.roads.strokeColor.current.fadeTo(properties.roads.strokeColor.target);
        properties.cyclepaths.strokeColor.current = properties.cyclepaths.strokeColor.current.fadeTo(properties.cyclepaths.strokeColor.target);
        properties.pavement.strokeColor.current = properties.pavement.strokeColor.current.fadeTo(properties.pavement.strokeColor.target);
        properties.sharedFootpath.strokeColor.current = properties.sharedFootpath.strokeColor.current.fadeTo(properties.sharedFootpath.strokeColor.target);
        properties.kavels.strokeColor.current = properties.kavels.strokeColor.current.fadeTo(properties.kavels.strokeColor.target);
        properties.parkingArea.strokeColor.current = properties.parkingArea.strokeColor.current.fadeTo(properties.parkingArea.strokeColor.target);
        properties.parking.strokeColor.current = properties.parking.strokeColor.current.fadeTo(properties.parking.strokeColor.target);
        properties.houses.strokeColor.current = properties.houses.strokeColor.current.fadeTo(properties.houses.strokeColor.target);
        properties.trees.strokeColor.current = properties.trees.strokeColor.current.fadeTo(properties.trees.strokeColor.target);

        const scrollY = clamp(0, canvas.offsetHeight, window.scrollY - canvas.offsetTop + 100);
        targetAngleX = Math.PI * 0.65 + Math.pow(scrollY, 0.5) / 2048 + Math.sin(elapsedTime / 3000) * 0.05;// + (clamp(0, 1,mouse.x / width)) * 0.3;
        targetAngleY = clamp(0, Math.PI * 0.2, Math.pow(Math.max(0, scrollY - 100) / 50, 0.5) + Math.sin(elapsedTime / 4000) * 0.05);
        targetZoom = Math.pow(canvas.width, 0.5) * 2.4;

        // Move camera closer to new position.
        angleX = angleX + (targetAngleX - angleX) * 0.05;
        angleY = angleY + (targetAngleY - angleY) * 0.05;
        cameraX = cameraX + (targetX - cameraX) * 0.05;
        cameraZ = cameraZ + (targetZ - cameraZ) * 0.05;
        zoom = zoom + (targetZoom - zoom) * 0.05;
        cameraDistance = cameraDistance + (targetCameraDistance - cameraDistance) * 0.05;

        camera.target = vec3(cameraX, 0, cameraZ);
        camera.position = vec3(cameraX + Math.cos(angleX) * cameraDistance, Math.cos(angleY) * cameraDistance, cameraZ + Math.sin(angleX) * cameraDistance);

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.fillReflectivity = 0.0;
        ctx.strokeReflectivity = 0.0;

        for (var i = 0; i < typesByPriority.length; i++) {
            const types = typesByPriority[i];
            entities.filter(entity => types.indexOf(entity.type) >= 0).forEach(entity => entity.draw());
            drawBuffer.sort((l, r) => {
                const delta = r.dist - l.dist;
                if (Math.abs(delta) <= 0.00001) {
                    return l.priority - r.priority;
                }
                return delta;
            }).forEach(entry => entry.draw());
            drawBuffer = [];
        }

        // Fade in for scene after loading...
        if (elapsedTime < 500) {
            ctx.fillStyle = "rgba(255, 255, 255, " + (1 - elapsedTime / 500) + ")";
            ctx.fillRect(0, 0, width, height);
        }

        requestAnimationFrame(draw);
    }

    draw();
};