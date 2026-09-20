const STARTING_BALANCE = 10;
const DICE_ENTRY_COST = 10;

let balance = STARTING_BALANCE;
let currentBet = 0;
let lastRoll = 1;
let slotValues = ['7', '7', '7'];
let diceReady = false;
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

  const slotEls = document.querySelectorAll('.slot-value');
  slotEls.forEach((slotEl, index) => {
    slotEl.textContent = slotValues[index];
  });

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
  if (!diceReady) {
    setStatus('Type $10 and enter the dice room first.', 'warning');
    return;
  }

  const betInput = document.getElementById('bet-amount');
  const betValue = Number(betInput.value);

  if (!Number.isFinite(betValue) || betValue <= 0 || betValue > balance) {
    setStatus(`Choose a wager between $1 and ${formatMoney(balance)}.`, 'warning');
    return;
  }

  currentBet = betValue;
  setStatus(`You are betting ${formatMoney(currentBet)}. Press roll to play.`, 'success');
}

function enterDiceRoom() {
  const entryInput = document.getElementById('entry-amount');
  const entryValue = Number(entryInput.value);

  if (entryValue !== DICE_ENTRY_COST) {
    setStatus('Type exactly $10 to enter the dice room.', 'warning');
    return;
  }

  diceReady = true;
  entryInput.disabled = true;
  document.getElementById('enter-dice').disabled = true;
  document.getElementById('bet-amount').disabled = false;
  document.getElementById('place-bet').disabled = false;
  setStatus('Dice room unlocked. Choose how much you want to gamble.', 'neutral');
}

function rollDice() {
  if (currentBet <= 0) {
    setStatus('Place a bet first before rolling.', 'warning');
    return;
  }

  if (balance < currentBet) {
    setStatus(`You need ${formatMoney(currentBet)} to play this round.`, 'warning');
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
    setStatus(`You rolled a ${roll}. You won the $10 dice round!`, 'success');
  } else {
    balance -= currentBet;
    setStatus(`You rolled a ${roll}. You lost the $10 dice round.`, 'danger');
  }

  if (balance < 0) {
    setStatus(`You rolled a ${roll}. Your balance is now ${formatMoney(balance)}.`, 'danger');
  }

  currentBet = 0;
  document.getElementById('bet-amount').value = '';
  updateDisplays();
}

function spinSlots() {
  const spinCost = 50;
  const jackpot = 100000;

  if (balance < spinCost) {
    setStatus('You need at least $50 to spin the slot machine.', 'warning');
    return;
  }

  balance -= spinCost;
  slotValues = [String(randomInt(1, 9)), String(randomInt(1, 9)), String(randomInt(1, 9))];

  if (slotValues.every((value) => value === '7')) {
    balance += jackpot;
    setStatus('JACKPOT! You matched 777 and won $100,000!', 'success');
  } else {
    setStatus(`The reels show ${slotValues.join(' - ')}. The $50 spin cost was paid.`, 'danger');
  }

  updateDisplays();
}

function resetGame() {
  balance = STARTING_BALANCE;
  currentBet = 0;
  lastRoll = 1;
  slotValues = ['7', '7', '7'];
  diceReady = false;
  document.getElementById('bet-amount').value = '';
  document.getElementById('bet-amount').disabled = true;
  document.getElementById('place-bet').disabled = true;
  document.getElementById('entry-amount').value = '';
  document.getElementById('entry-amount').disabled = false;
  document.getElementById('enter-dice').disabled = false;
  const radioButtons = document.querySelectorAll('input[name="guess"]');
  radioButtons.forEach((radio) => {
    radio.checked = radio.value === 'high';
  });
  setStatus('New game started. Bankroll reset to $10.', 'neutral');
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

    .top-nav .map-link {
      padding: 8px 12px;
      border: 1px solid #f6c453;
      border-radius: 8px;
      background: #7f202b;
      font-weight: bold;
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

    .entry-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
    }

    button:disabled,
    input:disabled {
      cursor: not-allowed;
      opacity: 0.55;
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

    .slot-machine {
      padding: 18px;
      border: 2px solid #fbbf24;
      border-radius: 14px;
      background: linear-gradient(145deg, #7f202b, #450f18);
      text-align: center;
    }

    .slot-machine h2 {
      margin: 0 0 6px;
      color: #fde68a;
      font-size: 1.3rem;
    }

    .slot-machine p {
      margin: 0 0 14px;
      color: #fee2e2;
    }

    .slot-reels {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 14px 0;
    }

    .slot-value {
      display: grid;
      width: 64px;
      height: 72px;
      place-items: center;
      border: 4px solid #fbbf24;
      border-radius: 8px;
      background: #fff7ed;
      color: #7f1d1d;
      font-size: 2.5rem;
      font-weight: bold;
    }

    .slot-btn {
      background: #f59e0b;
      color: #451a03;
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
        <a class="map-link" href="map.html">Casino Map</a>
        <a href="../index.html">Home</a>
      </nav>
      <h1>Lucky Dice Casino</h1>

      <div class="row">
        <span class="label">Balance</span>
        <span id="balance" class="value">$10</span>
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
        <div class="entry-row">
          <input id="entry-amount" type="number" min="10" max="10" step="10" placeholder="Type $10 to enter" />
          <button class="bet-btn" id="enter-dice">Enter Dice Room</button>
        </div>

        <input id="bet-amount" type="number" min="1" step="1" placeholder="Choose your wager" disabled />

        <div class="guess-row">
          <label><input type="radio" name="guess" value="high" checked /> High (4-6)</label>
          <label><input type="radio" name="guess" value="low" /> Low (1-3)</label>
        </div>

        <div class="button-row">
          <button class="bet-btn" id="place-bet" disabled>Place Bet</button>
          <button class="roll-btn" id="roll-dice">Roll Dice</button>
          <button class="reset-btn" id="reset-game">Reset Bank</button>
        </div>
      </div>

      <section class="slot-machine" aria-labelledby="slot-title">
        <h2 id="slot-title">Lucky 777 Slots</h2>
        <p>Spin for $50. Match 777 to win $100,000!</p>
        <div class="slot-reels" aria-label="Slot machine reels">
          <span class="slot-value">7</span>
          <span class="slot-value">7</span>
          <span class="slot-value">7</span>
        </div>
        <button class="slot-btn" id="spin-slots">Spin Slots - $50</button>
      </section>

      <div id="status" class="status neutral">Choose a bet and roll the dice.</div>
    </div>
  `;

  document.getElementById('place-bet').addEventListener('click', placeBet);
  document.getElementById('enter-dice').addEventListener('click', enterDiceRoom);
  document.getElementById('roll-dice').addEventListener('click', rollDice);
  document.getElementById('spin-slots').addEventListener('click', spinSlots);
  document.getElementById('reset-game').addEventListener('click', resetGame);

  updateDisplays();
}

window.addEventListener('DOMContentLoaded', buildGame);
