import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Search } from 'lucide-react';

export default function AdminTransactions() {
  const { transactions } = useContext(AppContext);
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(t =>
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.user?.toLowerCase().includes(search.toLowerCase()) ||
    t.destination?.toLowerCase().includes(search.toLowerCase())
  );

  const total = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px 24px 0' }}>
        <div style={{ marginBottom: '16px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: '800' }}>Transactions</h1>
          <p style={{ fontSize: '12px', color: 'var(--text-gray)', marginTop: '2px' }}>Total Revenue: <strong style={{ color: 'var(--primary)' }}>Rp {total.toLocaleString()}</strong></p>
        </div>

        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
          <input type="text" placeholder="Search by user or destination..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '12px 16px 12px 40px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontSize: '13px', background: 'white' }} />
        </div>
      </div>

      <div className="scrollable" style={{ flex: 1, padding: '0 24px 24px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-gray)' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>💳</div>
            <p>No transactions found.</p>
          </div>
        ) : (
          filtered.map(trx => (
            <div key={trx.id} className="card" style={{ padding: '16px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <p style={{ fontWeight: '700', fontSize: '14px' }}>{trx.id}</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-gray)', marginTop: '2px' }}>{trx.destination}</p>
                </div>
                <span style={{ fontSize: '11px', background: '#ECFDF5', color: 'var(--success)', padding: '3px 10px', borderRadius: '6px', fontWeight: '700' }}>
                  {trx.status}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', align: 'center', gap: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>
                    {trx.user?.charAt(0)}
                  </div>
                  <div style={{ marginLeft: '8px' }}>
                    <p style={{ fontSize: '12px', fontWeight: '600' }}>{trx.user}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-gray)' }}>{trx.date}</p>
                  </div>
                </div>
                <p style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '15px' }}>Rp {trx.amount.toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
