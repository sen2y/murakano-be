const SucesssMessage = Object.freeze({
    // USER - 회원가입
    REGISTER_SUCCESSS: '회원가입 성공',
    AVAILABLE_NICKNAME: '사용 가능한 닉네임입니다.',
    AVAILABLE_EMAIL: '사용 가능한 이메일입니다.',

    // USER - 로그인
    LOGIN_SUCCESSS: '로그인 성공',
    LOGOUT_SUCCESS: '로그아웃 성공',

    REFRESH_TOKEN: 'access token 발급 성공',

    GET_PROFILE_SUCCESS: '유저 정보 조회 성공',

    // WORD - 최근검색어
    RECENT_WORDS_SUCCESS: '최근 검색어 조회 성공',
    DELETE_RECENT_WORD_SUCCESS: '최근 검색어 삭제 성공',

    // WORD - 검색어
    SEARCH_WORDS_SUCCESS: '검색어 조회 성공',
    SEARCH_WORDS_NONE: '검색 결과가 없습니다.',
});

module.exports = SucesssMessage;
