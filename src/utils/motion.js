import { moveActions, routeTypes } from '../mapRelationships/output'

const { run, stop, backToVeryStart, finish, backToThisStart } = moveActions
const { normal, reverse } = routeTypes

export const motion = {
    [run](getStepRoute, ) {
        const sameDirectionRoute = getStepRoute(normal)
        const routeLength = sameDirectionRoute.length
        return newHandler = (function (sameDirectionRoute, routeLength) {
            let step = 0
            return () => {
                let returnVal
                if (step >= routeLength) {
                    returnVal = {
                        x: sameDirectionRoute[routeLength - 1].x,
                        y: sameDirectionRoute[routeLength - 1].y,
                    }
                } else {
                    returnVal = {
                        x: sameDirectionRoute[step].x,
                        y: sameDirectionRoute[step].y,
                    }
                }
                step++
                return returnVal
            }
        })(sameDirectionRoute, routeLength)
    },

    [stop]() {
        return newHandler = (input) => {
            return {
                x: input.x,
                y: input.y,
            }
        }
    },

    [backToVeryStart](getStepRoute, moveUnit) {
        // 从逻辑一致性上来说，先要获取当前快照信息
        // 1 终止当前运行，触发一个完整的中止运行逻辑 ， 停止 => 上传数据
        // 2 获取当前快照信息
        const currentStep = moveUnit.cancelMoveAndRecordData()

        // 记录运动信息后，反转route数组，使用反转的route数组路劲数据既可以反向运动
        const reverseDirectionRoute = getStepRoute(reverse)
        const routeLength = reverseDirectionRoute.length

        // 生成运行的handler
        return (function (reverseDirectionRoute, routeLength) {
            let step = 0
            return () => {
                let returnVal
                if (step >= routeLength) {
                    returnVal = {
                        x: reverseDirectionRoute[routeLength - 1].x,
                        y: reverseDirectionRoute[routeLength - 1].y,
                    }
                } else {
                    returnVal = {
                        x: reverseDirectionRoute[step].x,
                        y: reverseDirectionRoute[step].y,
                    }
                }
                step++
                return returnVal
            }
        })(reverseDirectionRoute, routeLength)
    },

    [finish](getStepRoute) {
        // 生成直接抵达当前route终点的handler
        const sameDirectionRoute = getStepRoute(normal)
        const routeLength = sameDirectionRoute.length
        return () => {
            return {
                x: sameDirectionRoute[routeLength - 1].x,
                y: sameDirectionRoute[routeLength - 1].y,
            }
        }
    },
    
    [backToThisStart]() {

    },
}
