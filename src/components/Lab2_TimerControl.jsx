import { useEffect, useState } from 'react';

// LAB 2 (Slide 10): Timer Start / Stop / Reset
export default function Lab2TimerControl() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  // running은 타이머가 실행 중인지 나타내는 state
  // false : 타이머 정지 상태
  // true: 타이머 실행 상태
  // setRunning(true) : start 버튼 누르면 실행
  // setRunning(false) : stop 버튼 누르면 정지

  useEffect(() => {
    // TODO 1: running이 false면 타이머를 만들지 않기
    if(!running){
      return;
    }
    // TODO 2: running이 true면 setInterval로 1초마다 count 증가
     const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    // TODO 3: Cleanup에서 clearInterval 호출
    return () => clearInterval(timer);
  }, [running]);

  const reset = () => {
    // TODO 4: 타이머를 멈추고 count를 0으로 초기화
    
    setCount(0);
    setRunning(false);
    return;
  };

  return (
    <div>
      <p className="status">상태: {running ? 'Running' : 'Stopped'}</p>
      <div className="count">{count}</div>
      <div className="controls">
        <button onClick={() => setRunning(true)} disabled={running}>Start</button>
        <button className="secondary" onClick={() => setRunning(false)} disabled={!running}>Stop</button>
        <button className="secondary" onClick={reset}>Reset</button>
      </div>
      <p className="hint">Start/Stop 버튼의 State 변경과 Effect 실행의 관계를 확인하세요.</p>
    </div>
  );
}
