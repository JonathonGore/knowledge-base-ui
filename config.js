const Config = {
	ALLOW_PUBLIC: process.env.ALLOW_PUBLIC || false,
	COOKIE_NAME: process.env.COOKIE_NAME || 'knowledge_base',
	PUBLIC_COOKIE_NAME: process.env.PUBLIC_COOKIE_NAME || 'kb-public',
	serverURL: process.env.SERVER_URL || 'http://localhost:3001'
}

export default Config;
