import { render, screen, waitFor } from '@testing-library/react';
import React from 'react'
import { UserInfoForm } from './UserInfoForm'
import user from '@testing-library/user-event'

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('UserInfoForm', () => {

    beforeEach(() => {
        render(<UserInfoForm />)
    })

    it('Form navigates when submitted with all fields filled', async () => {
        const firstName = screen.getByRole('textbox', {
            name: /first name/i
        });
        user.type(firstName, 'Test');

        const lastName = screen.getByRole('textbox', {
            name: /last name/i
        });
        user.type(lastName, 'McTester');

        const gender = screen.getByRole('combobox', {
            name: /select gender/i
        });
        user.selectOptions(gender, screen.getByRole('option', { name: /female/i }));

        const married = screen.getByRole('radio', {
            name: /married/i
        });
        user.click(married);

        const dateofBirth = screen.getByLabelText(/date of birth/i);
        user.type(dateofBirth, '1/1/2001');

        const chosenInt = screen.getByRole('spinbutton', {
            name: /lucky number/i
        });
        user.type(chosenInt, '3');

        const submitButton = screen.getByRole('button', {
            name: /submit/i
        });
        user.click(submitButton);

        await waitFor(() => {
            expect(mockedUsedNavigate).toHaveBeenCalledTimes(1);
        });


    });

});