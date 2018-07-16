const Config = {
	ALLOW_PUBLIC: process.env.ALLOW_PUBLIC || false,
	COOKIE_NAME: process.env.COOKIE_NAME || 'knowledge_base',
	serverURL: process.env.SERVER_URL || 'http://localhost:3001'
}

export default Config;
