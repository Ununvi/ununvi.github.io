const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } = Matter;

// 엔진 설정
const engine = Engine.create();
const { world } = engine;

// 컨테이너 크기
const container = document.getElementById('falling-container');
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

// 렌더링 설정
const render = Render.create({
    element: container,
    engine: engine,
    options: {
        width: containerWidth,
        height: containerHeight,
        wireframes: false,
        background: null // 배경을 삭제 (투명하게 설정)
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// 바닥 추가 (배경 투명하게 설정)
const ground = Bodies.rectangle(containerWidth / 2, containerHeight - 20, containerWidth, 40, {
    isStatic: true,
    render: {
        fillStyle: 'transparent'  // 바닥의 배경을 투명하게 설정
    }
});
World.add(world, ground);

// 컨테이너 벽 추가 (배경 투명하게 설정)
const leftWall = Bodies.rectangle(0, containerHeight / 2, 20, containerHeight, {
    isStatic: true,
    render: {
        fillStyle: 'transparent'  // 왼쪽 벽을 투명하게 설정
    }
});
const rightWall = Bodies.rectangle(containerWidth, containerHeight / 2, 20, containerHeight, {
    isStatic: true,
    render: {
        fillStyle: 'transparent'  // 오른쪽 벽을 투명하게 설정
    }
});
World.add(world, leftWall);
World.add(world, rightWall);

// 블록 이미지 목록
const blockImages = [
    './img/book01.png',
    './img/book02.png',
    './img/book03.png',
    './img/book04.png',
    './img/book05.png',
    './img/book06.png',
    './img/book07.png',
    './img/book08.png',
    './img/book09.png'
];

// 이미지 크기와 비율을 저장할 배열
const imageDimensions = [];

// 각 이미지의 원본 크기를 가져와 비율을 계산
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
                        ratio: img.height / img.width // 원본 비율 계산
                    });
                    resolveImage();
                };
            });
        });

        Promise.all(promises).then(resolve);
    });
};

// 생성된 블록 수 추적
let blockCount = 0;
let currentY = 0; // 블록들이 쌓일 y 값

// 블록 생성 함수
function createBlock(x, y) {
    if (blockCount < 9) { // 블록은 최대 8개만 생성
        const imageIndex = blockCount % blockImages.length; // 이미지 순환
        const imgDim = imageDimensions[imageIndex];  // 현재 블록의 이미지 크기 정보
        const blockWidth = imgDim.width; // 이미지의 실제 너비
        const blockHeight = imgDim.height + 1; // 세로 크기를 15px 키움

        // 무게 조정 (0.1에서 0.05로 감소)
        const density = Math.max(0.05, (9 - blockCount) * 0.02); // 0.05 이하로는 안 내려가게 설정

        const block = Bodies.rectangle(x, y, blockWidth, blockHeight, {
            density: density,
            restitution: 0.05,  // 반동을 조금 더 높여서 물리적으로 더 안정적
            friction: 0.2,      // 마찰을 적당히 설정 (블록이 너무 미끄러지지 않도록)
            frictionAir: 0.01,  // 공기 저항을 적당히 설정 (블록이 너무 미끄러지지 않도록)
            render: {
                sprite: {
                    texture: blockImages[imageIndex],
                    xScale: 1,  // 크기 조정
                    yScale: 1
                }
            }
        });

        World.add(world, block);
        blockCount++;

        // 마진을 추가한 후 다음 블록이 떨어질 위치를 계산
        currentY += blockHeight; // 블럭의 세로 크기만큼 증가
    }
}

// 마우스 상호작용 설정
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.8, // 마우스 제약 강하게 설정 (더 쉽게 잡을 수 있게)
        render: { visible: false }
    }
});
World.add(world, mouseConstraint);

// 블록이 떨어지도록 하는 함수
function dropBlock() {
    // 블럭이 화면의 중앙 근처에서 랜덤하게 떨어지도록 x 값 조정
    const x = containerWidth / 2 + (Math.random() - 0.5) * 120; // -100 ~ 100 범위
    createBlock(x, 0); // y값을 0으로 설정하여 상단에서 생성
}

// 1초마다 블록을 떨어지게 함
setInterval(dropBlock, 500);

// 이미지 크기 정보를 로드한 후 블록을 생성하기 시작
loadImageDimensions().then(() => {
    // 이미지 정보가 로드되면 첫 번째 블록부터 생성 시작
    dropBlock();
});
