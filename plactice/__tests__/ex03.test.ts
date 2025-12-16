import { calculateShippingFee, getStatusMessage } from '../ex03';

describe('ex03: マジックナンバーと文字列の散在', () => {
  describe('calculateShippingFee', () => {
    test('日本の重量1kg以下', () => {
      expect(calculateShippingFee(0.5, 'JP')).toBe(500);
      expect(calculateShippingFee(1, 'JP')).toBe(500);
    });

    test('日本の重量5kg以下', () => {
      expect(calculateShippingFee(3, 'JP')).toBe(800);
      expect(calculateShippingFee(5, 'JP')).toBe(800);
    });

    test('日本の重量10kg以下', () => {
      expect(calculateShippingFee(7, 'JP')).toBe(1200);
      expect(calculateShippingFee(10, 'JP')).toBe(1200);
    });

    test('日本の重量10kg超', () => {
      expect(calculateShippingFee(15, 'JP')).toBe(2000);
    });

    test('アメリカの重量1kg以下', () => {
      expect(calculateShippingFee(0.5, 'US')).toBe(1000);
      expect(calculateShippingFee(1, 'US')).toBe(1000);
    });

    test('アメリカの重量5kg以下', () => {
      expect(calculateShippingFee(3, 'US')).toBe(2000);
      expect(calculateShippingFee(5, 'US')).toBe(2000);
    });

    test('アメリカの重量5kg超', () => {
      expect(calculateShippingFee(10, 'US')).toBe(5000);
    });

    test('その他の国', () => {
      expect(calculateShippingFee(5, 'UK')).toBe(3000);
      expect(calculateShippingFee(10, 'FR')).toBe(3000);
    });
  });

  describe('getStatusMessage', () => {
    test('ステータスコード0はpending', () => {
      expect(getStatusMessage(0)).toBe('pending');
    });

    test('ステータスコード1はprocessing', () => {
      expect(getStatusMessage(1)).toBe('processing');
    });

    test('ステータスコード2はcompleted', () => {
      expect(getStatusMessage(2)).toBe('completed');
    });

    test('ステータスコード3はcancelled', () => {
      expect(getStatusMessage(3)).toBe('cancelled');
    });

    test('無効なステータスコードはunknown', () => {
      expect(getStatusMessage(99)).toBe('unknown');
      expect(getStatusMessage(-1)).toBe('unknown');
    });
  });
});

