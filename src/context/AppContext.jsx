import React, { createContext, useState } from 'react';

export const AppContext = createContext();

// ─── DUMMY USERS ───────────────────────────────────────────────────────────────
const dummyUsers = [
  { id: 1, name: 'Yoel Gabriel', email: 'yoel@email.com', password: 'yoel123', phone: '081234567890', dateOfBirth: '2000-01-15', role: 'user', avatar: 'Y' },
  { id: 2, name: 'Fatih Risenda', email: 'fatih@email.com', password: 'fatih123', phone: '089876543210', dateOfBirth: '1999-05-20', role: 'user', avatar: 'F' },
  { id: 3, name: 'Admin', email: 'admin@audioguide.com', password: 'admin123', phone: '081111111111', dateOfBirth: '1990-01-01', role: 'admin', avatar: 'A' },
];

// ─── DUMMY DESTINATIONS ───────────────────────────────────────────────────────
const initialDestinations = [
  {
    id: 1, name: 'Borobudur Temple', location: 'Magelang, Jawa Tengah', category: 'Temple', price: 50000, rating: 4.8, reviews: 1250, distance: '2.5 km',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Pradaksina.jpg/960px-Pradaksina.jpg',
    description: 'Borobudur is a 9th-century Mahayana Buddhist temple in Magelang Regency. It is the world\'s largest Buddhist temple and a UNESCO World Heritage Site.',
    audioDuration: '45 min', highlights: ['UNESCO World Heritage', '9th Century Architecture', 'Sunrise View', '72 Stupas'],
  },
  {
    id: 2, name: 'Prambanan Temple', location: 'Sleman, DI Yogyakarta', category: 'Temple', price: 50000, rating: 4.7, reviews: 980, distance: '3.2 km',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Prambanan_Temple_Yogyakarta_Indonesia.jpg/960px-Prambanan_Temple_Yogyakarta_Indonesia.jpg',
    description: 'Prambanan is a 9th-century Hindu temple compound in Special Region of Yogyakarta, dedicated to the Trimūrti — Brahma, Vishnu, and Shiva.',
    audioDuration: '30 min', highlights: ['Hindu Architecture', 'Ramayana Ballet', 'UNESCO Site', '47 Temples'],
  },
  {
    id: 3, name: 'Mount Bromo', location: 'Probolinggo, Jawa Timur', category: 'Nature', price: 35000, rating: 4.9, reviews: 2100, distance: '120 km',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Bromo-Semeru-Batok-Widodaren.jpg/960px-Bromo-Semeru-Batok-Widodaren.jpg',
    description: 'Mount Bromo is an active volcano and part of the Tengger massif, in East Java, Indonesia. At 2,329 meters it is not the highest peak of the massif.',
    audioDuration: '60 min', highlights: ['Active Volcano', 'Sea of Sand', 'Sunrise View', 'Jeep Tour'],
  },
  {
    id: 4, name: 'Tumpak Sewu Waterfall', location: 'Lumajang, Jawa Timur', category: 'Nature', price: 20000, rating: 4.8, reviews: 850, distance: '85 km',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
    description: 'Tumpak Sewu, also known as Coban Sewu, is a tiered waterfall that is often compared to the Tree of Life.',
    audioDuration: '40 min', highlights: ['120m Waterfall', 'Jungle Trek', 'Panoramic View', 'Gua Tetes'],
  },
  {
    id: 5, name: 'Parangtritis Beach', location: 'Bantul, DI Yogyakarta', category: 'Beach', price: 10000, rating: 4.5, reviews: 1500, distance: '15 km',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Parangtritis_Beach_2011_4.JPG/960px-Parangtritis_Beach_2011_4.JPG',
    description: 'Parangtritis Beach is a popular tourist beach on the southern coast of Java. Famous for its mystical atmosphere.',
    audioDuration: '20 min', highlights: ['Sand Dunes', 'Mystic Legends', 'Sunset View', 'Horse Riding'],
  },
  {
    id: 6, name: 'Kuta Beach', location: 'Badung, Bali', category: 'Beach', price: 0, rating: 4.6, reviews: 3200, distance: '5 km',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Kuta_beach_2.jpg/800px-Kuta_beach_2.jpg',
    description: 'Kuta is a tourist mecca known for its party-centric atmosphere and surfing. Its long, sandy beach is lined with restaurants, bars, and hotels.',
    audioDuration: '25 min', highlights: ['Surfing', 'Sunset View', 'Nightlife', 'Shopping'],
  },
  {
    id: 7, name: 'National Museum', location: 'Central Jakarta', category: 'Gallery', price: 15000, rating: 4.7, reviews: 640, distance: '2 km',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Front_facade_-_National_Museum_Indonesia%2C_Jakarta_%282025%29_-_img_07.jpg/960px-Front_facade_-_National_Museum_Indonesia%2C_Jakarta_%282025%29_-_img_07.jpg',
    description: 'The National Museum of Indonesia is an archeological, historical, ethnological, and geographical museum located in Central Jakarta.',
    audioDuration: '50 min', highlights: ['Indonesian History', 'Artifacts', 'Cultural Heritage', 'Elephant Statue'],
  },
  {
    id: 8, name: 'Keraton Yogyakarta', location: 'Yogyakarta City', category: 'Palace', price: 15000, rating: 4.6, reviews: 1100, distance: '1.5 km',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Jogja_-_Kraton_Yogyakarta_-_Donopratono_gate_%282025%29_-_img_02.jpg/960px-Jogja_-_Kraton_Yogyakarta_-_Donopratono_gate_%282025%29_-_img_02.jpg',
    description: 'The Keraton Yogyakarta is the palace of the Sultanate of Yogyakarta and the seat of the Sultan of Yogyakarta.',
    audioDuration: '35 min', highlights: ['Royal Palace', 'Javanese Culture', 'Museum', 'Live Performances'],
  },
  {
    id: 9, name: 'Gudeg Yu Djum', location: 'Sleman, DI Yogyakarta', category: 'Culinary', price: 35000, rating: 4.8, reviews: 2400, distance: '4 km',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Nasi_Gudeg.jpg/960px-Nasi_Gudeg.jpg',
    description: 'A legendary culinary spot offering traditional sweet jackfruit stew (Gudeg), a signature dish of Yogyakarta.',
    audioDuration: '15 min', highlights: ['Authentic Gudeg', 'Traditional Recipe', 'Legendary Culinary', 'Dine-in'],
  },
  {
    id: 10, name: 'Sate Klathak Pak Pong', location: 'Bantul, DI Yogyakarta', category: 'Culinary', price: 30000, rating: 4.7, reviews: 1800, distance: '8 km',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Mutton_satay_from_H._Faqih%2C_Jombang%2C_2017-09-19_01.jpg/960px-Mutton_satay_from_H._Faqih%2C_Jombang%2C_2017-09-19_01.jpg',
    description: 'Famous for its unique mutton satay grilled on bicycle spokes. The tender meat and rich flavor make it a must-visit culinary destination.',
    audioDuration: '10 min', highlights: ['Mutton Satay', 'Unique Skewers', 'Rich Flavor', 'Local Favorite'],
  }
];

