
import { Product, ExpiryItem } from '../types';

const STORAGE_KEY = 'supermarket_plu_data';
const EXPIRY_KEY = 'supermarket_expiry_data';

const DEFAULT_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Suva smokva', code: '28902', category: 'Zdrava hrana', createdAt: Date.now() },
  { id: 'p2', name: 'Suva šljiva', code: '30617', category: 'Zdrava hrana', createdAt: Date.now() },
  { id: 'p3', name: 'Suva kajsija', code: '72968', category: 'Zdrava hrana', createdAt: Date.now() },
  { id: 'p4', name: 'Kesten', code: '29084', category: 'Voće', createdAt: Date.now() },
  { id: 'p5', name: 'Žito kantica', code: '79118', category: 'Pakeraj', createdAt: Date.now() },
  { id: 'p6', name: 'Žito sveća', code: '40496', category: 'Pakeraj', createdAt: Date.now() },
  { id: 'p7', name: 'Beli luk mreža', code: '79121', category: 'Povrće', createdAt: Date.now() },
  { id: 'p8', name: 'Krompir Crveni 2,5 kg', code: '30047', category: 'Povrće', createdAt: Date.now() },
  { id: 'p9', name: 'Jabuka mix 2', code: '73300', category: 'Voće', createdAt: Date.now() },
  { id: 'p10', name: 'Šeri 250 g', code: '70883', category: 'Povrće', createdAt: Date.now() },
  { id: 'p11', name: 'Šeri 500 g', code: '71267', category: 'Povrće', createdAt: Date.now() },
  { id: 'p12', name: 'Zelena salata', code: '28966', category: 'Povrće', createdAt: Date.now() },
  { id: 'p13', name: 'Šargarepa 1 kg', code: '48255', category: 'Povrće', createdAt: Date.now() },
  { id: 'p14', name: 'Kivi korpica', code: '30055', category: 'Voće', createdAt: Date.now() },
  { id: 'p15', name: 'Šampinjoni 200 g', code: '71815', category: 'Povrće', createdAt: Date.now() },
  { id: 'p16', name: 'Krastavac kom.', code: '69488', category: 'Povrće', createdAt: Date.now() },
  { id: 'p17', name: 'Kukuruz kuvani 450 g', code: '79046', category: 'Zamrznuto', createdAt: Date.now() },
  { id: 'p18', name: 'Praziluk stiropor', code: '28965', category: 'Povrće', createdAt: Date.now() },
  { id: 'p19', name: 'Šljiva 1', code: '29934', category: 'Voće', createdAt: Date.now() },
  { id: 'p20', name: 'Šljiva crvena', code: '30078', category: 'Voće', createdAt: Date.now() },
  { id: 'p21', name: 'Babura crvena', code: '30020', category: 'Povrće', createdAt: Date.now() },
  { id: 'p22', name: 'Krompir C. 5 kg', code: '72840', category: 'Povrće', createdAt: Date.now() },
  { id: 'p23', name: 'Krompir B. 5 kg', code: '72841', category: 'Povrće', createdAt: Date.now() },
  { id: 'p24', name: 'Đuveč mix', code: '53129', category: 'Povrće', createdAt: Date.now() },
  { id: 'p25', name: 'Hokaido bundeva', code: '38410', category: 'Povrće', createdAt: Date.now() },
  { id: 'p26', name: 'Bukovača 300 g', code: '43391', category: 'Povrće', createdAt: Date.now() },
  { id: 'p27', name: 'Jagoda 500 g', code: '24392', category: 'Voće', createdAt: Date.now() },
  { id: 'p28', name: 'Jagoda Merenje', code: '29576', category: 'Voće', createdAt: Date.now() },
  { id: 'p29', name: 'Vita 6L', code: '76454', category: 'Piće', createdAt: Date.now() },
  { id: 'p30', name: 'Pasulj bob', code: '48530', category: 'Pakeraj', createdAt: Date.now() },
  { id: 'p31', name: 'Pasuljica', code: '41943', category: 'Pakeraj', createdAt: Date.now() },
  { id: 'p32', name: 'Pasulj Gradištanac', code: '41945', category: 'Pakeraj', createdAt: Date.now() },
  { id: 'p33', name: 'Pasulj Šareni', code: '64627', category: 'Pakeraj', createdAt: Date.now() },
  { id: 'p34', name: 'Ukr. papir (70x200)', code: '76481', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p35', name: 'Ukr. papir (70x150)', code: '58024', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p36', name: 'Korpa za veš', code: '76601', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p37', name: 'Ekonomik parfem', code: '62845', category: 'Hemija', createdAt: Date.now() },
  { id: 'p38', name: 'Lizalica ball top', code: '27265', category: 'Slatkiši', createdAt: Date.now() },
  { id: 'p39', name: 'Šoping torba', code: '64351', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p40', name: 'Pidžama plišana', code: '75613', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p41', name: 'Kuh. krpa 3/1', code: '76280', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p42', name: 'Tomy torba', code: '80494', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p43', name: 'Plazma kesa', code: '80506', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p44', name: 'Rosa činija', code: '78402', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p45', name: 'Rashladna torba', code: '78514', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p46', name: 'Neoplanta činija', code: '77742', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p47', name: 'Putni jastuk', code: '78151', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p48', name: 'Novčanik', code: '76197', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p49', name: 'Ceger Zaječar', code: '74826', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p50', name: 'Nektar torba', code: '78632', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p51', name: 'Daska za serviranje', code: '70161', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p52', name: 'Rosa čaša', code: '73194', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p53', name: 'Bojice', code: '78510', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p54', name: 'Noša', code: '78321', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p55', name: 'Pepsi činija', code: '76903', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p56', name: 'Argeta patka', code: '79822', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p57', name: 'Aleva krpa', code: '79798', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p58', name: 'Pepsi čaša', code: '69130', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p59', name: 'Balans šolja', code: '79809', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p60', name: 'Jelen majica', code: '79846', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p61', name: 'Tanjir Zaječar', code: '81368', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p62', name: 'Nektarina', code: '28873', category: 'Voće', createdAt: Date.now() },
  { id: 'p63', name: 'Kajsija', code: '28984', category: 'Voće', createdAt: Date.now() },
  { id: 'p64', name: 'Breskva', code: '28993', category: 'Voće', createdAt: Date.now() },
  { id: 'p65', name: 'Šilja crvena 500g', code: '71819', category: 'Povrće', createdAt: Date.now() },
  { id: 'p66', name: 'Šilja žuta pak.', code: '71914', category: 'Povrće', createdAt: Date.now() },
  { id: 'p67', name: 'Rukola 100 g', code: '40543', category: 'Povrće', createdAt: Date.now() },
  { id: 'p68', name: 'Orah ljuska 500 g', code: '81421', category: 'Zdrava hrana', createdAt: Date.now() },
  { id: 'p69', name: 'Krompir beli 2,5 kg', code: '60187', category: 'Povrće', createdAt: Date.now() },
  { id: 'p70', name: 'Limun Lamas', code: '81475', category: 'Voće', createdAt: Date.now() },
  { id: 'p71', name: 'Koka Kola čaša', code: '77854', category: 'Ostalo', createdAt: Date.now() },
  { id: 'p72', name: 'Zelen', code: '69379', category: 'Povrće', createdAt: Date.now() },
  { id: 'p73', name: 'Beli slajs krompir', code: '81468', category: 'Povrće', createdAt: Date.now() },
  { id: 'p74', name: 'Krompir pasterizovan', code: '81469', category: 'Povrće', createdAt: Date.now() },
  { id: 'p75', name: 'Iceberg seckani 200 g', code: '81466', category: 'Povrće', createdAt: Date.now() },
  { id: 'p76', name: 'Family mix 400 g', code: '81465', category: 'Povrće', createdAt: Date.now() },
  { id: 'p77', name: 'Kupus seckani', code: '81474', category: 'Povrće', createdAt: Date.now() },
  { id: 'p78', name: 'Baby spanać', code: '81463', category: 'Povrće', createdAt: Date.now() },
  { id: 'p79', name: 'Baby mix', code: '81462', category: 'Povrće', createdAt: Date.now() },
  { id: 'p80', name: 'Vitaminski mix', code: '81479', category: 'Povrće', createdAt: Date.now() },
  { id: 'p81', name: 'Salata Mediterana', code: '81477', category: 'Povrće', createdAt: Date.now() },
  { id: 'p82', name: 'Šargarepa pilirana', code: '81478', category: 'Povrće', createdAt: Date.now() }
];

const DEFAULT_EXPIRY: ExpiryItem[] = [];

export const storageService = {
  // Products
  getProducts: (): Product[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    try {
      const parsed = JSON.parse(data);
      // Ako je lista prazna, a nismo je mi ispraznili (initial_setup_done), vraćamo podrazumevane
      return parsed.length === 0 && !localStorage.getItem('initial_setup_done') ? DEFAULT_PRODUCTS : parsed;
    } catch (e) {
      return DEFAULT_PRODUCTS;
    }
  },

  saveProducts: (products: Product[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    localStorage.setItem('initial_setup_done', 'true');
  },

  addProduct: (name: string, code: string, category?: string): Product => {
    const products = storageService.getProducts();
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      code,
      category: category || 'Voće',
      createdAt: Date.now(),
    };
    const updated = [newProduct, ...products];
    storageService.saveProducts(updated);
    return newProduct;
  },

  deleteProduct: (id: string): void => {
    const products = storageService.getProducts();
    const updated = products.filter(p => p.id !== id);
    storageService.saveProducts(updated);
  },

  // Expiry Items
  getExpiryItems: (): ExpiryItem[] => {
    const data = localStorage.getItem(EXPIRY_KEY);
    if (!data) {
      localStorage.setItem(EXPIRY_KEY, JSON.stringify(DEFAULT_EXPIRY));
      return DEFAULT_EXPIRY;
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_EXPIRY;
    }
  },

  saveExpiryItems: (items: ExpiryItem[]): void => {
    localStorage.setItem(EXPIRY_KEY, JSON.stringify(items));
  },

  addExpiryItem: (name: string, code: string, expiryDate: string, category: string): ExpiryItem => {
    const items = storageService.getExpiryItems();
    const newItem: ExpiryItem = {
      id: crypto.randomUUID(),
      name,
      code,
      expiryDate,
      category,
      createdAt: Date.now(),
    };
    const updated = [newItem, ...items].sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());
    storageService.saveExpiryItems(updated);
    return newItem;
  },

  deleteExpiryItem: (id: string): void => {
    const items = storageService.getExpiryItems();
    const updated = items.filter(i => i.id !== id);
    storageService.saveExpiryItems(updated);
  }
};
