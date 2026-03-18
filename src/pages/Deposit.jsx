import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/deposit.css";

const items = [
  { name: "Bitcoin", icons: [{ type: "btc" }] },
  { name: "Ethereum", icons: [{ type: "eth" }] },
  { name: "Solana", icons: [{ type: "sol" }] },
  { name: "TRON", icons: [{ type: "trx" }] },
  { name: "Dogecoin", icons: [{ type: "doge" }] },
  { name: "XRP", icons: [{ type: "xrp" }] },
  { name: "Cardano", icons: [{ type: "ada" }] },
  { name: "Binance Coin BSC", icons: [{ type: "bnb" }] },
  { name: "Tether on BSC", icons: [{ type: "usdt" }, { type: "bnb" }] },

  { name: "Tether on Solana", icons: [{ type: "usdt" }, { type: "sol" }] },
  { name: "USD Coin on Solana", icons: [{ type: "usdc" }, { type: "sol" }] },
  { name: "Tether on Ethereum", icons: [{ type: "usdt" }, { type: "eth" }] },
  { name: "Tether on Tron", icons: [{ type: "usdt" }, { type: "trx" }] },
  { name: "Litecoin", icons: [{ type: "ltc" }] },
  { name: "USD Coin on Ethereum", icons: [{ type: "usdc" }, { type: "eth" }] },
  { name: "Cosmos Atom", icons: [{ type: "atom" }] },
  { name: "Polygon", icons: [{ type: "matic" }] },
  { name: "Tether on POL", icons: [{ type: "usdt" }, { type: "matic" }] },
  { name: "Ethereum on Arbitrum One", icons: [{ type: "eth" }, { type: "arb" }] },
  { name: "Tether on Arbitrum One", icons: [{ type: "usdt" }, { type: "arb" }] },

  { name: "Dai on Arbitrum One", icons: [{ type: "dai" }, { type: "arb" }] },
  { name: "USD Coin on Arbitrum One", icons: [{ type: "usdc" }, { type: "arb" }] },
  { name: "Bridged USD Coin on Arbitrum", icons: [{ type: "usdc" }, { type: "arb" }] },
  { name: "SHIBA INU on BSC", icons: [{ type: "shib" }, { type: "bnb" }] },
  { name: "DigiByte", icons: [{ type: "dgb" }] },
  { name: "Bitcoin Cash", icons: [{ type: "bch" }] },
  { name: "QTUM", icons: [{ type: "qtum" }] },
  { name: "Dash", icons: [{ type: "dash" }] },
  { name: "Ethereum on Optimism", icons: [{ type: "eth" }, { type: "op" }] },
  { name: "Tether on Optimism", icons: [{ type: "usdt" }, { type: "op" }] },

  { name: "USD Coin on Optimism", icons: [{ type: "usdc" }, { type: "op" }] },
  { name: "Bridged USD Coin on Optimism", icons: [{ type: "usdc" }, { type: "op" }] },
  { name: "Dai on Ethereum", icons: [{ type: "dai" }, { type: "eth" }] },
  { name: "SHIBA INU on Ethereum", icons: [{ type: "shib" }, { type: "eth" }] },
  { name: "Chainlink on Ethereum", icons: [{ type: "link" }, { type: "eth" }] },
];

