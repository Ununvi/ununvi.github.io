const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } = Matter;

const engine = Engine.create();
const { world } = engine;

const container = document.getElementById('falling-container');
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

const render = Render.create({
    element: container,
    engine: engine,
    options: {
        width: containerWidth,
        height: containerHeight,
        wireframes: false,
        background: null
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);

const ground = Bodies.rectangle(containerWidth / 2, containerHeight - 20, containerWidth, 40, {
    isStatic: true,
    render: {
        fillStyle: 'transparent'
    }
});
World.add(world, ground);

const leftWall = Bodies.rectangle(0, containerHeight / 2, 20, containerHeight, {
    isStatic: true,
    render: {
        fillStyle: 'transparent'
    }
});
const rightWall = Bodies.rectangle(containerWidth, containerHeight / 2, 20, containerHeight, {
    isStatic: true,
    render: {
        fillStyle: 'transparent'
    }
});
World.add(world, leftWall);
World.add(world, rightWall);

const blockImages = [
    './img/book01.png',
    './img/book02.png',
    './img/book03.png',
    './img/book04.png',
    './img/book05.png',
    './img/book06.png',
    './img/book07.png',
    './img/book08.png',
    './img/book09.png',
    './img/book10.png'
];


const imageDimensions = [];


const loadImageDimensions = () => {
    return new Promise((resolve) => {
        const promises = blockImages.map(src => {
            return new Promise((resolveImage) => {
                const img = new Image();
                img.src = src;
                img.onload = () => {
                    imageDimensions.push({
                        width: img.width,
                        height: img.height,
                        ratio: img.height / img.width
                    });
                    resolveImage();
                };
            });
        });

        Promise.all(promises).then(resolve);
    });
};

let blockCount = 0;
let currentY = 0; 

function createBlock(x, y) {
    if (blockCount < 10) { 
        const imageIndex = blockCount % blockImages.length; 
        const imgDim = imageDimensions[imageIndex];  
        
        const scaleFactor = 0.3; 
        const blockWidth = imgDim.width * scaleFactor;
        const blockHeight = imgDim.height * scaleFactor;

        const density = Math.max(0.05, (10 - blockCount) * 0.01); 

        const block = Bodies.rectangle(x, y, blockWidth, blockHeight, {
            density: density,
            restitution: 0.05,  
            friction: 0.2,      
            frictionAir: 0.01,  
            render: {
                sprite: {
                    texture: blockImages[imageIndex],
                    xScale: scaleFactor,
                    yScale: scaleFactor
                }
            }
        });

        World.add(world, block);
        blockCount++;

        currentY += blockHeight; 
    }
}

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.8,
        render: { visible: false }
    }
});
World.add(world, mouseConstraint);

function dropBlock() {

    const x = containerWidth / 2 + (Math.random() - 0.5) * 120;
    createBlock(x, 0);
}

setInterval(dropBlock, 500);

loadImageDimensions().then(() => {
    dropBlock();
});
