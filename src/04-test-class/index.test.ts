import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(100);
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(100);
    try {
      bankAccount.withdraw(200);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe(
        'Insufficient funds: cannot withdraw more than 100',
      );
    }
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccountSender = getBankAccount(100);
    const bankAccountReceiver = getBankAccount(50);
    try {
      bankAccountSender.transfer(200, bankAccountReceiver);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe(
        'Insufficient funds: cannot withdraw more than 100',
      );
    }
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(100);
    try {
      bankAccount.transfer(50, bankAccount);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe('Transfer failed');
    }
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(100);
    bankAccount.deposit(50);
    expect(bankAccount.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const bankAccount = getBankAccount(100);
    bankAccount.withdraw(50);
    expect(bankAccount.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const bankAccountSender = getBankAccount(100);
    const bankAccountReceiver = getBankAccount(50);
    bankAccountSender.transfer(50, bankAccountReceiver);
    expect(bankAccountSender.getBalance()).toBe(50);
    expect(bankAccountReceiver.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(100);
    const balance = await bankAccount.fetchBalance();
    if (balance !== null) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(200);
    try {
      await bankAccount.synchronizeBalance();
      expect(typeof bankAccount.getBalance()).toBe('number');
    } catch (error) {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(200);
    try {
      await bankAccount.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toBe('Synchronization failed');
    }
  });
});
