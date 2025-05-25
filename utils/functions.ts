import tinycolor from 'tinycolor2';

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
//   console.log(`hexToRgba(${hex}, ${alpha})`);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function colorWhite(color: string, alpha: number): string {
  return tinycolor(color).lighten(alpha).toHexString();
}


// const dados = [ 
//   { id: '1', icone: "category", descricao: 'Outros', cor: '#EE534F' },
//   { id: '2', icone: "directions-car", descricao: 'Carro', cor: '#25C6DA' },
//   { id: '3', icone: "restaurant", descricao: 'Alimentação', cor: '#18A05E' },
//   { id: '4', icone: "car-crash", descricao: 'Compras', cor: '#D4E056' },
//   { id: '5', icone: "shopping-cart", descricao: 'Transporte', cor: '#EF6C00' },
//   { id: '6', icone: "directions-bus", descricao: 'Transporte', cor: '#D81A60' },
//   { id: '7', icone: "home", descricao: 'Casa', cor: '#1564C0' },
//   { id: '8', icone: "account-balance", descricao: 'banco', cor: '#EE534F' },
//   { id: '9', icone: "credit-card", descricao: 'Cartão de Crédito', cor: '#25C6DA' },
//   { id: '10', icone: "payments", descricao: 'Alimentação', cor: '#18A05E' },
//   { id: '11', icone: "paid", descricao: 'Transporte', cor: '#D4E056' },
//   { id: '12', icone: "favorite-border", descricao: 'Transporte', cor: '#00E676' },
//   { id: '13', icone: "favorite", descricao: 'Transporte', cor: '#D81A60' },
//   { id: '14', icone: "star", descricao: 'Transporte', cor: '#1564C0' },
//   { id: '15', icone: "stars", descricao: 'Transporte', cor: '#EE534F' },
//   { id: '16', icone: "star-border", descricao: 'Alimentação', cor: '#D81A60' },
//   { id: '17', icone: "loyalty", descricao: 'Alimentação', cor: '#18A05E' },
//   { id: '18', icone: "checkroom", descricao: 'Transporte', cor: '#D4E056' },
//   { id: '19', icone: "auto-stories", descricao: 'Transporte', cor: '#00E676' },
//   { id: '20', icone: "description", descricao: 'Transporte', cor: '#D81A60' },
//   { id: '21', icone: "note", descricao: 'Transporte', cor: '#1564C0' },
// ];