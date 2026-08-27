const header = document.querySelector('.header');
const menuButton = document.querySelector('.menu-button');

menuButton?.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const commands = {
  binary: 'curl -fL https://github.com/Padrosum/pmusic/releases/download/edge/pmusic-linux-amd64 -o pmusic-linux-amd64',
  go: 'go install github.com/Padrosum/pmusic@latest',
  source: 'git clone https://github.com/Padrosum/pmusic.git && cd pmusic && make release'
};

const commandCode = document.querySelector('#install-command');
document.querySelectorAll('.install-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelector('.install-tab.active')?.classList.remove('active');
    document.querySelector('.install-tab[aria-selected="true"]')?.setAttribute('aria-selected', 'false');
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    commandCode.textContent = commands[tab.dataset.command];
  });
});

document.querySelector('.copy-button')?.addEventListener('click', async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(commandCode.textContent);
    button.innerHTML = 'Copied <span>✓</span>';
    window.setTimeout(() => { button.innerHTML = 'Copy <span>⧉</span>'; }, 1600);
  } catch {
    button.textContent = 'Select to copy';
  }
});
