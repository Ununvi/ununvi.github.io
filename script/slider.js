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
    './img/book09.png',
    './img/book10.png'
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
    if (blockCount < 10) { 
        const imageIndex = blockCount % blockImages.length; 
        const imgDim = imageDimensions[imageIndex];  
        
        // 블록 크기 축소 (70% 크기로 줄이기)
        const scaleFactor = 0.3; 
        const blockWidth = imgDim.width * scaleFactor;
        const blockHeight = imgDim.height * scaleFactor;

        // 밀도 조정 (무게 가벼워짐)
        const density = Math.max(0.05, (10 - blockCount) * 0.01); 

        const block = Bodies.rectangle(x, y, blockWidth, blockHeight, {
            density: density,
            restitution: 0.05,  
            friction: 0.2,      
            frictionAir: 0.01,  
            render: {
                sprite: {
                    texture: blockImages[imageIndex],
                    xScale: scaleFactor,  // 크기 조정
                    yScale: scaleFactor
                }
            }
        });

        World.add(world, block);
        blockCount++;

        // 다음 블록 위치 조정
        currentY += blockHeight; 
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
