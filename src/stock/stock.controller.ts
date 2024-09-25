import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { StockService } from './stock.service';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}


  @Get('symbols')
  @UseGuards(JwtAuthGuard)
  async getSymbols() {    
    return this.stockService.getStockSymbols();
  }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  async getStockInfo(@Query('symbol') symbol: string) {
    return this.stockService.getStockQuote(symbol);
  }



}
