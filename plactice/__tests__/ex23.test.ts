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
});

