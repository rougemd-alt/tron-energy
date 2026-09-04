import { useState } from 'react'
import './App.css'

const tariffs = [
  {
    energy: '65,000',
    duration: '1 час',
    price: '0.35 USDT',
  },
  {
    energy: '131,000',
    duration: '1 час',
    price: '0.65 USDT',
  },
  {
    energy: '325,000',
    duration: '1 час',
    price: '1.55 USDT',
  },
  {
    energy: '650,000',
    duration: '1 час',
    price: '3.00 USDT',
  },
]



function App() {
  const [orders, setOrders] = useState([
  {
    id: '#1001',
    energy: '131,000 Energy',
    price: '0.65 USDT',
    status: 'Выполнено',
    date: '03.09.2026, 21:10',
  },
  {
    id: '#1000',
    energy: '65,000 Energy',
    price: '0.35 USDT',
    status: 'Выполнено',
  },
])
  const [selected, setSelected] = useState(0)
const [screen, setScreen] = useState<'home' | 'payment' | 'history' | 'status'>('home')
const [paymentSent, setPaymentSent] = useState(false)
const [nextOrderId, setNextOrderId] = useState(1002)
  const tariff = tariffs[selected]
if (screen === 'status') {
  return (
    <main className="app">
      <header className="header">
        <div>
          <div className="logo">⚡ TRON ENERGY</div>
          <div className="subtitle">Статус заказа</div>
        </div>
      </header>

      <section className="status-page">
        <div className="status-icon">✓</div>

        <h1>Заказ создан</h1>

        <p className="status-description">
          Платёж отправлен на проверку.
          <br />
          Мы проверим транзакцию и активируем Energy.
        </p>

        <div className="status-card">
          <div className="status-row">
            <span>Номер заказа</span>
            <strong>#1002</strong>
          </div>

          <div className="status-row">
            <span>Energy</span>
            <strong>{tariff.energy}</strong>
          </div>

          <div className="status-row">
            <span>Стоимость</span>
            <strong>{tariff.price}</strong>
          </div>

          <div className="status-row">
            <span>Статус</span>
            <strong className="status-pending">
              Проверка оплаты
            </strong>
          </div>
        </div>

        <div className="status-steps">
          <div className="step active">
            <span>✓</span>
            <div>
              <strong>Заказ создан</strong>
              <small>Готов к проверке</small>
            </div>
          </div>

          <div className="step">
            <span>2</span>
            <div>
              <strong>Проверка платежа</strong>
              <small>Ожидаем подтверждение</small>
            </div>
          </div>

          <div className="step">
            <span>3</span>
            <div>
              <strong>Energy отправлена</strong>
              <small>После подтверждения</small>
            </div>
          </div>
        </div>

        <button
          className="back-button"
          onClick={() => setScreen('home')}
        >
          ← На главную
        </button>
      </section>
    </main>
  )
}
  if (screen === 'history') {
    return (
      <main className="app">
        <header className="header">
          <div>
            <div className="logo">⚡ TRON ENERGY</div>
            <div className="subtitle">История заказов</div>
          </div>
        </header>

        <section className="history">
          <h1>История заказов</h1>

          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-top">
                <strong>{order.id}</strong>
                <span className="status">{order.status}</span>
              </div>

              <div className="order-row">
                <span>Energy</span>
                <strong>{order.energy}</strong>
              </div>

              <div className="order-row">
                <span>Стоимость</span>
                <strong>{order.price}</strong>
              </div>
              <div className="order-row">
  <span>Дата</span>
  <strong>{order.date}</strong>
</div>
            </div>
          ))}

          <button
            className="back-button"
            onClick={() => setScreen('home')}
          >
            ← Вернуться назад
          </button>
        </section>
      </main>
    )
  }

  if (screen === 'payment') {
    return (
      <main className="app">
        <header className="header">
          <div>
            <div className="logo">⚡ TRON ENERGY</div>
            <div className="subtitle">Оплата заказа</div>
          </div>
        </header>

        <section className="payment">
          <div className="payment-icon">⚡</div>

          <h1>Оплата заказа</h1>

          <div className="payment-card">
            <div>
              <span>Energy</span>
              <strong>{tariff.energy}</strong>
            </div>

            <div>
              <span>Срок</span>
              <strong>{tariff.duration}</strong>
            </div>

            <div>
              <span>К оплате</span>
              <strong>{tariff.price}</strong>
            </div>
          </div>

          <div className="payment-address">
            <span>USDT TRC-20 адрес</span>

           <div className="address-box">
  <div className="address-text">
    TCKzs55zWtwDFU9d76k9bddgUfzi1bFraX
  </div>

  <button
    className="copy-button"
    onClick={() => {
      navigator.clipboard.writeText(
        'TCKzs55zWtwDFU9d76k9bddgUfzi1bFraX'
      )
    }}
  >
    Копировать
  </button>
</div>
          </div>

          <button
  className="buy-button"
  disabled={paymentSent}
  onClick={() => {
  setOrders((currentOrders) => [
    {
      id: `#${nextOrderId}`,
      energy: tariff.energy,
      price: tariff.price,
      status: 'Проверка оплаты',
      date: new Date().toLocaleString('ru-RU'),
    },
    ...currentOrders,
  ])

  setPaymentSent(true)
setNextOrderId((currentId) => currentId + 1)
setScreen('status')
  }}

>
  Я оплатил
</button>

          <button
            className="back-button"
            onClick={() => setScreen('home')}
          >
            ← Вернуться назад
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="app">
      <header className="header">
        <div>
          <div className="logo">⚡ TRON ENERGY</div>
          <div className="subtitle">
            Быстрая энергия для TRON
          </div>
        </div>

        <button className="wallet-button">
          Подключить кошелёк
        </button>
      </header>

      <section className="hero">
        <div className="tron-icon">⚡</div>

        <h1>TRON Energy</h1>

        <p>
          Получай энергию для своих TRON-транзакций
          быстро и удобно.
        </p>
      </section>

      <section className="tariffs">
        <h2>Выбери тариф</h2>

        {tariffs.map((item, index) => (
          <button
            key={item.energy}
            className={`tariff ${
              selected === index ? 'selected' : ''
            }`}
            onClick={() => setSelected(index)}
          >
            <div className="tariff-left">
              <strong>{item.energy}</strong>
              <span>Energy</span>
            </div>

            <div className="tariff-center">
              <span>{item.duration}</span>
            </div>

            <div className="tariff-price">
              {item.price}
            </div>
          </button>
        ))}
      </section>

      <section className="order">
        <div className="order-info">
          <span>Выбрано:</span>
          <strong>{tariff.energy} Energy</strong>
        </div>

        <div className="order-info">
          <span>Стоимость:</span>
          <strong>{tariff.price}</strong>
        </div>

        <button
          className="buy-button"
          onClick={() => {
  setPaymentSent(false)
  setScreen('payment')
}}
        >
          ⚡ Купить Energy
        </button>

        <button
          className="history-button"
          onClick={() => setScreen('history')}
        >
          📋 История заказов
        </button>
      </section>

      <footer>
        TRON Energy Service
      </footer>
    </main>
  )
}

export default App