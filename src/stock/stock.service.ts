import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StockService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('STOCK_API_KEY');
    this.baseUrl = this.configService.get<string>('STOCK_BASE_URL');
  }

  async getStockQuote(symbol: string): Promise<any> {   
    const url = `${this.baseUrl}/quote/${symbol}?apikey=${this.apiKey}`;    
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      const stockData = response.data;

      if (!stockData || stockData.length === 0) {
        throw new HttpException('Stock not found', HttpStatus.NOT_FOUND);
      }
      const { price, changesPercentage, previousClose } = stockData[0];
      return {
        symbol,
        price,
        changesPercentage,
        previousClose
      };
    } catch (error) {
      throw new HttpException('Failed to fetch stock data', HttpStatus.BAD_REQUEST);
    }
  }

  async getStockSymbols(): Promise<any> {
    const url = `${this.baseUrl}/financial-statement-symbol-lists?apikey=${this.apiKey}`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException('Failed to fetch symbols', HttpStatus.BAD_REQUEST);
    }
  }
}
