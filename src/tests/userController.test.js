// __tests__/userController.test.js

const userController = require('../features/users/userController');
const userService = require('../features/users/userService');

jest.mock('../features/users/userService');

describe('User Controller', () => {

    describe('getAllUsers', () => {
        it('should fetch all users and return 200 status', async () => {
            const mockUsers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
            userService.getAllUsers.mockResolvedValue(mockUsers);

            const req = {};
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            await userController.getAllUsers(req, res, next);

            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockUsers);
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            userService.getAllUsers.mockRejectedValue(error);

            const req = {};
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            await userController.getAllUsers(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getUserById', () => {
        it('should fetch a user by ID and return 200 status', async () => {
            const mockUser = { id: 1, name: 'John Doe' };
            userService.getUserById.mockResolvedValue(mockUser);

            const req = { params: { id: 1 } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            await userController.getUserById(req, res, next);

            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 404 if user not found', async () => {
            userService.getUserById.mockResolvedValue(null);

            const req = { params: { id: 999 } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };
            const next = jest.fn();

            await userController.getUserById(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('User not found');
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            userService.getUserById.mockRejectedValue(error);

            const req = { params: { id: 1 } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            await userController.getUserById(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('updateUser', () => {
        it('should update user information and return 200 status', async () => {
            const mockUser = { id: 1, name: 'John Doe' };
            const updatedUser = { id: 1, name: 'John Smith' };
            userService.updateUser.mockResolvedValue(updatedUser);

            const req = { params: { id: 1 }, body: { name: 'John Smith' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            await userController.updateUser(req, res, next);

            expect(res.status).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(updatedUser);
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            userService.updateUser.mockRejectedValue(error);

            const req = { params: { id: 1 }, body: { name: 'John Smith' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const next = jest.fn();

            await userController.updateUser(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user by ID and return 204 status', async () => {
            userService.deleteUser.mockResolvedValue(true);

            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };
            const next = jest.fn();

            await userController.deleteUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalledWith('User deleted successfully');
        });

        it('should return 404 if user not found', async () => {
            userService.deleteUser.mockResolvedValue(false);

            const req = { params: { id: 999 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };
            const next = jest.fn();

            await userController.deleteUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('User not found');
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            userService.deleteUser.mockRejectedValue(error);

            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };
            const next = jest.fn();

            await userController.deleteUser(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
