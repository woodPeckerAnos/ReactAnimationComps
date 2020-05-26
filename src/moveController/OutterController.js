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
import { moveActions, routeTypes } from '../mapRelationships/output'
import { withController } from '../higherComps/withController'

import { route } from '../utils/route' // 路径对象
import { motion } from '../utils/motion' // 运动对象
// 开发设置
import { positionData } from '../developingSettings/developingSettings'

const { run, stop, backToVeryStart, finish, backToThisStart } = moveActions
const { normal, reverse } = routeTypes

const animationStepInterFace = {
    timeStamp: ['0'],
    // 运动快照可以根据运动状态存储更多的内容信息，比如角度，形变等等
    moveSnapShot: {
        '0'/* timeStamp match the snapShot */: { x: 0, y: 0 } // first is the initialData
    }
}

export function OutterController(props)  {
    const [shouldRendering, changeRender] = useState(true)  // 是否渲染运动组件

    const [route, updateRoute] = useState([]) // 运动路径,由输入参数来生成

    /* 运动信息保存在animationStep中，包括各个阶段的运动静态数据  */
    const [animationStep, updateAnimationStep] = useState(initializeAnimationStep(positionData)) // 已截止的运动信息 

    const [moveFlag, changeMoveFlag] = useState() // 运动行为控制

    const [movingHanlder, changeMovingHandler] = useState(function (input) { return input }) // 供运动组件执行的位置计算函数

    const moveUnit = useRef()

    useEffect(() => {
        // 运动行为发生了变化
        changeMovingHandler(moveStateReducer(moveFlag, route, animationStep, updateAnimationStep, moveUnit.current))
    }, [moveFlag])

    // 获取运动快照
    function getSnapShot({ frames, snapShot }) {
        const {timeStamp : timeStampArr, moveSnapShot : prevSnapShot} = animationStep
        const recordTimeStamp = `${frames*1000/60}`
        if (!timeStampArr.includes(recordTimeStamp)) {
            updateAnimationStep({
                timeStamp: [...timeStampArr, recordTimeStamp],
                snapShot: {
                    ...prevSnapShot,
                    [timeStamp]: snapShot
                }
            })
        }
    }

    // 获取运动组件的引用
    function getMoveUnit(ref) {
        moveUnit.current = ref
    }

    return (
        <div> 
            {withController(renderMoveUnit(shouldRendering, props), /* 传入的参数 */{ ...props, getSnapShot, movingHanlder, getMoveUnit})}
        </div>
    )
}

/* ------------------------------------------ helpers -------------------------------------- */
const initializeAnimationStep = (initialData) => {
    return {
        timeStamp: ['0'],
        moveSnapShot: {
            '0': initialData // first is the initialData
        }
    }
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
function moveStateReducer(moveState, basicRoute, animationStep, updateAnimationStep, moveUnit) {
    let newHandler = function (input) { return input }

    const sameDirectionRoute = route.createCurrentStepRouteWithSameDirection(animationStep, basicRoute)
    
    const reverseDirectionRoute = route.createCurrentStepRouteWithReverseDirection(animationStep, basicRoute)

    function getStepRoute(type) {
        if (type === normal) {
            return sameDirectionRoute
        }
        if (type === reverse) {
            return reverseDirectionRoute
        }
    }

    newHandler = motion[moveState](getStepRoute, moveUnit)

    if (moveState === backToThisStart) {
        // 调用获取指定快照数据的方法
        const currentStep = moveUnit.cancelMoveAndRecordData()
        const prevStep = animationStep.timeStamp.slice(-1)[0]
        const reverseDirectionRoute = getStepRoute(reverse)
        const specificRoute = route.createRouteToSpecificStep(animationStep, currentStep, prevStep, route)
        // 设定运行目标的方法

        // 调用运行的方法
    }
    return newReducer
}

// 改变状态
const moveStateChange = {
    run(updateMethod) {
        updateMethod(run)
    },
    stop(updateMethod) {
        updateMethod(stop)
    },
    backToVeryStart(updateMethod) {
        updateMethod(backToVeryStart)
    },
    finish(updateMethod) {
        updateMethod(finish)
    },
    backToThisStart(updateMethod) {
        updateMethod(backToThisStart)
    }
}
