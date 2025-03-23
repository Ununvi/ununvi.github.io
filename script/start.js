h1, .description-title{
  font-size: clamp(30px, 2.5vw, 45px);
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
  
}

h2{
  font-size: clamp(16px, 2vw, 26px);
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

p, .description-text, li, button, .floating-item {
  font-size: clamp(13px, 1.0vw, 15px);
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
}

li{
  font-size: clamp(13px, 1.2vw, 15px);
}

.small, .description-type, .modal-type {
  font-size: clamp(16px, 1.0vw, 18px);
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

* {
  margin: 0;
  padding: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  }
  
body {
    cursor: none !important;
    overflow-x: hidden;
    scroll-behavior: smooth;
}
header {
  display: flex;
  justify-content: center;
    margin-top: 3vh;
    position: fixed;
    width: 100%;
    padding: 10px 0;
    color: black;
    z-index: 993;
}
#index{
  background-color: #fff;
  
}
.nav-box{
  display: flex;
}
nav {
    padding: 15px 0;
    background-color: #eeeeee9e;
    border-radius: 50px;
    backdrop-filter: blur(4px);

}
nav ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    list-style: none;
    padding: 0 10px
}
nav ul li a {
    color: #000;
    text-decoration: none;
    font-family: "Noto Sans KR", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}
nav ul li{
  width: 8vw;
  text-align: center;
}
nav ul li a:hover {
  font-weight: 600;
}
nav ul li a.active {
  font-weight: 600;
}
#F5{
  padding: 19px 5px;
  background-color: #eeeeee9e;
  border-radius: 50px;
  backdrop-filter: blur(4px);
}
.logo-box{
  position: absolute;
  left: 70px;
  display: flex;
}
.logo-box img{
  display: flex;
  align-items: center;
  height: 17px;
  margin: 0 15px;
  font-size: clamp(16px, 2vw, 22px);
}
#F5:focus {
  outline: none;
}
section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 1s ease-out, transform 1s ease-out;
}
.full-page {
  height: 100vh;
  opacity: 1;
}

.cursor {
  width: 1.2vw;
  height: 1.2vw;
  background-color: rgba(119, 119, 119, 0.778);
  border-radius: 50%;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-out;
  z-index: 999;
}
  .project{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 100px;
    padding: 0 120px;
    border-radius: 30px;
  }
  .project_card{
    width: 25vw;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    margin: 0 20px;
    line-height: 20pt;
    box-shadow: 3px 1px 10px rgba(86, 86, 86, 0.155);
    transition: transform 1.5s ease-in-out;
    text-decoration-line: none;
    color: #000;
    
  }
  .project_card.animate-up {
    transform: translateY(-20px);
}

 .project_title{
    display: flex;
    flex-direction: column;
    padding: 10px 0;
  }
  .project_img{
    width: 100%;
    border-radius: 10px;
  }
  .project .small{
    display: flex;
    align-items: center;
    padding-bottom: 5px;
    color: #bbb;
  }
  .project_title_category{
    display: flex;
    margin-bottom: 15px;
  }
  .project_detail{
    color: #666;
    padding-top: 15px;
    padding-bottom: 10px;
    line-height: 140%;
    text-align: justify;
  }

#hi {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  display: flex;
  
  

}

canvas {
  width: 800px;  /* 고정된 너비 */
  height: 900px; /* 고정된 높이 */
  display: block;
}

#falling-container {
  width: 800px;  /* 고정된 너비 */
  height: 900px; /* 고정된 높이 */
  position: relative;

}
#falling-container img{
  margin: 20px;
}

.small{
  color: #bbb;
  z-index: 3;

}

.description-type {
  margin: 0 0 10px 0;
  color: #bbb;
}
.description-title {
  color: #000;
  margin-bottom: 45vh;
}

.description-text {
  text-align: justify;
  text-align: end;
  line-height: 20pt;
}

.description-area {
  width: 30vw;
  text-align: end;
}
.description-right{
  display: flex;
  flex-direction: row;
}

.skills-hr{
  margin-right: 8vw;
  width: 1px;
  height: 70vh;
  background-color: #000;
}

.skills-tip {
  display: flex;
  justify-content: end;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  font-weight: 400;
}

.hi-info {
  position: absolute;
  left: 70px;
  bottom: 5vh;
  display: flex;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
}
.hi-info-left{

  font-weight: 400;
}
.hi-info-left span{
  padding-left: 5px;

}
