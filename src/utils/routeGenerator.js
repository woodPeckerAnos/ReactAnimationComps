
function generateRoute(target, duration = 3000, rate) {
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
}

export { generateRoute }
