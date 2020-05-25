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
    const [movingHanlder, changeMovingHandler] = useState(function (input) { return input })

    useEffect(() => {
        // 运动行为发生了变化
        changeMovingHandler(moveStateReducer(moveFlag, route, animationStep, updateAnimationStep))
    }, [moveFlag])

    // 获取运动快照
    function getSnapShot({timeStamp, snapShot}) {
        const {timeStamp : timeStampArr, moveSnapShot : prevSnapShot} = animationStep
        updateAnimationStep({
            timeStamp: [...timeStampArr, timeStamp],
            snapShot: {
                ...prevSnapShot,
                [timeStamp]: snapShot
            }
        })
    }

    props = {
        ...props,
        getSnapShot,
    }
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

// 处理状态变更
// —— 传递给运动组件一个运算函数，运动组件内部根据这个运算函数来处理自身的变量
// —— 类似于传递了一个自定义hook，内部运动组件根据这个hook的变化就可以判断是否进行新一次的运动
// 该状态变更只处理同一route运动中的运动状态变化，不承担更新route的机能
function moveStateReducer(moveState, route, animationStep, updateAnimationStep) {
    let newHandler = function (input) { return input }
    let step = 0

    // 根据animationSteps数据处理移动route的方法
    const { timeStamp, moveSnapShot } = animationStep
    const latestTimeStamp = timeStamp.slice(-1)[0]
    // 根据时间戳预估位置
    // caution: 当运动为非线性的时候，本质是根据速率函数来控制每个点之间的间距，因此帧数和索引应该不会有什么变化
    const probablyRange = [Math.floor(latestTimeStamp/1000*60 - 10), Math.ceil(latestTimeStamp/1000*60 + 10)] // 60:frames  10:adjustNum
    const currentIndex = probablyRange[0] + route.slice(probablyRange[0], probablyRange[1] + 1)
        .findIndex(item => item.x === moveSnapShot[latestTimeStamp].x && item.y === moveSnapShot[latestTimeStamp].y)
    route = route.slice(currentIndex) // 生成最新的route

    if (moveState === '1') {
        // 调用运行的方法
        newHandler = () => {
            step++
            if (step >= route.length) {
                return {
                    x: route[route.length - 1].x,
                    y: route[route.length - 1].y,
                }
            }
            return {
                x: route[step].x,
                y: route[step].y,
            }
        }
    }
    if (moveState === '2') {
        // 调用停止的方法 
        // 停止方法会保持结果值和输入值一样
        // 内部运动组件根据4点原则（0% 25% 50% 100%）确定位置没有发生变化，则维护自身为停止
        newHandler = (input) => {
            return {
                x: input.x,
                y: input.y,
            }
        }
        // 调用快照记录的方法
        // 记录快照的方法由父组件统一维护，传递给运动组件进行调用

    }
    if (moveState === '3') {
        // 从逻辑一致性上来说，先要获取当前快照信息
        // 如果没有快照信息则更新添加进本次快照信息
        // 如果有这个快照信息，则不进行快照更新处理

        // 记录运动信息后，反转route数组，使用反转的route数组路劲数据既可以反向运动

        // 生成运行的handler
    }
    if (moveState === '4') {
        // 生成直接抵达当前route终点的handler
    }
    if (moveState === '5') {
        // 调用获取指定快照数据的方法
  
        // 设定运行目标的方法

        // 调用运行的方法
    }
    return newReducer
}

// 改变状态
const moveStateChange = {
    run(updateMethod) {
        updateMethod('1')
    },
    stop(updateMethod) {
        updateMethod('2')
    },
    backToVeryStart(updateMethod) {
        updateMethod('3')
    },
    finish(updateMethod) {
        updateMethod('4')
    },
    backToThisStart(updateMethod) {
        updateMethod('5')
    }
}
