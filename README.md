
# Jen's Hook Lab

## 1. Project Information

### 프로젝트 소개 : Jen's Hook Lab

### Starter Project 정보
- 사용기술 : React, JavaScript, CSS
- 프로젝트 목적 : useEffect , useRef 학습
- 주요 기능: 타이머, Start/Stop/Reset, 입력창 Focus/Clear
- 추가 기능: 타이머 : 분; 초 표시 및 CSS 커스터마이징
---

## 2. Installation

### 설치 및 실행 방법
- git 클론 후, 
git clone <저장소 URL>
cd week12_starter_project
npm install --> 필요한거 설치
npm run dev --> 실행 명령어 
이후 터미널에 표시되는 주소를 인터넷 브라우저에 들어가서 실행하면 된다.

### 실행 화면
![LAB 1 실행 화면](screenshots/photo_1.png)
![LAB 2 실행 화면](screenshots/photo_2.png)
![LAB 3 실행 화면](screenshots/photo_3.png)
![LAB 4 실행 화면](screenshots/photo_4.png)

---

## 3. Source Code Exploration

### 프로젝트 구조 및 주요 파일 역할
- 프로젝트 구조
src/
├── App.jsx
├── App.css
├── main.jsx
└── components/
    ├── Lab1_EffectTimer.jsx
    ├── Lab2_TimerControl.jsx
    ├── Lab3_InputFocus.jsx
    └── Lab4_RefTimer.jsx

- 프로젝트 주요 파일 역할 정리
1. App.jsx : 4개의 lab을 불러오고 탭 전환 관리하는 페이지.
2. App.css : 프로젝트의 css 디자인 관리
3. main.jsx : React 앱 시작하고 메인 화면에 렌더링 해주는 페이지.
4. Lab1_EffectTimer.jsx : useEffect 를 사용한 자동타이머
5. Lab2_TimerControl.jsx : running State랑, useEffect로 타이머 컨트롤.
6. Lab3_InputFocus.jsx : useRef로 입력창 Focus 및 clear 처리
7. Lab4_RefTimer.jsx : useRef에 타이머 ID 저장해서 타이머 제어.
### useEffect 분석
useEffect는 리액트에서 컴포넌트에서 렌더링 이후에 실행할 작업을 관리하는 hook 이다. 
timer 만들때 사용 되는데, 만드는건 setTimer를 써주고, 종료는 clearInterval를 사용하면 된다. 첫번째 인자는 함수, 두번째는 디펜던시를 넣어주고, 종료시에는 return뒤에 써준다. 그리고 dependencies에는 주로 state,props가 들어간다.
### useRef 분석
useRef는 렌더링 간에 유지되는 값이다. 다시 렌더링 되어도 동일한 Ref객체를 유지하고, ref.current값을 변경해도 그 변경 자체로 리렌더링이 발생하지 않는 hook이다. state와 차이점은 값이 변경되면 re-rendering되지만, useRef는 렌더링이 되더라도 값이 유지 되어야 할 때 사용한다. countRef.current += 1; 에서 current는 고정된 keyword이다. 
### 주요 코드 분석 1 — useEffect (5~15줄)
useEffect(() => {
  const id = setInterval(() => {
    setCount(prev => prev + 1);
  }, 1000);

  return () => clearInterval(id);
}, []);

여기서 디펜던시 어레이가 []여서, 컴포넌트가 처음 마운트 될 때 실행된다. useEffect이기 때문에, count가 변경되어서 다시 렌더링 되어도 이 useEffect는 다시 실행 안 된다.
setInterval()은 1000이기 때문에 1초마다 Count가 증가되도록 설정되어있고, setCount(prev => prev + 1)여기서 prev는 리액트가 전달하는 이전 State값이다. 그리고 const id 에 타이머 ID를 저장하는 이유는 setInterval()를 실행하면 생성된 타이머를 식별 가능한 ID로 반환하기 때문에, 나중에 중지시 필요하다. id는 Count값이 아닌 타이머를 관리하기 위한 식별자이다. clearInterval(id) 는 타이머 중지하기 위해 사용하고, []는 불필요한 Effect 재실행 방지이다.
### 주요 코드 분석 2 — useRef (5~15줄)

