const request = require('supertest');
const express = require('express');
const userRouter = require('../../features/users/userRoutes'); // Chemin vers votre fichier de routes utilisateur
const userService = require('../../features/users//userService'); // Chemin vers votre service utilisateur
const { verifyToken } = require('../../middlewares/auth');

const app = express();
app.use(express.json());
app.use('/users', userRouter);

jest.mock('../../middlewares/auth', () => ({
    verifyToken: jest.fn((req, res, next) => next())
}));

jest.mock('../../features/users/userService');

describe('User API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /users/get-all', () => {
        it('should fetch all users', async () => {
            const mockUsers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
            userService.getAllUsers.mockResolvedValue(mockUsers);

            const response = await request(app).get('/users/get-all').set('x-access-token', 'dummyToken');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUsers);
        });
    });

    describe('GET /users/infos/:id', () => {
        it('should fetch a user by ID', async () => {
            const mockUser = { id: 1, name: 'John Doe' };
            userService.getUserById.mockResolvedValue(mockUser);

            const response = await request(app).get('/users/infos/1').set('x-access-token', 'dummyToken');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUser);
        });

        it('should return 404 if user not found', async () => {
            userService.getUserById.mockResolvedValue(null);

            const response = await request(app).get('/users/infos/999').set('x-access-token', 'dummyToken');

            expect(response.status).toBe(404);
            expect(response.text).toBe('User not found');
        });
    });

    describe('PUT /users/update/:id', () => {
        it('should update user information', async () => {
            const mockUser = { id: 1, name: 'John Doe' };
            const updatedUser = { id: 1, name: 'John Smith' };
            userService.updateUser.mockResolvedValue(updatedUser);

            const response = await request(app)
                .put('/users/update/1')
                .set('x-access-token', 'dummyToken')
                .send({ name: 'John Smith' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedUser);
        });
    });

    describe('DELETE /users/delete/:id', () => {
        it('should delete a user by ID', async () => {
            userService.deleteUser.mockResolvedValue(true);

            const response = await request(app)
                .delete('/users/delete/1')
                .set('x-access-token', 'dummyToken');

            expect(response.status).toBe(204);
        });

        it('should return 404 if user not found', async () => {
            userService.deleteUser.mockResolvedValue(false);

            const response = await request(app)
                .delete('/users/delete/999')
                .set('x-access-token', 'dummyToken');

            expect(response.status).toBe(404);
            expect(response.text).toBe('User not found');
        });
    });
});