function CoinSvg({ type }) {
  switch (type) {
    case "btc":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <circle cx="32" cy="32" r="28" fill="#f7931a" />
          <text x="32" y="41" textAnchor="middle" fontSize="30" fontWeight="700" fill="#fff">₿</text>
        </svg>
      );

    case "eth":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <ellipse cx="32" cy="32" rx="26" ry="24" fill="#f3f3f3" />
          <polygon points="32,8 18,32 32,26 46,32" fill="#444" />
          <polygon points="32,56 18,36 32,42 46,36" fill="#666" />
        </svg>
      );

    case "sol":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <ellipse cx="32" cy="32" rx="26" ry="24" fill="#f3f3f3" />
          <defs>
            <linearGradient id="solg" x1="0" x2="1">
              <stop offset="0%" stopColor="#00ffa3" />
              <stop offset="100%" stopColor="#dc1fff" />
            </linearGradient>
          </defs>
          <polygon points="18,18 44,18 38,24 12,24" fill="url(#solg)" />
          <polygon points="20,29 46,29 40,35 14,35" fill="url(#solg)" />
          <polygon points="18,40 44,40 38,46 12,46" fill="url(#solg)" />
        </svg>
      );

    case "trx":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <ellipse cx="32" cy="32" rx="26" ry="24" fill="#f3f3f3" />
          <polygon points="16,18 48,24 30,46" fill="none" stroke="#ef0027" strokeWidth="3" />
          <line x1="16" y1="18" x2="28" y2="31" stroke="#ef0027" strokeWidth="3" />
          <line x1="48" y1="24" x2="28" y2="31" stroke="#ef0027" strokeWidth="3" />
          <line x1="30" y1="46" x2="28" y2="31" stroke="#ef0027" strokeWidth="3" />
        </svg>
      );

    case "doge":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <circle cx="32" cy="32" r="28" fill="#c2a633" />
          <text x="32" y="41" textAnchor="middle" fontSize="28" fontWeight="700" fill="#fff">Ð</text>
        </svg>
      );

    case "xrp":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <ellipse cx="32" cy="32" rx="26" ry="24" fill="#f3f3f3" />
          <path d="M18 20c4 4 10 4 14 0 4-4 10-4 14 0" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
          <path d="M18 44c4-4 10-4 14 0 4 4 10 4 14 0" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case "ada":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <ellipse cx="32" cy="32" rx="26" ry="24" fill="#f3f3f3" />
          <g fill="#1f4ed8">
            <circle cx="32" cy="32" r="5" />
            <circle cx="32" cy="16" r="2" />
            <circle cx="32" cy="48" r="2" />
            <circle cx="16" cy="32" r="2" />
            <circle cx="48" cy="32" r="2" />
            <circle cx="21" cy="21" r="2" />
            <circle cx="43" cy="21" r="2" />
            <circle cx="21" cy="43" r="2" />
            <circle cx="43" cy="43" r="2" />
            <circle cx="32" cy="10" r="1.5" />
            <circle cx="32" cy="54" r="1.5" />
            <circle cx="10" cy="32" r="1.5" />
            <circle cx="54" cy="32" r="1.5" />
          </g>
        </svg>
      );

    case "bnb":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <ellipse cx="32" cy="32" rx="26" ry="24" fill="#f3f3f3" />
          <g fill="#f0b90b">
            <rect x="28" y="14" width="8" height="8" transform="rotate(45 32 18)" />
            <rect x="16" y="26" width="8" height="8" transform="rotate(45 20 30)" />
            <rect x="40" y="26" width="8" height="8" transform="rotate(45 44 30)" />
            <rect x="28" y="38" width="8" height="8" transform="rotate(45 32 42)" />
            <rect x="28" y="26" width="8" height="8" transform="rotate(45 32 30)" />
          </g>
        </svg>
      );

    case "usdt":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <circle cx="32" cy="32" r="28" fill="#50af95" />
          <g fill="#fff">
            <rect x="18" y="16" width="28" height="6" rx="2" />
            <rect x="29" y="22" width="6" height="22" rx="2" />
            <ellipse cx="32" cy="28" rx="16" ry="4" />
          </g>
        </svg>
      );

    case "usdc":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <circle cx="32" cy="32" r="28" fill="#2775ca" />
          <circle cx="32" cy="32" r="18" fill="none" stroke="#fff" strokeWidth="3" />
          <text x="32" y="39" textAnchor="middle" fontSize="26" fontWeight="700" fill="#fff">$</text>
        </svg>
      );

    case "ltc":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <circle cx="32" cy="32" r="28" fill="#345d9d" />
          <text x="32" y="40" textAnchor="middle" fontSize="28" fontWeight="700" fill="#fff">Ł</text>
        </svg>
      );

    case "atom":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <circle cx="32" cy="32" r="28" fill="#2e3148" />
          <circle cx="32" cy="32" r="3" fill="#fff" />
          <ellipse cx="32" cy="32" rx="20" ry="8" fill="none" stroke="#9aa0c8" strokeWidth="2" />
          <ellipse cx="32" cy="32" rx="8" ry="20" fill="none" stroke="#9aa0c8" strokeWidth="2" transform="rotate(25 32 32)" />
          <ellipse cx="32" cy="32" rx="8" ry="20" fill="none" stroke="#9aa0c8" strokeWidth="2" transform="rotate(-25 32 32)" />
        </svg>
      );

    case "matic":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <ellipse cx="32" cy="32" rx="26" ry="24" fill="#f3f3f3" />
          <g fill="none" stroke="#8247e5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 27l8-5 8 5v10l-8 5-8-5z" />
            <path d="M36 27l8-5 8 5v10l-8 5-8-5" />
          </g>
        </svg>
      );

    case "arb":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <polygon points="32,6 51,17 51,47 32,58 13,47 13,17" fill="#223147" stroke="#7aa2d8" strokeWidth="2" />
          <path d="M24 42l8-20h6l-8 20z" fill="#fff" />
          <path d="M34 22h6l-8 20h-6z" fill="#28a0f0" />
          <path d="M42 22h6l-6 15h-6z" fill="#7aa2d8" />
        </svg>
      );

    case "dai":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <circle cx="32" cy="32" r="28" fill="#f5b617" />
          <g fill="#fff">
            <path d="M22 20h12c8 0 14 5 14 12s-6 12-14 12H22z" />
            <rect x="20" y="27" width="24" height="4" />
            <rect x="20" y="35" width="24" height="4" />
          </g>
        </svg>
      );

    case "shib":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <circle cx="32" cy="32" r="28" fill="#ff9d00" />
          <polygon points="18,20 24,10 28,22" fill="#f44" />
          <polygon points="46,20 40,10 36,22" fill="#f44" />
          <ellipse cx="32" cy="34" rx="16" ry="14" fill="#fff4dd" />
          <circle cx="26" cy="31" r="2.5" fill="#111" />
          <circle cx="38" cy="31" r="2.5" fill="#111" />
          <polygon points="32,34 29,38 35,38" fill="#111" />
        </svg>
      );

    case "dgb":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <circle cx="32" cy="32" r="28" fill="#0066cc" />
          <circle cx="32" cy="32" r="18" fill="#0b1e3c" />
          <text x="32" y="39" textAnchor="middle" fontSize="22" fontWeight="700" fill="#fff">D</text>
        </svg>
      );

    case "bch":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <circle cx="32" cy="32" r="28" fill="#8dc351" />
          <text x="32" y="40" textAnchor="middle" fontSize="26" fontWeight="700" fill="#fff">₿</text>
        </svg>
      );

    case "qtum":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <circle cx="32" cy="32" r="28" fill="#1f57ff" />
          <g fill="none" stroke="#fff" strokeWidth="3">
            <path d="M20 20l12-6 12 6v12l-12 6-12-6z" />
            <path d="M20 32l12-6 12 6" />
            <path d="M32 14v24" />
          </g>
        </svg>
      );

    case "dash":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <ellipse cx="32" cy="32" rx="26" ry="24" fill="#f3f3f3" />
          <path d="M18 24h14c8 0 12 12 2 12H18l6-6h10" fill="#1c9cea" />
        </svg>
      );

    case "op":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <circle cx="32" cy="32" r="28" fill="#ff0420" />
          <text x="32" y="39" textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff">OP</text>
        </svg>
      );

    case "link":
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <circle cx="32" cy="32" r="28" fill="#295ada" />
          <polygon points="32,16 46,24 46,40 32,48 18,40 18,24" fill="none" stroke="#fff" strokeWidth="4" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 64 64" className="svg-fit">
          <circle cx="32" cy="32" r="28" fill="#888" />
        </svg>
      );
  }
}

