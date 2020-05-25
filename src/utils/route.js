export const route = {
    // 生成每次运动的总控route，route不变，运动不变
    generateRoute(target, duration = 3000, rate) {
        let route = []
        const yWay = target.y - 0
        const xWay = target.x - 0
        const frames = duration / 1000 * 60
        const xStep = xWay / frames // moveDistance per frame
        const yStep = yWay / frames
        for(let i = 1; i <= frames; i++) {
            route.push({
                x: 0 + i * xStep,
                y: 0 + i * yStep
            })
        }
        return route
    },

    // 根据animationSteps数据处理移动route的方法 -- 方向不发生变化
    createCurrentStepRouteWithSameDirection(animationStep) {
        const { timeStamp, moveSnapShot } = animationStep
        const latestTimeStamp = timeStamp.slice(-1)[0]
        // 根据时间戳预估位置
        // caution: 当运动为非线性的时候，本质是根据速率函数来控制每个点之间的间距，因此帧数和索引应该不会有什么变化
        const probablyRange = [Math.floor(latestTimeStamp/1000*60 - 10), Math.ceil(latestTimeStamp/1000*60 + 10)] // 60:frames  10:adjustNum
        const currentIndex = probablyRange[0] + route.slice(probablyRange[0], probablyRange[1] + 1)
            .findIndex(item => item.x === moveSnapShot[latestTimeStamp].x && item.y === moveSnapShot[latestTimeStamp].y)
        route = route.slice(currentIndex) // 生成最新的route
        return route
    },

    // 根据animationSteps数据处理移动route的方法 -- 方向与初始移动方向相反
    createCurrentStepRouteWithReverseDirection() {

    }
}