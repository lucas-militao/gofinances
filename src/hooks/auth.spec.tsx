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
          id: 'userInfo.id',
          email: 'userInfo.email',
          name: 'userInfo.given_name',
          photo: 'userInfo.picture'
        } as User
      }
    })
      }) 
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();
  });
})