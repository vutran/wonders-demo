import https from 'https';

export function searchRepo(q) {
    return new Promise((resolve, reject) => {
        const url = `https://api.github.com/search/repositories?q=${q}`;
        const opts = {
            headers: {
                'User-Agent': 'wonders-demo',
            },
            hostname: 'api.github.com',
            path: `/search/repositories?q=${q}`,
        };
        https.get(opts, res => {
            let data = '';
            res
                .on('data', d => {
                    data += d;
                })
                .on('end', () => {
                    let d = JSON.parse(data);
                    resolve(d);
                });
        });
    });
}