export default function Deposit() {
  const navigate = useNavigate();
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [showDepositPopup, setShowDepositPopup] = useState(false);
  const activeCoinName = "Tether on BSC";

  function handleCoinClick(item) {
    if (item.name !== activeCoinName) return;
    setShowWarningPopup(true);
  }

  function closeAllPopups() {
    setShowWarningPopup(false);
    setShowDepositPopup(false);
  }

  function handleConfirm() {
    setShowWarningPopup(false);
    setShowDepositPopup(true);
  }

  function handleCopyAddress() {
    navigator.clipboard.writeText("0xA3E55dd295f04352e6c6A42F63375A9D3F9e8FC0");
  }

  return (
    <div className="deposit-page">
      <header className="deposit-topbar">
        <div className="deposit-logo">
          <div className="deposit-logo-row">
            <span className="logo-white">BET</span>
            <span className="logo-pill">ON</span>
          </div>
          <div className="deposit-logo-row">
            <span className="logo-green">GAME</span>
          </div>
        </div>

        <div className="topbar-right">
          <div className="deposit-balance-box">
            <div className="deposit-balance-left">
              <div className="deposit-balance-title-row">
                <span className="deposit-balance-title">Main account (PKR)</span>
                <span className="deposit-balance-arrow">⌄</span>
              </div>
              <span className="deposit-balance-amount">0</span>
            </div>

            <button className="deposit-plus-btn">+</button>
          </div>

          <div className="deposit-user-wrap">
            <div className="deposit-user-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c1.8-3.6 5-5 8-5s6.2 1.4 8 5" />
                <circle cx="12" cy="12" r="10.5" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="deposit-content">
        <section className="deposit-title-row">
          <button className="back-btn" onClick={() => navigate("/profile")}>
            ←
          </button>
          <h1 className="deposit-title">Deposit into personal account</h1>
        </section>

        <div className="account-box">Account 1603944251</div>

        <section className="crypto-section">
          <div className="crypto-header">Cryptocurrency</div>

          <div className="coin-grid">
            {items.map((item) => {
              const isActive = item.name === activeCoinName;

              return (
                <button
                  className={`coin-card ${!isActive ? "coin-card-inactive" : "coin-card-active"}`}
                  key={item.name}
                  onClick={() => handleCoinClick(item)}
                  disabled={!isActive}
                >
                  <div className="coin-top">
                    <div className={`icons-wrap ${item.icons.length > 1 ? "double-icons" : ""}`}>
                      {item.icons.map((icon, index) => (
                        <div className="coin-icon-shell" key={index}>
                          <CoinSvg type={icon.type} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="coin-bottom">{item.name}</div>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      {showWarningPopup && (
        <div className="popup-overlay" onClick={closeAllPopups}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closeAllPopups}>
              ×
            </button>

            <div className="popup-icon-row">
              <div className="popup-mini-icon">
                <CoinSvg type="usdt" />
              </div>
              <div className="popup-mini-icon">
                <CoinSvg type="bnb" />
              </div>
            </div>

            <div className="popup-divider"></div>

            <p className="popup-text red-text">
              ONLY send USDT (Binance Smart Chain) to this deposit address.
            </p>

            <p className="popup-text">
              <span className="red-text">
                Do NOT use BEP2, ERC20, OMNI, TRC20,
              </span>{" "}
              or other network standards as you may lose your funds.
              <span className="red-text">
                {" "}ONLY make deposits through the Binance Smart Chain (BEP20) network.
              </span>
            </p>

            <p className="popup-text red-text">
              The use of contract addresses is not allowed!
            </p>

            <p className="popup-text">
              By clicking the "Confirm" button, you indicate that you agree to
              the above-mentioned risks.
            </p>

            <button className="confirm-btn" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      )}

      {showDepositPopup && (
        <div className="popup-overlay" onClick={closeAllPopups}>
          <div className="popup-box popup-box-large" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closeAllPopups}>
              ×
            </button>

            <div className="popup-icon-row">
              <div className="popup-mini-icon">
                <CoinSvg type="usdt" />
              </div>
              <div className="popup-mini-icon">
                <CoinSvg type="bnb" />
              </div>
            </div>

            <div className="popup-divider"></div>

            <p className="deposit-rate-text">1 USDT = 273.6236538 PKR</p>
            <p className="deposit-address-label">
              Copy the address or scan the QR code:
            </p>

            <div className="deposit-address-row">
              <span className="deposit-address-text">
                0xA3E55dd295f04352e6c6A42F63375A9D3F9e8FC0
              </span>
              <button className="copy-address-btn" onClick={handleCopyAddress}>
                Copy
              </button>
            </div>

            <div className="qr-wrapper">
              <img
                className="qr-image"
                src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=0xA3E55dd295f04352e6c6A42F63375A9D3F9e8FC0"
                alt="QR Code"
              />
            </div>

            <div className="deposit-note-box">
              Minimum deposit amount 1.00 USDT. If you transfer a deposit amount
              below the specified limit, your funds will be lost.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}