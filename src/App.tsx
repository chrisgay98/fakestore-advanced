import { useState } from 'react';
import Home from '@/pages/home';
import CartPage from '@/pages/cartpage';

export default function App() {
  const [view, setView] = useState<'home'|'cart'>('home');
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">FakeStore — Advanced</h1>
          <nav className="flex gap-2">
            <button className={`px-3 py-1 rounded ${view==='home'?'bg-black text-white':'border'}`} onClick={() => setView('home')}>Home</button>
            <button className={`px-3 py-1 rounded ${view==='cart'?'bg-black text-white':'border'}`} onClick={() => setView('cart')}>Cart</button>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">
        {view === 'home' ? <Home goCart={() => setView('cart')} /> : <CartPage onBack={() => setView('home')} />}
      </main>
    </div>
  );
}
