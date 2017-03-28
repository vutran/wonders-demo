const https = require('https');
const pkg = require('./package');
const Wonders = require('wonders');

// helpers
const searchRepo = (q) => new Promise((resolve, reject) => {
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

const search = (args) => {
    if (!args[1]) {
        return Promise.reject('Missing repository name.');
    }

    const q = args[1];

    return searchRepo(q)
        .then(res => res.items.map(item => item.full_name))
        .then(repos => {
            let log = 'Found: \n';
            log += repos.join('\n');
            return log;
        });
};

const beep = () => {
    return 'Beep!';
};

// creates the program
const Program = () => (
    <program version="1.0.0" parse={process.argv}>
        <command name="search" description="Search for a repository on GitHub." onAction={search} />
        <command name="beep" description="Prints Beep!" onAction={beep} />
        <command name="boop" description="Prints Boop!">Boop!</command>
    </program>
);

Wonders.render(<Program />, process.stdout);
