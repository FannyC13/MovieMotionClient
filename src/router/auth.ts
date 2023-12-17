import axios from 'axios';


const isAuthenticated = { value: true };

export function setAuthentication(value: boolean) {
  isAuthenticated.value = value;
}

export async function checkAdminToken(token: string): Promise<boolean> {
  try {
    //const response = await axios.post('/verifyAdminToken', { token });
    if(token == "testToken"){
        return true 
    }else{
        return false

    }
  } catch (error) {
    console.error('Erreur lors de la vérification du token admin', error);
    return false;
  }
}

export function isAuthenticatedUser() {
  return isAuthenticated.value;
}
