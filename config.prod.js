const Config = {
	ALLOW_PUBLIC: process.env.ALLOW_PUBLIC || false,
	serverURL: process.env.SERVER_URL || 'http://ec2-54-84-31-74.compute-1.amazonaws.com:3001'
}

export default Config;
