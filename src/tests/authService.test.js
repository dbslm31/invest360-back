const authService = require('../features/auth/authService');
const AuthRepository = require('../features/auth/authRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../features/auth/authRepository');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Auth Service', () => {
    describe('signup', () => {
        it('should create a new user if email does not exist', async () => {
            AuthRepository.findUserByEmail.mockResolvedValue(null);
            AuthRepository.createUser.mockResolvedValue({
                id: 1,
                email: 'test@example.com',
                firstname: 'John',
                lastname: 'Doe',
                createdAt: new Date(),
            });

            const user = {
                email: 'test@example.com',
                password: 'password123',
                firstname: 'John',
                lastname: 'Doe',
            };

            const result = await authService.signup(user);

            expect(result.email).toBe(user.email);
            expect(result.firstname).toBe(user.firstname);
            expect(result.lastname).toBe(user.lastname);
            expect(result.message).toBe('You have successfully signed up!');
        });

        it('should throw an error if the user already exists', async () => {
            AuthRepository.findUserByEmail.mockResolvedValue({
                email: 'test@example.com',
            });

            const user = {
                email: 'test@example.com',
                password: 'password123',
                firstname: 'John',
                lastname: 'Doe',
            };

            await expect(authService.signup(user)).rejects.toThrow('User already exists.');
        });
    });

    describe('login', () => {
        it('should log in a user with correct email and password', async () => {
            const user = {
                id: 1,
                email: 'test@example.com',
                password: bcrypt.hashSync('password123', 8),
                firstname: 'John',
                lastname: 'Doe',
            };

            AuthRepository.findUserByEmail.mockResolvedValue(user);
            bcrypt.compareSync.mockReturnValue(true);
            jwt.sign.mockReturnValue('mockToken');
            AuthRepository.createRefreshToken.mockResolvedValue('mockRefreshToken');

            const userData = {
                email: 'test@example.com',
                password: 'password123',
            };

            const result = await authService.login(userData);

            expect(result.email).toBe(user.email);
            expect(result.accessToken).toBe('mockToken');
            expect(result.refreshToken).toBe('mockRefreshToken');
            expect(result.message).toBe('Successfully logged in!');
        });

        it('should throw an error if the email is not in the database', async () => {
            AuthRepository.findUserByEmail.mockResolvedValue(null);

            const userData = {
                email: 'test@example.com',
                password: 'password123',
            };

            await expect(authService.login(userData)).rejects.toThrow('Email is not in the database!');
        });

        it('should throw an error if the password is incorrect', async () => {
            const user = {
                id: 1,
                email: 'test@example.com',
                password: bcrypt.hashSync('password123', 8),
            };

            AuthRepository.findUserByEmail.mockResolvedValue(user);
            bcrypt.compareSync.mockReturnValue(false);

            const userData = {
                email: 'test@example.com',
                password: 'password123',
            };

            await expect(authService.login(userData)).rejects.toThrow('Incorrect password, please try again.');
        });
    });

    describe('logout', () => {
        it('should return true if refresh token is deleted successfully', async () => {
            AuthRepository.deleteRefreshToken.mockResolvedValue(true);
            const result = await authService.logout(1);
            expect(result).toBe(true);
        });

        it('should throw an error if deletion of refresh token fails', async () => {
            AuthRepository.deleteRefreshToken.mockResolvedValue(false);
            await expect(authService.logout(1)).rejects.toThrow('Failed to delete refresh token.');
        });
    });

    describe('forgotPassword', () => {
        it('should send a reset password email if user is found', async () => {
            const user = {
                id: 1,
                email: 'test@example.com',
                password: 'hashedpassword',
            };
            AuthRepository.findUserByEmail.mockResolvedValue(user);
            AuthRepository.sendResetPasswordEmail.mockResolvedValue(true);
            jwt.sign.mockReturnValue('mockToken');

            const result = await authService.forgotPassword('test@example.com');

            expect(result.message).toBe('Reset password email sent successfully');
        });

        it('should throw an error if user is not found', async () => {
            AuthRepository.findUserByEmail.mockResolvedValue(null);
            await expect(authService.forgotPassword('test@example.com')).rejects.toThrow('User not found');
        });
    });

    describe('getResetPassword', () => {
        it('should return verified message and email if token is valid', async () => {
            const user = {
                id: 1,
                email: 'test@example.com',
                password: 'hashedpassword',
            };
            const params = {
                id: 1,
                token: 'validtoken',
            };
            AuthRepository.findUserById.mockResolvedValue(user);
            jwt.verify.mockReturnValue({ email: 'test@example.com' });

            const result = await authService.getResetPassword(params);

            expect(result.message).toBe('Verified');
            expect(result.email).toBe('test@example.com');
        });

        it('should throw an error if user is not found', async () => {
            const params = {
                id: 1,
                token: 'validtoken',
            };
            AuthRepository.findUserById.mockResolvedValue(null);
            await expect(authService.getResetPassword(params)).rejects.toThrow('User not found');
        });
    });

    describe('resetPassword', () => {
        it('should update user password if token is valid', async () => {
            const user = {
                id: 1,
                email: 'test@example.com',
                password: 'hashedpassword',
            };
            const params = {
                id: 1,
                token: 'validtoken',
            };
            AuthRepository.findUserById.mockResolvedValue(user);
            jwt.verify.mockReturnValue({ email: 'test@example.com' });
            bcrypt.hash.mockResolvedValue('newhashedpassword');
            AuthRepository.updateUserPassword.mockResolvedValue(true);

            const result = await authService.resetPassword(params, 'newpassword');

            expect(result.email).toBe('test@example.com');
            expect(result.status).toBe('verified');
        });

        it('should throw an error if user is not found', async () => {
            const params = {
                id: 1,
                token: 'validtoken',
            };
            AuthRepository.findUserById.mockResolvedValue(null);
            await expect(authService.resetPassword(params, 'newpassword')).rejects.toThrow('User not found');
        });
    });

    describe('refreshToken', () => {
        it('should return new access token if refresh token is valid', async () => {
            const refreshToken = {
                id: 1,
                token: 'validtoken',
                getUser: jest.fn().mockResolvedValue({ id: 1 }),
            };
            AuthRepository.findRefreshToken.mockResolvedValue(refreshToken);
            AuthRepository.verifyRefreshTokenExpiration.mockReturnValue(false);
            jwt.sign.mockReturnValue('newaccesstoken');

            const result = await authService.refreshToken('validtoken');

            expect(result.accessToken).toBe('newaccesstoken');
            expect(result.refreshToken).toBe('validtoken');
        });

        it('should throw an error if refresh token is required but not provided', async () => {
            await expect(authService.refreshToken(null)).rejects.toThrow('Refresh Token is required!');
        });

        it('should throw an error if refresh token is not in database', async () => {
            AuthRepository.findRefreshToken.mockResolvedValue(null);
            await expect(authService.refreshToken('invalidtoken')).rejects.toThrow('Refresh token is not in database!');
        });

        it('should throw an error if refresh token has expired', async () => {
            const refreshToken = {
                id: 1,
                token: 'expiredtoken',
            };
            AuthRepository.findRefreshToken.mockResolvedValue(refreshToken);
            AuthRepository.verifyRefreshTokenExpiration.mockReturnValue(true);

            await expect(authService.refreshToken('expiredtoken')).rejects.toThrow('Refresh token has expired. Please make a new signin request');
        });
    });
});
