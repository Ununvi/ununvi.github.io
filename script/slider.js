document.addEventListener("DOMContentLoaded", () => {
  const { Engine, Render, Runner, Bodies, World, Events } = Matter;

  // 물리 엔진 생성
  const engine = Engine.create();
  const world = engine.world;

  // 렌더링 설정
  const container = document.getElementById("falling-container");
  const render = Render.create({
      element: container,
      engine: engine,
      options: {
          width: window.innerWidth,
          height: window.innerHeight,
          wireframes: false,
          background: "transparent"
      }
  });

  // 렌더 실행
  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);

  // 바닥 추가
  const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 50, window.innerWidth, 20, {
      isStatic: true,
      render: { fillStyle: "#ffffff00" }
  });
  World.add(world, ground);

  // 텍스트를 물리적 객체처럼 추가하는 함수
  function createFallingText(text) {
      const baseX = window.innerWidth / 2;
      const randomOffset = (Math.random() - 0.5) * 100;
      const xPosition = baseX + randomOffset;

      // 텍스트를 표시할 div 생성
      const textElement = document.createElement('div');
      textElement.textContent = text;
      textElement.classList.add('falling-text');  // 클래스 추가하여 스타일 적용
      textElement.style.left = `${xPosition}px`;
      container.appendChild(textElement);

      // 물리 객체의 가로 사이즈를 텍스트보다 작게 설정
      const textWidth = text.length * 20;
      const bodyWidth = textWidth * 0.7; // 텍스트 가로 길이의 80%로 물리 객체의 가로 길이 설정

      // 텍스트와 물리 객체 연결
      const textBody = Bodies.rectangle(xPosition, 50, bodyWidth, 40, {
          restitution: 0.4,
          friction: 0.5,
          density: 0.002,
          isStatic: false,
          angle: 0, // 회전하지 않도록 설정
          render: { fillStyle: "transparent" } // 물리 객체의 배경을 투명하게 설정
      });

      // 수평으로만 떨어지게 하기 위해 velocity 설정
      Matter.Body.setVelocity(textBody, { x: 0, y: 5 }); // y축 방향으로만 떨어지게 설정

      World.add(world, textBody);

      // 물리 엔진과 HTML 텍스트 동기화
      Matter.Events.on(engine, 'beforeUpdate', () => {
          // 물리 객체의 위치와 회전 값을 가져와서 텍스트 요소에 반영
          textElement.style.left = `${textBody.position.x - textWidth / 2}px`;  // x 위치 업데이트
          textElement.style.top = `${textBody.position.y - 20}px`;  // y 위치 업데이트

          // 회전값을 텍스트에 반영하여 텍스트도 회전하도록 설정
          textElement.style.transform = `rotate(${textBody.angle}rad)`;
      });

      // 드래그 기능 추가 (마우스 이벤트로 조작 가능하게)
      textElement.addEventListener('mousedown', (e) => {
          const offsetX = e.clientX - textBody.position.x;
          const offsetY = e.clientY - textBody.position.y;

          function mouseMoveHandler(e) {
              // 물리 객체의 위치를 마우스에 맞춰 이동
              Matter.Body.setPosition(textBody, {
                  x: e.clientX - offsetX,
                  y: e.clientY - offsetY
              });
          }

          // 마우스 이동과 종료 이벤트 처리
          document.addEventListener('mousemove', mouseMoveHandler);
          document.addEventListener('mouseup', () => {
              document.removeEventListener('mousemove', mouseMoveHandler);
          });
      });
  }

  // IntersectionObserver 설정 (스크롤 시 특정 요소가 보일 때 실행)
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const words = ["0000000000000", "0000000000000", "0000000000000000", "0000000000", "00000000", "0000000000000", "000000", "00000000000000"];
              words.forEach((word, index) => {
                  setTimeout(() => {
                      createFallingText(word);  // 각 단어를 떨어뜨리기
                  }, index * 300);
              });

              observer.unobserve(entry.target);  // 관찰을 해제하여 중복 실행 방지
          }
      });
  }, { threshold: 0.5 });

  observer.observe(document.querySelector("#hi"));
});