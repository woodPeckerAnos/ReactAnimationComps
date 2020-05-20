// 外层移动控制组件
// 逻辑控件
/* 
    1 提供路径
    2 保存运行快照
    3 提供控制运动的方法
*/
import React, { useState, useEffect, useRef } from 'react'

const moveFlagMatches = {
    '1': '运行',
    '2': '停止',
    '3': '回到起点',
    '4': '立刻抵达终点',
    '5': '回到上一次停止的位置'
}

export function OutterController(props)  {
    const [shouldRendering, changeRender] = useState(true)
    const [animationStep, updateAnimationStep] = useState({}) 
    const [moveFlag, changeMoveFlag] = useState()

    // 初始化移动组件
    function renderMoveUnit(renderFlag) {
        if (renderFlag) {
            return props.child
        }
    }
    return (
        <div>
            {renderMoveUnit(shouldRendering)}
        </div>
    )
}
