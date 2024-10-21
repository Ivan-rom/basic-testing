import { random } from 'lodash';
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

jest.mock('lodash', () => {
  return {
    random: jest.fn(),
  };
});

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 10;
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.getBalance()).toEqual(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 5;
    const withdrawAmount = 10;
    const bankAccount = getBankAccount(initialBalance);
    expect(() => bankAccount.withdraw(withdrawAmount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalanceFrom = 5;
    const initialBalanceTo = 20;

    const transferAmount = 15;

    const bankAccountFrom = getBankAccount(initialBalanceFrom);
    const bankAccountTo = getBankAccount(initialBalanceTo);

    expect(() =>
      bankAccountFrom.transfer(transferAmount, bankAccountTo),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 15;

    const transferAmount = 15;

    const bankAccount = getBankAccount(initialBalance);

    expect(() =>
      bankAccount.transfer(transferAmount, bankAccount),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 10;
    const depositAmount = 5;
    const expectedResult = 15;
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.deposit(depositAmount);
    expect(bankAccount.getBalance()).toEqual(expectedResult);
  });

  test('should withdraw money', () => {
    const initialBalance = 10;
    const withdrawAmount = 5;
    const expectedResult = 5;
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.withdraw(withdrawAmount);
    expect(bankAccount.getBalance()).toEqual(expectedResult);
  });

  test('should transfer money', () => {
    const initialBalanceFrom = 10;
    const initialBalanceTo = 20;

    const transferAmount = 5;

    const expectedBalanceFrom = 5;
    const expectedBalanceTo = 25;

    const bankAccountFrom = getBankAccount(initialBalanceFrom);
    const bankAccountTo = getBankAccount(initialBalanceTo);

    bankAccountFrom.transfer(transferAmount, bankAccountTo);

    expect(bankAccountFrom.getBalance()).toEqual(expectedBalanceFrom);
    expect(bankAccountTo.getBalance()).toEqual(expectedBalanceTo);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (random as jest.Mock).mockReturnValue(1);
    (random as jest.Mock).mockReturnValue(50);

    const initialBalance = 10;

    const account = getBankAccount(initialBalance);

    expect(account.fetchBalance()).not.toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const targetTestValue = 50;
    (random as jest.Mock).mockReturnValue(1);
    (random as jest.Mock).mockReturnValue(targetTestValue);

    const initialBalance = 10;

    const account = getBankAccount(initialBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toEqual(targetTestValue);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (random as jest.Mock).mockReturnValue(0);

    const initialBalance = 10;

    const account = getBankAccount(initialBalance);

    await expect(account.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
