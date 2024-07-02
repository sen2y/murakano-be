const ErrorMessage = require('../constants/error-message');
const HTTP_STATUS_CODE = require('../constants/http-status-code');

const sendResponse = {
    // 200
    ok: (res, dto) => {
        if (dto) {
            res.type('application/json');
            return res.status(HTTP_STATUS_CODE.OK).json(dto);
        } else {
            return res.sendStatus(HTTP_STATUS_CODE.OK);
        }
    },

    // 201
    created: (res, dto) => {
        if (dto) {
            res.type('application/json');
            return res.status(HTTP_STATUS_CODE.CREATED).json(dto);
        } else {
            return res.sendStatus(HTTP_STATUS_CODE.CREATED);
        }
    },

    // 204
    noContent: (res, err) => {
        return res.status(HTTP_STATUS_CODE.NO_CONTENT).json(err);
    },

    // 400
    badRequest: (res, dto) => {
        if (dto) {
            res.type('application/json');
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(dto);
        } else {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: ErrorMessage.BAD_REQUEST });
        }
    },

    // 401
    unAuthorized: async (res, dto) => {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json(dto);
    },

    // 403
    forbidden: (res, err) => {
        return res.status(HTTP_STATUS_CODE.FORBIDDEN).json(err);
    },

    // 404
    notFound: (res, err) => {
        return res.status(HTTP_STATUS_CODE.NOT_FOUND).json(err);
    },

    // 409
    conflict: (res, err) => {
        return res.status(HTTP_STATUS_CODE.CONFLICT).json(err);
    },

    // 500
    fail: async (req, res, err) => {
        // send Error status
        if (typeof err === 'string') {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(err);
        } else if (Array.isArray(err)) {
            res.status(HTTP_STATUS_CODE.BAD_REQUEST).json(err.length == 1 ? err[0] : err);
        } else {
            res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: ErrorMessage.INTERNAL_SERVER_ERROR });
        }

        // logging Error
        const errInfo = {
            uid: req.userInfo ? req.userInfo.userId : undefined,
            creatorId: req.userInfo ? req.userInfo.creatorId : undefined,
            where: 'apiServer',
            from: req.baseUrl || 'unknown',
            params: {
                method: req.method,
                path: req.path,
                headers: req.headers,
                body: req.body,
                params: req.params,
                query: req.query,
            },
            message:
                err instanceof Error
                    ? {
                          name: err.name,
                          message: err.message,
                          stack: err.stack,
                      }
                    : err,
        };

        console.error(errInfo);

        return;
    },
};

module.exports = sendResponse;
