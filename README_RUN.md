🚀 Cómo empezar con Expo Managed Workflow

npx create-expo-app myApp

npm run start

npm install -g eas-cli


eas build:configure


eas login


eas build -p android --profile production


eas build -p android --profile preview


npx expo config --json | jq -r '.icon, .android.adaptiveIcon.foregroundImage


npx expo start --web

EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:8000/api npm run android


python manage.py runserver 0.0.0.0:8000

ipconfig getifaddr en0 || ipconfig getifaddr en1  

EXPO_PUBLIC_API_BASE_URL=http://192.168.x.x:8000/api npm run ios


eas build -p android --profile preview --local

---

## 🔐 Flujo de autenticación simulado

- El login ahora utiliza un repositorio de autenticación (`AuthRepository`) que simula un endpoint real.
- Al hacer login, se genera un token aleatorio y se guarda en AsyncStorage.
- El controlador de login (`useLoginController`) expone el estado de sesión (`isLoggedIn`) y permite hacer logout, que borra el token.
- Todo el flujo está listo para ser reemplazado por una API real de backend cuando esté disponible.

### Ejemplo de uso

```ts
const {
  email, password, isSubmitting, error, isLoggedIn,
  setEmail, setPassword, handleSubmit, logout
} = useLoginController();
```

- El token se guarda y recupera automáticamente usando AsyncStorage.
- Puedes extender el flujo para proteger rutas, mostrar el estado de sesión, etc.
