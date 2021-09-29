import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { AuthProvider, useAuth } from './auth';
import { startAsync } from 'expo-auth-session';

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

jest.mock('expo-auth-session');

describe('Auth Hook', () => {
  it('should be able to sign in with Google account existing', async () => {
    const googleMocked = mocked(startAsync as any);
      googleMocked.mockReturnValue({
        type: 'success',
        params: {
          access_token: 'token'
        }
    });

    global.fetch = jest.fn(() => new Promise<any>(resolve => {  
      resolve({ json: () => {
        return {
          id: 'test_id',
          email: 'test@email.com',
          name: 'test',
          photo: 'test.png'
        } as User
      }
    })}));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe('test@email.com');
  });

  it('user should not connect if cancel authentication with google', async () => {

    const googleMocked = mocked(startAsync as any);
      googleMocked.mockReturnValue({
        type: 'cancel',
    });

    global.fetch = jest.fn(() => new Promise<any>(resolve => {  
      resolve({ json: () => {
        return {
          id: 'test_id',
          email: 'test@email.com',
          name: 'test',
          photo: 'test.png'
        } as User
      }
    })}));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    // console.log('TEM USUÁRIO: ', result.current.user);

    expect(result.current.user).not.toHaveProperty('id');
  });
})