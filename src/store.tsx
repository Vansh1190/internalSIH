import { createStore, action, Action } from 'easy-peasy';

interface StoreModel {
  UserInfo: { name: string | null, email: string | null, gender: string | null, isVerified: boolean | null, phone: string | null };
  SocietyInfo: { name: string | null, email: string | null, gender: string | null, isVerified: boolean | null, phone: string | null };
  UserIdentity: { email: string, authToken: string | null };
  UpdateIdentity: any
  UpdateUserInfo: any
}

export const store = createStore <StoreModel>({
  UserIdentity: {
    email: '',
    authToken: localStorage.getItem('Identity'),
  },
  UserInfo: {
    name: null,
    email: null,
    gender: null,
    isVerified: null,
    phone: null
  },
  SocietyInfo: {
    name: null,
    email: null,
    gender: null,
    isVerified: null,
    phone: null
  },

  // Actions  
  UpdateIdentity: action((state: any, data) => {
    state.UserIdentity.email = data.email
    state.UserIdentity.authToken = data.authToken
  }),
  UpdateUserInfo: action((state: any, data) => {
    console.log(data)
    state.UserInfo = data
  }),

});
