// 外层移动控制组件
// 逻辑控件
/* 
    1 提供路径
    2 保存运行快照
    3 提供控制运动的方法

    解决方案：
    controller内部调用高阶函数来注入逻辑
*/
import React, { useState, useEffect, useRef } from 'react'

const moveFlagMatches = {
    '1': '运行',
    '2': '停止',
    '3': '回到起点',
    '4': '立刻抵达终点', 
    '5': '回到上一次停止的位置'
}

const animationStepInterFace = {
    timeStamp: ['0'],
    // 运动快照可以根据运动状态存储更多的内容信息，比如角度，形变等等
    moveSnapShot: {
        '0'/* timeStamp match the snapShot */: { x: 0, y: 0 } // first is the initialData
    }
}

const initializeAnimationStep = (iniialData) => {
    return {
        timeStamp: ['0'],
        moveSnapShot: {
            '0': iniialData // first is the initialData
        }
    }
}

// 开发用数据
const positionData = {
    x: 0,
    y: 0,
}

export function OutterController(props)  {
    const [shouldRendering, changeRender] = useState(true)  // 是否渲染运动组件
    const [route, updateRoute] = useState([]) // 运动路径
    /* 运动信息保存在animationStep中，包括各个阶段的运动静态数据  */
    const [animationStep, updateAnimationStep] = useState(initializeAnimationStep) // 已截止的运动信息 
    const [moveFlag, changeMoveFlag] = useState() // 运动行为控制

    useEffect(() => {
        // 运动行为发生了变化
         
    }, [moveFlag])

    return (
        <div>
            {renderMoveUnit(shouldRendering, props)}
        </div>
    )
}

// 初始化移动组件
function renderMoveUnit(renderFlag, props) {
    if (renderFlag) {
        return props.child
    }
}
