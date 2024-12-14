import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SignInPage } from '../../pages/auth/sign-in/SignInPage.tsx';
import { MainProvider } from '../../components/MainProvider.tsx';

describe('Renders main page correctly', async () => {
  it('Should render the page correctly', async () => {
    render(
      <MainProvider>
        <SignInPage />
      </MainProvider>,
    );
    const [element] = await Promise.all([screen.getByTestId('sign-in-page')]);

    expect(element).not.toBeNull();
  });
});
