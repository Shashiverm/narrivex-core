import { Server, Socket } from 'socket.io';
import { dataIngestionService } from '../services/dataIngestionService';

export function setupWebSocketHandlers(io: Server) {
  io.on('connection', (socket: Socket) => {
    socket.on('subscribe', async (symbol: string) => {
      socket.join(`asset:${symbol}`);
      const data = await dataIngestionService.getMarketData(symbol);
      socket.emit('initial_data', data);
    });

    socket.on('unsubscribe', (symbol: string) => {
      socket.leave(`asset:${symbol}`);
    });
  });
}

export function startPriceBroadcast(io: Server) {
  const symbols = (process.env.MARKET_SYMBOLS || 'BTC,ETH,AAPL')
    .split(',')
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);

  setInterval(async () => {
    for (const symbol of symbols) {
      const latest = await dataIngestionService.getLatestCandle(symbol);
      io.to(`asset:${symbol}`).emit(`price_update:${symbol}`, latest);
    }
  }, 3000);
}