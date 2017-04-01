import Wonders from 'wonders';
import { searchRepo } from '../utils';

export default function(args) {
    if (!args[1]) {
        return Promise.reject('Missing repository name.');
    }

    const q = args[1];

    return searchRepo(q)
        .then(res => res.items.map(item => item.full_name))
        .then(repos => {
            return (
                <ul>
                    {repos.map(repo => <li>{repo}</li>)}
                </ul>
            );
        });
}