const inputRef = useRef(null);

const focusInput = () => {
  inputRef.current.focus();
};

const clearInput = () => {
  inputRef.current.value = '';
  inputRef.current.focus();
};
useRef(null) 은 DOM 요소를 참조할 Ref 객체를 만들어주고
inputRef에서는 인풋 요소를 참조하기 위한 변수이다. 
inputRef.cuurent.는 연결된 실제 input DOM 요소에 접근하고,
.focus()는 버튼 클릭하면 입력창으로 커서가 자동으로 이동할때 사용 되었다. .value = '' 는 빈문자열로 만들어주기 위해 사용 됐고, ref={inputRef} 은 리액트의 Ref 객체와 실제 인풋 요소를 연결하였다. 
## 4. Lab Implementation

### LAB 1. useEffect Timer
- 구현 내용: useEffect와 setInterval() 사용해 1초마다 카운트 증가, setCount(prev => prev+1)로 이전 State값 활용,
디펜던시 어레이 [] 로 설정, ClearInterval() 로 타이머 클린업 구현.
- 실행 결과: 초기 Count는 0으로 표시, 1초마다 카운트 1씩 증가돼고, 디펜던시 어레이 제거해도 Cleanup 때문에 타이머 중복 누락 x , LAB 다른 탭으로 이동시 타이머 정리됨

### LAB 2. Timer Start / Stop
- 구현 내용:useState로 count,running 상태 관리, running = true 이면 setInterval()로 1초마다 카운트 증가, running = false면 타이머 생성x, useEffect의 디펜던시 어레이()로 타이머 중지. 리셋하면 running = false, count = 0, 추가기능으로 Math.floor(), %, padStart() 를 이용해서 0 -> MM:ss 형식으로 분 초 표시 구현하였다. 
- 실행 결과: Start버튼 누르면 00:00 부터 타이머가 1초씩 증가됨. stop 버튼 누르면 현재 카운트 된 시간에서 멈춤, 다시 start누르면 멈춘 시간부터 이어서 증가됨. Reset 버튼 클릭 하면 00:00로 초기화, 그리고 타이며 stop 됨.
 Running/ Stopped 상태는 버튼 동작에 따라 변경됨.
 실행중에는 Start버튼 비활성화 되어 클릭 불가능함. 

### LAB 3. Input Focus with useRef
- 구현 내용:useRef(null)로 inputRef 생성, ref={inputRef}사용하여 실제 InputDOM 요소 연결시킴. inputRef.current.focus()로 버튼 클릭하면 인풋창에 자동으로 포커스 이동. inputRef.current.value = '' 로 입력내용 초기화 시킴. useState없이 DOM 요소 직접 제어. 
- 실행 결과:입력창에 이름 입력 가능, Focus버튼 클릭하면 인풋창으로 커서 자동으로 이동됨. Clear버튼 누르면 입력 내용 초기화됨. Clear이후에도 입력창 포커스 유지. 버튼 클릭시 페이지 새로고침 X

### LAB 4. Timer with useRef
- 구현 내용: useRef(null)로 타이머 ID 저장할 수 있는 TimerRef 생성, setInterval()로 1초마다 Count 증가, timerRef.current에 타이머 ID저장, timerRef.current 에 ID가 있으면 중복 실행 방지함.clearInterval로 타이머 멈춤 stop시 timerRef.current를 null, running = false로 변경시킴
reset시 stop 실행 후 카운트 0 으로 초기화 시킴.
useEffect 의 cleanup으로 컴포넌트 어마운트 시 타이머 정리시킴
- 실행 결과:start버튼 누르면 count 1초마다 증가, stop누르면 현재 count에서 정지. 다시 start누르면 이전 count부터 증가. reset누르면 count 가 0 으로 초기화 및 타이머 중지됨 . start버튼 반복해서 눌러도 타이머 중복 실행x, 다른 LAB으로 이동하면 기존 타이머 정리됨.

---

## 5. Lab Comparison

