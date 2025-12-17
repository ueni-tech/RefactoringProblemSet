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

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('calculateShippingFee: 境界値と組み合わせパターン', () => {
      test('日本の境界値で正確な結果を返す', () => {
        // 境界値テスト
        expect(calculateShippingFee(0, 'JP')).toBe(500); // 1kg以下
        expect(calculateShippingFee(1, 'JP')).toBe(500); // 1kg以下（境界）
        expect(calculateShippingFee(1.01, 'JP')).toBe(800); // 5kg以下
        expect(calculateShippingFee(5, 'JP')).toBe(800); // 5kg以下（境界）
        expect(calculateShippingFee(5.01, 'JP')).toBe(1200); // 10kg以下
        expect(calculateShippingFee(10, 'JP')).toBe(1200); // 10kg以下（境界）
        expect(calculateShippingFee(10.01, 'JP')).toBe(2000); // 10kg超
      });

      test('アメリカの境界値で正確な結果を返す', () => {
        expect(calculateShippingFee(0, 'US')).toBe(1000); // 1kg以下
        expect(calculateShippingFee(1, 'US')).toBe(1000); // 1kg以下（境界）
        expect(calculateShippingFee(1.01, 'US')).toBe(2000); // 5kg以下
        expect(calculateShippingFee(5, 'US')).toBe(2000); // 5kg以下（境界）
        expect(calculateShippingFee(5.01, 'US')).toBe(5000); // 5kg超
      });

      test('その他の国の様々な重量で正確な結果を返す', () => {
        expect(calculateShippingFee(0, 'UK')).toBe(3000);
        expect(calculateShippingFee(1, 'FR')).toBe(3000);
        expect(calculateShippingFee(5, 'DE')).toBe(3000);
        expect(calculateShippingFee(10, 'CA')).toBe(3000);
        expect(calculateShippingFee(100, 'IT')).toBe(3000);
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const weight = 3;
        const country = 'JP';
        const result1 = calculateShippingFee(weight, country);
        const result2 = calculateShippingFee(weight, country);
        expect(result1).toBe(result2);
        expect(result1).toBe(800);
      });
    });

    describe('getStatusMessage: 全てのステータスコードで正確な結果を返す', () => {
      test('有効なステータスコードで正確な文字列を返す', () => {
        expect(getStatusMessage(0)).toBe('pending');
        expect(getStatusMessage(1)).toBe('processing');
        expect(getStatusMessage(2)).toBe('completed');
        expect(getStatusMessage(3)).toBe('cancelled');
      });

      test('無効なステータスコードでunknownを返す', () => {
        expect(getStatusMessage(-1)).toBe('unknown');
        expect(getStatusMessage(4)).toBe('unknown');
        expect(getStatusMessage(99)).toBe('unknown');
        expect(getStatusMessage(100)).toBe('unknown');
      });

      test('同じ入力で常に同じ結果を返す', () => {
        const code = 1;
        const result1 = getStatusMessage(code);
        const result2 = getStatusMessage(code);
        expect(result1).toBe(result2);
        expect(result1).toBe('processing');
      });
    });
  });
});

