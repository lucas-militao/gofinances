import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => {
      return {
        type: 'success',
        params: {
          access_token: 'token'
        },
      }
    },
  }
});

describe('Auth Hook', () => {
  it('should be able to sign in with Google account existing', async () => {
      global.fetch = jest.fn(() => new Promise<any>(resolve => {  
          resolve({ json: () => {
            return {
              id: 'test_id',
              email: 'test@email.com',
              name: 'test',
              photo: 'test.png'
            } as User
          }
        })
      }) 
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe('test@email.com');
  });
})