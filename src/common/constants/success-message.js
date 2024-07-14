const SuccessMessage = Object.freeze({
    // USER - 회원가입
    REGISTER_SUCCESSS: '회원가입 성공',
    AVAILABLE_NICKNAME: '사용 가능한 닉네임입니다.',
    AVAILABLE_EMAIL: '사용 가능한 이메일입니다.',

    // USER - 로그인
    LOGIN_SUCCESSS: '로그인 성공',
    LOGOUT_SUCCESS: '로그아웃 성공',

    DELETE_USER_SUCCESS: '회원 탈퇴 성공',
    REFRESH_TOKEN: 'access token 발급 성공',
    GET_PROFILE_SUCCESS: '유저 정보 조회 성공',

    // WORD - 최근검색어
    RECENT_WORDS_SUCCESS: '최근 검색어 조회 성공',
    DELETE_RECENT_WORD_SUCCESS: '최근 검색어 삭제 성공',

    // WORD - 검색어
    SEARCH_WORDS_SUCCESS: '검색어 조회 성공',
    SEARCH_WORDS_NONE: '검색 결과가 없습니다.',
    RANK_WORDS_SUCCESS: '인기 검색어 조회 성공',

    // REQUEST - 요청
    DELETE_REQUEST_SUCCESS: '요청 삭제 성공',
    GET_REQUESTS_SUCCESS: '요청 조회 성공',
    GET_ROLE_SUCCESS: '사용자 역할 조회 성공',
    UPDATE_REQUEST_SUCCESS: '요청 수정 성공',
    UPDATE_REQUEST_STATE_SUCCESS: '요청 상태 변경 성공',

    // WORD - 조회
    GET_WORDS_SUCCESS: '단어 조회 성공',
    RELATED_WORDS_SUCCESS: '연관 검색어 조회 성공',

    // Word - 등록요청
    REGISTER_WORDS_SUCCESS: '등록 요청 성공',

    // Word - 중복검사
    CHECK_DUPLICATE_REQUEST_SUCCESS: '중복 검사 성공',
});

module.exports = SuccessMessage;