const dict = {
  en: {
    home: 'Home', explore: 'Explore', bookings: 'Activity', profile: 'Profile',
    featured: 'Featured Tour', nearby: 'Nearest Destinations', seeAll: 'See all',
    searchPlaceholder: 'Search destination...', free: 'Free',
    greeting: 'Hi', login: 'Sign In', myTickets: 'My Ticket', history: 'History',
    settings: 'Settings', logout: 'Log Out', language: 'Language',
    accessibility: 'Accessibility', highContrast: 'High Contrast', largeText: 'Large Text',
    visitors: 'Visitors', date: 'Date', price: 'Price', total: 'Total',
    payNow: 'Proceed to Payment', confirmPay: 'Pay Now',
    exploreByCategory: 'Explore by Category',
  },
  id: {
    home: 'Beranda', explore: 'Jelajah', bookings: 'Aktivitas', profile: 'Profil',
    featured: 'Tur Unggulan', nearby: 'Destinasi Terdekat', seeAll: 'Lihat semua',
    searchPlaceholder: 'Cari destinasi...', free: 'Gratis',
    greeting: 'Hai', login: 'Masuk', myTickets: 'Tiket Saya', history: 'Riwayat',
    settings: 'Pengaturan', logout: 'Keluar', language: 'Bahasa',
    accessibility: 'Aksesibilitas', highContrast: 'Kontras Tinggi', largeText: 'Teks Besar',
    visitors: 'Pengunjung', date: 'Tanggal', price: 'Harga', total: 'Total',
    payNow: 'Lanjut Pembayaran', confirmPay: 'Bayar Sekarang',
    exploreByCategory: 'Jelajah per Kategori',
  }
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [destinations, setDestinations] = useState(initialDestinations);
  const [bookings, setBookings] = useState([
    { id: 'TKT-1001', destination: initialDestinations[0], visitors: 2, date: new Date().toISOString().split('T')[0], totalPrice: 100000, paymentMethod: 'Virtual Account', status: 'Completed', userName: 'Yoel Gabriel' },
    { id: 'TKT-1002', destination: initialDestinations[1], visitors: 1, date: '2025-10-12', totalPrice: 50000, paymentMethod: 'Credit Card', status: 'Completed', userName: 'Yoel Gabriel' },
    { id: 'TKT-1003', destination: initialDestinations[2], visitors: 4, date: new Date().toISOString().split('T')[0], totalPrice: 140000, paymentMethod: 'Virtual Account', status: 'Completed', userName: 'Fatih Risenda' },
    { id: 'TKT-1004', destination: initialDestinations[6], visitors: 2, date: '2025-09-01', totalPrice: 30000, paymentMethod: 'Credit Card', status: 'Completed', userName: 'Fatih Risenda' },
    { id: 'TKT-1005', destination: initialDestinations[3], visitors: 1, date: '2025-11-20', totalPrice: 20000, paymentMethod: 'Virtual Account', status: 'Completed', userName: 'Budi Santoso' },
    { id: 'TKT-1006', destination: initialDestinations[8], visitors: 3, date: '2025-12-05', totalPrice: 105000, paymentMethod: 'Credit Card', status: 'Completed', userName: 'Anita Wijaya' },
  ]);
  const [favorites, setFavorites] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const [lang, setLang] = useState('en');
  const [accessibility, setAccessibility] = useState({ highContrast: false, largeText: false });

  const t = (key) => dict[lang]?.[key] || key;

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addDestination = (dest) => {
    setDestinations(prev => [{ ...dest, id: Date.now(), reviews: 0 }, ...prev]);
    showToast('Destination added successfully!');
    addActivity('Added new destination: ' + dest.name);
  };

  const updateDestination = (id, updatedData) => {
    setDestinations(prev => prev.map(d => d.id === id ? { ...d, ...updatedData } : d));
    showToast('Destination updated!');
    addActivity('Updated destination: ' + updatedData.name);
  };

  const deleteDestination = (id) => {
    const dest = destinations.find(d => d.id === id);
    setDestinations(prev => prev.filter(d => d.id !== id));
    showToast('Destination deleted.');
    if (dest) addActivity('Deleted destination: ' + dest.name);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

  const [activities, setActivities] = useState([
    { id: 1, user: 'Fatih Risenda', action: 'Completed booking for Mount Bromo', time: '10:45 AM' },
    { id: 2, user: 'Yoel Gabriel', action: 'Viewed Borobudur Temple', time: '10:30 AM' },
    { id: 3, user: 'Budi Santoso', action: 'Booked Tumpak Sewu Waterfall', time: '09:15 AM' },
    { id: 4, user: 'Anita Wijaya', action: 'Added Gudeg Yu Djum to favorites', time: '08:50 AM' },
    { id: 5, user: 'Admin', action: 'Updated Parangtritis Beach info', time: '08:20 AM' },
    { id: 6, user: 'Yoel Gabriel', action: 'Logged in', time: '08:00 AM' },
  ]);

  const [transactions, setTransactions] = useState([
    { id: 'TRX-1001', user: 'Yoel Gabriel', amount: 100000, status: 'Success', date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), destination: 'Borobudur Temple' },
    { id: 'TRX-1002', user: 'Yoel Gabriel', amount: 50000, status: 'Success', date: '12 Oct 2025', destination: 'Prambanan Temple' },
    { id: 'TRX-1003', user: 'Fatih Risenda', amount: 140000, status: 'Success', date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }), destination: 'Mount Bromo' },
    { id: 'TRX-1004', user: 'Fatih Risenda', amount: 30000, status: 'Success', date: '01 Sep 2025', destination: 'National Museum' },
    { id: 'TRX-1005', user: 'Budi Santoso', amount: 20000, status: 'Success', date: '20 Nov 2025', destination: 'Tumpak Sewu Waterfall' },
    { id: 'TRX-1006', user: 'Anita Wijaya', amount: 105000, status: 'Success', date: '05 Dec 2025', destination: 'Gudeg Yu Djum' },
    { id: 'TRX-1007', user: 'Rina Melati', amount: 30000, status: 'Success', date: '01 Jan 2026', destination: 'Sate Klathak Pak Pong' },
    { id: 'TRX-1008', user: 'Andi Hermawan', amount: 15000, status: 'Success', date: '10 Jan 2026', destination: 'Keraton Yogyakarta' },
    { id: 'TRX-1009', user: 'Siti Aminah', amount: 0, status: 'Success', date: '15 Jan 2026', destination: 'Kuta Beach' },
    { id: 'TRX-1010', user: 'Doni Salmanan', amount: 50000, status: 'Success', date: '20 Jan 2026', destination: 'Prambanan Temple' },
    { id: 'TRX-1011', user: 'Fatih Risenda', amount: 15000, status: 'Success', date: '05 Feb 2026', destination: 'Keraton Yogyakarta' },
    { id: 'TRX-1012', user: 'Yoel Gabriel', amount: 10000, status: 'Success', date: '10 Feb 2026', destination: 'Parangtritis Beach' },
  ]);

  const addActivity = (action) => {
    const newAct = {
      id: Date.now(),
      user: user ? user.name : 'System',
      action,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setActivities(prev => [newAct, ...prev].slice(0, 30));
  };

  const login = (email, password, role) => {
    const matched = dummyUsers.find(u =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password &&
      u.role === role
    );
    if (matched) {
      const { password: _pw, ...safeUser } = matched;
      setUser(safeUser);
      addActivity(`Logged in`);
      return { success: true, user: safeUser };
    }
    return { success: false, message: 'Invalid email or password.' };
  };

  const logout = () => {
    addActivity('Logged out');
    setUser(null);
  };

  const updateUser = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
    showToast('Profile updated successfully!');
    addActivity('Updated profile');
  };

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: 'TKT-' + String(Math.floor(Math.random() * 9000) + 1000),
      status: 'Completed',
      userName: user?.name
    };
    setBookings(prev => [newBooking, ...prev]);
    setTransactions(prev => [
      {
        id: 'TRX-' + String(Math.floor(Math.random() * 9000) + 1000),
        user: user?.name,
        amount: booking.totalPrice,
        status: 'Success',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        destination: booking.destination.name,
      },
      ...prev
    ]);
    addActivity(`Booked ${booking.destination.name}`);
    return newBooking;
  };

  return (
    <AppContext.Provider value={{
      user, login, logout, updateUser, dummyUsers,
      destinations, addDestination, updateDestination, deleteDestination,
      bookings, addBooking,
      activities, transactions, addActivity,
      lang, setLang, t,
      accessibility, setAccessibility,
      favorites, toggleFavorite,
      showToast,
    }}>
      <div className={`${accessibility.highContrast ? 'high-contrast' : ''} ${accessibility.largeText ? 'large-text' : ''}`} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
        {toastMessage && (
          <div style={{
            position: 'fixed', bottom: '90px', left: '50%', transform: 'translateX(-50%)',
            background: toastMessage.type === 'error' ? 'var(--danger)' : '#1F2937',
            color: 'white', padding: '12px 24px', borderRadius: '24px',
            zIndex: 9999, fontSize: '13px', whiteSpace: 'nowrap',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            animation: 'fadeInUp 0.3s ease',
          }}>
            {toastMessage.message}
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
};
