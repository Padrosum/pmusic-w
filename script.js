const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');

menuToggle?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const commands = {
  quick: {
    label: 'TERMINAL',
    text: 'curl -fL https://github.com/Padrosum/pmusic/releases/download/edge/pmusic-linux-amd64 \\\n  -o pmusic-linux-amd64\nsudo install -m 0755 pmusic-linux-amd64 /usr/local/bin/pmusic\npmusic --version',
    markup: '<span class="code-prompt">$</span> curl -fL https://github.com/Padrosum/pmusic/releases/download/edge/pmusic-linux-amd64 \\\n  -o pmusic-linux-amd64\n<span class="code-prompt">$</span> sudo install -m 0755 pmusic-linux-amd64 /usr/local/bin/pmusic\n<span class="code-prompt">$</span> pmusic --version'
  },
  go: {
    label: 'GO INSTALL',
    text: 'go install github.com/Padrosum/pmusic@latest\npmusic --version',
    markup: '<span class="code-prompt">$</span> go install github.com/Padrosum/pmusic@latest\n<span class="code-prompt">$</span> pmusic --version'
  },
  source: {
    label: 'BUILD FROM SOURCE',
    text: 'git clone https://github.com/Padrosum/pmusic.git\ncd pmusic\nmake release',
    markup: '<span class="code-prompt">$</span> git clone https://github.com/Padrosum/pmusic.git\n<span class="code-prompt">$</span> cd pmusic\n<span class="code-prompt">$</span> make release'
  }
};

const commandCode = document.querySelector('#install-command');
const commandLabel = document.querySelector('#code-label');
document.querySelectorAll('.install-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelector('.install-tab.active')?.classList.remove('active');
    tab.classList.add('active');
    const command = commands[tab.dataset.command];
    commandCode.innerHTML = command.markup;
    commandCode.dataset.copyText = command.text;
    commandLabel.textContent = command.label;
  });
});

document.querySelector('.copy-button')?.addEventListener('click', async (event) => {
  const button = event.currentTarget;
  const text = commandCode.dataset.copyText || commandCode.textContent;
  try {
    await navigator.clipboard.writeText(text);
    button.innerHTML = 'Copied <span>✓</span>';
    window.setTimeout(() => { button.innerHTML = 'Copy <span>⧉</span>'; }, 1600);
  } catch {
    button.textContent = 'Select to copy';
  }
});
