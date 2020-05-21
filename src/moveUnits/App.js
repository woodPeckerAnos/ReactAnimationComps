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
  
  useEffect(() => {
    // 初始化的时候运行动画
    // 当外部控制的动画运行步骤发生变化的时候运行动画
    // 根据外部传入的路径图进行移动
    animationID.current = requestAnimationFrame(moving())
  }, [props.animationStep])

  function moving() {
    let step = 0
    return function fn() {
      console.log('运行一次')
      if (step >= route.length) {
        cancelAnimationFrame(animationID.current)
        return
      }
      updatePosition({
        x: route[step].x,
        y: route[step].y,
      })
      step++
      animationID.current = requestAnimationFrame(fn)
    }
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
