const crosshair = document.querySelector(".crosshair");
const pistol = document.querySelector(".pistol");
const spawnPoint = document.querySelector(".spawn-point");

let isPistolDisable = false;

const updateCrosshairPosition = (x, y) => {
  crosshair.style.setProperty("--x", `${x}px`);
  crosshair.style.setProperty("--y", `${y}px`);
};

const updatePistolDisability = (clientX, clientY) => {
  const deltaX = clientX - window.innerWidth / 2;
  const deltaY = clientY - window.innerHeight / 2;

  const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  isPistolDisable = distance < 240;
  if (isPistolDisable) {
    pistol.classList.add("disabled");
    return;
  }

  pistol.classList.remove("disabled");
};

const pistolAngle = (clientX, clientY) => {
  const rect = spawnPoint.getBoundingClientRect();
  const middleX = rect.x + rect.width / 2;
  const middleY = rect.y + rect.height / 2;

  const deltaX = clientX - middleX;
  const deltaY = clientY - middleY;

  let angle = Math.atan(deltaY / deltaX);
  if (deltaX < 0) angle += Math.PI;
  return angle;
};

const spawnBullet = (clientX, clientY) => {
  if (isPistolDisable) return;
  const bullet = document.createElement("img");
  bullet.classList.add("bullet");
  bullet.src = "./illustrations/bullet.svg";

  const { x, y } = spawnPoint.getBoundingClientRect();
  bullet.style.top = `${y}px`;
  bullet.style.left = `${x}px`;

  document.body.append(bullet);

  const angle = pistolAngle(clientX, clientY);
  const animation = bullet.animate(
    [
      { transform: `rotate(${angle}rad) translate(0)` },
      { transform: `rotate(${angle}rad) translate(1000px)` },
    ],
    {
      duration: 1000,
    }
  );

  animation.addEventListener("finish", () => {
    bullet.remove();
  });
};
const updatePistolRotation = (clientX, clientY) => {
  if (isPistolDisable) return;

  pistol.style.transform = `rotate(${pistolAngle(clientX, clientY)}rad)`;
};

const initializeEventListenners = () => {
  document.addEventListener("mousemove", (event) => {
    updateCrosshairPosition(event.clientX, event.clientY);
    updatePistolDisability(event.clientX, event.clientY);
    updatePistolRotation(event.clientX, event.clientY);
  });
  document.addEventListener("click", (event) => {
    spawnBullet(event.clientX, event.clientY);
  });
};

const main = () => {
  initializeEventListenners();
};

main();
