export type Lang = 'en' | 'es' | 'hi'
type Dict = {
  appName: string; feedLink: string; availableCars: string; downloadFeedMsg: string; sortBy: string; price: string;
  vendor: string; seats: string; fuel: string; transmission: string; minSeats: string; favourites: string;
  pickup: string; return: string; view: string; noMatches: string; back: string; book: string;
  passengers: string; doors: string; bags: string; airCon: string
}
export const dict: Record<Lang, Dict> = {
  en: { appName: 'CarTrawler', feedLink: 'Feed', availableCars: 'Available Cars', downloadFeedMsg: 'Download the feed from this URL and save it as /public/cars.json.', sortBy: 'Sort by:', price: 'Price', vendor: 'Vendor', seats: 'Seats', fuel: 'Fuel', transmission: 'Transmission', minSeats: 'Min seats:', favourites: 'Favourites', pickup: 'Pick up:', return: 'Return:', view: 'View', noMatches: 'No cars match the current filters.', back: 'Back', book: 'Book', passengers: 'Passengers', doors: 'Doors', bags: 'Bags', airCon: 'Air Con' },
  es: { appName: 'CarTrawler', feedLink: 'Fuente', availableCars: 'Coches disponibles', downloadFeedMsg: 'Descarga el feed de esta URL y guárdalo como /public/cars.json.', sortBy: 'Ordenar por:', price: 'Precio', vendor: 'Proveedor', seats: 'Asientos', fuel: 'Combustible', transmission: 'Transmisión', minSeats: 'Asientos mín.:', favourites: 'Favoritos', pickup: 'Recogida:', return: 'Devolución:', view: 'Ver', noMatches: 'No hay coches que coincidan con los filtros.', back: 'Atrás', book: 'Reservar', passengers: 'Pasajeros', doors: 'Puertas', bags: 'Maletas', airCon: 'Aire acondicionado' },
  hi: { appName: 'CarTrawler', feedLink: 'फ़ीड', availableCars: 'उपलब्ध कारें', downloadFeedMsg: 'इस URL से फ़ीड डाउनलोड करें और /public/cars.json के रूप में सहेजें।', sortBy: 'क्रमबद्ध करें:', price: 'कीमत', vendor: 'वेंडर', seats: 'सीटें', fuel: 'ईंधन', transmission: 'ट्रांसमिशन', minSeats: 'न्यूनतम सीटें:', favourites: 'पसंदीदा', pickup: 'पिकअप:', return: 'रिटर्न:', view: 'देखें', noMatches: 'वर्तमान फ़िल्टर से कोई कार मेल नहीं खाती।', back: 'वापस', book: 'बुक करें', passengers: 'यात्री', doors: 'दरवाज़े', bags: 'बैग', airCon: 'एसी' }
}
