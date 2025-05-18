const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Composite } = Matter;

// 엔진 및 월드 생성
const engine = Engine.create();
const { world } = engine;

// 컨테이너 및 크기 설정
const container = document.getElementById('falling-container');
let containerWidth = container.clientWidth;
let containerHeight = container.clientHeight;

// 렌더러 생성
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

// 벽 관리
let walls = [];

function createWall(x, y, width, height) {
    return Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        render: { fillStyle: 'transparent' }
    });
}

function addWalls() {
    if (walls.length) {
        World.remove(world, walls);
    }

    walls = [
        createWall(containerWidth / 2, containerHeight - 20, containerWidth, 40),
        createWall(0, containerHeight / 2, 20, containerHeight),
        createWall(containerWidth, containerHeight / 2, 20, containerHeight)
    ];

    World.add(world, walls);
}

// 이미지 목록 및 크기
const blockImages = [
    './img/keyword1.png', './img/keyword2.png', './img/keyword3.png',
    './img/keyword4.png', './img/keyword5.png', './img/keyword6.png',
    './img/keyword7.png', './img/keyword8.png', './img/keyword9.png',
    './img/keyword10.png', './img/keyword11.png', './img/keyword12.png'
];
const imageDimensions = [];

function loadImageDimensions() {
    return Promise.all(
        blockImages.map(src => new Promise(resolve => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                imageDimensions.push({ width: img.width, height: img.height });
                resolve();
            };
            img.onerror = () => {
                console.warn(`이미지 로드 실패: ${src}`);
                imageDimensions.push({ width: 100, height: 100 }); // 기본값
                resolve();
            };
        }))
    );
}

// 층별 위치 계산
function getLayerXPositions() {
    const centerX = containerWidth / 2;
    const spacing = containerWidth * 0.1;
    return [
        [centerX - spacing, centerX, centerX + spacing],
        [centerX - spacing * 1.5, centerX - spacing / 2, centerX + spacing / 2, centerX + spacing * 1.5],
        [centerX - spacing, centerX, centerX + spacing],
        [centerX - spacing / 2, centerX + spacing / 2]
    ];
}

// 블럭 생성 함수
function createBlockAtPosition(index, scale, x, y) {
    const imgDim = imageDimensions[index];
    const width = imgDim.width * scale;
    const height = imgDim.height * scale;

    const isCircle = [2, 4, 5, 7, 9].includes(index);
    const density = Math.max(0.0005, 0.002 - index * 0.0001);
    const sprite = {
        texture: blockImages[index],
        xScale: scale,
        yScale: scale
    };

    const body = isCircle
        ? Bodies.circle(x, y, Math.max(width, height) / 2, {
            density, restitution: 0.1, friction: 0.2, frictionAir: 0.01,
            render: { sprite }
        })
        : Bodies.rectangle(x, y, width, height, {
            density, restitution: 0.1, friction: 0.2, frictionAir: 0.01,
            render: { sprite }
        });

    World.add(world, body);
}

// 전체 블럭 생성
function createAllBlocks(scale) {
    const layerXPositions = getLayerXPositions();
    const startY = -150;
    let index = 0;

    for (let layer = 0; layer < layerXPositions.length; layer++) {
        const xs = layerXPositions[layer];
        for (let i = 0; i < xs.length; i++) {
            if (index >= blockImages.length) return;
            createBlockAtPosition(index, scale, xs[i], startY);
            index++;
        }
    }
}

// 기존 블럭 제거
function clearBlocks() {
    const allBodies = Composite.allBodies(world);
    allBodies.forEach(body => {
        if (!body.isStatic && body !== mouseConstraint.body) {
            World.remove(world, body);
        }
    });
}

// 반응형 스케일 함수
function getResponsiveScale(factor = 0.4) {
    return containerWidth / 1920 * factor;
}

// 씬 리셋
function resetScene() {
    clearBlocks();
    addWalls();
    const scale = getResponsiveScale(0.35);
    createAllBlocks(scale);
}

// 마우스 제어
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
        stiffness: 0.8,
        render: { visible: false }
    }
});
World.add(world, mouseConstraint);

// 초기 로딩
loadImageDimensions().then(() => {
    const scale = getResponsiveScale(0.4);
    addWalls();
    createAllBlocks(scale);
});

// 리사이즈 디바운싱
let resizeTimeout = null;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        containerWidth = container.clientWidth;
        containerHeight = container.clientHeight;
        render.canvas.width = containerWidth;
        render.canvas.height = containerHeight;
        render.options.width = containerWidth;
        render.options.height = containerHeight;
        resetScene();
    }, 200);
});
