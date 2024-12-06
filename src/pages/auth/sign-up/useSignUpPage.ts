import { useState } from 'react';

export function useSignUpPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return {
    showPassword,
    setShowPassword,
  };
}
