// 使用定位实现的移动组件示例
import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/App.css';
import { generateRoute } from '../utils/routeGenerator'

// 开发用的目标位置设置
const target = { x: 200, y: 400 }

let route = generateRoute(target)

console.log('route =====', route)

function App(props) { // 运行元素 
  const [position, updatePosition] = useState({ x: 0, y: 0 })
  const animationID = useRef()
  const resetCount = useRef(0)
  const framesCount = useRef(0) // 运动进行的帧数

  const { getSnapShot, movingHanlder } = props
  
  useEffect(() => {
    // 初始化的时候运行动画
    // 当外部控制的动画运行步骤发生变化的时候运行动画
    // 根据外部传入的路径图进行移动
    move()
  }, [props.animationStep])

  function move() {
    animationID.current = requestAnimationFrame(changePosition)
  }

  function changePosition() {
    const nextPosition = movingHanlder()
    framesCount.current++
    if(nextPosition.x === position.x && nextPosition.y === position.y) {
      resetCount.current++
    }
    if (resetCount.current >= 6) {
      keepRest()
      return 
    }
    updatePosition(nextPosition)
    move()
  }

  function keepRest() {
    resetCount.current = 0
    getSnapShot({
      snapShot: position, 
      frames: framesCount.current
    })
    framesCount.current = 0
  }

  return (
    <div 
      className="App"
      style={{
        height: '100px',
        width: '100px',
        position: 'absolute',
        left: position.x,
        top: position.y,
        backgroundColor: 'yellowgreen'
      }}
    >
      
    </div>
  );
}

export default App;
