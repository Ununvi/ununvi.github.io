const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } = Matter;

// 엔진 설정
const engine = Engine.create();
const { world } = engine;

// 컨테이너 크기
const container = document.getElementById('falling-container');
let containerWidth = container.clientWidth;
let containerHeight = container.clientHeight;

// 렌더링 설정
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

// 벽 생성
function createWall(x, y, width, height) {
    return Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        render: { fillStyle: 'transparent' }
    });
}

function addWalls() {
    World.add(world, [
        createWall(containerWidth / 2, containerHeight - 20, containerWidth, 40),
        createWall(0, containerHeight / 2, 20, containerHeight),
        createWall(containerWidth, containerHeight / 2, 20, containerHeight)
    ]);
}

addWalls();

// 이미지 리스트
const blockImages = [
    './img/keyword1.png', './img/keyword2.png', './img/keyword3.png',
    './img/keyword4.png', './img/keyword5.png', './img/keyword6.png',
    './img/keyword7.png', './img/keyword8.png', './img/keyword9.png',
    './img/keyword10.png'
];

const imageDimensions = [];

function loadImageDimensions() {
    return Promise.all(
        blockImages.map(src => new Promise(resolve => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                imageDimensions.push({
                    width: img.width,
                    height: img.height,
                    ratio: img.height / img.width
                });
                resolve();
            };
        }))
    );
}

// 블록 생성 함수
function createBlock(x, y, index, scale) {
    const imgDim = imageDimensions[index];
    const blockWidth = imgDim.width * scale;
    const blockHeight = imgDim.height * scale;

    const block = Bodies.rectangle(x, y, blockWidth, blockHeight, {
        density: 0.0005,
        restitution: 0.1,
        friction: 0.2,
        frictionAir: 0.01,
        render: {
            sprite: {
                texture: blockImages[index],
                xScale: scale,
                yScale: scale
            }
        }
    });

    World.add(world, block);
}

// 블록 위치 정의 (가로 배치, 층별 y 고정)
function getBlockPositions() {
    const spacingX = 350; // 블록 간 가로 간격
    const spacingY = 60; // 층 간 세로 간격
    const centerX = containerWidth / 2;
    const startY = 200;

    return [
        { x: centerX - spacingX / 2, y: startY },         // 1번
        { x: centerX + spacingX / 2, y: startY },         // 2번
        { x: centerX - spacingX, y: startY + spacingY },  // 3번
        { x: centerX, y: startY + spacingY },             // 4번
        { x: centerX + spacingX, y: startY + spacingY },  // 5번
        { x: centerX - spacingX, y: startY + spacingY*2 },// 6번
        { x: centerX, y: startY + spacingY*2 },           // 7번
        { x: centerX + spacingX, y: startY + spacingY*2 },// 8번
        { x: centerX - spacingX/3, y: startY + spacingY*3}, // 9번
        { x: centerX + spacingX/2, y: startY + spacingY*3 }  // 10번
    ];
}

// 블록들 전체 생성
function createAllBlocks() {
    const scale = containerWidth / 1920 * 0.35;
    const positions = getBlockPositions();

    for (let i = 0; i < blockImages.length; i++) {
        const pos = positions[i];
        createBlock(pos.x, pos.y, i, scale);
    }
}

// 전체 씬 리셋 후 블록 재생성
function resetScene() {
    World.clear(world);
    Engine.clear(engine);
    addWalls();
    createAllBlocks();
    World.add(world, mouseConstraint);
}

// 마우스 인터랙션
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
        stiffness: 0.8,
        render: { visible: false }
    }
});
World.add(world, mouseConstraint);

// 초기 실행
loadImageDimensions().then(() => {
    createAllBlocks();
});

// 반응형: 리사이즈 시 재생성
window.addEventListener('resize', () => {
    containerWidth = container.clientWidth;
    containerHeight = container.clientHeight;
    render.canvas.width = containerWidth;
    render.canvas.height = containerHeight;
    resetScene();
});
