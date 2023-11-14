import expressAsyncHandler from 'express-async-handler';

const getAllProblemsHandler = expressAsyncHandler(async (req, res) => {
    res.json({
        message: 'Get All problems',
    });
});

export { getAllProblemsHandler };
