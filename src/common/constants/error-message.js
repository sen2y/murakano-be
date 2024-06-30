const ErrorMessage = Object.freeze({
    AUTHENTICATION_FAILURE: '인증정보가 존재하지 않습니다.',
    NULL_VALUE: '필요한 값이 없습니다.',
    OUT_OF_VALUE: '파라미터 값이 잘못되었습니다.',
    NOT_FOUND: '잘못된 경로입니다.',
    BAD_REQUEST: '잘못된 요청입니다.',
    UNAUTHORIZED: '인증되지 않은 사용자입니다.',
    FORBIDDEN: '권한이 필요한 요청입니다.',
    CONFLICT: '요청이 충돌하였습니다.',
    INTERNAL_SERVER_ERROR: '알 수 없는 오류가 발생하였습니다.',
    FILE_EXT: '잘못된 파일 형식입니다',
    NON_EXIST_FILE: '파일을 찾을 수 없습니다.',
    NO_USER: '존재하지 않는 유저입니다.',
    AUTHOLIZATION: '권한이 없습니다.',
    RETRY_LOGIN: '다시 로그인해주세요.',
    NOT_AUTHORIZED: '권한이 없습니다.',

    // USER
    REGISTER_ERROR: '회원가입중 오류가 발생하였습니다.',
    NICKNAME_CHECK_ERROR: '닉네임 중복검사중 오류가 발생하였습니다.',
    EMAIL_CHECK_ERROR: '이메일 중복검사중 오류가 발생하였습니다.',
    EXIST_NICKNAME: '이미 존재하는 닉네임 입니다.',
    EXIST_EMAIL: '이미 존재하는 이메일 입니다.',
    LOGIN_ERROR: '로그인중 오류가 발생하였습니다.',
    KAKAO_LOGIN_ERROR: '카카오 로그인중 오류가 발생하였습니다.',
    NO_REFRESH_TOKEN: 'refresh token이 존재하지 않습니다.',
    REFRESH_TOKEN_ERROR: 'refresh token 검증중 오류가 발생하였습니다.',
});

module.exports = ErrorMessage;
