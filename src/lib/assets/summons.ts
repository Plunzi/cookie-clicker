export const summonCookie = (cursorX: number, cursorY: number, randomCookie: string) => {
    const randomSize = Math.floor(Math.random() * 25) + 50;
    const randomDirection = Math.floor(Math.random() * 2) === 0 ? -1 : 1;

    // Create and position the new div
    const newDiv = document.createElement('div');
    newDiv.style.position = 'absolute';
    newDiv.style.left = `${cursorX - randomSize / 2}px`;
    newDiv.style.top = `${cursorY}px`;
    newDiv.style.width = `${randomSize}px`;
    newDiv.style.height = `${randomSize}px`;
    newDiv.style.pointerEvents = 'none';
    newDiv.style.backgroundImage = `url("/cookies/${randomCookie.toLowerCase()}.png")`;
    newDiv.style.backgroundSize = 'cover';
    newDiv.style.backgroundPosition = 'center';
    newDiv.style.backgroundRepeat = 'no-repeat';
    newDiv.style.imageRendering = 'pixelated';
    newDiv.style.zIndex = '9999';
    newDiv.animate(
        [
            { transform: 'translate(0px, 0px)', opacity: 1 },
            { transform: `translate(${50 * randomDirection}px, -50px) rotate(${45 * randomDirection}deg)`, opacity: 1 },
            { transform: `translate(${100 * randomDirection}px, 50px) rotate(${90 * randomDirection}deg)`, opacity: 0 }
        ],
        {
            duration: 1000,
            easing: 'ease-out'
        }
    );
    document.body.appendChild(newDiv);

    // Optionally, remove the div after some time
    setTimeout(() => {
        document.body.removeChild(newDiv);
    }, 1000);
};

export const summonText = (cursorX: number, cursorY: number) => {
    const randomSize = Math.floor(Math.random() * 25) + 50;
    const randomXPosition = Math.floor(Math.random() * 50) - 35;

    // Create and position the new div
    const newText = document.createElement('p');
    newText.style.position = 'absolute';
    newText.style.left = `${cursorX + randomXPosition}px`;
    newText.style.top = `${cursorY}px`;
    newText.style.width = `${randomSize}px`;
    newText.style.height = `${randomSize}px`;
    newText.style.pointerEvents = 'none';
    newText.style.color = 'white';
    newText.innerHTML = `+1`;
    newText.classList.add('font-bold', 'text-2xl');
    newText.style.zIndex = '9999';
    newText.animate(
        [
            { transform: 'translateY(0px)', opacity: 1 },
            { transform: 'translateY(-200px)', opacity: 0 }
        ],
        {
            duration: 1500,
            easing: 'ease-in-out'
        }
    );
    document.body.appendChild(newText);

    // Optionally, remove the div after some time
    setTimeout(() => {
        document.body.removeChild(newText);
    }, 1000);
};