### Q1. useEffect의 Dependency Array가 필요한 이유는?
-> useEffect 가 언제 다시 샐행될지 결정하기 위해 필요하다. 필요하지 않은 반복 실행 미연에 방지하고 지정한 값이 변경 될 때만 Efeect를 다시 실행할 수 있게 한다.
### Q2. Cleanup을 사용하지 않으면 어떤 문제가 발생할 수 있는가?
-> 타이머가 멈추지 않고 계속 실행되거나, 중복 생성이 될 수가 있다. 
### Q3. useState와 useRef의 가장 중요한 차이는?
-> 가장 중요한 차이는 값 변경시 re-rendering 발생 여부이다. 
useState = state 변경시 react가 화면을 다시 렌더링 한다.
useRef = .current 값이 바뀌어도 리렌더링 발생x, 렌더링 간 값을 유지한다. 
### Q4. LAB 2와 LAB 4의 Timer 관리 방식은 어떻게 다른가?
Lab2 : useState의 running 상태랑 useEffect를 이용하여 타이머 시작/중지 
LAB4: useRef의 timerRef.current 에 타이머 ID 저장 및 start/stop함수에서 직접 타이머 컨트롤
---

## 6. Customizing

### 프로젝트 제목 및 설명 변경
기존 제목 -> Jen's Hook Lab
기존 설명 -> My little playground for useEffect, useRef & React.

### CSS 스타일 변경
backgroud 컬러와, 버튼 컬러를 변경하였다. 
### 추가 기능 구현
타이머 카운트를 0에서 MM:SS 형식으로 바꾸었다. 
### 수정한 파일 및 주요 변경 사항
App.jsx : 프로젝트 제목 jen's hook lab으로 변경
App.css : 배경색 및 버튼 색상 등 CSS 변경
Lab1_EffectTimer.jsx : useEffect 타이머 및 cleanup 구현
Lab2_TimerControl.jsx : Start/Stop/Reset 및 분:초 표시 기능 추가
Lab3_InputFocus.jsx : useRef를 이용한 Focus/Clear 구현
Lab4_RefTimer.jsx: useRef로 타이머 ID 관리 및 Cleanup 구현
## 7. Deployment

### GitHub Classroom URL
https://github.com/2026-2-OSS/assign12-c02-22401014.git
### Vercel URL
https://week12-starter-project-iota.vercel.app/
### 배포 및 동작 확인

---

## 8. Weekly Review

### 새롭게 배운 내용 3가지

1.useEffect / dependency Array - effect가 실행되는 시점 컨트롤 , cleanup으로 타이머 정리하는 원리
2.useRef / DOM 제어 - .current를 이용해 input에 접근하고 focus자동 이동
3.useState  / useRef 차이 - State 변경에 따른 리렌더링과 Ref를 활용한 타이머 ID 관리.

### 어려웠던 점과 해결 방법
1. useEffect의 Cleanup 이해
- 어려움: return을 사용하는 이유와 타이머 종료 방식이 헷갈렸음.
- 해결: Dependency Array를 제거하는 실험을 통해 Effect와 Cleanup의 실행 시점을 비교함.
2. useRef를 이용한 타이머 관리
- 어려움: timerRef.current에 타이머 ID를 저장하는 방법과 return () =>의 사용 시점이 헷갈렸음.
- 해결: LAB 2의 타이머 관리 방식과 비교하면서 clearInterval()을 직접 호출하는 방법을 이해함.
3. Input 값 초기화
- 어려움: =와 ==의 차이로 입력창 초기화 코드를 작성하는 데 어려움이 있었음.
- 해결: 대입 연산자와 비교 연산자의 차이를 이해하고 value를 빈 문자열로 변경함.
### AI 활용 내용 및 느낀 점
- todo 구현 방법 모를시에 답 안 받고, 힌트를 말로 요청하였고, 내가 직접 코드를 적어서 확인 받음
- useEffect, useRef, Dependency Array 등 헷갈리는 새로 배우는 개념 이해하는데 활용
- 직접 작성한 코드 AI한테 보여주고 오류 원인 및 수정 방향 확인
- return , = , == 등 헷갈리는 js 문법 질문
- 타이머 분;초 기능 구현하며 계싼 방법 학습

느낀점: 처음에는 useEffect, useRef가 헷갈렸는데 직접 구현하고 오류도 수정하며 차이를 더 이해할 수 있었다.