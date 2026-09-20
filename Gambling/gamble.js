const STARTING_BALANCE = 100000;

let balance = STARTING_BALANCE;
let currentBet = 0;
let lastRoll = 1;
let statusMessage = "Choose a bet and roll the dice.";
let statusType = "neutral";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatMoney(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

function updateDisplays() {
  const balanceEl = document.getElementById('balance');
  const betEl = document.getElementById('current-bet');
  const rollEl = document.getElementById('last-roll');
  const statusEl = document.getElementById('status');

  if (balanceEl) balanceEl.textContent = formatMoney(balance);
  if (betEl) betEl.textContent = formatMoney(currentBet);
  if (rollEl) rollEl.textContent = `Dice: ${lastRoll}`;

  if (statusEl) {
    statusEl.textContent = statusMessage;
    statusEl.className = `status ${statusType}`;
  }
}

function setStatus(message, type = 'neutral') {
  statusMessage = message;
  statusType = type;
  updateDisplays();
}

function placeBet() {
  const betInput = document.getElementById('bet-amount');
  const betValue = Number(betInput.value);

  if (!Number.isFinite(betValue) || betValue <= 0) {
    setStatus('Enter a valid bet greater than $0.', 'warning');
    return;
  }

  currentBet = betValue;
  setStatus(`You are betting ${formatMoney(currentBet)}. Press roll to play.`, 'success');
}

function rollDice() {
  if (currentBet <= 0) {
    setStatus('Place a bet first before rolling.', 'warning');
    return;
  }

  const choice = document.querySelector('input[name="guess"]:checked')?.value;
  if (!choice) {
    setStatus('Choose High or Low before rolling.', 'warning');
    return;
  }

  const roll = randomInt(1, 6);
  lastRoll = roll;

  const win = (choice === 'high' && roll >= 4) || (choice === 'low' && roll <= 3);

  if (win) {
    balance += currentBet;
    setStatus(`You rolled a ${roll}. You win ${formatMoney(currentBet)}!`, 'success');
  } else {
    balance -= currentBet;
    setStatus(`You rolled a ${roll}. You lost ${formatMoney(currentBet)}.`, 'danger');
  }

  if (balance < 0) {
    setStatus(`You rolled a ${roll}. You are now in debt by ${formatMoney(Math.abs(balance))}. Keep playing or reset.`, 'danger');
  }

  currentBet = 0;
  document.getElementById('bet-amount').value = '';
  updateDisplays();
}

function resetGame() {
  balance = STARTING_BALANCE;
  currentBet = 0;
  lastRoll = 1;
  document.getElementById('bet-amount').value = '';
  const radioButtons = document.querySelectorAll('input[name="guess"]');
  radioButtons.forEach((radio) => {
    radio.checked = radio.value === 'high';
  });
  setStatus('New game started. Bankroll reset to $100,000.', 'neutral');
}

function buildGame() {
  const style = document.createElement('style');
  style.textContent = `
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #0f172a, #1e293b);
      color: #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }

    .game {
      width: min(92vw, 540px);
      background: rgba(15, 23, 42, 0.92);
      border: 2px solid #fbbf24;
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4);
    }

    .top-nav {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 18px;
    }

    .top-nav a {
      color: #fde68a;
      text-decoration: none;
      font-size: 0.95rem;
    }

    .top-nav a:hover {
      color: #fff;
      text-decoration: underline;
    }

    h1 {
      margin-top: 0;
      text-align: center;
      color: #facc15;
    }

    .row {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      margin: 12px 0;
      font-size: 1.1rem;
    }

    .label {
      color: #cbd5e1;
    }

    .value {
      font-weight: bold;
      color: #f8fafc;
    }

    .controls {
      display: grid;
      gap: 14px;
      margin-top: 18px;
    }

    input[type="number"] {
      width: 100%;
      box-sizing: border-box;
      padding: 12px;
      border-radius: 10px;
      border: 1px solid #94a3b8;
      font-size: 1rem;
    }

    .guess-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
    }

    label {
      background: #1e293b;
      border: 1px solid #64748b;
      border-radius: 10px;
      padding: 10px 14px;
      cursor: pointer;
      user-select: none;
    }

    input[type="radio"] {
      accent-color: #f59e0b;
      margin-right: 6px;
    }

    .button-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      justify-content: center;
    }

    button {
      border: none;
      border-radius: 10px;
      padding: 12px 18px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.15s ease;
    }

    button:hover {
      transform: translateY(-1px);
    }

    .bet-btn {
      background: #22c55e;
      color: white;
    }

    .roll-btn {
      background: #f59e0b;
      color: white;
    }

    .reset-btn {
      background: #ef4444;
      color: white;
    }

    .status {
      margin-top: 18px;
      padding: 12px 14px;
      border-radius: 10px;
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-weight: 600;
    }

    .status.neutral { background: #1e293b; color: #e2e8f0; }
    .status.success { background: #14532d; color: #dcfce7; }
    .status.warning { background: #78350f; color: #fef3c7; }
    .status.danger { background: #7f1d1d; color: #fee2e2; }
  `;

  document.head.appendChild(style);

  document.body.innerHTML = `
    <div class="game">
      <nav class="top-nav">
        <a href="map.html">Casino Map</a>
        <a href="../index.html">Home</a>
      </nav>
      <h1>Lucky Dice Casino</h1>

      <div class="row">
        <span class="label">Balance</span>
        <span id="balance" class="value">$100,000</span>
      </div>

      <div class="row">
        <span class="label">Current Bet</span>
        <span id="current-bet" class="value">$0</span>
      </div>

      <div class="row">
        <span class="label">Last Roll</span>
        <span id="last-roll" class="value">Dice: 1</span>
      </div>

      <div class="controls">
        <input id="bet-amount" type="number" min="1" step="1" placeholder="Choose your bet amount" />

        <div class="guess-row">
          <label><input type="radio" name="guess" value="high" checked /> High (4-6)</label>
          <label><input type="radio" name="guess" value="low" /> Low (1-3)</label>
        </div>

        <div class="button-row">
          <button class="bet-btn" id="place-bet">Place Bet</button>
          <button class="roll-btn" id="roll-dice">Roll Dice</button>
          <button class="reset-btn" id="reset-game">Reset Bank</button>
        </div>
      </div>

      <div id="status" class="status neutral">Choose a bet and roll the dice.</div>
    </div>
  `;

  document.getElementById('place-bet').addEventListener('click', placeBet);
  document.getElementById('roll-dice').addEventListener('click', rollDice);
  document.getElementById('reset-game').addEventListener('click', resetGame);

  updateDisplays();
}

window.addEventListener('DOMContentLoaded', buildGame);
