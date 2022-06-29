/* write your code here ... */
// const body = document.body
// const spawnPoint = document.querySelector('.spawn-point')
// const pistol = document.querySelector('.pistol')
// const img = pistol.querySelector('img')
// body.style.overflow = 'hidden'
// const crosshair = document.querySelector('.crosshair')
// crosshair.style.position = 'absolute'
// //circulation pistol
// body.addEventListener('mousemove', function (event) {
//     const bullet = document.querySelector('.bullet')
//     let [midX, midY] = [window.innerWidth / 2, window.innerHeight / 2];
//     function degree(midX, midY) {
//         const [pointerX, pointerY] = [event.clientX, event.clientY];
//         const [deltaX, deltaY] = [pointerX - midX, pointerY - midY]
//         const radiance = Math.atan2(deltaY, deltaX)
//         const deg = radiance * (180 / Math.PI)
//         return deg
//     }

//     if (degree(midX, midY) > 135 && degree(midX, midY) < 180 || degree(midX, midY) < -135 && degree(midX, midY) > -180) {
//         [midX, midY] = [window.innerWidth / 2, window.innerHeight / 2 + 57];
//         let result = degree(midX, midY)
//         pistol.style.transform = `rotate(${result}deg)`
//         spawnPoint.style.transform = `rotate(${result}deg)`
//     } else if (degree(midX, midY) < 45 && degree(midX, midY) > -45) {
//         [midX, midY] = [window.innerWidth / 2, window.innerHeight / 2 - 57];
//         let result = degree(midX, midY)
//         pistol.style.transform = `rotate(${result}deg)`
//         spawnPoint.style.transform = `rotate(${result}deg)`

//     } else if (degree(midX, midY) > 45 && degree(midX, midY) < 135) {
//         [midX, midY] = [window.innerWidth / 2 + 100, window.innerHeight / 2];
//         let result = degree(midX, midY)
//         pistol.style.transform = `rotate(${result}deg)`
//         spawnPoint.style.transform = `rotate(${result}deg)`
//     } else if (degree(midX, midY) > -135 && degree(midX, midY) < -45) {
//         [midX, midY] = [window.innerWidth / 2 - 100, window.innerHeight / 2];
//         let result = degree(midX, midY)
//         pistol.style.transform = `rotate(${result}deg)`
//         spawnPoint.style.transform = `rotate(${result}deg)`
//     }
//     crosshair.style.top = event.clientY + 'px'
//     crosshair.style.left = event.clientX + 'px'
// })
// // create and add bullet
// function createBullet() {
//     const bullet = document.createElement('img')
//     bullet.setAttribute("src", "./illustrations/bullet.svg")
//     bullet.classList.add("bullet")
//     spawnPoint.style.transition = "all 0.3s"
//     spawnPoint.style.width = "80px"
//     spawnPoint.style.height = "20px"
//     // spawnPoint.style.top = "0px"
//     spawnPoint.style.top = 0
//     spawnPoint.style.right = 0

//     spawnPoint.style.position = "absolute"
//     // pistol.style.position = "absolute"
//     body.style.position = "relative"
//     // bullet.style.top = "45%"
//     // bullet.style.left = "45%"
//     bullet.style.zIndex = "-1"
//     spawnPoint.append(bullet)
// }
// createBullet()

// //shooting
// body.addEventListener('click', function (event) {
//     const spawnPoint = document.querySelector('.spawn-point')
//     const bullet = document.querySelector('.bullet')
//     console.log(spawnPoint);
//     spawnPoint.style.top = event.pageY  + 'px'
//     spawnPoint.style.left = event.pageX + 'px'
//     // spawnPoint.style.backgroundSize = "content"
//     setTimeout(() => {
//         spawnPoint.removeChild(bullet)
//         console.log(1);
//     }, 700)
//     createBullet()

// })


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
const crosshair = document.querySelector('.crosshair')
const pistol = document.querySelector('.pistol')
const spawnPoint = document.querySelector('.spawn-point')

let isPistolDisable = false

const updateCrosshairPosition = (x, y) => {
    crosshair.style.setProperty('--x', `${x}px`)
    crosshair.style.setProperty('--y', `${y}px`)
}

const updatePistolDisability = (clientX, clientY) => {
    const deltaX = clientX - window.innerWidth / 2;
    const deltaY = clientY - window.innerHeight / 2;

    const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
    isPistolDisable = distance < 240
    if (isPistolDisable) {
        pistol.classList.add('disabled')
        return;
    }

    pistol.classList.remove('disabled')
}

const pistolAngle = (clientX, clientY) => {
    const rect = spawnPoint.getBoundingClientRect();
    const middleX = rect.x + rect.width / 2;
    const middleY = rect.y + rect.height / 2;

    const deltaX = clientX - middleX;
    const deltaY = clientY - middleY;


    let angle = Math.atan(deltaY / deltaX)
    if (deltaX < 0) angle += Math.PI
    return angle
}

const spawnBullet = (clientX, clientY) => {
    if(isPistolDisable) return
    const bullet = document.createElement('img')
    bullet.classList.add('bullet')
    bullet.src = "./illustrations/bullet.svg"

    const { x, y } = spawnPoint.getBoundingClientRect();
    bullet.style.top = `${y}px`
    bullet.style.left = `${x}px`

    document.body.append(bullet);

    const angle = pistolAngle(clientX, clientY)
    const animation = bullet.animate([
        { transform: `rotate(${angle}rad) translate(0)` },
        { transform: `rotate(${angle}rad) translate(1000px)` },
    ], {
        duration: 1000,
    })

    animation.addEventListener('finish', () => {
        bullet.remove()
    })



}

const updatePistolRotation = (clientX, clientY) => {
    if (isPistolDisable) return;

    pistol.style.transform = `rotate(${pistolAngle(clientX, clientY)}rad)`
}

const initializeEventListenners = () => {
    document.addEventListener('mousemove', (event) => {
        updateCrosshairPosition(event.clientX, event.clientY)
        updatePistolDisability(event.clientX, event.clientY)
        updatePistolRotation(event.clientX, event.clientY)
    })
    document.addEventListener('click', (event) => {
        spawnBullet(event.clientX, event.clientY)
    })
}

const main = () => {
    initializeEventListenners();
}

main();