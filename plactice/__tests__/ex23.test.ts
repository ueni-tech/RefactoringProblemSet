import { getStatusColor, getStatusIcon, getStatusMessage, processStatus } from '../ex23';

describe('ex23: スイッチ文の重複とdefaultの不適切な処理', () => {
  describe('getStatusColor', () => {
    test('pendingはyellow', () => {
      expect(getStatusColor('pending')).toBe('yellow');
    });

    test('processingはblue', () => {
      expect(getStatusColor('processing')).toBe('blue');
    });

    test('completedはgreen', () => {
      expect(getStatusColor('completed')).toBe('green');
    });

    test('cancelledはred', () => {
      expect(getStatusColor('cancelled')).toBe('red');
    });

    test('無効なステータスはgray（エラーを無視）', () => {
      expect(getStatusColor('invalid')).toBe('gray');
    });
  });

  describe('getStatusIcon', () => {
    test('各ステータスのアイコン', () => {
      expect(getStatusIcon('pending')).toBe('⏳');
      expect(getStatusIcon('processing')).toBe('⚙️');
      expect(getStatusIcon('completed')).toBe('✅');
      expect(getStatusIcon('cancelled')).toBe('❌');
    });

    test('無効なステータスは?（エラーを無視）', () => {
      expect(getStatusIcon('invalid')).toBe('?');
    });
  });

  describe('getStatusMessage', () => {
    test('各ステータスのメッセージ', () => {
      expect(getStatusMessage('pending')).toBe('Your order is pending');
      expect(getStatusMessage('processing')).toBe('Your order is being processed');
      expect(getStatusMessage('completed')).toBe('Your order has been completed');
      expect(getStatusMessage('cancelled')).toBe('Your order has been cancelled');
    });

    test('無効なステータスはUnknown status（エラーを無視）', () => {
      expect(getStatusMessage('invalid')).toBe('Unknown status');
    });
  });

  describe('processStatus', () => {
    test('各ステータスの処理（console.logが呼ばれる）', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      processStatus('pending');
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    test('無効なステータスは何もしない（エラーを無視）', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      processStatus('invalid');
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  // リファクタリング検証テスト: 元のコードと同じ結果を返すことを確認
  describe('リファクタリング検証: 計算結果の正確性', () => {
    describe('getStatusColor: 様々なパターンで正確な結果を返す', () => {
      test('pendingはyellow', () => {
        expect(getStatusColor('pending')).toBe('yellow');
      });

      test('processingはblue', () => {
        expect(getStatusColor('processing')).toBe('blue');
      });

      test('completedはgreen', () => {
        expect(getStatusColor('completed')).toBe('green');
      });

      test('cancelledはred', () => {
        expect(getStatusColor('cancelled')).toBe('red');
      });

      test('無効なステータスはgray（元のコードの動作）', () => {
        expect(getStatusColor('invalid')).toBe('gray');
      });

      test('同じ入力で常に同じ結果を返す', () => {
        expect(getStatusColor('pending')).toBe(getStatusColor('pending'));
      });
    });

    describe('getStatusIcon: 様々なパターンで正確な結果を返す', () => {
      test('各ステータスのアイコン', () => {
        expect(getStatusIcon('pending')).toBe('⏳');
        expect(getStatusIcon('processing')).toBe('⚙️');
        expect(getStatusIcon('completed')).toBe('✅');
        expect(getStatusIcon('cancelled')).toBe('❌');
      });

      test('無効なステータスは?（元のコードの動作）', () => {
        expect(getStatusIcon('invalid')).toBe('?');
      });

      test('同じ入力で常に同じ結果を返す', () => {
        expect(getStatusIcon('pending')).toBe(getStatusIcon('pending'));
      });
    });

    describe('getStatusMessage: 様々なパターンで正確な結果を返す', () => {
      test('各ステータスのメッセージ', () => {
        expect(getStatusMessage('pending')).toBe('Your order is pending');
        expect(getStatusMessage('processing')).toBe('Your order is being processed');
        expect(getStatusMessage('completed')).toBe('Your order has been completed');
        expect(getStatusMessage('cancelled')).toBe('Your order has been cancelled');
      });

      test('無効なステータスはUnknown status（元のコードの動作）', () => {
        expect(getStatusMessage('invalid')).toBe('Unknown status');
      });

      test('同じ入力で常に同じ結果を返す', () => {
        expect(getStatusMessage('pending')).toBe(getStatusMessage('pending'));
      });
    });

    describe('processStatus: 様々なパターンで正確な結果を返す', () => {
      test('各ステータスの処理（console.logが呼ばれる）', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        processStatus('pending');
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
      });

      test('無効なステータスは何もしない（元のコードの動作）', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        processStatus('invalid');
        expect(consoleSpy).not.toHaveBeenCalled();
        consoleSpy.mockRestore();
      });
    });
  });
});

