const axios = require('axios');
const conf = require('../../common/config');

const header = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    Authorization: 'Bearer ',
};
exports.getKakaoToken = async (code) => {
    const data = {
        grant_type: 'authorization_code',
        client_id: conf.kakaoRestApiKey,
        code,
    };

    const queryString = Object.keys(data)
        .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
        .join('&');

    const token = await axios.post('https://kauth.kakao.com/oauth/token', queryString, { headers: header });
    return { accessToken: token.data.access_token };
};
exports.getUserInfo = async (accessToken) => {
    // Authorization: 'Bearer access_token'
    header.Authorization += accessToken;

    // 카카오 사용자 정보 조회
    const get = await axios.get('https://kapi.kakao.com/v2/user/me', { headers: header });
    const result = get.data;

    return {
        snsId: result.id,
        email: result.kakao_account.email ? result.kakao_account.email : `${result.id}@no.agreement`,
        // NOTE: 닉네임 10글자 제한 때문에, 임시 처리
        // kakao 닉네임 규정은 20글자. result.id는 10글자로 추정
        nickname: result.id,
    };
};
